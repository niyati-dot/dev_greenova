---
description:
  Prompt for GPT-4o to generate and refactor dashboard layout, CSS, and
  templates for Greenova, ensuring color scheme, accessibility, and
  performance.
mode: agent

tools:
  - filesystem
  - json
  - sequential-thinking
  - context7
---

<!-- filepath: /workspaces/greenova/.github/prompts/o4-mini.prompt.md -->

# Prompt for GPT-4o

**Goal:**

- The colour scheme must adhere strictly to the project's defined palette:

**Primary Colours**:

- `#7FB04F` (Green)
- `#EC7A32` (Orange)
- `#30AEE4` (Blue)

**Secondary Colours**:

- `#58595B` (Dark Gray)
- `#526827` (Olive Green)
- `#CC6114` (Rust Orange)
- `#146890` (Teal Blue)
- The design scope is to create a clean, modern, and user-friendly interface
  that is responsive and accessible across all devices. The design should
  prioritize usability and clarity, ensuring that users can easily navigate the
  application and access its features. The colour scheme should be applied
  consistently throughout the application, with appropriate contrast ratios for
  readability and accessibility.
- Use the Microsoft Vision Extension for Copilot to assist reading
  `untitled.png` in generating the layout and styling for the main dashboard
  page/view once the user is logged and authenticated. Ensure that the layout
  is responsive and follows best practices for accessibility. The dashboard
  should include a navigation bar, a sidebar for filters, and a main content
  area for displaying data visualizations and charts. Use the provided colour
  scheme to style the components, ensuring that the design is cohesive and
  visually appealing. A nav bar at the top with settings logout help profile
  icons in the top right corner. The sidebar should include collapsible
  sections for different categories of data, with icons to represent each
  section. The main content area should be divided into sections for displaying
  charts, tables, and other data visualizations. Use grid or flexbox layout
  techniques to ensure that the design is responsive and adapts to different
  screen sizes. Ensure that all components are accessible and follow best
  practices for usability.
- Use the filesystem mcp server to read the files listed in the source section
- Use the the json mcp server to read all the `*.json` files in the source
  section
- Use the sequential thinking MCP server to analyze `postcss.config.js`,
  `stylelint.config.js`, and the
  `greenova/theme/static_src/tailwind.config.js`, as well as `prettierrc`.
- Use the context7 mcp server to look up documentation for project-specific
  configuration files and standards
- Use the filesystem mcp server to read the existing stylesheets in
  `greenova/static/css/dist/*` and determine those that have no css code and
  only contain comments.
- Use the sequential thinking mcp server to analyse the existing stylesheets in
  `greenova/static/css/dist/*` that have no comments and compare with those
  with css code styling in them and decide how to refactor the empty
  stylesheets and integrate them into the entire styling solution.
- Use the filesystem mcp server to read the
  `greenova/static/css/dist/vendors/pico.classless.css`,
  `greenova/static/css/dist/critical-secondary-styles.css` and
  `greenova/static/css/dist/secondary-styles.css` files.
- Use the sequential thinking mcp server to analyze the what code it needs to
  generate in the empty css files that will compliment the existing stylesheets
  without conflict.
- Use the filesytem mcp server to write the css in the empty stylesheets.
- Use the filesystem MCP server to iterate through the Django app folders
  located in `greenova/company/`, `greenova/dashboard/`, `greenova/feedback/`,
  `greenova/landing/`, `greenova/mechanisms/`, `greenova/obligations/`,
  `greenova/procedures/`, and `greenova/users/` to read template (`*.html`) and
  view files (`*.py`).
- Use the sequential thinking mcp server to decide on what styling it needs to
  apply to `greenova/static/css/dist/pages/mechanisms.css` and
  `greenova/static/css/dist/pages/procedures.css` files that will generate a
  box grid layout for the pie charts.
- Use the filesystem mcp server to generate css in
  `greenova/static/css/dist/pages/mechanisms.css` and
  `greenova/static/css/dist/pages/procedures.css` files that will generate a
  box grid layout for the pie charts.
- Use the sequential thinking mcp server to systematically iterate through each
  app's contents `greenova/company/`, `greenova/dashboard/`,
  `greenova/feedback/`, `greenova/landing/`, `greenova/mechanisms/`,
  `greenova/obligations/`, `greenova/procedures/`, and `greenova/users/` to
  read template (`*.html`) and view files (`*.py`). and analyze the logic and
  structure of the templates and views.
- Use the sequential thinking mcp server to decide on what styling it needs to
  apply specific to all other remaining css pages in the
  `greenova/static/css/dist/pages/` folder.
