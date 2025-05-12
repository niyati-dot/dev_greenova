#!/usr/bin/env fish

# After all PRs are merged, run the full analysis
mkdir -p logs
git fetch --all
git status >logs/repo_status.log
git log --graph --oneline --decorate upstream/main...origin/staging >logs/commit_history.log
git diff --name-status upstream/main origin/staging >logs/changed_files.log
git diff --stat upstream/main origin/staging >logs/diff_stats.log
