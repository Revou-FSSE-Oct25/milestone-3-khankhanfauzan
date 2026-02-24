# RevoShop

## Overview

RevoShop is a simple e‑commerce demo built with Next.js App Router. It showcases product listing, product detail with server‑side rendering, a client‑side cart, and a statically generated FAQ page. The UI uses Radix UI primitives and Tailwind for styling.

## Screenshots

Home
![Home](./public/screenshots/home.png)

Products
![Products](./public/screenshots/products.png)

Product Detail
![Product Detail](./public/screenshots/product-detail.png)

Cart
![Cart](./public/screenshots/cart.png)

FAQ
![FAQ](./public/screenshots/faq.png)

Admin Products
![Admin Products](./public/screenshots/admin-products.png)

Admin Add Product
![Admin Add Product](./public/screenshots/admin-add-product.png)

Admin Update Product
![Admin Update Product](./public/screenshots/admin-update-product.png)

## Features

- Home highlights new arrivals and categories
- All Products grid with images, names, prices, and navigation to detail
- Product Detail page rendered with SSR (server fetch, gallery, category, price, description)
- Categories list fetched with ISR (Incremental Static Regeneration) via `fetchCategories` revalidating every 60s
- Add to Cart and quantity controls; cart summary and item removal
- FAQ page statically generated (SSG) with cached fetch
- File‑based routing and client‑side navigation via Next.js Link

### Admin Features

- Admin dashboard layout with sidebar and header
- Admin products CRUD:
    - Products table with edit/delete actions
    - Add Product form using Platzi products API (`POST /products`)
    - Edit Product form using Platzi products API (`PUT /products/{id}`)
    - Delete Product action using Platzi products API (`DELETE /products/{id}`)
- Admin categories CRUD:
    - Categories table with edit/delete actions
    - Add Category form backed by Platzi categories API (`POST /categories`)
    - Edit Category form backed by Platzi categories API (`PUT /categories/{id}`)
    - Delete Category action using Platzi categories API (`DELETE /categories/{id}`)
- Admin users CRUD:
    - Users table listing remote users from Platzi users API (`GET /users`)
    - Add User form with:
        - Name, email, password, avatar, and role (customer/admin)
        - Email format validation via shared `isValidEmail` utility
        - Email availability check via `POST /users/is-available`
        - Creation backed by Platzi users API (`POST /users`)
    - Edit User form with:
        - Name, email, avatar preview, and role (customer/admin)
        - Email validation and availability check before update
        - Update backed by Platzi users API (`PUT /users/{id}`)
    - Delete User action using Platzi users API (`DELETE /users/{id}`)

## Tech Stack

- Next.js 16 (App Router, server components, SSR/SSG)
- React 19 and TypeScript
- Tailwind CSS 4
- Radix UI and lucide‑react icons
- Embla Carousel (autoplay) for carousels
- Fetch API for data fetching
- LocalStorage utilities for cart persistence

## Testing

- Jest configured via `next/jest` with `jest-environment-jsdom`
- React Testing Library for component and hook tests
- Unit tests for:
    - Local storage utilities in `src/services/storage.ts`
    - API layer in `src/services/api.ts`
    - Cart state hook in `src/hooks/useCart.ts`
    - Session and authorization helpers in `src/lib/dal.ts`
    - Selected UI components and pages (`CartCard`, Home page, Login page)
- Example test files can be found under `src/__tests__`
- Coverage thresholds are enforced globally in `jest.config.js`

## Deployed Website

