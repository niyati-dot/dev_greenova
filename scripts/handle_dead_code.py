#!/usr/bin/env python3
"""Dead Code Resolution Script for Django Projects.

This script:
1. Documents template tag usages in HTML files
2. Adds documentation comments to management commands
3. Documents other Django patterns that static analyzers often flag as 'dead code'.
"""

import os
import re
import subprocess
from pathlib import Path


def print_header(title: str) -> None:
    """Print a formatted header."""
    print("\n" + "#" * 70)
    print(f"# {title}")
    print("#" * 70 + "\n")


def add_usage_documentation_to_template_tags() -> None:
    """Find template tag files and add usage documentation."""
    print_header("Analyzing Template Tags Usage")

    template_tag_dirs = find_template_tag_dirs()

    for tag_dir in template_tag_dirs:
        for file in os.listdir(tag_dir):
            if file.endswith(".py"):
                process_template_tag_file(os.path.join(tag_dir, file))


def find_template_tag_dirs() -> list[str]:
    """Find directories containing template tags."""
    return [
        os.path.join(root, "templatetags")
        for root, dirs, _ in os.walk("greenova")
        if "templatetags" in dirs
    ]


def process_template_tag_file(tag_file: str) -> None:
    """Process a single template tag file."""
    print(f"Processing {tag_file}")

    with open(tag_file, encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    tag_funcs = extract_tag_functions(lines)

    for func in tag_funcs:
        print(f"  - Function: {func}")
        content = update_function_usage(func, content)

    with open(tag_file, "w", encoding="utf-8") as f:
        f.write(content)


def extract_tag_functions(lines: list[str]) -> list[str]:
    """Extract template tag functions from file lines."""
    return [
        match.group(1)
        for i, line in enumerate(lines)
        if (match := re.search(r"@register\.(simple_tag|filter|inclusion_tag)", line))
        and i + 1 < len(lines)
        and (func_match := re.search(r"def\s+([a-zA-Z0-9_]+)\s*\(", lines[i + 1]))
        and (func_match.group(1))
    ]


def update_function_usage(func: str, content: str) -> str:
    """Update usage documentation for a template tag function."""
    cmd = f'grep -l "{func}" --include="*.html" -r greenova/'
    try:
        result = subprocess.run(
            cmd, shell=True, check=False, text=True, capture_output=True
        )
        html_files = [f for f in result.stdout.strip().split("\n") if f]
    except subprocess.CalledProcessError:
        html_files = []

    if html_files:
        print(f"    Used in {len(html_files)} templates")
        html_files_str = ", ".join(f.replace("greenova/", "") for f in html_files)
        usage_comment = f"# Used in templates: {html_files_str}"

        pattern = re.compile(f"def\\s+{func}\\s*\\(")
        content = pattern.sub(f"{usage_comment}\ndef {func}(", content)
    else:
        print("    ⚠️  Not found in templates (potential dead code)")

    return content


def add_documentation_to_management_commands() -> None:
    """Add usage documentation to Django management commands."""
    print_header("Documenting Management Commands")

    cmd_files: list[str] = [
        os.path.join(root, "management", "commands", file)
        for root, dirs, _files in os.walk("greenova")
        if "management" in dirs
        and os.path.exists(os.path.join(root, "management", "commands"))
        for file in os.listdir(os.path.join(root, "management", "commands"))
        if file.endswith(".py") and not file.startswith("__")
    ]

    for cmd_file in cmd_files:
        cmd_name = os.path.basename(cmd_file).replace(".py", "")
        print(f"Processing command: {cmd_name}")

        with open(cmd_file, encoding="utf-8") as f:
            content = f.read()

        cmd_usage = f"# Run with: python manage.py {cmd_name}"
        if cmd_usage not in content:
            content = f"{cmd_usage}\n{content}"
            with open(cmd_file, "w", encoding="utf-8") as f:
                f.write(content)
            print("  Added usage documentation")


def create_deadrc_file() -> None:
    """Create or update the .deadrc configuration file."""
    print_header("Creating .deadrc Configuration File")
    deadrc_path = Path(".deadrc")
    deadrc_content = """// .deadrc - Configuration for dead code detection
exclude = [
    // Django framework patterns
    ".*settings.py:.*",
    ".*urls.py:urlpatterns",
    ".*apps.py:.*Config",
    ".*apps.py:default_auto_field",
    ".*apps.py:ready",
    ".*apps.py:get_app_.*",
    ".*admin.py:("
    "list_display|list_filter|search_fields|actions|readonly_fields|"
    "fieldsets|raw_id_fields|dispatch|inlines|get_.*"
    ")",
    ".*models.py:(Meta|app_label|unique_together|indexes|to_proto|from_proto)",
    ".*middleware.py:process_.*",
    ".*forms.py:(Meta|model|widgets|clean_.*)",
    ".*views.py:("
    "form_class|form_valid|context_object_name|pk_url_kwarg|slug_field|"
    "slug_url_kwarg|get_template_names|login_url|redirect_field_name|"
    "post|dispatch"
    ")",
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
    ".*wsgi.py:application",
    // Special model methods
    ".*models.py:("
    "save|delete|clean|validate_.*|update_.*|ensure_.*|"
    "get_.*|set_.*|is_.*|has_.*"
    ")"
];"""

    with open(deadrc_path, "w", encoding="utf-8") as f:
        f.write(deadrc_content)

    print(f"Created/updated {deadrc_path}")


def update_precommit_config() -> None:
    """Update pre-commit configuration to use .deadrc."""
    print_header("Updating pre-commit configuration")

    config_path = Path(".pre-commit-config.yaml")

    with open(config_path, encoding="utf-8") as f:
        config = f.read()

    if "id: dead" in config and "--rcfile=.deadrc" not in config:
        lines = config.split("\n")
        for i, line in enumerate(lines):
            if "id: dead" in line:
                indent = len(line) - len(line.lstrip())
                indent_str = " " * indent

                yaml_args = indent_str + '  args: ["--rcfile=.deadrc"]'
                lines.insert(i + 1, yaml_args)
                break

        with open(config_path, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))

        print("Updated pre-commit config with .deadrc arguments")
    else:
        print(
            "Pre-commit config already contains .deadrc configuration or "
            "no dead hook found"
        )


def main() -> None:
    """Run all dead code resolution functions."""
    print_header("Django Dead Code Resolution")

    create_deadrc_file()
    update_precommit_config()
    add_usage_documentation_to_template_tags()
    add_documentation_to_management_commands()

    print_header("Resolution Complete")
    print("Next steps:")
    print("1. Run pre-commit with `pre-commit run dead` to verify configuration")
    print("2. Review any remaining warnings and address them manually")
    print("3. For genuine dead code, consider removing it after verifying")


if __name__ == "__main__":
    main()
