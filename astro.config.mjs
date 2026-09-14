import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

function remarkMermaid() {
  return function (tree) {
    function visit(node) {
      if (node.type === 'code' && node.lang === 'mermaid') {
        node.type = 'html';
        const encoded = encodeURIComponent(node.value);
        node.value = `<div class="mermaid" data-content="${encoded}">${node.value}</div>`;
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://yagomilenio.github.io',
  base: '/synergia-landing/',
  markdown: {
    remarkPlugins: [
      remarkMermaid,
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
    ],
  },
  integrations: [
    react(),
  ],
});
