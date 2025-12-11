# ALM Platform Architecture

## Overview

The ALM Platform follows a **feature-first, domain-driven architecture** using Nx monorepo patterns. This document outlines the architectural decisions and patterns used throughout the application.

## Architecture Principles

1. **Separation of Concerns** - Clear boundaries between features, UI, data access, and utilities
2. **Lazy Loading** - All features are lazy-loaded for optimal performance
3. **Standalone Components** - Angular v19 standalone components throughout
4. **Reactive State Management** - NgRx for predictable state management
5. **Type Safety** - Strong TypeScript typing across all layers
6. **Testability** - Unit and E2E tests for all critical paths

## Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Shell App                             │
│  (Main host, routing, global layout, app configuration)     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Feature Libraries                        │
│  (Lazy-loaded, domain-specific, self-contained)            │
│  - product-onboarding  - qualification                      │
│  - destinations-board  - reviewer-console                   │
│  - dashboard          - market-material                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Shared Libraries                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   UI     │  │   Auth   │  │   API    │  │  Utils   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│  ┌──────────┐  ┌──────────┐                               │
│  │   Core   │  │  State   │                               │
│  └──────────┘  └──────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

## Library Types

### Core Libraries

**Purpose:** Foundation services used across the application

- **core** - HTTP interceptors, error handling, logging, constants
- **auth** - Authentication, authorization, guards, directives
- **api** - OpenAPI-generated clients, models, API services
- **state** - Global NgRx store configuration
- **utils** - Shared utilities (upload, WebSocket, date formatting)
- **ui** - Reusable UI components (Material + Tailwind)

### Feature Libraries

**Purpose:** Domain-specific, self-contained modules

Each feature library contains:

- Routing configuration
- Container components (smart)
- Presentational components (dumb)
- NgRx state (actions, reducers, selectors, effects)
- Feature-specific services
- Unit tests
- Storybook stories

**Features:**

- `product-onboarding` - Product CRUD operations
- `versioning` - Version management
- `destinations-board` - Deployment tracking (On-Prem, XD, Cloud)
- `qualification` - Dynamic questionnaires + automated checks
- `reviewer-console` - Approval workflows + audit logs
- `market-material` - Content authoring
- `commercial` - Commercial information
- `legal` - Legal review
- `dashboard` - Analytics and metrics

## State Management Pattern

### NgRx Architecture

```
Component
    │
    ├─ dispatch(action) ──────────────────┐
    │                                      │
    └─ select(selector) ◄─────┐           │
                               │           ▼
                            Store      Effects
                               │           │
                               │           ├─ API Call
                               │           │
                               │           └─ dispatch(success/failure)
                               │                      │
                               └──────────────────────┘
```

### Feature State Structure

```typescript
/store
  ├── feature.state.ts      // State interface + Entity adapter
  ├── feature.actions.ts    // Action creators (createActionGroup)
  ├── feature.reducer.ts    // Reducers (createReducer)
  ├── feature.selectors.ts  // Selectors (createSelector)
  └── feature.effects.ts    // Side effects (createEffect)
```

## Component Patterns

### Container vs Presentational

**Container Components (Smart)**

- Connect to NgRx store
- Handle business logic
- Dispatch actions
- Subscribe to selectors
- Located in feature libraries

**Presentational Components (Dumb)**

- Receive data via @Input
- Emit events via @Output
- No business logic
- Reusable across features
- Located in UI library

### Example

```typescript
// Container (Smart)
@Component({
  template: `<lib-product-card [product]="product$ | async" (edit)="onEdit($event)" />`,
})
export class ProductListComponent {
  product$ = this.store.select(selectProduct);

  onEdit(id: string) {
    this.store.dispatch(ProductActions.edit({ id }));
  }
}

// Presentational (Dumb)
@Component({
  selector: 'lib-product-card',
  template: `<button (click)="edit.emit(product.id)">Edit</button>`,
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() edit = new EventEmitter<string>();
}
```

## Routing Strategy

### Lazy Loading

All features are lazy-loaded using Angular's route-level code splitting:

```typescript
{
  path: 'products',
  loadChildren: () => import('@alm-platform/features/product-onboarding')
    .then(m => m.PRODUCT_ROUTES)
}
```

### Route Guards

- **AuthGuard** - Ensures user is authenticated
- **PermissionGuard** - Checks specific permissions
- Applied at route level for security

## Data Flow

### API Integration

```
Component ──dispatch──> Effect ──HTTP──> API
                          │
                          └──success──> Reducer ──> Store ──> Component
```

### Real-time Updates

```
Component ──subscribe──> WebSocketService ──SSE/WS──> Backend
    │
    └──update UI──> (RxJS Observable)
```

## Testing Strategy

### Unit Tests (Vitest)

- All services
- All reducers and selectors
- Critical components
- Utilities

### Integration Tests

- Feature workflows
- NgRx effects with mocked HTTP
- Component + store integration

### E2E Tests (Playwright)

- Critical user journeys
- Cross-feature workflows
- Authentication flows

## Security

### Authentication Flow

```
User Login ──> OIDC Provider ──> Token ──> AuthService
                                            │
                                            ├─ Store token
                                            ├─ Set user state
                                            └─ Redirect to app
```

### Authorization

- **Route-level:** Guards prevent unauthorized access
- **UI-level:** Directives hide/show elements based on permissions
- **API-level:** Interceptor adds JWT to all requests

## Performance Optimizations

1. **Lazy Loading** - Features loaded on-demand
2. **OnPush Change Detection** - Reduced change detection cycles
3. **Nx Caching** - Build and test caching
4. **Tree Shaking** - Unused code eliminated
5. **Code Splitting** - Separate bundles per route

## Build & Deployment

### Build Configurations

- **Development** - Source maps, no optimization
- **Staging** - Partial optimization, source maps
- **Production** - Full optimization, no source maps

### Environment Variables

```typescript
environment.ts; // Local development
environment.stage.ts; // Staging environment
environment.prod.ts; // Production environment
```

## Dependency Graph

Use Nx to visualize dependencies:

```bash
nx graph
```

This shows:

- Library dependencies
- Circular dependency detection
- Affected projects for changes

## Code Organization Best Practices

1. **Feature Independence** - Features should not depend on other features
2. **Shared Code** - Common code goes in shared libraries
3. **Single Responsibility** - Each library has one clear purpose
4. **Explicit Dependencies** - Use TypeScript path aliases
5. **Boundary Enforcement** - Nx enforces module boundaries

## Future Enhancements

- Server-Side Rendering (SSR) with Angular Universal
- Micro-frontend architecture with Module Federation
- Progressive Web App (PWA) capabilities
- Advanced caching strategies
- Real-time collaboration features
