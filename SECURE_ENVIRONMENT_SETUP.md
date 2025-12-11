# Secure Environment Setup Guide

This guide helps you recreate the ALM Platform monorepo in a secure/air-gapped environment where you cannot copy the codebase directly.

## 📋 Prerequisites to Transfer

### 1. Documentation Files (Copy These)
```
README.md
ARCHITECTURE.md
GETTING_STARTED.md
PROJECT_SUMMARY.md
package.json
tsconfig.base.json
nx.json
```

### 2. Configuration Files (Copy These)
```
.eslintrc.json
.prettierrc
.lintstagedrc.json
.gitignore
vitest.config.ts
vitest.setup.ts
tailwind.config.js (from apps/shell/)
```

### 3. Key Schema/Model Files (Copy These)
```
libs/api/src/lib/models.ts
libs/auth/src/lib/auth.models.ts
libs/features/qualification/src/lib/schemas/security-questionnaire.json
```

## 🔧 Step-by-Step Recreation

### Step 1: Initialize Nx Workspace

```bash
# In secure environment
npx create-nx-workspace@latest alm-platform --preset=angular-standalone --appName=shell --style=scss --routing=true --standaloneApi=true

cd alm-platform
```

### Step 2: Install Dependencies

```bash
npm install @angular/material @angular/cdk @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools @ngx-formly/core @ngx-formly/material ngx-quill quill tus-js-client

npm install -D @nx/storybook @storybook/angular @vitest/ui @nx/playwright @playwright/test husky lint-staged tailwindcss autoprefixer postcss
```

### Step 3: Copy Configuration Files

Copy all files from "Prerequisites to Transfer" section to the new workspace.

### Step 4: Generate Libraries

```bash
# Core libraries
nx g @nx/angular:library core --directory=libs/core --standalone --simpleName
nx g @nx/angular:library api --directory=libs/api --standalone --simpleName
nx g @nx/angular:library auth --directory=libs/auth --standalone --simpleName
nx g @nx/angular:library ui --directory=libs/ui --standalone --simpleName
nx g @nx/angular:library state --directory=libs/state --standalone --simpleName
nx g @nx/angular:library utils --directory=libs/utils --standalone --simpleName

# Feature libraries
nx g @nx/angular:library product-onboarding --directory=libs/features/product-onboarding --standalone --simpleName
nx g @nx/angular:library versioning --directory=libs/features/versioning --standalone --simpleName
nx g @nx/angular:library destinations-board --directory=libs/features/destinations-board --standalone --simpleName
nx g @nx/angular:library qualification --directory=libs/features/qualification --standalone --simpleName
nx g @nx/angular:library reviewer-console --directory=libs/features/reviewer-console --standalone --simpleName
nx g @nx/angular:library market-material --directory=libs/features/market-material --standalone --simpleName
nx g @nx/angular:library commercial --directory=libs/features/commercial --standalone --simpleName
nx g @nx/angular:library legal --directory=libs/features/legal --standalone --simpleName
nx g @nx/angular:library dashboard --directory=libs/features/dashboard --standalone --simpleName
```

### Step 5: Generate Components

```bash
# UI components
nx g @nx/angular:component status-chip --project=ui --directory=lib/components/status-chip --standalone --export
nx g @nx/angular:component card --project=ui --directory=lib/components/card --standalone --export
nx g @nx/angular:component data-table --project=ui --directory=lib/components/data-table --standalone --export
nx g @nx/angular:component form-section --project=ui --directory=lib/components/form-section --standalone --export
nx g @nx/angular:component upload-field --project=ui --directory=lib/components/upload-field --standalone --export

# Product feature components
nx g @nx/angular:component product-list --project=features-product-onboarding --directory=lib/components/product-list --standalone
nx g @nx/angular:component product-form --project=features-product-onboarding --directory=lib/components/product-form --standalone
nx g @nx/angular:component product-detail --project=features-product-onboarding --directory=lib/components/product-detail --standalone

# Other feature components
nx g @nx/angular:component version-list --project=features-versioning --directory=lib/components --standalone
nx g @nx/angular:component destinations-board --project=features-destinations-board --directory=lib/components --standalone
nx g @nx/angular:component questionnaire --project=features-qualification --directory=lib/components --standalone
nx g @nx/angular:component automated-checks --project=features-qualification --directory=lib/components --standalone
nx g @nx/angular:component reviewer-console --project=features-reviewer-console --directory=lib/components --standalone
nx g @nx/angular:component dashboard --project=features-dashboard --directory=lib/components --standalone
nx g @nx/angular:component market-material --project=features-market-material --directory=lib/components --standalone
nx g @nx/angular:component commercial --project=features-commercial --directory=lib/components --standalone
nx g @nx/angular:component legal --project=features-legal --directory=lib/components --standalone
```

