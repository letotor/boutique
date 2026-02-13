# CLAUDE.md

## Project Overview

**boutique** is a Vue 3 single-page application (SPA) for an e-commerce store selling computers and accessories. It is a frontend-only project with no backend API integration yet. All product data is hardcoded.

- **Framework:** Vue 3.2 with Composition API (`<script setup>`)
- **Language:** TypeScript (strict mode)
- **Build tool:** Vite 2.9
- **Styling:** SCSS with CSS custom properties
- **State management:** Component-level `reactive()` in App.vue (no Pinia/Vuex)
- **License:** MIT

## Commands

```bash
npm run dev        # Start Vite dev server (default: localhost:5173)
npm run build      # Type-check (vue-tsc) then production build
npm run preview    # Serve production build on port 5050
npm run typecheck  # Type-check only (vue-tsc --noEmit)
npm run lintter    # ESLint with auto-fix (note: script name has typo)
npm run prettier   # Format code with Prettier
```

There is **no test framework** configured. No unit or integration tests exist.

## Project Structure

```
src/
  main.ts                     # App entry point
  App.vue                     # Root component, holds all app state
  assets/
    images/                   # Product and logo images
    scss/
      base.scss               # Global styles, CSS variables, utilities
      debug.scss              # Debug utilities
  components/
    HeaderHome.vue            # Top navigation bar
    FooterHome.vue            # Footer with copyright
    Shop/
      Shop.vue                # Shop container (filters + product list)
      ShopFilters.vue         # Search, price range, category filters
      ShopProductList.vue     # Product grid layout
      ShopProduct.vue         # Individual product card
      ConnexionShop.vue       # Login form (not integrated)
      UserList.vue            # Stub component (unused)
    Cart/
      Cart.vue                # Shopping cart sidebar
      CartProductList.vue     # List of cart items
      CartProduct.vue         # Individual cart item with quantity controls
  data/
    product.ts                # Hardcoded product catalog (8 items)
    filters.ts                # Filter default values and constants
  interfaces/
    index.ts                  # Barrel export for all interfaces
    Product.interface.ts      # ProductInterface
    ProductCart.interface.ts   # ProductCartInterface (extends Product)
    Filter.interface.ts       # FiltersInterface
    user.interface.ts         # UserInterface (planned)
    prod.interface.ts         # Additional product type
```

## Architecture & Data Flow

The app follows a **props down, events up** pattern with `App.vue` as the single source of truth for state.

```
App.vue (reactive state: products, cart, filters)
  ├── HeaderHome
  ├── Shop
  │   ├── ShopFilters  →  emits filter changes up
  │   └── ShopProductList
  │       └── ShopProduct  →  emits "add to cart"
  └── Cart
      └── CartProductList
          └── CartProduct  →  emits "remove from cart"
```

## Key Interfaces

```typescript
ProductInterface {
  id: number; title: string; image: string;
  price: number; description: string;
  category: 'all' | 'laptop' | 'desktop' | 'accessories';
}

ProductCartInterface extends ProductInterface {
  quantity: number;
}

FiltersInterface {
  search: string;
  priceRange: [number, number];
  category: 'all' | 'laptop' | 'desktop' | 'accessories';
}
```

## Code Conventions

- **Components:** PascalCase filenames, organized by feature in subdirectories (`Shop/`, `Cart/`)
- **Interfaces:** PascalCase with `Interface` suffix, stored in `src/interfaces/`
- **Vue SFCs:** Always use `<script setup lang="ts">` with typed props and emits
- **Styling:** Scoped SCSS in components (`<style lang="scss" scoped>`), global CSS variables defined in `base.scss`
- **CSS classes:** kebab-case (e.g., `.product-image`, `.btn-primary`)
- **Constants:** SCREAMING_SNAKE_CASE
- **Formatting:** Prettier with single quotes, semicolons, trailing commas, 2-space indent, 80 char width
- **Linting:** ESLint extends `plugin:vue/vue3-essential` + `@vue/eslint-config-typescript/recommended` + Prettier

## Styling System

Global CSS variables are defined in `src/assets/scss/base.scss`:

- **Colors:** `--primary-1/2` (blue), `--danger-1/2` (red), `--success-1/2` (green), `--gray-1` through `--gray-4`
- **Typography:** `--font-family` (Roboto), `--text-color`, `--text-primary-color`
- **Layout:** `--border`, `--border-radius`
- **Utility classes:** `.d-flex`, `.flex-row`, `.flex-column`, `.justify-content-center`, `.align-items-center`, `.flex-fill`, `.p-10`..`.p-35`, `.m-5`..`.m-30`, `.btn-primary`, `.btn-success`, `.btn-danger`

## Known Issues

- `package.json` script name typo: `"lintter"` should be `"linter"`
- `Cart.vue` line 8: `@lick` should be `@click`
- `ConnexionShop.vue` exists (392 lines) but is not integrated into the app
- `UserList.vue` is a stub component (7 lines, unused)
- No backend API — all data is hardcoded in `src/data/product.ts`
- No testing framework configured
- No CI/CD pipeline
- No responsive/mobile layout (fixed 4-column CSS grid)
