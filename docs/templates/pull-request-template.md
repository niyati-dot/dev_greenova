# Pull Request: Release v0.0.6

## Purpose

Deliver pre-release v0.0.6, integrating multiple feature branches and
infrastructure improvements across the Greenova platform. This release focuses
on company management, authentication enhancements, improved development
workflows, and better data management tooling for environmental compliance
tracking.

## Changes

### Added

- **Company Management Module**: Introduced company management with user
  relationships and mixins for company-scoped views.
- **Auditing Module**: Implemented history tracking for key operations.
- **Authentication Framework**: Configured `LOGIN_URL` to use authentication
  namespace. Enhanced multi-factor authentication support.
- **Obligation Management**: Improved obligation list templates and interactive
  hyperlinks for status counts.
- **Development Environment**: Enhanced virtual environment setup with
  `post_start.sh`. Added detailed `.devcontainer/README.md` and new entrypoint
  script.
- **Documentation**: Added and updated markdown files for configuration, code
  style, and devcontainer setup.

### Changed

- **Frontend Refactor**: Comprehensive overhaul of landing page, static assets,
  and template structure. Migrated SCSS to modular CSS and consolidated style
  variables.
- **Backend Improvements**: Refactored company and authentication models for
  clarity and maintainability. Improved progress reporting and logging in data
  import processes.
- **Build System**: Refactored `post_start.sh` for maintainability. Updated
  static TypeScript build artifacts and settings.
- **Environment Configuration**: Migrated to dotenv-vault for secure
  environment management. Enhanced `.envrc` and `.env.example` for better
  variable management.
- **User Experience**: Enhanced user profile functionality with role
  relationship display. Streamlined migrations and improved dashboard widgets.

### Removed

- **Legacy Bandit Files**: Deleted `.bandit`, `.banditignore`, and `.banditrc`
  security config files.
- **Obsolete Scripts and Static Assets**: Removed outdated test/config files
  and redundant static resources.

### Fixed

- **Authentication**: Resolved company creation authentication test issues.
  Fixed login redirect and obligation import bugs.
- **Formatting and Configuration**: Addressed formatting issues in Copilot
  prompt and profiler conflict resolution. Improved error handling in
  obligation import process.

### Security

- **Environment and Authentication**: Improved environment variable validation
  and management. Enhanced authentication and security settings in systemd and
  Django configs.

## Related Issues

- Fixes #72 - Authentication namespace implementation
- Fixes #87 - Company management module
- Fixes #88 - Obligation import improvements
- Fixes #37 - Auditing module implementation

## Testing Performed

- Comprehensive test suite execution with pytest
- Verified proper authentication flow with login redirects
- Tested company management features with multi-company scenarios
- Validated obligation import process with error handling
- Verified audit record creation and management
- Tested integration between company and obligation models
- Validated development environment configuration
- Unit tests for models, views, and middleware
- Verified CRUD operations and access control
- Tested SCSS compilation and template rendering
- Manual testing of user profile and dashboard features
- Ensured all changes pass pre-commit checks (linting, formatting,
  type-checking, security)

## Screenshots

<!-- Attach before/after screenshots of UI changes if available -->

## Deployment Notes

- Contains database migrations for company model and auditing module
- Requires updated environment variables via `.env.vault`
- Updated dependency requirements in requirements.txt
- Includes infrastructure changes for development workflow
- Requires updating static files and running `collectstatic`
- Ensure `.env.vault` changes are propagated to all environments before
  deployment
- Verify CI workflows function as expected post-merge

## Additional Context

- Refactored project structure for maintainability and scalability
- Improved accessibility and semantic HTML in templates
- Enhanced developer experience with updated scripts and documentation
- Contributors: [agallo](https://github.com/enveng-group),
  [JaredStanbrook](https://github.com/JaredStanbrook),
  [mhahmad0](https://github.com/mhahmad0),
  [Channing88](https://github.com/Channing88),
  [camersonsims](https://github.com/camersonsims),
  [alexcao123456](https://github.com/alexcao123456)
