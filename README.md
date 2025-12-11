# ALM Platform - Enterprise Angular Monorepo

Enterprise-grade Angular application for onboarding and qualification of software products across multiple destinations (On-Prem, XD, Cloud).

## 🏗️ Architecture

This is an **Nx monorepo** using Angular v21 with standalone components, following a **feature-first, domain-driven** architecture.

### Tech Stack

- **Angular v21** - Standalone components
- **Nx** - Monorepo tooling with caching
- **NgRx** - State management (Store, Effects, Entity)
- **Angular Material + Tailwind CSS** - UI framework
- **ngx-formly** - Dynamic JSON-driven forms
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Storybook** - Component documentation
- **ESLint + Prettier + Husky** - Code quality

## 📁 Workspace Structure

```
/apps
  shell/                      # Main host Angular application

/libs
  core/                       # Core services (interceptors, logger, error handling)
  api/                        # OpenAPI-generated client & types
  auth/                       # OIDC auth, guards, permissions
  ui/                         # Shared UI components (Material + Tailwind)
  state/                      # Global NgRx store setup
  utils/                      # Utilities (upload, WebSocket, date utils)

  /features                   # Feature libraries (lazy-loaded)
    product-onboarding/       # Product CRUD with NgRx
    versioning/               # Version management
    destinations-board/       # Three-track swimlane (On-Prem, XD, Cloud)
    qualification/            # Dynamic questionnaires + automated checks
    reviewer-console/         # Approval workflow + audit log
    market-material/          # Composite authoring
    commercial/               # Commercial information
    legal/                    # Legal review
    dashboard/                # Metrics and analytics
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

## 📜 Available Scripts

```bash
# Development
npm start                    # Start dev server
npm run build               # Build for production
npm run build -- --configuration=stage  # Build for staging

# Testing
npm test                    # Run unit tests (Vitest)
npm run e2e                 # Run E2E tests (Playwright)

# Code Quality
npm run lint                # Lint all projects
npm run lint -- --fix       # Auto-fix linting issues

# Storybook
npm run storybook           # Start Storybook on port 4400

# Nx Commands
nx graph                    # View dependency graph
nx affected:test            # Test affected projects
nx affected:build           # Build affected projects
```

## 🎯 Key Features

### 1. Product & Version Management
- CRUD operations for products and versions
- NgRx state management with Entity adapter
- Lazy-loaded routes

**Location:** `libs/features/product-onboarding/`

### 2. Destinations Board
- Three-track swimlane UI (On-Prem, XD, Cloud)
- Status cards with drag-and-drop (placeholder)
- NgRx store for destination states

**Location:** `libs/features/destinations-board/`

### 3. Dynamic Questionnaires
- JSON-driven forms using ngx-formly
- Evidence upload with resumable upload pattern
- Draft auto-save (mock)

**Location:** `libs/features/qualification/`

**Example questionnaire schema:**
```typescript
{
  fields: [
    { key: 'productName', type: 'input', props: { label: 'Product Name', required: true } },
    { key: 'securityLevel', type: 'select', props: { label: 'Security Level', options: [...] } },
    { key: 'evidence', type: 'file', props: { label: 'Upload Evidence' } }
  ]
}
```

### 4. Automated Checks
- Mock job execution service
- WebSocket/SSE progress updates
- Real-time UI feedback

**Location:** `libs/features/qualification/components/automated-checks.component.ts`

### 5. Reviewer Console
- Approve / Reject / Request Changes workflow
- Permission-based access control
- Audit log feed

**Location:** `libs/features/reviewer-console/`

### 6. Dashboard
- Lead-time metrics
- Monthly throughput
- First-pass approval rate
- Recent activity feed

**Location:** `libs/features/dashboard/`

## 🔐 Authentication & Authorization

### OIDC Authentication (Mock)
```typescript
// libs/auth/src/lib/auth.service.ts
- login(email, password)
- logout()
- isAuthenticated()
- hasPermission(permission)
```

### Route Guards
```typescript
// Protect routes
{ path: 'products', canActivate: [AuthGuard], ... }

// Permission-based guards
{ path: 'reviewer', canActivate: [PermissionGuard('reviewer:access')], ... }
```

### UI Permission Directive
```html
<button *appHasPermission="'security:approve'">Approve</button>
```

## 🧪 Testing

### Unit Tests (Vitest)
```bash
# Run all tests
npm test

# Run specific library tests
nx test auth
nx test features-product-onboarding
```

**Example test location:** `libs/features/product-onboarding/src/lib/components/product-list/product-list.component.spec.ts`

### E2E Tests (Playwright)
```bash
# Run E2E tests
npm run e2e

# Run in UI mode
npx playwright test --ui
```

**Example test location:** `apps/shell-e2e/src/example.spec.ts`

## 📚 Storybook

Component documentation and visual testing:

```bash
npm run storybook
```

Visit `http://localhost:4400` to browse components.

**Example stories:** `libs/ui/src/lib/components/status-chip/status-chip.component.stories.ts`

## 🔧 Configuration

### Environment Files
- `apps/shell/src/environments/environment.ts` - Development
- `apps/shell/src/environments/environment.stage.ts` - Staging
- `apps/shell/src/environments/environment.prod.ts` - Production

### Nx Caching
Nx caches build, test, and lint operations. Clear cache:
```bash
nx reset
```

### Path Aliases
All libraries use TypeScript path aliases defined in `tsconfig.base.json`:
```typescript
import { AuthService } from '@alm-platform/auth';
import { ProductApiService } from '@alm-platform/api';
```

## 🎨 UI Components

Shared UI library with Material + Tailwind:

- **StatusChipComponent** - Status badges
- **CardComponent** - Content cards
- **DataTableComponent** - Data tables
- **FormSectionComponent** - Form sections
- **UploadFieldComponent** - File upload with progress

**Location:** `libs/ui/src/lib/components/`

## 📦 State Management

### NgRx Pattern
Each feature follows this structure:
```
/store
  feature.state.ts          # State interface + Entity adapter
  feature.actions.ts        # Action creators
  feature.reducer.ts        # Reducers
  feature.selectors.ts      # Selectors
  feature.effects.ts        # Side effects
```

**Example:** `libs/features/product-onboarding/src/lib/store/`

## 🔄 CI/CD

### Pre-commit Hooks (Husky)
Automatically runs on commit:
- ESLint
- Prettier
- Affected tests

### Nx Affected Commands
Only build/test what changed:
```bash
nx affected:build --base=main
nx affected:test --base=main
nx affected:lint --base=main
```

## 🛠️ Development Guidelines

### Creating a New Feature Library
```bash
nx g @nx/angular:library my-feature --directory=libs/features/my-feature --standalone
```

### Creating a New Component
```bash
nx g @nx/angular:component my-component --project=features-my-feature --standalone
```

### Adding NgRx to a Feature
```bash
nx g @ngrx/schematics:feature my-feature --project=features-my-feature
```

## 📖 Additional Resources

- [Nx Documentation](https://nx.dev)
- [Angular Documentation](https://angular.dev)
- [NgRx Documentation](https://ngrx.io)
- [ngx-formly Documentation](https://formly.dev)
- [Angular Material](https://material.angular.io)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Commit (pre-commit hooks will run)
6. Create pull request

## 📝 License

MIT
