---

description: Generate a draft CHANGELOG.md for a new Greenova release by
summarizing and analyzing repository logs, diffs, and pre-merge analysis
reports. mode: agent

tools:

- file_search
- read_file
- insert_edit_into_file
- semantic_thinking
- git
- github
- semantic_search
- get_errors
- git
- Context7

---

# Changelog Generator Prompt Template

You are assisting in generating a draft CHANGELOG.md for a new Greenova
release. Use the provided repository logs, diff summaries, and pre-merge
analysis reports to create a comprehensive, well-structured changelog in GitHub
Flavored Markdown.

## Context Requirements

You will be provided with:

- Commit logs (e.g., `logs/commits_v0.0.5_to_v0.0.6.log`)
- File change stats (e.g., `logs/diffstat_v0.0.5_to_v0.0.6.log`)
- PR merge logs (e.g., `logs/pr_merges_v0.0.5_to_v0.0.6.log`)
- Pre-merge analysis reports (e.g., `logs/pre_merge_analysis.md`)
- Any additional relevant logs or documentation

## Output Structure

Generate a draft changelog with the following sections:

1. **Release Header**
   - Version number and release date
   - Short summary of the release
2. **Added**
   - New features, modules, or significant enhancements
3. **Changed**
   - Major changes, refactors, or improvements
4. **Deprecated**
   - Features or APIs marked for future removal
5. **Removed**
   - Features, files, or dependencies removed
6. **Fixed**
   - Bug fixes and resolved issues
7. **Security**
   - Security improvements or vulnerability fixes

## Instructions

- Use commit and PR logs to identify and group changes under the appropriate
  headings.
- Summarize major features and improvements based on commit messages and
  analysis reports.
- Highlight any breaking changes, migrations, or important configuration
  updates.
- Use bullet points for clarity and group related changes.
- Reference PR numbers and contributors where possible.
- Ensure the changelog is clear, concise, and follows the style of previous
  releases.
- Format the changelog using GitHub Flavored Markdown.

## Example Usage

**Input:**

- `logs/commits_v0.0.5_to_v0.0.6.log`
- `logs/diffstat_v0.0.5_to_v0.0.6.log`
- `logs/pr_merges_v0.0.5_to_v0.0.6.log`
- `logs/pre_merge_analysis.md`

**Output:**

```markdown
## [v0.0.6] - 2025-05-05

### Added

- New company management module with company/user relationships (#102)
- Auditing module for compliance and non-conformance tracking (#145)
- Authentication namespace and improved login redirects (#131)
- Interactive hyperlinks for obligation status counts (#99)
- Enhanced devcontainer setup and documentation

### Changed

- Refactored obligation import process and error handling (#128)
- Improved user profile management and dashboard
- Updated environment configuration and security settings

### Removed

- Legacy Bandit files and obsolete scripts

### Fixed

- Company creation authentication test
- Obligation import bugs and login redirect issues

### Security

- Improved authentication and environment variable management
```

---

_See `docs/resources/git/merge-instructions.txt` for the full workflow and log
generation commands._
