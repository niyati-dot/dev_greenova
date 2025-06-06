# Greenova Python Requirements and Environment Workflow

## File Structure

- `requirements/requirements.in`: Main application dependencies (unpinned)
- `requirements/requirements.txt`: Pinned, generated by pip-compile
- `requirements/requirements-dev.in`: Dev dependencies (references
  requirements.in)
- `requirements/requirements-dev.txt`: Pinned, generated by pip-compile
- `requirements/requirements-prod.in`: Prod dependencies (references
  requirements.in)
- `requirements/requirements-prod.txt`: Pinned, generated by pip-compile
- `requirements/constraints.txt`: All pinned versions for reproducibility

## How to Add or Update Dependencies

1. Edit the appropriate `.in` file (never edit `.txt` files by hand).
2. Run:

   ```fish
   pip-compile requirements/requirements.in
   pip-compile requirements/requirements-dev.in
   pip-compile requirements/requirements-prod.in
   pip-compile --all-build-deps --all-extras --output-file=requirements/constraints.txt --strip-extras requirements/requirements.in
   ```

3. To install in a dev environment:

   ```fish
   pip-sync requirements/requirements.txt requirements/requirements-dev.txt -c requirements/constraints.txt
   ```

   For production:

   ```fish
   pip-sync requirements/requirements.txt requirements/requirements-prod.txt -c requirements/constraints.txt
   ```

## Best Practices

- Always use pip-tools for requirements management.
- Always use constraints.txt for reproducibility.
- Commit both `.in` and `.txt` files.
- All scripts and CI should use the new requirements structure.

## References

- [pip-tools documentation](https://github.com/jazzband/pip-tools/)
- [pip constraints best practices](https://luminousmen.com/post/pip-constraints-files)
