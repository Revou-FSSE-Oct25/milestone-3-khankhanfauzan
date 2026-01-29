# RevoShop

## Overview

RevoShop is a simple e‑commerce demo built with Next.js App Router. It showcases product listing, product detail with server‑side rendering, a client‑side cart, and a statically generated FAQ page. The UI uses Radix UI primitives and Tailwind for styling.

## Features

- Home highlights new arrivals and categories
- All Products grid with images, names, prices, and navigation to detail
- Product Detail page rendered with SSR (server fetch, gallery, category, price, description)
- Add to Cart and quantity controls; cart summary and item removal
- FAQ page statically generated (SSG) with cached fetch
- File‑based routing and client‑side navigation via Next.js Link

## Tech Stack

- Next.js 16 (App Router, server components, SSR/SSG)
- React 19 and TypeScript
- Tailwind CSS 4
- Radix UI and lucide‑react icons
- Embla Carousel (autoplay) for carousels
- Axios and Fetch API for data fetching
- LocalStorage utilities for cart/auth persistence

## Folder Structure

```
src
|-- app
|   |-- cart
|   |   `-- page.tsx
|   |-- dashboard
|   |   `-- page.tsx
|   |-- faq
|   |   `-- page.tsx
|   |-- login
|   |   `-- page.tsx
|   |-- products
|   |   |-- page.tsx
|   |   `-- [id]
|   |       `-- page.tsx
|   |-- layout.tsx
|   `-- page.tsx
|-- components
|   |-- AddToCartAction.tsx
|   |-- AppSidebar.tsx
|   |-- BackButton.tsx
|   |-- CartCard.tsx
|   |-- CategoryCard.tsx
|   |-- CategoryCarousel.tsx
|   |-- FAQCard.tsx
|   |-- Footer.tsx
|   |-- HomeCarousel.tsx
|   |-- Loading.tsx
|   |-- NavBar.tsx
|   |-- ProductCard.tsx
|   |-- ProductGallery.tsx
|   |-- SafeImage.tsx
|   `-- ui/...
|-- hooks
|   |-- useCart.ts
|   `-- use-mobile.ts
|-- services
|   |-- api.ts
|   `-- storage.ts
|-- types
|   |-- auth.ts
|   |-- product.ts
|   `-- faq.ts
`-- lib
    `-- utils.ts
```
