# TechPosure cinematic site

This is the Next.js application for TechPosure. The older static build remains in `../dist` for rollback/reference. The production Vercel project is `techposure`, with its root directory set to `next-preview` and framework preset set to Next.js. The separate `techposure-cinematic-preview` project remains available for evaluation builds.

## Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP/ScrollTrigger, and Lenis. The page uses one persistent R3F canvas with semantic HTML chapters. The Benton County graphic is a concept map, not a representation of live traffic or partnerships.

## Run and test

```sh
npm install
npm run dev
npm run build
npm run test:browser
```

The browser test uses Google Chrome installed at the macOS application path in `test/browser.mjs`; set `TEST_BASE_URL` to point it at a different local server. The browser test checks content, desktop/mobile layout, reduced motion, navigation, director flip behavior, and failure/validation paths. It does not send live mail.

## Contact form

The form posts to `/api/contact` and delivers via Resend. Both `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` must be present in the target Vercel environment. The preview and production projects use their own environment variables. Without both, the endpoint returns 503 and the form retains the visitor's input with a direct-email fallback; it never reports false success. Never commit `.env.local`.
