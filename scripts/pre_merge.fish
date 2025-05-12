#!/usr/bin/env fish

# This script performs a pre-merge check for a GitHub pull request.
# It fetches the PR, checks out the branch, and analyzes merge conflicts and diverging commits.

# Check if the required arguments are provided
if test (count $argv) -lt 2
    echo "Usage: ./pre_merge.fish <branch> <pr_number> [file1 file2 ...]"
    echo "Example: ./pre_merge.fish integration/v0.0.6 90 greenova/obligations/views.py greenova/obligations/urls.py"
    exit 1
end

# Check if gh CLI is installed
if not type -q gh
    echo "Error: GitHub CLI (gh) is not installed. Please install it first."
    exit 1
end

# Check if gh is authenticated
gh auth status >/dev/null 2>&1
if test $status -ne 0
    echo "Error: GitHub CLI is not authenticated. Please run 'gh auth login' first."
    exit 1
end

# Set environment variables for the branch and PR number from arguments
set -lx BRANCH $argv[1]
set -lx PR_NUMBER $argv[2]

# Get file paths from remaining arguments
set -lx FILES $argv[3..-1]

# Ensure both variables are set and PR_NUMBER is numeric
if test -z "$BRANCH" -o -z "$PR_NUMBER"
    echo "Error: BRANCH and PR_NUMBER must be set."
    exit 1
end
if not string match -qr '^[0-9]+$' $PR_NUMBER
    echo "Error: PR_NUMBER must be a number."
    exit 1
end

# Define log file paths
set LOG_DIR logs/pre_merge
set BRANCH_DIR (string replace '/' '_' $BRANCH)
set LOG_FILE "$LOG_DIR/$BRANCH_DIR.log"

# Ensure the log directory exists and clean existing logs
if not test -d "$LOG_DIR"
    mkdir -p "$LOG_DIR"
end
rm -f "$LOG_FILE"

# Verify the PR exists and is accessible
printf "Verifying pull request #%s exists...\n" "$PR_NUMBER"
if not gh pr view $PR_NUMBER --json number >/dev/null 2>&1
    echo "Error: Pull request #$PR_NUMBER does not exist or is not accessible."
    exit 1
end

# Save the target branch for comparison
set TARGET_BRANCH $BRANCH

# Check for unstaged changes and stash if needed
set ORIGINAL_BRANCH (git rev-parse --abbrev-ref HEAD)
set HAS_UNSTAGED_CHANGES false
if not test -z "(git status --porcelain)"
    set HAS_UNSTAGED_CHANGES true
    printf "Stashing unstaged changes...\n" | tee "$LOG_FILE"
    git stash push -m "pre-merge analysis temporary stash" >"$LOG_FILE" 2>&1
end

# Fetch PR information using GitHub CLI
printf "Fetching pull request #%s...\n" "$PR_NUMBER" | tee "$LOG_FILE"
set PR_DATA (gh pr view $PR_NUMBER --json headRefName,headRepository,headRepositoryOwner,number,title,state 2>"$LOG_FILE")
if test $status -ne 0
    echo "Error: Failed to fetch pull request information." | tee "$LOG_FILE"
    exit 1
end

# Extract the PR head branch name for comparison
set PR_HEAD_BRANCH (echo $PR_DATA | jq -r .headRefName)
printf "PR head branch is: %s\n" "$PR_HEAD_BRANCH" | tee "$LOG_FILE"

# Fetch the pull request using gh cli
printf "Checking out pull request #%s...\n" "$PR_NUMBER" | tee "$LOG_FILE"
gh pr checkout $PR_NUMBER >"$LOG_FILE" 2>&1
if test $status -ne 0
    echo "Error: Failed to check out pull request." | tee "$LOG_FILE"
    exit 1
end

# Create analysis directory if it doesn't exist and clean existing analysis logs
set ANALYSIS_DIR logs
if not test -d "$ANALYSIS_DIR"
    mkdir -p "$ANALYSIS_DIR"
end
rm -f "$ANALYSIS_DIR"/*.log

# Perform repository analysis
printf "Analyzing repository state...\n" | tee "$LOG_FILE"

# Repository status and commit history comparison
git status >"$ANALYSIS_DIR/repo_status.log" 2>>"$LOG_FILE"
git log --graph --oneline --decorate $TARGET_BRANCH..$PR_HEAD_BRANCH >"$ANALYSIS_DIR/commit_history.log" 2>>"$LOG_FILE"

# File differences between branches
if test (count $FILES) -gt 0
    printf "Analyzing changes for specific files...\n" | tee "$LOG_FILE"
    for file in $FILES
        printf "Checking file: %s\n" "$file" | tee -a "$LOG_FILE"
        git diff --name-status $TARGET_BRANCH $PR_HEAD_BRANCH -- $file >>"$ANALYSIS_DIR/changed_files.log" 2>>"$LOG_FILE"
        git diff --stat $TARGET_BRANCH $PR_HEAD_BRANCH -- $file >>"$ANALYSIS_DIR/diff_stats.log" 2>>"$LOG_FILE"
        git diff $TARGET_BRANCH $PR_HEAD_BRANCH -- $file >>"$ANALYSIS_DIR/diff.log" 2>>"$LOG_FILE"
    end
else
    printf "Analyzing all changed files...\n" | tee "$LOG_FILE"
    git diff --name-status $TARGET_BRANCH $PR_HEAD_BRANCH >"$ANALYSIS_DIR/changed_files.log" 2>>"$LOG_FILE"
    git diff --stat $TARGET_BRANCH $PR_HEAD_BRANCH >"$ANALYSIS_DIR/diff_stats.log" 2>>"$LOG_FILE"
end

# Check for potential conflicts
printf "Checking for potential conflicts...\n" | tee "$LOG_FILE"
git checkout -b temp_analysis_branch $TARGET_BRANCH
if git merge --no-commit --no-ff $PR_HEAD_BRANCH >/dev/null 2>&1
    if test (count $FILES) -gt 0
        echo "Checking conflicts in specified files..." | tee "$LOG_FILE"
        for file in $FILES
            if test -f $file
                git diff --check -- $file >>"$ANALYSIS_DIR/conflict_analysis.log" 2>&1
            end
        end
    else
        echo "No direct conflicts detected." | tee "$LOG_FILE"
    end
else
    echo "Potential conflicts detected. See conflict analysis logs." | tee "$LOG_FILE"
    if test (count $FILES) -gt 0
        for file in $FILES
            if test -f $file
                git diff --check -- $file >>"$ANALYSIS_DIR/conflict_analysis.log" 2>&1
            end
        end
    else
        git diff --check >>"$ANALYSIS_DIR/conflict_analysis.log" 2>&1
    end
end
git merge --abort
git checkout $PR_HEAD_BRANCH
git branch -D temp_analysis_branch

# Combine analysis logs
cat $ANALYSIS_DIR/*.log >"$ANALYSIS_DIR/pre_merge_analysis.log"

# Return to original branch before popping stash
printf "Returning to branch %s...\n" "$ORIGINAL_BRANCH" | tee "$LOG_FILE"
git checkout "$ORIGINAL_BRANCH" >"$LOG_FILE" 2>&1

# Restore stashed changes if any
if test "$HAS_UNSTAGED_CHANGES" = true
    printf "Restoring stashed changes...\n" | tee "$LOG_FILE"
    git stash pop >"$LOG_FILE" 2>&1
end

# Print success message
printf "Pre-merge analysis completed. Check %s for detailed report.\n" "$ANALYSIS_DIR/pre_merge_analysis.log" | tee "$LOG_FILE"
