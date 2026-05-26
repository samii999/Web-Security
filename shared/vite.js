import { join, resolve } from 'path';
import { createServer } from 'vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

import { tailwindConfig } from './tailwind.config.js';

const base = '/' + join(process.cwd(), 'public').replace(/^[a-zA-Z]:/, '').replace(/\\/g, '/');
const shared = resolve(process.cwd(), '../..', 'shared');

/**
 * @type {import('vite').ViteDevServer}
 */
export const vite = await (async () => {
  try {
    return await createServer({
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
      base,
      resolve: {
        alias: {
          '#shared': shared,
        },
      },
      css: {
        postcss: {
          plugins: [autoprefixer, tailwindcss(tailwindConfig)],
        },
      },
      optimizeDeps: {
        entries: [join(process.cwd(), '/**/*.{html,handlebars,ejs}')],
      },
      plugins: [],
    });
  } catch (error) {
    console.error('Failed to create Vite server:', error);
    throw error;
  }
})();
