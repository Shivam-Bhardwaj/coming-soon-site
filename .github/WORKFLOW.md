# GitHub Actions Workflow Documentation

This repository uses GitHub Actions for automated CI/CD with the following workflow:

## Workflow Overview

### 1. Issue Creation
When an issue is created:
- Automatically labeled as `work-in-progress`
- A comment is added explaining the workflow
- Ready for development

### 2. Development & Testing
When you push code to a branch:
- **CI workflow runs automatically**:
  - Runs `npm run lint`
  - Runs `npm test`
  - Runs `npm run build`
- If all tests pass, a PR is automatically created (if one doesn't exist)

### 3. Pull Request
- PRs are created automatically when tests pass
- **Vercel automatically deploys a preview** (configured via Vercel dashboard)
- Review the preview deployment
- When ready, request merge

### 4. Merge to Main
When a PR is merged to main:
- Final tests run to ensure everything passes
- Associated issue is automatically closed (if linked via "Fixes #123" or branch name)
- PR is automatically closed
- Vercel deploys to production (if configured)

## Branch Naming Convention

For automatic issue linking, use branch names like:
- `issue-123` (will link to issue #123)
- `feat-issue-123`
- `fix-issue-123`

Or include the issue number in your PR description:
```
Fixes #123
```

## Workflow Files

- `.github/workflows/ci.yml` - Runs tests on PRs and pushes
- `.github/workflows/on-merge.yml` - Handles cleanup when PRs are merged
- `.github/workflows/on-issue.yml` - Labels and comments on new issues
- `.github/ISSUE_TEMPLATE/work-item.md` - Template for creating work items
- `.github/pull_request_template.md` - Template for PR descriptions

## Manual Steps

1. **Create an issue** using the "Work Item" template
2. **Create a branch** from main (e.g., `issue-123`)
3. **Make your changes** and commit
4. **Push to GitHub** - tests run automatically
5. **Review Vercel preview** when PR is created
6. **Request merge** when satisfied
7. **Issue and PR close automatically** on merge

## Vercel Integration

Vercel is configured to:
- Automatically deploy previews for all PRs
- Deploy to production when merged to main

Make sure Vercel is connected to your GitHub repository in the Vercel dashboard.

## Troubleshooting

### Tests failing?
- Check the Actions tab in GitHub
- Run tests locally: `npm test`
- Fix issues and push again

### PR not created automatically?
- Ensure tests pass
- Check branch name doesn't match `main` or `develop`
- PR creation only happens on push, not on PR events

### Issue not closing?
- Ensure PR description includes "Fixes #123" or branch name matches `issue-123`
- Check that PR was actually merged (not just closed)