[Link](https://milestone-3-khankhanfauzan.vercel.app/)

## Folder Structure

```
.
├─ README.md
├─ .gitignore
├─ bun.lock
├─ components.json
├─ jest.config.js
├─ jest.setup.js
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ tsconfig.json
├─ public/
│  ├─ screenshots/...
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
└─ src/
   ├─ __tests__/
   │  ├─ app/
   │  │  ├─ home.page.test.tsx
   │  │  └─ login.page.test.tsx
   │  ├─ components/
   │  │  └─ CartCard.test.tsx
   │  ├─ hooks/
   │  │  └─ useCart.test.tsx
   │  ├─ lib/
   │  │  ├─ dal.test.ts
   │  │  └─ utils.test.ts
   │  ├─ services/
   │  │  ├─ api.test.ts
   │  │  └─ storage.test.ts
   ├─ actions/
   │  └─ auth.ts
   ├─ app/
   │  ├─ (admin)/
   │  │  └─ admin/
   │  │     ├─ categories/
   │  │     │  ├─ [id]/page.tsx
   │  │     │  ├─ add/page.tsx
   │  │     │  └─ page.tsx
   │  │     ├─ dashboard/page.tsx
   │  │     ├─ products/
   │  │     │  ├─ [id]/page.tsx
   │  │     │  ├─ add/page.tsx
   │  │     │  └─ page.tsx
   │  │     ├─ users/
   │  │     │  ├─ [id]/page.tsx
   │  │     │  ├─ add/page.tsx
   │  │     │  └─ page.tsx
   │  │     ├─ layout.tsx
   │  │     └─ page.tsx
   │  ├─ (site)/
   │  │  ├─ cart/page.tsx
   │  │  ├─ categories/
   │  │  │  ├─ [id]/page.tsx
   │  │  │  └─ page.tsx
   │  │  ├─ faq/page.tsx
   │  │  ├─ login/page.tsx
   │  │  ├─ products/
   │  │  │  ├─ [id]/page.tsx
   │  │  │  └─ page.tsx
   │  │  ├─ layout.tsx
   │  │  └─ page.tsx
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.tsx
   │  └─ page.tsx
   ├─ components/
   │  ├─ buttons/
   │  │  └─ MoreActionsButton.tsx
   │  ├─ cart/
   │  │  ├─ AddToCartAction.tsx
   │  │  └─ CartCard.tsx
   │  ├─ common/
   │  │  ├─ Loading.tsx
   │  │  └─ SafeImage.tsx
   │  ├─ faq/
   │  │  └─ FAQCard.tsx
   │  ├─ forms/
   │  │  ├─ category/
   │  │  │  ├─ AddCategoryForm.tsx
   │  │  │  └─ EditCategoryForm.tsx
   │  │  ├─ product/
   │  │  │  ├─ AddProductForm.tsx
   │  │  │  └─ EditProductForm.tsx
   │  │  └─ user/
   │  │     ├─ AddUserForm.tsx
   │  │     └─ EditUserForm.tsx
   │  ├─ headers/
   │  │  ├─ AdminHeader.tsx
   │  │  ├─ NavBar.tsx
   │  │  └─ NavBarWrapper.tsx
   │  ├─ layout/
   │  │  ├─ BackButton.tsx
   │  │  ├─ Container.tsx
   │  │  └─ Footer.tsx
   │  ├─ marketing/
   │  │  └─ home/
   │  │     ├─ HomeBestSellingStoreGrid.tsx
   │  │     ├─ HomeCategoryGrid.tsx
   │  │     ├─ HomeHero.tsx
   │  │     ├─ HomeTagline.tsx
   │  │     └─ HomeTodaysProductGrid.tsx
   │  ├─ product/
   │  │  ├─ CategoryCard.tsx
   │  │  ├─ CategoryCarousel.tsx
   │  │  ├─ HomeCarousel.tsx
   │  │  ├─ ProductCard.tsx
   │  │  └─ ProductGallery.tsx
   │  ├─ sidebars/
   │  │  ├─ AdminSidebar.tsx
   │  │  ├─ AppSideBarUser.tsx
   │  │  ├─ AppSidebar.tsx
   │  │  ├─ AppSidebarGroup.tsx
   │  │  └─ AppSidebarWrapper.tsx
   │  ├─ tables/
   │  │  ├─ CategoryDataTable.tsx
   │  │  ├─ ProductDataTable.tsx
   │  │  └─ UserDataTable.tsx
   │  └─ ui/...
   ├─ data/
   │  ├─ home-best-selling-store.ts
   │  └─ home-carousel.ts
   ├─ hooks/
   │  ├─ use-mobile.ts
   │  └─ useCart.ts
   ├─ lib/
   │  ├─ dal.ts
   │  ├─ definitions.ts
   │  ├─ session.ts
   │  └─ utils.ts
   ├─ services/
   │  ├─ api.ts
   │  └─ storage.ts
   ├─ types/
   │  ├─ faq.ts
   │  ├─ param.ts
   │  └─ product.ts
   └─ proxy.ts
```
