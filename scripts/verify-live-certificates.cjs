/* Run only after a source-triggered sync/deployment to prove the public result. */
const { chromium } = require('playwright');
const fs = require('node:fs');
const expected = require('../data/certificates.json');
const base = process.env.CERTIFICATES_SITE_URL || 'https://www.gijshulsebos.com';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  let deployed = false;
  // A deploy-hook acknowledgement is not deployment success. Wait for the actual build.
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(`${base}/certificates.json?verify=${Date.now()}`, { signal: AbortSignal.timeout(15000) });
      if (response.ok) {
        const live = await response.json();
        deployed = live.commit === expected.commit && JSON.stringify(live.certificates) === JSON.stringify(expected.certificates);
        if (deployed) break;
      }
    } catch { /* The previous deployment can still be serving while the new one builds. */ }
    await delay(15000);
  }
  if (!deployed) throw new Error(`Production has not published certificate snapshot ${expected.commit}`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const seen = new Set();
  try {
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.locator('.circular-gallery').evaluate(element => element.scrollIntoView({ block: 'start' }));
    if (await page.locator('.circular-gallery-center-card').count() !== 1) throw new Error('Fixed introduction card missing');
    for (let batch = 0; batch < Math.ceil(expected.certificates.length / 16); batch++) {
      const links = page.locator('.certificate-hit-link');
      if (await links.count() !== 16) throw new Error('Expected sixteen fixed slots');
      await page.waitForFunction(() => [...document.querySelectorAll('.certificate-preview img')].every(image => image.complete && image.naturalWidth > 0));
      const cards = await page.locator('.certificate-hit-area').evaluateAll(elements => elements.map(element => ({
        href: element.querySelector('.certificate-hit-link').href,
        title: element.querySelector('.certificate-hit-link').getAttribute('aria-label'),
        provider: element.querySelector('.certificate-provider').textContent.trim(),
        logo: element.querySelector('.certificate-provider img')?.getAttribute('alt'),
        preview: new URL(element.querySelector('.certificate-preview img').src).pathname,
        fit: getComputedStyle(element.querySelector('.certificate-preview img')).objectFit,
      })));
      for (const card of cards) {
        const destination = new URL(card.href);
        const source = expected.certificates.find(item => item.id === destination.searchParams.get('certificate'));
        if (destination.origin !== new URL(base).origin || destination.pathname !== '/certificates') {
          throw new Error(`Invalid certificate destination: ${card.href}`);
        }
        if (!source || card.preview !== source.image || !card.title.includes(source.title) || card.fit !== 'contain' || !(card.provider || card.logo)) {
          throw new Error(`Invalid live certificate card: ${JSON.stringify(card)}`);
        }
        seen.add(source.id);
      }
      if (batch + 1 < Math.ceil(expected.certificates.length / 16)) await page.locator('.gallery-next-certificates').click();
    }
    if (seen.size !== expected.certificates.length) throw new Error(`Only ${seen.size}/${expected.certificates.length} certificates reached the live carousel`);
    fs.mkdirSync('verification', { recursive: true });
    await page.screenshot({ path: 'verification/live-certificates.png' });
    fs.writeFileSync('verification/live-certificates.json', JSON.stringify({
      verifiedAt: new Date().toISOString(), url: page.url(), sourceCommit: expected.commit,
      visibleCertificateIds: [...seen], count: seen.size,
      checks: ['production manifest matches', 'all certificates reachable in carousel', 'all previews loaded', 'provider logo or text present', 'titles and certificate detail links match'],
    }, null, 2));
    console.log(`Verified ${seen.size} certificates on ${page.url()} at source commit ${expected.commit}`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
