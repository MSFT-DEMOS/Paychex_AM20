# Git Commit and Documentation Update Prompt

## Overview
This prompt helps you commit all latest changes to the repository with a standardized commit message format and ensures the README is updated with recent changes.

## Instructions
Please perform the following tasks:

### 1. Check Git Status
- Review all modified, added, and untracked files
- Ensure all changes are ready for commit
- Identify any files that should not be committed

### 2. Stage All Changes
- Add all relevant files to the staging area
- Exclude any files that should not be committed (if any)
- Verify staging status

### 3. Create Comprehensive Commit
- Use the commit message prefix: "GitHub Copilot Generated Commit: "
- Follow with a clear, descriptive summary of the changes
- Include detailed bullet points for major changes:
  - New features implemented
  - Files modified and their purposes
  - Bug fixes or improvements
  - Documentation updates
  - Testing additions
  - Configuration changes

### 4. Update README.md
Before committing, update the README.md file to reflect:
- Any new features or functionality added
- Changes to installation or setup instructions
- New dependencies or requirements
- Updated usage examples
- Recent architectural changes
- Testing information
- Any breaking changes

### 5. Commit and Push
- Commit all staged changes with the comprehensive message
- Push changes to the remote repository
- Verify the repository is clean and up to date

## Commit Message Format
```
GitHub Copilot Generated Commit: [Brief summary of main changes]

- [Detailed description of change 1]
- [Detailed description of change 2]
- [Detailed description of change 3]
- Update README.md with recent changes and features
- [Any additional notes or context]
```

## Example Usage
```bash
git status
git add .
git commit -m "GitHub Copilot Generated Commit: Add shopping cart feature with comprehensive testing

- Implement complete shopping cart functionality with TypeScript/React
- Add cart state management with localStorage persistence
- Create cart icon with real-time badge in navigation
- Build comprehensive cart page with CRUD operations
- Integrate cart functionality into products page
- Generate BDD feature files for testing coverage
- Add implementation plan and documentation
- Update README.md with cart feature information
- All features tested and production-ready"
git push origin main
```

## Verification Steps
After committing:
1. Confirm `git status` shows clean working tree
2. Verify `git log` shows the new commit with proper message
3. Check that remote repository is updated
4. Ensure README.md reflects current state of the project

## Best Practices
- Always review changes before committing
- Use clear, descriptive commit messages
- Keep README.md current with project state
- Include testing information in commits
- Document any breaking changes
- Use conventional commit format when applicable
