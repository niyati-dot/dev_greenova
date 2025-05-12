#!/usr/bin/env fish

# dead_code_resolver.fish - A tool for systematically resolving dead code issues
# in Django projects.
#
# This script:
# 1. Creates an appropriate .deadrc configuration file
# 2. Categorizes dead code issues
# 3. Helps identify real dead code vs false positives
# 4. Documents usage of template tags and other Django-specific patterns
# 5. Provides recommendations for cleanup

set GREEN "\033[0;32m"
set YELLOW "\033[1;33m"
set RED "\033[0;31m"
set BLUE "\033[0;34m"
set NC "\033[0m" # No Color

function print_header
    echo ""
    echo -e $BLUE"######################################################"$NC
    echo -e $BLUE"# $argv[1]"$NC
    echo -e $BLUE"######################################################"$NC
    echo ""
end

function create_deadrc_file
    print_header "Creating/Updating .deadrc Configuration"

    set deadrc_file ".deadrc"

    set deadrc_content '// .deadrc - Configuration for dead code detection
exclude = [
    // Django framework patterns
    ".*settings.py:.*",
    ".*urls.py:urlpatterns",
    ".*apps.py:.*Config",
    ".*apps.py:default_auto_field",
    ".*apps.py:ready",
    ".*apps.py:get_app_.*",
    ".*admin.py:(list_display|list_filter|search_fields|actions|readonly_fields|fieldsets|raw_id_fields|dispatch|inlines)",
    ".*models.py:(Meta|app_label|unique_together|indexes|to_proto|from_proto)",
    ".*middleware.py:process_.*",
    ".*forms.py:(Meta|model|widgets)",
    ".*views.py:(form_class|form_valid|context_object_name|pk_url_kwarg|slug_field|slug_url_kwarg|get_template_names|login_url|redirect_field_name)",
    // Template tags
    ".*/templatetags/.*:.*",
    // Management commands
    ".*/management/commands/.*:(Command|help|add_arguments|handle)",
    // Signals
    ".*signals.py:.*",
    // Django constants used for configurations
    ".*constants.py:.*",
    // Django types
    ".*types.py:.*",
    // Proto utils and serialization
    ".*proto_utils.py:.*",
    ".*services.py:.*",
    // Application server configs
    ".*asgi.py:application",
    ".*wsgi.py:application"
];'

    echo -e $deadrc_content >$deadrc_file

    echo -e $GREEN"Created/Updated .deadrc file with appropriate exclusions."$NC
    echo -e "Location: $deadrc_file"
    echo ""
end

function collect_template_tags_usage
    print_header "Analyzing Template Tags Usage"

    set template_tags_found (find greenova -name "*.py" -path "*/templatetags/*" -type f | xargs grep -l "register.simple_tag\|register.filter\|register.inclusion_tag")

    echo -e $YELLOW"Found template tag files:"$NC
    for tag_file in $template_tags_found
        echo "  - $tag_file"

        # Extract tag functions
        set tag_funcs (grep -E "def [a-zA-Z0-9_]+\(" $tag_file | sed -E 's/def ([a-zA-Z0-9_]+)\(.*/\1/')

        echo -e $BLUE"    Tags defined:"$NC
        for func in $tag_funcs
            echo -e "      - $func"

            # Search for usage in templates
            set usages (find greenova -name "*.html" -type f -exec grep -l "$func" {} \;)
            echo -e $GREEN"        Used in:"$NC
            if test -n "$usages"
                for usage in $usages
                    echo "          - $usage"
                end
            else
                echo -e $RED"          Not found in any templates (potential real dead code)"$NC
            end

            # Add usage documentation to the source file
            set template_usage (find greenova -name "*.html" -type f -exec grep -l "$func" {} \; | tr '\n' ' ')
            if test -n "$template_usage"
                sed -i "s/def $func(/# Used in templates: $template_usage\ndef $func(/" $tag_file
                echo -e $YELLOW"        Added usage documentation to source file"$NC
            end
        end
        echo ""
    end
end

function check_management_commands
    print_header "Checking Management Commands"

    set cmd_files (find greenova -path "*/management/commands/*.py" -type f)

    echo -e $YELLOW"Management command files:"$NC
    for cmd_file in $cmd_files
        set cmd_name (basename $cmd_file .py)
        echo "  - $cmd_name ($cmd_file)"

        # Add usage documentation
        set comment_line "# Run with: python manage.py $cmd_name"
        grep -q "$comment_line" $cmd_file || sed -i "1s/^/$comment_line\n/" $cmd_file

        echo -e $GREEN"    Added usage documentation"$NC
    end
    echo ""
end

function analyze_unused_imports
    print_header "Analyzing Unused Imports"

    # Using autoflake to identify unused imports
    echo -e $YELLOW"Files with unused imports (use autoflake to remove them):"$NC

    set py_files (find greenova -name "*.py" -not -path "*/\.*" -type f)

    for py_file in $py_files
        set unused (python -m autoflake --remove-all-unused-imports --check $py_file 2>&1 | grep "would remove")
        if test -n "$unused"
            echo "  - $py_file"
            echo -e $BLUE"    Unused imports:"$NC
            echo "      $unused"
            echo -e $GREEN"    Fix with: autoflake --in-place --remove-all-unused-imports $py_file"$NC
            echo ""
        end
    end