### Step 6: Generate Services

```bash
# Core services
nx g @nx/angular:service logger --project=core --directory=lib/services
nx g @nx/angular:service error --project=core --directory=lib/services

# Auth services
nx g @nx/angular:service auth --project=auth --directory=lib

# API services
nx g @nx/angular:service product-api --project=api --directory=lib/services
nx g @nx/angular:service version-api --project=api --directory=lib/services
nx g @nx/angular:service questionnaire-api --project=api --directory=lib/services

# Utils services
nx g @nx/angular:service upload --project=utils --directory=lib
nx g @nx/angular:service websocket --project=utils --directory=lib
```

### Step 7: Generate Guards & Directives

```bash
# Guards
nx g @nx/angular:guard auth --project=auth --directory=lib/guards --functional
nx g @nx/angular:guard permission --project=auth --directory=lib/guards --functional

# Directives
nx g @nx/angular:directive has-permission --project=auth --directory=lib/directives --standalone --export
```

### Step 8: Generate NgRx Store

```bash
# Product feature store
nx g @ngrx/schematics:feature product --project=features-product-onboarding --directory=lib/store --creators --api
```

### Step 9: Manual File Creation

Create these files manually by copying content from documentation:

**Critical Files to Manually Create:**

1. **apps/shell/src/app/app.config.ts** - Application providers
2. **apps/shell/src/app/app.routes.ts** - Lazy-loaded routes
3. **apps/shell/src/app/app.component.ts** - Root component with navigation
4. **libs/core/src/lib/interceptors/error.interceptor.ts** - HTTP error interceptor
5. **libs/auth/src/lib/auth.interceptor.ts** - JWT interceptor
6. **libs/core/src/lib/constants.ts** - Application constants

**For each library, create:**
- `src/index.ts` - Public API exports
- Route files (e.g., `product.routes.ts`)
- Component templates and logic
- Service implementations

### Step 10: Setup Storybook

```bash
nx g @nx/storybook:configuration ui --configureCypress=false
```

### Step 11: Setup E2E Testing

```bash
nx g @nx/playwright:configuration --project=shell-e2e
```

### Step 12: Setup Husky

