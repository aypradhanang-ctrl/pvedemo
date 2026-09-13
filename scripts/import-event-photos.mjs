import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const selections = JSON.parse(await readFile(path.join(root, "data/photo-selections.json"), "utf8"));
const cache = "/tmp/pve-event-photo-originals";
await mkdir(cache, { recursive: true });
const albums = [];

for (const event of selections) {
  const folderPath = path.join(cache, `${event.slug}.html`);
  execFileSync("curl", ["-fLsS", "--retry", "2", `https://drive.google.com/drive/folders/${event.folderId}`, "-o", folderPath]);
  const html = await readFile(folderPath, "utf8");
  const outputDirectory = path.join(root, "public/images/gallery", event.slug);
  await mkdir(outputDirectory, { recursive: true });
  const photos = [];
  for (const [index, [filename, description]] of event.photos.entries()) {
    const escaped = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = html.match(new RegExp(`aria-label="${escaped} Image[^" ]*[^\"]*"[^>]*ssk='[^']*?:([A-Za-z0-9_-]{20,})-0-`));
    if (!match) throw new Error(`Cannot resolve exact source file: ${event.slug}/${filename}`);
    const sourceId = match[1];
    const original = path.join(cache, `${event.slug}-${filename}`);
    if (!(await stat(original).catch(() => null))) {
      execFileSync("curl", ["-fLsS", "--retry", "2", `https://drive.google.com/uc?export=download&id=${sourceId}`, "-o", original]);
    }
    let input = original;
    if (filename.endsWith(".ARW")) {
      input = `${original}.jpg`;
      execFileSync("sips", ["-s", "format", "jpeg", original, "--out", input]);
    }
    const outputName = index === 0 ? "cover.webp" : `photo-${index}.webp`;
    const output = path.join(outputDirectory, outputName);
    const info = await sharp(input).rotate().resize({ width: index === 0 ? 2400 : 1600, height: index === 0 ? 2400 : 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 84 }).toFile(output);
    if (info.width < 800 || info.height < 500) throw new Error(`Source too small: ${filename}`);
    photos.push({ src: `/images/gallery/${event.slug}/${outputName}`, width: info.width, height: info.height, alt: `${description} at ${event.title}`, sourceFilename: filename, sourceUrl: `https://drive.google.com/file/d/${sourceId}/view` });
    console.log(`${event.slug}/${outputName}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
  }
  albums.push({ slug: event.slug, title: event.title, location: event.location, artist: event.artist, photos });
}
await writeFile(path.join(root, "data/gallery-assets.json"), `${JSON.stringify(albums, null, 2)}\n`);
console.log(`Imported ${albums.length} albums. Original files remain outside the repository.`);
