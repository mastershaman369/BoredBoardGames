// detectStaleChunks.js
// Checks for missing webpack chunk files in .next builds.
const fs = require('fs');
const path = require('path');

function detectStaleChunks() {
  const projectRoot = path.resolve(__dirname, '..');
  const runtimePath = path.join(projectRoot, '.next', 'server', 'webpack-runtime.js');
  const chunksDir = path.join(projectRoot, '.next', 'static', 'chunks');

  if (!fs.existsSync(runtimePath)) {
    console.error('ERROR: webpack-runtime.js not found. Run `npm run build` first.');
    process.exit(1);
  }

  const runtime = fs.readFileSync(runtimePath, 'utf-8');
  const chunkRefs = new Set();
  const regex = /"\.\/([0-9A-Za-z_\-]+)\.js"/g;
  let match;
  while ((match = regex.exec(runtime)) !== null) {
    chunkRefs.add(match[1] + '.js');
  }

  if (!fs.existsSync(chunksDir)) {
    console.error('ERROR: chunks directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const existing = new Set(fs.readdirSync(chunksDir).filter(f => f.endsWith('.js')));
  const missing = [];
  chunkRefs.forEach(chunk => {
    if (!existing.has(chunk)) missing.push(chunk);
  });

  if (missing.length) {
    console.error('Missing chunk files:', missing);
    console.error('Your build cache may be stale. Consider removing `.next` and rebuilding.');
    process.exit(1);
  }

  console.log('All referenced chunks are present.');
  process.exit(0);
}

detectStaleChunks();
