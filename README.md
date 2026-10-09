# TechPosure website

The production website on Vercel is the Next.js application in `next-preview/` (a historical directory name). The `techposure` Vercel project's root directory is `next-preview` and its framework preset is Next.js. The older static site remains in `dist/` for reference and the Netlify ZIP.

## Local preview

Run `npm install && npm run dev` in `next-preview/`. The older `dist/` site can still be served with any static web server.

## 3D diagrams

Three.js 0.186.0 is bundled locally in `dist/vendor/` with its MIT license. No CDN or build step is required. Six diagrams progressively enhance the hero, mission rail, process, Benton County map, and the two network service icons. The county silhouette follows the supplied reference; the routes are conceptual, not a claim of existing partnerships or live traffic. The brand mark stays unchanged.

Scenes initialize near the viewport, stop rendering offscreen and in background tabs, cap pixel density, respect reduced motion, and offer a global pause control. The original diagrams remain when WebGL is unavailable. Contact information is no longer placed in links or URL query strings.

## Contact form — enable receiving before launch

**Netlify:** Enable form detection in the site's Forms settings, then deploy `dist/` (or the updated Netlify ZIP). Confirm that `project-inquiry` appears in Forms. Configure email notifications for the team's chosen inbox in Project configuration → Notifications. Netlify processes the POST body and applies its spam filtering plus the included honeypot. No API secret is required. Send a real test inquiry after deployment and confirm receipt in the dashboard before announcing the site.

**Vercel:** The live Next.js form posts to `/api/contact`. Its production environment needs `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`; keep both server-side. Choosing Aarush, Prasenjit, or Frederick sends to `aarush.divakarla@gmail.com`, `prasen.pani@gmail.com`, or `tobyf@bentonvillek12.org` respectively; choosing the team sends to all three. The production endpoint accepted a labeled test inquiry to Aarush before release. A response from Resend confirms acceptance, not final inbox delivery.

The root `vercel.json` describes the legacy static build. For a manual CLI deployment of the production Next.js app from the repository root, target project `techposure` and pass `--local-config next-preview/vercel.json`; stage with `--prod --skip-domain`, test the URL, then promote it. The Vercel project's Git root directory is already `next-preview`.

Without the Vercel email settings, the form reports a delivery error and offers direct email links. A plain static local server also shows an error; it does not fake success. Browser and mocked endpoint checks do not confirm real email delivery.

Vercel source ZIP: `TechPosure-Vercel.zip` (unzip and import the project into Git, or deploy its folder with the Vercel CLI). Netlify static ZIP: `TechPosure-Netlify.zip`.

## Source note

The Ignite facility photograph is sourced from the official [Ignite Professional Studies facility page](https://www.bentonvillek12.org/o/ignite/page/facility). The three team portraits were supplied for this website.
