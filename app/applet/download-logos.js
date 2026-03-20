import fs from 'fs';
import path from 'path';
import https from 'https';

const files = [
  'OpenAI.svg',
  'Claude.svg',
  'Gemini.svg',
  'Github.svg',
  'n8n.svg',
  'supabase.svg',
  'Vercel.svg',
  'Python.svg',
  'nextjs.svg',
  'remotion.svg'
];

const dir = path.join(process.cwd(), 'public', 'logo');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

files.forEach(file => {
  const url = `https://raw.githubusercontent.com/gijs-hulsebos/ai-automation-demo/main/public/logo/${file}`;
  const dest = path.join(dir, file);
  https.get(url, (res) => {
    const fileStream = fs.createWriteStream(dest);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded ${file}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${file}: ${err.message}`);
  });
});