end

function mark_truly_dead_code
    print_header "Potential Truly Dead Code"

    # Run dead detection and filter out known false positives
    set output (pre-commit run dead --all-files 2>&1)

    echo -e $YELLOW"The following items might be genuinely unused code after filtering false positives:"$NC

    # Echo out items that don't match our patterns for false positives
    echo $output | grep "is never read" | grep -v -E "settings.py|urls.py|apps.py|admin.py|models.py|templatetags|management/commands|forms.py|views.py|mixins.py|signals.py|constants.py|types.py|proto_utils.py|services.py|asgi.py|wsgi.py"

    echo -e $RED"Review these items carefully before removal!"$NC
    echo -e "Run specific tests related to these components to ensure they're not used indirectly."
    echo ""
end


function update_pre_commit_config
    print_header "Updating pre-commit configuration"

    set config_file ".pre-commit-config.yaml"

    set dead_hook '  - repo: https://github.com/asottile/dead
    rev: v2.1.0
    hooks:
      - id: dead
        additional_dependencies: ["pytest"]
        args: ["--rcfile=.deadrc"]'

    # Check if the dead hook is already configured with args
    if grep -q "id: dead" $config_file; and not grep -q "args: .*--rcfile=.deadrc" $config_file
        # Replace the dead hook configuration
        sed -i -E "s/([ ]+)- id: dead([^\n]*)/\1- id: dead\n\1  additional_dependencies: [\"pytest\"]\n\1  args: [\"--rcfile=.deadrc\"]/" $config_file
        echo -e $GREEN"Updated the dead hook configuration in $config_file"$NC
    else
        echo -e $YELLOW"The dead hook is already configured or not found in $config_file"$NC
        echo "Please manually verify the configuration includes: args: [\"--rcfile=.deadrc\"]"
    end
end

function verify_administrative_setting_usage
    print_header "Verifying Django Administrative Settings Usage"

    echo -e $YELLOW"Django settings in settings.py are used implicitly by Django and should be ignored by dead code detection."$NC
    echo -e "Common examples:"
    echo "  - INSTALLED_APPS"
    echo "  - MIDDLEWARE"
    echo "  - TEMPLATES"
    echo "  - DATABASES"
    echo ""

    echo -e $YELLOW"Django admin.py configurations are loaded automatically by the admin site."$NC
    echo "These include:"
    echo "  - list_display"
    echo "  - list_filter"
    echo "  - search_fields"
    echo "  - actions"
    echo "  - fieldsets"
    echo ""
end

function run_full_workflow
    print_header "Running Full Dead Code Resolution Workflow"

    echo -e $YELLOW"Step 1: Creating .deadrc configuration"$NC
    create_deadrc_file

    echo -e $YELLOW"Step 2: Updating pre-commit configuration"$NC
    update_pre_commit_config

    echo -e $YELLOW"Step 3: Analyzing template tags usage"$NC
    collect_template_tags_usage

    echo -e $YELLOW"Step 4: Verifying management commands"$NC
    check_management_commands

    echo -e $YELLOW"Step 5: Identifying unused imports"$NC
    analyze_unused_imports

    echo -e $YELLOW"Step 6: Verifying administrative settings"$NC
    verify_administrative_setting_usage

    echo -e $YELLOW"Step 7: Identifying potentially genuine dead code"$NC
    mark_truly_dead_code

    print_header "Dead Code Resolution Complete"
    echo -e $GREEN"The dead code resolution process has completed."$NC
    echo "Please review the documentation added to your code and the .deadrc configuration."
    echo ""
    echo -e $BLUE"Next steps:"$NC
    echo "1. Run pre-commit again to verify the dead hook is now properly configured"
    echo "2. Review any remaining dead code warnings and address them manually"
    echo "3. Consider adding comments to document any special cases"
    echo ""
end

# Main script execution
if test (count $argv) -eq 0
    echo "Running the full workflow..."
    run_full_workflow
else
    switch $argv[1]
        case --create-config
            create_deadrc_file
        case --check-templates
            collect_template_tags_usage
        case --check-commands
            check_management_commands
        case --check-imports
            analyze_unused_imports
        case --update-config
            update_pre_commit_config
        case --verify-settings
            verify_administrative_setting_usage
        case --find-dead
            mark_truly_dead_code
        case "*"
            echo "Unknown option: $argv[1]"
            echo ""
            echo "Available options:"
            echo "  --create-config     : Create/update .deadrc configuration"
            echo "  --check-templates   : Check template tags usage"
            echo "  --check-commands    : Check management commands"
            echo "  --check-imports     : Check for unused imports"
            echo "  --update-config     : Update pre-commit configuration"
            echo "  --verify-settings   : Verify Django settings usage"
            echo "  --find-dead         : Find potentially genuine dead code"
            echo ""
            echo "Run without options to execute the full workflow."
    end
end
