// Regenerates the project thumbnails by screenshotting the real apps.
//   npm run thumbs                -> all, from local dev servers
//   npm run thumbs -- tips dice   -> only names containing "tips" or "dice"
//   npm run thumbs -- --live      -> from the deployed GitHub Pages sites
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { thumbnails } from "./thumbnails.config.mjs";

const args = process.argv.slice(2);
const useLive = args.includes("--live");
const filters = args.filter((a) => !a.startsWith("--"));
const outDir = fileURLToPath(new URL("../src/assets/img/projects/", import.meta.url));
const VIEW = { width: 1280, height: 800 };
const OUT = { width: 1600, height: 1000 };

const targets = thumbnails.filter((t) => !filters.length || filters.some((f) => t.name.includes(f)));
await mkdir(outDir, { recursive: true });

// PNG -> WebP using the browser's own encoder, so no image dependency is needed.
const toWebp = (page, base64) =>
  page.evaluate(
    async ({ base64, w, h }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${base64}`;
      await img.decode();
      const canvas = Object.assign(document.createElement("canvas"), { width: w, height: h });
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const blob = await new Promise((r) => canvas.toBlob(r, "image/webp", 0.86));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let s = "";
      for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return btoa(s);
    },
    { base64, ...{ w: OUT.width, h: OUT.height } }
  );

const browser = await chromium.launch({ channel: "chrome" });
const encoder = await browser.newPage();
let failed = 0;

for (const t of targets) {
  const view = t.view ?? VIEW;
  const page = await browser.newPage({ viewport: view, deviceScaleFactor: 2 });
  try {
    await page.goto(useLive ? t.live : t.local, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(800);
    await t.steps(page);
    await page.waitForTimeout(900);

    // 16:10 crop centred on the focus element, clamped to the viewport.
    let clip = { x: 0, y: 0, ...view };
    const box = t.focus && (await page.locator(t.focus).first().boundingBox().catch(() => null));
    if (box) {
      const h = Math.min(view.height, Math.max(520, box.height + 160));
      const w = Math.min(view.width, h * 1.6);
      const hh = w / 1.6;
      clip = {
        x: Math.min(Math.max(0, box.x + box.width / 2 - w / 2), view.width - w),
        y: Math.min(Math.max(0, box.y + box.height / 2 - hh / 2), view.height - hh),
        width: w,
        height: hh,
      };
    }
    const png = (await page.screenshot({ clip })).toString("base64");
    const webp = await toWebp(encoder, png);
    await writeFile(`${outDir}${t.name}.webp`, Buffer.from(webp, "base64"));
    console.log(`ok   ${t.name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${t.name}: ${e.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);