- Use the filesystem mcp server to write the css in the empty
  `greenova/static/css/dist/pages/` stylesheets.
- Use the filesystem mcp server to check for any other empty stylesheets in the
  `greenova/static/css/dist/` folder.
- Use the sequential thinking mcp server to decide on what styling it needs to
  apply to remaining empty stylesheets in the `greenova/static/css/dist/`
  folder.
- Use the filesystem mcp server to check for any duplications and conflicts in
  the stylesheets in the `greenova/static/css/dist/` folder.
- Use the sequential thinking mcp server to decide on what changes it needs to
  make to avoid duplication and conflict.
- Use the filesystem mcp server to write the css with any fixes that will
  resolve styling conflicts and duplication.
- Use the filesystem mcp server to read the
  `greenova/static/css/dist/critical-styles.css` and
  `greenova/static/css/dist/styles.css` files.
- Use the sequential thinking mcp server to determine what stylesheets in
  ``greenova/static/css/dist/` are critical to go in
  `greenova/static/css/dist/critical-styles.css` and non-critical to go into
  `greenova/static/css/dist/styles.css` files.
- Use the filesystem mcp to write the css in the
  `greenova/static/css/dist/critical-styles.css` and
  `greenova/static/css/dist/styles.css` files.
- Use the sequential-thinking mcp server to analyse and ensure no conflicts
  with custom css styling in `greenova/static/css/dist/critical-styles.css` and
  `greenova/static/css/dist/styles.css`, compared with the primary css
  framework `greenova/static/css/dist/vendors/pico.classless.css` and with the
  secondary framework created by postcss in the files
  `greenova/static/css/dist/critical-secondary-styles.css` and
  `greenova/static/css/dist/secondary-styles.css` and can refer back to the
  context section.
- Use the filesystem mcp server to correct and write update any css to ensure
  no conflicts with pico classless css, postcss and custom css.
- Use the filesystem mcp server to update `greenova/templates/base.html` to
  include the stylesheets `greenova/static/css/dist/critical-styles.css`,
  `greenova/static/css/dist/styles.css`,
  `greenova/static/css/dist/critical-secondary-styles.css`, and
  `greenova/static/css/dist/secondary-styles.css` with appropriate pre-loading,
  pre-fetching, pre-connecting, and loading.
- Use the filesystem mcp server to ensure that all new stylesheets are properly
  linked in the HTML head section for optimal performance.

**Context**:

- The project is a web application that uses various technologies for styling
  and interactivity.
- Below is the sequence order of technologies to be used in the project from
  highest to lowest priority:

  1. Plain text / HTML (foundational)
  2. Protobuf3 (data formats)
  3. Classless-CSS (minimal styling with Classless-PicoCSS)
  4. hyperscript (simple interactions)
  5. htmx (more complex AJAX)
  6. SASS/PostCSS (advanced styling with Tailwind when needed)
  7. TypeScript (only when absolutely necessary)
  8. AssemblyScript (for WASM, last resort only)

**Objective:**

1. Ensure the design adheres to the defined colour palette and maintains
   consistency across the application.
2. Create a responsive and accessible dashboard layout with a navigation bar,
   collapsible sidebar, and main content area for data visualizations.
3. Refactor and consolidate CSS files to eliminate redundancy and ensure
   compatibility with the primary and secondary CSS frameworks.
4. Generate and apply CSS for empty stylesheets, ensuring they complement
   existing styles without conflicts.
5. Update and optimize the `base.html` template to include critical and
   non-critical stylesheets with proper loading strategies.
6. Analyze and refactor templates and views across all Django apps to ensure
   styling consistency and usability.
7. Validate and resolve conflicts between custom CSS, PicoCSS, and
   PostCSS-generated styles.
8. Organize project resources and enforce coding standards using automated
   tools to improve maintainability and readability.
9. Test and iterate on all changes to ensure compliance with project
   requirements and pre-commit checks.

**Source:**

- `greenova/static/css/dist/abstracts/functions.css`
- `greenova/static/css/dist/abstracts/mixins.css`
- `greenova/static/css/dist/abstracts/variables.css`
- `greenova/static/css/dist/base/accessibility.css`
- `greenova/static/css/dist/base/modernizer.css`
- `greenova/static/css/dist/base/normalizer.css`
- `greenova/static/css/dist/base/reset.css`
- `greenova/static/css/dist/base/typography.css`
- `greenova/static/css/dist/base/variables.css`
- `greenova/static/css/dist/components/breadcrumbs.css`
- `greenova/static/css/dist/components/button.css`
- `greenova/static/css/dist/components/card.css`
- `greenova/static/css/dist/components/charts.css`
- `greenova/static/css/dist/components/chat.css`
- `greenova/static/css/dist/components/company.css`
- `greenova/static/css/dist/components/dropdown.css`
- `greenova/static/css/dist/components/filter.css`
- `greenova/static/css/dist/components/form.css`
- `greenova/static/css/dist/components/list.css`
- `greenova/static/css/dist/components/loader.css`
- `greenova/static/css/dist/components/modal.css`
- `greenova/static/css/dist/components/navigation.css`
- `greenova/static/css/dist/components/notification.css`
- `greenova/static/css/dist/components/obligations.css`
- `greenova/static/css/dist/components/pagination.css`
- `greenova/static/css/dist/components/table.css`
- `greenova/static/css/dist/components/user-profile.css`
- `greenova/static/css/dist/layouts/desktop.css`
- `greenova/static/css/dist/layouts/footer.css`
- `greenova/static/css/dist/layouts/grid.css`
- `greenova/static/css/dist/layouts/header.css`
- `greenova/static/css/dist/layouts/main.css`
- `greenova/static/css/dist/layouts/web.css`
- `greenova/static/css/dist/pages/company.css`
- `greenova/static/css/dist/pages/dashboard.css`
- `greenova/static/css/dist/pages/error.css`
- `greenova/static/css/dist/pages/feedback.css`
- `greenova/static/css/dist/pages/landing.css`
- `greenova/static/css/dist/pages/login.css`
- `greenova/static/css/dist/pages/mechanism.css`
- `greenova/static/css/dist/pages/obligation.css`
- `greenova/static/css/dist/pages/procedure.css`
- `greenova/static/css/dist/pages/registration.css`
- `greenova/static/css/dist/pages/user-profile.css`
- `greenova/static/css/dist/themes/dark.css`
- `greenova/static/css/dist/themes/light.css`
- `greenova/static/css/dist/utils/colours.css`
- `greenova/static/css/dist/utils/compat.css`
- `greenova/static/css/dist/utils/display.css`
- `greenova/static/css/dist/utils/spacing.css`
- `greenova/static/css/dist/vendors/pico.classless.css`
- `greenova/static/css/dist/critical-styles.css`
- `greenova/static/css/dist/critical-secondary-styles.css`
- `greenova/static/css/dist/debug-styles.css`
- `greenova/static/css/dist/non-critical-styles.css`
- `greenova/static/css/dist/secondary-styles.css`
- `greenova/static/css/dist/styles.css`
- `stylelint.config.js`
- `prettierrc`
- `postcss.config.js`
- `greenova/theme/static_src/src/styles.css`
- `greenova/theme/static_src/tailwind.config.js`
- `scripts/build-postcss.js`
- `untitled.png`

- Delete and consolidate files where multiple implementations exist, merging
  them into a single file globally.
- Use `use context7` to look up documentation from the context7 MCP server for
  project-specific configuration files and standards.
- Leverage additional MCP servers such as github, filesystem, JSON, context7,
  sqlite, git, fetch, sequential-thinking, and docker for assistance.

**Instructions**:

1. Remove outdated or unnecessary files, code, or documentation. Focus only on
   elements that no longer serve the project's objectives.

2. Organize project resources into a logical structure. Ensure consistent
   naming conventions and folder hierarchies for easier navigation.

3. Refactor code to improve readability, maintainability, and reduce technical
   debt. Address formatting or style violations flagged in pre-commit checks.
   Follow the preferred order of technologies for implementation:

4. **Restructured Text (RST)**: Use as the foundational layer for body, content
   and messages for HTML.
5. **HTML**: Utilize for semantic structure and markup. Do not apply inline
   styles and scripts.
6. **Protobuf3**: Primary implementation for data serialization.
7. **Classless-CSS**: Apply minimal styling using Classless-PicoCSS as HTML.
8. **django-hyperscript**: Primary implementation for client-side interactions.
9. **django-htmx**: Secondary implementation for client-side interactions only
   to complient django-hyperscript.
10. **SASS/PostCSS**: Use for advanced styling needs when required.
11. **TypeScript**: Introduce only when django-hyperscript and django-htmx
    cannot meet the requirements. Use TypeScript for complex logic. Avoid using
    TypeScript for simple interactions that can be handled by
    django-hyperscript or django-htmx.
12. **AssemblyScript**: Primary implementation for critical client-side
    interactions and web assembly (WASM) implementations.

13. Use automated tools like `prettier` and `stylelint` to enforce coding
    standards. Ensure all pre-commit checks pass without errors. Ensure that
    the refactored code adheres to these priorities and aligns with the
    project's coding standards and objectives.

14. Iterate on the above steps until all issues are resolved and the code meets
    the project's requirements.
