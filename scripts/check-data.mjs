/**
 * Zusatzprüfung der Fahrzeugdaten.
 *
 * Feldtypen und Pflichtfelder prüft Astro beim Build automatisch
 * (siehe src/content.config.ts). Dieses Skript prüft, was ein Schema
 * nicht wissen kann: ob die eingetragenen Fotos wirklich existieren.
 *
 * Aufruf:  npm run check
 */
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const notes = [];

/** Sehr einfacher Frontmatter-Leser: nur die Felder, die wir hier brauchen. */
const read = (file) => {
  const raw = readFileSync(file, 'utf8');
  const fm = raw.split('---')[1] ?? '';
  const name = (k) => fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?`, 'm'))?.[1]?.trim();
  /* Zeilenweise statt per Regex: die YAML-Liste endet beim nächsten
     Schlüssel auf oberster Ebene. (JS-Regex kennt kein \Z.) */
  const photos = [];
  const lines = fm.split('\n');
  const start = lines.findIndex((l) => /^photos:/.test(l));
  if (start !== -1 && !/^photos:\s*\[\]/.test(lines[start])) {
    for (const line of lines.slice(start + 1)) {
      if (/^\S/.test(line)) break;                    // nächster Schlüssel
      const m = line.match(/^\s*-\s*"?([^"]+?)"?\s*$/);
      if (m) photos.push(m[1].trim());
    }
  }
  return { make: name('make'), model: name('model'), photos };
};

const check = (folder, label) => {
  const dir = join(root, 'src/content', folder);
  if (!existsSync(dir)) return;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const id = file.replace(/\.md$/, '');
    const { make, model, photos } = read(join(dir, file));
    const where = `${label}: ${make ?? '?'} ${model ?? '?'} (${id})`;

    if (!/^[a-z0-9-]+$/.test(id))
      problems.push(`${where}: Dateiname darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.`);

    if (photos.length) {
      /* photos enthalten vollständige Pfade ab /, z. B. /vehicles/<id>/01.jpg */
      for (const rel of photos) {
        if (!rel.startsWith('/')) {
          problems.push(`${where}: Bildpfad "${rel}" muss mit / beginnen.`);
          continue;
        }
        if (!existsSync(join(root, 'public', rel.slice(1))))
          problems.push(`${where}: Bild "${rel}" liegt nicht unter public${rel} (Gross-/Kleinschreibung beachten).`);
      }
    } else {
      notes.push(`${where}: noch keine Fotos — es wird der ACS-Platzhalter gezeigt.`);
    }
  }
  return readdirSync(dir).filter((f) => f.endsWith('.md')).length;
};

const nStock = check('vehicles', 'Bestand') ?? 0;
const nSold = check('sold', 'Verkauft') ?? 0;

// Ein Fahrzeug darf nicht in beiden Listen stehen
const ids = (f) => existsSync(join(root, 'src/content', f))
  ? readdirSync(join(root, 'src/content', f)).filter((x) => x.endsWith('.md')).map((x) => x.replace(/\.md$/, ''))
  : [];
for (const id of ids('vehicles'))
  if (ids('sold').includes(id))
    problems.push(`"${id}" steht gleichzeitig im Bestand UND im Verkauft-Archiv — beim Verkaufen die Datei verschieben, nicht kopieren.`);

console.log(`\n  Bestand:  ${nStock} Fahrzeug(e)`);
console.log(`  Verkauft: ${nSold} Fahrzeug(e)\n`);

if (notes.length) {
  console.log('  Hinweise (kein Fehler):');
  for (const n of notes) console.log(`   · ${n}`);
  console.log('');
}
if (problems.length) {
  console.error(`  ${problems.length} Problem(e) gefunden:\n`);
  for (const p of problems) console.error(`   ✗ ${p}`);
  console.error('\n  Bitte beheben, dann "npm run check" erneut ausführen.\n');
  process.exit(1);
}
console.log('  ✓ Alles in Ordnung — bereit für "npm run build".\n');
