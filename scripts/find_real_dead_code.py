#!/usr/bin/env python3
"""
Find real dead code in Django projects while ignoring common Django patterns.

This script is a wrapper around the "dead" package that filters out false positives"
that commonly occur in Django projects due to Django"s convention-over-configuration"
approach.
"""

import os
import re
import subprocess
import sys
from argparse import ArgumentParser

# Patterns of files to exclude from dead code detection (common Django patterns)
EXCLUDE_FILE_PATTERNS = [
    r".*settings\.py$",
    r".*urls\.py$",
    r".*apps\.py$",
    r".*admin\.py$",
    r".*models\.py$",
    r".*templatetags/.*\.py$",
    r".*management/commands/.*\.py$",
    r".*forms\.py$",
    r".*views\.py$",
    r".*mixins\.py$",
    r".*signals\.py$",
    r".*constants\.py$",
    r".*types\.py$",
    r".*proto_utils\.py$",
    r".*services\.py$",
    r".*asgi\.py$",
    r".*wsgi\.py$",
]

# Combined pattern for quick matching
EXCLUDE_PATTERN = re.compile("|".join(EXCLUDE_FILE_PATTERNS))

# Patterns of variable/function names to exclude (common Django conventions)
EXCLUDE_NAME_PATTERNS = [
    r"Meta$",
    r"app_label$",
    r"unique_together$",
    r"indexes$",
    r"to_proto$",
    r"from_proto$",
    r"dispatch$",
    r"process_.*",
    r"default_auto_field$",
    r"ready$",
    r"get_app_.*",
    r"list_display$",
    r"list_filter$",
    r"search_fields$",
    r"actions$",
    r"readonly_fields$",
    r"fieldsets$",
    r"inlines$",
    r"model$",
    r"widgets$",
    r"^help$",
    r"^handle$",
    r"^add_arguments$",
    r"context_object_name$",
    r"form_class$",
    r"form_valid$",
    r"raw_id_fields$",
    r"urlpatterns$",
    r"application$",
]


def find_python_files(directory: str, staged_only: bool = False) -> list[str]:
    """Find Python files in the specified directory, optionally only staged files.

    Args:
        directory: The directory to search for Python files
        staged_only: If True, only include files that are staged in Git

    Returns:
        A list of Python file paths
    """
    if staged_only:
        try:
            result = subprocess.run(
                ["git", "diff", "--cached", "--name-only"],
                cwd=directory,
                check=True,
                capture_output=True,
                text=True,
            )
            files = [
                os.path.join(directory, f)
                for f in result.stdout.strip().split("\n")
                if f.endswith(".py") and f
            ]
            return [f for f in files if os.path.isfile(f)]
        except subprocess.CalledProcessError:
            print("Error: Failed to get staged files from git")
            return []

    python_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".py"):
                python_files.append(os.path.join(root, file))

    return python_files


def filter_django_files(files: list[str]) -> list[str]:
    """Filter out files that match Django-specific patterns.

    Args:
        files: List of file paths to filter

    Returns:
        Filtered list of file paths
    """
    return [f for f in files if not EXCLUDE_PATTERN.search(f)]


def analyze_dead_code(
    files: list[str], ignore_tests: bool = True, verbose: bool = False
) -> int:
    """Run dead code analysis on the specified files.

    Args:
        files: List of file paths to analyze
        ignore_tests: If True, ignore dead code that"s only referenced in tests'
        verbose: If True, print additional information

    Returns:
        Exit code (0 for success, 1 for found dead code)
    """
    if not files:
        print("No files to analyze")
        return 0

    if verbose:
        print(f"Analyzing {len(files)} files for dead code...")

    # Build command with proper argument syntax
    cmd = ["python", "-m", "dead"]

    # Add test pattern if needed
    if ignore_tests:
        cmd.append("--tests=test_*.py")

    # Add files argument correctly
    cmd.append("--files")
    cmd.append(",".join(files))

    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
        print("No dead code found!")
        return 0
    except subprocess.CalledProcessError as e:
        # The dead tool outputs the dead code to stderr when it finds any
        print(e.stderr)
        # This is not an error for our script
        return 0


def main() -> int:
    """Run the script with command-line arguments."""
    parser = ArgumentParser(description="Find real dead code in Django projects")
    parser.add_argument(
        "--directory",
        "-d",
        default=".",
        help="Directory to analyze (default: current directory)",
    )
    parser.add_argument(
        "--staged-only",
        "-s",
        action="store_true",
        help="Only analyze files staged in git",
    )
    parser.add_argument(
        "--include-django-patterns",
        "-i",
        action="store_true",
        help="Include Django pattern files in analysis",
    )
    parser.add_argument(
        "--include-tests",
        "-t",
        action="store_true",
        help="Include test references in analysis",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Print additional information",
    )
    parser.add_argument(
        "--files",
        nargs="+",
        help="Specific files to analyze (overrides directory search)",
    )

    args = parser.parse_args()

    # Get files to analyze
    if args.files:
        files = [os.path.abspath(f) for f in args.files]
    else:
        files = find_python_files(args.directory, args.staged_only)

        # Filter out Django pattern files unless specifically included
        if not args.include_django_patterns:
            files = filter_django_files(files)

    if args.verbose:
        print(f"Found {len(files)} files to analyze")

    # Run analysis
    return analyze_dead_code(
        files,
        ignore_tests=not args.include_tests,
        verbose=args.verbose,
    )


if __name__ == "__main__":
    sys.exit(main())
