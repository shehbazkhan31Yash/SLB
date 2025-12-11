# Getting Started with ALM Platform

This guide will help you set up and run the ALM Platform monorepo.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SLB
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies for the monorepo, including Angular, Nx, and all required libraries.

## Running the Application

### Development Server

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`

The dev server will automatically reload when you make changes to the source code.

### Build for Production

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

### Build for Staging

```bash
npm run build -- --configuration=stage
```

## Running Tests

### Unit Tests (Vitest)

Run all unit tests:

```bash
npm test
```

Run tests for a specific library:

```bash
nx test auth
nx test features-product-onboarding
```

Run tests in watch mode:

```bash
nx test auth --watch
```

### E2E Tests (Playwright)

Run end-to-end tests:

```bash
npm run e2e
```

Run E2E tests in UI mode:

```bash
npx playwright test --ui
```

Run E2E tests in headed mode (see browser):

```bash
npx playwright test --headed
```

## Code Quality

### Linting

Lint all projects:

```bash
npm run lint
```

Auto-fix linting issues:

```bash
npm run lint -- --fix
```

Lint a specific project:

```bash
nx lint shell
nx lint auth
```

### Formatting

Format code with Prettier:

```bash
npx prettier --write .
```

## Storybook

View component documentation and stories:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:4400`

Build Storybook for deployment:

```bash
nx build-storybook ui
```

## Nx Commands

### View Dependency Graph

Visualize the project dependencies:

```bash
nx graph
```

This opens an interactive graph in your browser showing all libraries and their dependencies.

### Affected Commands

Only run commands on projects affected by your changes:

```bash
# Test only affected projects
nx affected:test

# Build only affected projects
nx affected:build

# Lint only affected projects
nx affected:lint
```

### Clear Cache

If you encounter issues, clear the Nx cache:

```bash
nx reset
```

## Project Structure Quick Reference

```
/apps
  shell/                    # Main application
  shell-e2e/               # E2E tests

/libs
  core/                    # Core services
  api/                     # API clients
  auth/                    # Authentication
  ui/                      # UI components
  utils/                   # Utilities
  state/                   # Global state
  
  /features               # Feature modules
    product-onboarding/
    destinations-board/
    qualification/
    reviewer-console/
    dashboard/
    versioning/
    market-material/
    commercial/
    legal/
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/my-new-feature
```

### 2. Make Changes

Edit files in the appropriate library or app.

### 3. Run Tests

```bash
npm test
```

### 4. Lint Your Code

```bash
npm run lint
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

Pre-commit hooks will automatically run linting and tests on affected files.

### 6. Push and Create PR

```bash
git push origin feature/my-new-feature
```

## Common Tasks

### Generate a New Component

```bash
nx g @nx/angular:component my-component --project=features-product-onboarding --standalone
```

### Generate a New Service

```bash
nx g @nx/angular:service my-service --project=core
```

### Generate a New Library

```bash
nx g @nx/angular:library my-library --directory=libs/my-library --standalone
```

### Add NgRx to a Feature

```bash
nx g @ngrx/schematics:feature my-feature --project=features-my-feature
```

## Troubleshooting

### Port Already in Use

If port 4200 is already in use:

```bash
nx serve shell --port=4300
```

### Module Not Found Errors

Clear cache and reinstall:

```bash
nx reset
rm -rf node_modules
npm install
```

### Build Errors

Try clearing the cache:

```bash
nx reset
npm run build
```

### Test Failures

Run tests in watch mode to debug:

```bash
nx test <project-name> --watch
```

## Environment Configuration

The application uses different environment files:

- `environment.ts` - Development (default)
- `environment.stage.ts` - Staging
- `environment.prod.ts` - Production

Located in: `apps/shell/src/environments/`

## Key Features to Explore

1. **Dashboard** - Navigate to `/dashboard` to see metrics
2. **Products** - Navigate to `/products` to manage products
3. **Destinations Board** - Navigate to `/destinations` to see the three-track swimlane
4. **Qualification** - Navigate to `/qualification` to see dynamic questionnaires
5. **Reviewer Console** - Navigate to `/reviewer` to see approval workflows

## Authentication

The application uses mock authentication. You're automatically logged in as an admin user with all permissions.

To modify the mock user, edit: `libs/auth/src/lib/auth.service.ts`

## Next Steps

- Read the [README.md](./README.md) for detailed documentation
- Read the [ARCHITECTURE.md](./ARCHITECTURE.md) for architecture details
- Explore the codebase starting with `apps/shell/src/app/app.component.ts`
- Check out the UI components in Storybook
- Review the example tests in `libs/features/product-onboarding/`

## Getting Help

- Check the [Nx Documentation](https://nx.dev)
- Check the [Angular Documentation](https://angular.dev)
- Review the project's README and ARCHITECTURE files

## Useful Links

- [Nx Console VSCode Extension](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)
- [Angular DevTools](https://angular.io/guide/devtools)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
