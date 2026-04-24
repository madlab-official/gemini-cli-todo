---
name: gh-pull-request
description: Automates the creation of GitHub Pull Requests (PRs). Use when the user wants to submit their changes to a GitHub repository, ensuring a clear title and description are provided.
---

# GitHub Pull Request (PR) Automation

This skill streamlines the process of creating a Pull Request on GitHub, especially when the `gh` CLI is not available. It handles everything from identifying the repository details to generating a description and calling the GitHub API.

## Workflow

### 1. Identify Repository & Branches
- **Repo Info:** Determine the `owner` and `repo` name from the git remote (e.g., `git remote -v`).
- **Head Branch:** The branch with your current changes (default: current branch).
- **Base Branch:** The branch to merge into (default: `main` or `master`).

### 2. Generate PR Content
- **Title:** A concise summary of the changes.
- **Description (Body):** A detailed explanation. 
  - **Pro-tip:** Use `git log base..head --oneline` or `git diff base..head --stat` to summarize changes if the user doesn't provide a description.

### 3. Ensure Changes are Pushed
Before creating the PR, verify that the `head` branch is pushed to the remote:
```bash
git push origin <head-branch>
```

### 4. Create the Pull Request
Use the included script to call the GitHub API.

**Requirement:** A GitHub Personal Access Token (PAT) with `repo` scope.
- Ask the user for their token if not already available in environment variables like `GITHUB_TOKEN`.
- **Security:** Do NOT store the token in the codebase.

**Execution:**
```bash
node scripts/create_gh_pr.cjs <owner> <repo> <head> <base> "<title>" "<body>" <token>
```

## Example Usage

**User:** "Create a PR for my current changes to the main branch."

1. **Research:** Identify current branch (`feat/login`), remote (`octocat/hello-world`), and base branch (`main`).
2. **Strategy:** Summarize recent commits for the description.
3. **Action:** Push changes, then run the `create_gh_pr.cjs` script.

## Troubleshooting
- **401 Unauthorized:** Invalid or missing GitHub token.
- **404 Not Found:** Repository or branch does not exist on the remote.
- **422 Unprocessable Entity:** PR already exists for these branches.
