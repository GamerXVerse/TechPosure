# TechPosure cinematic preview

This is an evaluation-only Next.js application. The existing static site in `../dist` and its production Vercel project are not modified by this app. Deploy only from the `feature/cinematic-nextjs-experience` branch to the separate `techposure-cinematic-preview` project, using Vercel's Preview target.

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

The form posts to `/api/contact` and delivers via Resend. Set `RESEND_API_KEY` as a Vercel **Preview-only Secret** and `CONTACT_FROM_EMAIL` as a Preview variable (for example, `TechPosure <contact@techposure.org>`). Without both, the endpoint returns 503 and the form retains the visitor's input with a direct-email fallback; it never reports false success. Never commit `.env.local`.
