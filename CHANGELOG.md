# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - Upcoming Release

### Added
- None

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

## [v0.0.3] - Pre-release

### Added
- Implemented light/dark mode theming with CSS variables
- Added dedicated navigation.css for consistent cross-application navigation
- Replaced Django auth with django-allauth for enhanced user management
- Added comprehensive registration, login, and account management flows
- Added user login toggle feature with persistent/session-based authentication options
- Added procedures app with visualization components and chart templates
- Added responsibility module with distribution charts and models
- Added django-debug-toolbar for development troubleshooting
- Added comprehensive git repository management guidelines
- Added new project documentation for UI design, data visualization, and frontend architecture
- Implemented HTMX and Hyperscript integration for progressive enhancement

### Changed
- Refined UI components (forms, buttons, cards, lists) for improved usability
- Enhanced typography system with standardized sizing and spacing
- Optimized chart styling and scaling for better data visualization
- Improved color scheme with accessibility considerations
- Revamped authentication flow with updated templates
- Enhanced dashboard layout with improved information hierarchy
- Refined landing page with better user onboarding elements
- Improved project selector component with dynamic filtering
- Optimized obligation view templates with clearer data presentation
- Enhanced devcontainer configuration for consistent development environment
- Created constraints.txt for precise dependency pinning and compatibility
- Updated package.json with current frontend dependencies
- Refined Makefile targets for streamlined development workflows
- Upgraded .pyrightconfig.json for improved type checking
- Converted documentation files to Markdown format
- Set light-mode as default theme
- Reorganized and optimized CSS structure

### Deprecated
- None

### Removed
- Removed deprecated CSV files (dirty.csv, clean_output_with_nulls.csv)
- Temporarily removed Ubuntu font

### Fixed
- Fixed theme auto-discoloration by enforcing CSS variables with !important
- Fixed issues with duplicate component rendering
- Fixed missing obligation lists and rendering issues
- Fixed project structure and file tracking issues

### Security
- Set minimum password length to 9 characters
- Prepared for future social auth integrations

## [v0.0.2] - Pre-release

### Added
- Enhanced obligations model with improved field definitions and constraints
- Updated import tool for obligations data
- Refined admin interface for better obligations management

### Changed
- Updated Makefile with new development commands
- Improved obligations data handling and validation

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None

## [v0.0.1] - Pre-release

### Added
- Updated devcontainer configuration for improved performance and consistency.
- Added new VS Code extensions and settings for Python, JavaScript, and HTML development.
- Configured .env files for better environment variable management.
- Upgraded Python version to 3.9.
- Updated Django to version 5.1.6.
- Added new dependencies such as matplotlib for data visualization.
- Implemented djlint for linting and formatting Django templates.
- Configured autopep8 for Python code formatting.
- Added ESLint configuration for JavaScript linting.
- Created a Makefile with common commands for development and deployment.
- Added scripts for database migrations, static file collection, and server start.
- Refined project structure and updated .gitignore to exclude unnecessary files.
- Removed deprecated and unused files.
- Updated README.md with new setup instructions.
- Added CHANGELOG, CONTRIBUTING, SECURITY, and SUPPORT documentation.
- Configured GitHub Actions for automated testing and deployment.

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None