```bash
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

## 📝 File-by-File Checklist

Use this checklist to track recreation progress:

### Core Infrastructure
- [ ] package.json
- [ ] nx.json
- [ ] tsconfig.base.json
- [ ] .eslintrc.json
- [ ] .prettierrc
- [ ] .gitignore
- [ ] vitest.config.ts

### Shell App
- [ ] apps/shell/src/main.ts
- [ ] apps/shell/src/app/app.config.ts
- [ ] apps/shell/src/app/app.routes.ts
- [ ] apps/shell/src/app/app.component.ts
- [ ] apps/shell/src/styles.scss
- [ ] apps/shell/tailwind.config.js

### Core Library (libs/core)
- [ ] src/index.ts
- [ ] src/lib/interceptors/error.interceptor.ts
- [ ] src/lib/services/logger.service.ts
- [ ] src/lib/services/error.service.ts
- [ ] src/lib/constants.ts

### Auth Library (libs/auth)
- [ ] src/index.ts
- [ ] src/lib/auth.models.ts
- [ ] src/lib/auth.service.ts
- [ ] src/lib/auth.interceptor.ts
- [ ] src/lib/guards/auth.guard.ts
- [ ] src/lib/guards/permission.guard.ts
- [ ] src/lib/directives/has-permission.directive.ts

### API Library (libs/api)
- [ ] src/index.ts
- [ ] src/lib/models.ts
- [ ] src/lib/services/product-api.service.ts
- [ ] src/lib/services/version-api.service.ts
- [ ] src/lib/services/questionnaire-api.service.ts

### UI Library (libs/ui)
- [ ] src/index.ts
- [ ] src/lib/components/status-chip/status-chip.component.ts
- [ ] src/lib/components/card/card.component.ts
- [ ] src/lib/components/data-table/data-table.component.ts
- [ ] src/lib/components/form-section/form-section.component.ts
- [ ] src/lib/components/upload-field/upload-field.component.ts
- [ ] src/lib/components/status-chip/status-chip.component.stories.ts

### Utils Library (libs/utils)
- [ ] src/index.ts
- [ ] src/lib/upload.service.ts
- [ ] src/lib/websocket.service.ts
- [ ] src/lib/date.utils.ts

### Product Onboarding Feature
- [ ] src/index.ts
- [ ] src/lib/product.routes.ts
- [ ] src/lib/store/product.state.ts
- [ ] src/lib/store/product.actions.ts
- [ ] src/lib/store/product.reducer.ts
- [ ] src/lib/store/product.selectors.ts
- [ ] src/lib/store/product.effects.ts
- [ ] src/lib/components/product-list/product-list.component.ts
- [ ] src/lib/components/product-form/product-form.component.ts
- [ ] src/lib/components/product-detail/product-detail.component.ts

### Other Features (Repeat Pattern)
For each feature (versioning, destinations-board, qualification, etc.):
- [ ] src/index.ts
- [ ] src/lib/[feature].routes.ts
- [ ] src/lib/components/[feature].component.ts
- [ ] src/lib/store/* (if needed)

### Testing
- [ ] apps/shell-e2e/playwright.config.ts
- [ ] apps/shell-e2e/src/example.spec.ts
- [ ] libs/features/product-onboarding/.../product-list.component.spec.ts
- [ ] libs/auth/src/lib/auth.service.spec.ts

### Documentation
- [ ] README.md
- [ ] ARCHITECTURE.md
- [ ] GETTING_STARTED.md
- [ ] PROJECT_SUMMARY.md

## 🎯 Minimal Transfer Package

If you can only transfer minimal files, prioritize these:

### Essential Files (Must Have)
1. `package.json` - All dependencies
2. `tsconfig.base.json` - Path mappings
3. `nx.json` - Nx configuration
4. `README.md` - Complete documentation
5. `ARCHITECTURE.md` - Architecture patterns

### Code Templates (Copy & Adapt)
6. One complete feature example (product-onboarding)
7. One complete UI component (status-chip)
8. Auth service + guards
9. API service template
10. NgRx store template

### Schemas
11. `security-questionnaire.json` - Form schema example
12. `models.ts` - TypeScript interfaces

## 🔄 Alternative: Use Code Generation Scripts

Create a script file to automate recreation:

```bash
# save as: generate-structure.sh

#!/bin/bash

# Generate all libraries
for lib in core api auth ui state utils; do
  nx g @nx/angular:library $lib --directory=libs/$lib --standalone --simpleName
done

# Generate all features
for feature in product-onboarding versioning destinations-board qualification reviewer-console market-material commercial legal dashboard; do
  nx g @nx/angular:library $feature --directory=libs/features/$feature --standalone --simpleName
done

# Generate UI components
for comp in status-chip card data-table form-section upload-field; do
  nx g @nx/angular:component $comp --project=ui --directory=lib/components/$comp --standalone --export
done

echo "Structure generated. Now manually copy file contents."
```

## 📦 Transfer Methods

### Method 1: Documentation-Based
1. Transfer all .md files
2. Transfer package.json
3. Transfer configuration files
4. Use Nx generators to create structure
5. Manually code each file using documentation as reference

### Method 2: Incremental Transfer
1. Transfer and setup core infrastructure first
2. Transfer one feature at a time
3. Test each feature before moving to next
4. Gradually build up the complete system

### Method 3: Template-Based
1. Transfer one complete feature as template
2. Use it as reference to create others
3. Copy patterns, not entire files
4. Adapt to each feature's needs

## ✅ Verification Steps

After recreation, verify:

```bash
# 1. Dependencies installed
npm install

# 2. Build succeeds
npm run build

# 3. Tests pass
npm test

# 4. Linting passes
npm run lint

# 5. App runs
npm start

# 6. All routes accessible
# Navigate to each feature in browser
```

## 🚨 Common Issues

**Issue:** Path aliases not working
**Fix:** Ensure tsconfig.base.json has all path mappings

**Issue:** Module not found errors
**Fix:** Check index.ts exports in each library

**Issue:** NgRx errors
**Fix:** Ensure store is provided in app.config.ts

**Issue:** Material components not styled
**Fix:** Import Material theme in styles.scss

## 📞 Support

If you encounter issues during recreation:
1. Check ARCHITECTURE.md for patterns
2. Review working examples in documentation
3. Use `nx graph` to verify structure
4. Compare with PROJECT_SUMMARY.md checklist
