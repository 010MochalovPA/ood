const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'public/bundle.js',
  minify: true,
  sourcemap: true,
  platform: 'browser',
  target: 'es6',
  loader: {
    '.css': 'text',
  },
}).catch(() => process.exit(1));