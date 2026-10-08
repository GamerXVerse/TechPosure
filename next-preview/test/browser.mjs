import { chromium } from 'playwright-core';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4174';
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'],
});

let failures = 0;
function check(condition, label) {
  console.log(`${condition ? 'PASS' : 'FAIL'} ${label}`);
  if (!condition) failures++;
}

for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  check(await page.title() === 'TechPosure | Technology for Northwest Arkansas Nonprofits', `${name}: metadata`);
  check(await page.locator('h1').count() === 1, `${name}: one semantic H1`);
  check(await page.locator('.service-card').count() === 10, `${name}: ten services retained`);
  check((await page.locator('.site-header .brand img').getAttribute('src'))?.includes('techposure-logo.svg'), `${name}: original logo restored`);
  check(await page.locator('.story-backdrop img').count() === 1, `${name}: Ignite photograph is the story backdrop`);
  check(await page.locator('.story-note').count() === 3, `${name}: three story moments retained`);
  check(await page.locator('.director-card').count() === 3, `${name}: three director cards`);
  check(await page.locator('#contact input[name="email"]').count() === 1, `${name}: contact form present`);
  check(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${name}: no horizontal overflow`);
  if (name === 'mobile') {
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).waitFor({ state: 'visible', timeout: 5000 });
    check(await page.getByRole('navigation', { name: 'Mobile navigation' }).isVisible(), 'mobile: menu opens');
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByText('Services').click();
    check(new URL(page.url()).hash === '#services', 'mobile: menu navigates');
  }
  const card = page.locator('.director-card').first();
  check(await card.getByText('Director of Technology & Systems Integration').count() === 1, `${name}: requested role present`);
  check(await card.locator('.director-back').isVisible(), `${name}: director details visible in reduced-motion mode`);
  check(errors.length === 0, `${name}: no page errors ${errors.join('; ')}`);
  if (name === 'mobile') {
    await page.evaluate(() => document.getElementById('story')?.scrollIntoView());
    await page.waitForTimeout(300);
    await page.screenshot({ path: '/private/tmp/techposure-story-mobile.png' });
  }
  await page.screenshot({ path: `/private/tmp/techposure-${name}-viewport.png` });
  await page.close();
}

const motionPage = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'no-preference' });
const motionErrors = [];
motionPage.on('pageerror', error => motionErrors.push(error.message));
await motionPage.goto(base, { waitUntil: 'networkidle' });
await motionPage.evaluate(() => document.getElementById('story')?.scrollIntoView());
await motionPage.waitForTimeout(700);
await motionPage.screenshot({ path: '/private/tmp/techposure-story-intro.png' });
await motionPage.locator('.story-note').first().scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(700);
await motionPage.screenshot({ path: '/private/tmp/techposure-story-viewport.png' });
await motionPage.locator('#vision').scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(700);
await motionPage.screenshot({ path: '/private/tmp/techposure-vision-viewport.png' });
await motionPage.locator('#team').scrollIntoViewIfNeeded();
await motionPage.waitForTimeout(700);
await motionPage.screenshot({ path: '/private/tmp/techposure-team-viewport.png' });
const motionCard = motionPage.locator('.director-card').first();
check(await motionCard.evaluate(el => el.classList.contains('is-flipped')), 'motion: first director flips on scroll');
await motionCard.locator('button').click();
check(await motionCard.evaluate(el => !el.classList.contains('is-flipped')), 'motion: card can be flipped back by click');
check(motionErrors.length === 0, `motion: no page errors ${motionErrors.join('; ')}`);
await motionPage.close();

const formPage = await browser.newPage({ viewport: { width: 1024, height: 768 }, reducedMotion: 'reduce' });
await formPage.goto(base, { waitUntil: 'networkidle' });
await formPage.locator('input[name="name"]').fill('Preview Test');
await formPage.locator('input[name="email"]').fill('preview@example.com');
await formPage.locator('input[name="organization"]').fill('Example Nonprofit');
await formPage.locator('textarea[name="message"]').fill('A form submission test with enough characters to pass validation.');
await formPage.getByRole('button', { name: /Send project inquiry/ }).click();
await formPage.locator('.form-status.error').waitFor({ timeout: 10000 });
check(await formPage.locator('.form-status.error').isVisible(), 'form: delivery failure shows inline error');
check(await formPage.locator('input[name="name"]').inputValue() === 'Preview Test', 'form: failure preserves details');
await formPage.close();

const successPage = await browser.newPage({ viewport: { width: 1024, height: 768 }, reducedMotion: 'reduce' });
await successPage.route('**/api/contact', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, message: 'Your inquiry has been sent.' }) }));
await successPage.goto(base, { waitUntil: 'networkidle' });
await successPage.locator('input[name="name"]').fill('Preview Test');
await successPage.locator('input[name="email"]').fill('preview@example.com');
await successPage.locator('input[name="organization"]').fill('Example Nonprofit');
await successPage.locator('textarea[name="message"]').fill('A successful submission test with enough characters to pass validation.');
await successPage.getByRole('button', { name: /Send project inquiry/ }).click();
await successPage.locator('.form-status.sent').waitFor({ timeout: 10000 });
check(await successPage.locator('.form-status.sent').isVisible(), 'form: success confirmation appears');
check(await successPage.locator('input[name="name"]').inputValue() === '', 'form: success clears fields');
await successPage.close();

const response = await fetch(`${base}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
  body: 'name=Test&email=invalid&organization=Example&contact=team&message=short',
});
check(response.status === 400, 'API: rejects invalid data');
const noOrigin = await fetch(`${base}/api/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json', Origin: 'https://example.net' },
  body: 'name=Test&email=test%40example.com&organization=Example&contact=team&message=This+is+a+valid+test+message+for+the+form.',
});
check(noOrigin.status === 403, 'API: blocks cross-origin submissions');

await browser.close();
if (failures) process.exit(1);
