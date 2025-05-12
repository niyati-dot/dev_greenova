#!/usr/bin/env fish

# Aggressively run git maintenance commands to ensure a clean and linear repository

# Expire all reflogs immediately
git reflog expire --expire=now --all

# Perform garbage collection with aggressive pruning
git gc --prune=now --aggressive

# Repack all objects and remove redundant packs
git repack -Ad

# Verify the integrity of the repository
git fsck --full

# Remove unreachable objects from the repository
git prune

# Clean up unnecessary files and optimize the repository
git clean -fdx

# Check for duplicate objects and other issues
git verify-pack -v $(git rev-parse --git-dir)/objects/pack/*.idx

# Ensure the repository is in a consistent state
git maintenance run --auto
