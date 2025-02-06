#!/usr/bin/env bash

# Stop on errors, undefined variables, and pipe failures
set -euo pipefail

# 1. Data Definition and Validation - Use local variables instead of readonly
PYTHON="python"
PROJECT_ROOT="${PWD:-/workspaces/dev_greenova}"
MANAGE="${PROJECT_ROOT}/greenova/manage.py"
LOG_DIR="${PROJECT_ROOT}/logs"
LOG_FILE="${LOG_DIR}/rebuild.log"
MAX_RETRIES=3
RETRY_DELAY=5

# Load Environment
load_environment() {
    if [[ -f "${PROJECT_ROOT}/.env" ]]; then
        # Source env file without making variables readonly
        set -a
        source "${PROJECT_ROOT}/.env"
        set +a
    else
        log "Error: .env file not found"
        return 1
    fi
}

verify_project_layout() {
    local required_dirs=(
        "${PROJECT_ROOT}/logs"
        "${PROJECT_ROOT}/greenova/static"
        "${PROJECT_ROOT}/greenova/media"
        "${PROJECT_ROOT}/greenova/templates"
    )

    for dir in "${required_dirs[@]}"; do
        mkdir -p "$dir"
    done
}

# 2. Data Processing and Transformation
setup_django_environment() {
    if [[ -n "${VIRTUAL_ENV:-}" ]]; then
        source "${VIRTUAL_ENV}/bin/activate"
    fi
}

validate_environment() {
    local required_vars=("DJANGO_SETTINGS_MODULE" "DJANGO_SECRET_KEY" "PYTHONPATH")
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            log "Error: $var is not set"
            return 1
        fi
    done
    return 0
}

# 3. Data Flow and Pipeline Management
get_django_apps() {
    $PYTHON -c "
import django
django.setup()
from django.conf import settings
print(' '.join(settings.INSTALLED_APPS))
"
}

# 4. Exception Handling and Error Management
log() {
    local timestamp
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    echo "[${timestamp}] $1" | tee -a "${LOG_FILE}"
}

retry() {
    local cmd="$1"
    local description="$2"
    local n=1
    local max=${3:-$MAX_RETRIES}

    until [[ $n -gt $max ]]; do
        log "Attempt $n/$max: $description"
        if $cmd; then
            return 0
        fi
        n=$((n + 1))
        sleep $RETRY_DELAY
    done
    return 1
}

# 5. Data Storage and Retrieval
setup_database() {
    log "Setting up database..."
    retry "$PYTHON $MANAGE migrate" "Running migrations"
}

# 6. Automation Workflow Management
manage_migrations() {
    log "Managing migrations..."
    retry "$PYTHON $MANAGE makemigrations" "Making migrations"
    retry "$PYTHON $MANAGE migrate" "Applying migrations"
}

# 7. Logging, Monitoring, and Reporting
setup_logging() {
    mkdir -p "${LOG_DIR}"
    touch "${LOG_FILE}"
    chmod 644 "${LOG_FILE}"
}

# 8. Security and Access Control
security_checks() {
    log "Running security checks..."
    retry "$PYTHON $MANAGE check --deploy" "Security check"
}

handle_static() {
    log "Managing static files..."

    # Create static root directory if it doesn't exist
    local static_root="${PROJECT_ROOT}/greenova/staticfiles"
    mkdir -p "${static_root}"

    # Clean existing static files
    log "Cleaning existing static files..."
    rm -rf "${static_root:?}"/*

    # Collect static files
    log "Collecting static files..."
    retry "$PYTHON $MANAGE collectstatic --noinput" "Collecting static files"

    # Skip security checks in development
    if [ "$ENVIRONMENT" != "production" ]; then
        return 0
    fi

    # Verify static files in production
    log "Verifying static files..."
    retry "$PYTHON $MANAGE check --deploy" "Verifying static files"

    # Set permissions
    chmod -R 755 "${static_root}"
}

# 9. Testing and Verification
run_tests() {
    log "Running tests..."
    # Add verbosity and explicit test directory
    retry "$PYTHON $MANAGE test tests" "Running tests"
}

# 10. System Initialization and Shutdown
initialize_system() {
    log "Initializing system..."
    setup_logging
    load_environment
    verify_project_layout
    setup_django_environment
}

cleanup_system() {
    log "Cleaning up..."
    find . -type d -name "__pycache__" -exec rm -r {} + 2>/dev/null || true
    find . -type f -name "*.pyc" -delete
}

# 11. Main Execution Flow
main() {
    log "=== Build started at $(date -u) ==="

    initialize_system || exit 1

    if ! validate_environment; then
        log "Environment validation failed"
        exit 1
    fi

    security_checks || true  # Don't fail on security warnings in dev
    manage_migrations
    handle_static  # Moved before tests to ensure static files are available
    run_tests
    cleanup_system

    log "=== Build completed at $(date -u) ==="
}

# Script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
