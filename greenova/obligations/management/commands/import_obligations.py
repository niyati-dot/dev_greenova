import csv
import logging
from typing import Any, Dict, Tuple, Optional
from django.core.management.base import BaseCommand, CommandParser
from django.utils.dateparse import parse_date
from django.db import transaction
from django.db.models.signals import post_save
from projects.models import Project
from obligations.models import Obligation
from mechanisms.models import EnvironmentalMechanism

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Import obligations from CSV file'

    # Mechanism mapping moved directly into the command
    MECHANISM_ID_MAPPING = {
        'Environmental Protection Act 1986': 'EP_ACT_1986',
        'Environmental Protection Regulations 1987': 'EP_REGS_1987',
        'Portside CEMP': 'PORTSIDE_CEMP',  # Added mapping for common mechanism
        # Add other mappings as needed
    }

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Run import without saving to database'
        )
        parser.add_argument(
            '--skip-counts-update',
            action='store_true',
            help='Skip mechanism counts update (use if experiencing signal issues)'
        )

    def clean_boolean(self, value: str) -> bool:
        """Convert string boolean values to Python boolean."""
        if not value:
            return False
        return str(value).lower() in ('yes', 'true', '1', 'y')

    def get_or_create_mechanism(self, mechanism_name: str, project: Project) -> Tuple[Optional[EnvironmentalMechanism], bool]:
        """Get or create an EnvironmentalMechanism instance."""
        if not mechanism_name:
            return None, False

        try:
            # Check if this mechanism should use a specific ID
            desired_id = self.MECHANISM_ID_MAPPING.get(mechanism_name)

            # Determine the name to use (either mapped ID or original name)
            mech_name = desired_id if desired_id else mechanism_name

            # Try to get existing mechanism
            try:
                mechanism = EnvironmentalMechanism.objects.get(
                    name=mech_name,
                    project=project
                )
                return mechanism, False
            except EnvironmentalMechanism.DoesNotExist:
                # Create new mechanism with proper status
                mechanism = EnvironmentalMechanism(
                    name=mech_name,
                    project=project,
                    description=f'Auto-created from obligation import for {project.name}',
                    status='not started',  # Set initial status
                    not_started_count=0,
                    in_progress_count=0,
                    completed_count=0,
                    overdue_count=0
                )
                mechanism.save()
                return mechanism, True

        except Exception as e:
            logger.error(
                f"Error creating mechanism {mechanism_name} for project {project.name}: {str(e)}"
            )
            return None, False

    def process_row(self, row: Dict[str, Any], project: Project) -> Dict[str, Any]:
        """Process and clean a CSV row."""
        mechanism_name = row.get('primary__environmental__mechanism')
        mechanism, created = self.get_or_create_mechanism(mechanism_name, project)

        if created:
            logger.info(f"Created new mechanism: {mechanism_name}")

        # Normalize status
        status = row.get('status', '').lower()
        if status not in ('not started', 'in progress', 'completed'):
            status = 'not started'

        # Process dates safely
        action_due_date = None
        if row.get('action__due_date'):
            try:
                action_due_date = parse_date(row['action__due_date'])
            except Exception:
                logger.warning(f"Invalid date format for action_due_date: {row['action__due_date']}")

        close_out_date = None
        if row.get('close__out__date'):
            try:
                close_out_date = parse_date(row['close__out__date'])
            except Exception:
                logger.warning(f"Invalid date format for close_out_date: {row['close__out__date']}")

        recurring_date = None
        if row.get('recurring__forcasted__date'):
            try:
                recurring_date = parse_date(row['recurring__forcasted__date'])
            except Exception:
                logger.warning(f"Invalid date format for recurring_date: {row['recurring__forcasted__date']}")

        # Make sure we have a valid obligation number
        obligation_number = row.get('obligation__number')
        if not obligation_number:
            logger.error("Missing obligation number in row, skipping")
            return {}

        return {
            'obligation_number': obligation_number,
            'project': project,
            'primary_environmental_mechanism': mechanism,
            'procedure': row.get('procedure') or '',
            'environmental_aspect': row.get('environmental__aspect') or '',
            'obligation': row.get('obligation') or '',
            'accountability': row.get('accountability') or '',
            'responsibility': row.get('responsibility') or '',
            'project_phase': row.get('project_phase') or '',
            'action_due_date': action_due_date,
            'close_out_date': close_out_date,
            'status': status,
            'supporting_information': row.get('supporting__information') or '',
            'general_comments': row.get('general__comments') or '',
            'compliance_comments': row.get('compliance__comments') or '',
            'non_conformance_comments': row.get('non_conformance__comments') or '',
            'evidence': row.get('evidence') or '',
            'person_email': row.get('person_email') or '',
            'recurring_obligation': self.clean_boolean(row.get('recurring__obligation')),
            'recurring_frequency': row.get('recurring__frequency') or '',
            'recurring_status': row.get('recurring__status') or '',
            'recurring_forcasted_date': recurring_date,
            'inspection': self.clean_boolean(row.get('inspection')),
            'inspection_frequency': row.get('inspection__frequency') or '',
            'site_or_desktop': row.get('site_or__desktop') or '',
            'new_control_action_required': self.clean_boolean(row.get('new__control__action_required', 'False')),
            'obligation_type': row.get('obligation_type') or '',
            'gap_analysis': row.get('gap__analysis') or '',
            'notes_for_gap_analysis': row.get('notes_for__gap__analysis') or '',
            'covered_in_which_inspection_checklist': row.get('covered_in_which_inspection_checklist') or ''
        }

    def handle(self, *args: Any, **options: Any) -> None:
        """
        Main handler for importing obligations from a CSV file.

        This command processes a CSV file containing obligations data and imports it into
        the database. It supports dry runs and can bypass mechanism count updates to avoid
        signal-related issues.
        """
        csv_file = options['csv_file']
        dry_run = options['dry_run']
        skip_counts_update = options['skip_counts_update']

        # Temporarily disconnect signals if requested
        if skip_counts_update:
            from obligations.models import update_mechanism_counts_on_save
            post_save.disconnect(update_mechanism_counts_on_save, sender=Obligation)
            self.stdout.write("Disconnected post_save signal to skip mechanism counts update")

        logger.info(f"Starting import from {csv_file}")
        self.stdout.write(f"Importing obligations from {csv_file}")

        row_count = 0
        created_count = 0
        updated_count = 0
        error_count = 0

        try:
            # Open and read the CSV file
            with open(csv_file, 'r', encoding='utf-8-sig') as file:
                reader = csv.DictReader(file)
                rows = list(reader)

            total_rows = len(rows)
            self.stdout.write(f"Found {total_rows} rows to process")

            with transaction.atomic():
                # Process each row in the CSV
                for i, row in enumerate(rows, 1):
                    if i % 5 == 0 or i == total_rows:
                        self.stdout.write(f"Processing row {i}/{total_rows}...")

                    row_count += 1

                    try:
                        # Get or create project
                        project_name = row.get('project__name')
                        if not project_name:
                            logger.warning(f"Missing project name in row {i}, skipping")
                            error_count += 1
                            continue

                        project, project_created = Project.objects.get_or_create(
                            name=project_name,
                            defaults={'description': f'Imported project {project_name}'}
                        )

                        if project_created:
                            logger.info(f"Created new project: {project_name}")

                        # Process obligation data
                        obligation_data = self.process_row(row, project)
                        if not obligation_data:
                            logger.warning(f"Could not process row {i}, skipping")
                            error_count += 1
                            continue

                        if not dry_run:
                            # Create or update obligation
                            obligation_number = obligation_data.pop('obligation_number')
                            try:
                                obligation, created = Obligation.objects.update_or_create(
                                    obligation_number=obligation_number,
                                    defaults=obligation_data
                                )

                                if created:
                                    created_count += 1
                                else:
                                    updated_count += 1

                                action = "Created" if created else "Updated"
                                logger.info(
                                    f"{action} obligation {obligation.obligation_number} "
                                    f"for project {project_name}"
                                )
                            except Exception as e:
                                logger.error(f"Error saving obligation {obligation_number}: {str(e)}")
                                self.stdout.write(
                                    self.style.ERROR(f"Error saving obligation {obligation_number}: {str(e)}")
                                )
                                error_count += 1
                    except Exception as e:
                        logger.error(f"Error processing row {i}: {str(e)}")
                        self.stdout.write(
                            self.style.ERROR(f"Error processing row {i}: {str(e)}")
                        )
                        error_count += 1

                if dry_run:
                    self.stdout.write(
                        self.style.SUCCESS("Dry run completed successfully")
                    )
                    raise transaction.TransactionManagementError(
                        "Dry run completed"
                    )

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Import completed: {created_count} created, {updated_count} updated, {error_count} errors"
                    )
                )

            # Update mechanism counts if we skipped the signals
            if skip_counts_update:
                self.stdout.write("Manually updating mechanism counts...")
                mechanisms = EnvironmentalMechanism.objects.all()
                for mechanism in mechanisms:
                    try:
                        mechanism.update_obligation_counts()
                    except Exception as e:
                        logger.error(f"Error updating counts for {mechanism.name}: {str(e)}")
                self.stdout.write("Mechanism counts updated")

        except FileNotFoundError:
            logger.error(f"File not found: {csv_file}")
            self.stdout.write(self.style.ERROR(f"File not found: {csv_file}"))
        except transaction.TransactionManagementError as e:
            if str(e) == "Dry run completed":
                pass
            else:
                logger.error(f"Transaction error: {str(e)}")
                self.stdout.write(self.style.ERROR(f"Transaction error: {str(e)}"))
        except Exception as e:
            logger.error(f"Error importing obligations: {str(e)}")
            self.stdout.write(
                self.style.ERROR(f"Error importing obligations: {str(e)}"))
        finally:
            # Reconnect signals if we disconnected them
            if skip_counts_update:
                from obligations.models import update_mechanism_counts_on_save
                post_save.connect(update_mechanism_counts_on_save, sender=Obligation)
                self.stdout.write("Reconnected post_save signal")
            logger.info("Import process completed")
            self.stdout.write("Import process completed")
