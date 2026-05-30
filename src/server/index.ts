import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

interface ManifestEntry {
  file: string;
  css?: string[];
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../../dist');
const PORT = Number(process.env.PORT) || 3000;

const manifest: Record<string, ManifestEntry> = JSON.parse(
  readFileSync(path.join(distDir, '.vite/manifest.json'), 'utf-8'),
);
const entry = manifest['src/client/main.ts'];

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(distDir));

app.use((_req, res) => {
  res.render('index', {
    title: 'Premier League Teams',
    jsFile: `/assets/${entry.file}`,
    cssFile: entry.css?.[0] ? `/assets/${entry.css[0]}` : null,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
