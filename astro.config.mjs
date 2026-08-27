import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';

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
  site: 'https://synergia.dev', // placeholder
  markdown: {
    remarkPlugins: [
      remarkMermaid,
    ],
  },
  integrations: [
    react(),
    starlight({
      title: 'Synergia',
      favicon: '/logo-small.jpg',
      head: [
        {
          tag: 'script',
          attrs: {
            type: 'module',
          },
          content: `
            import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs')
              .then((m) => {
                const mermaid = m.default;
                
                function renderMermaid() {
                  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
                  
                  // Restore original diagram code for all elements
                  document.querySelectorAll('.mermaid').forEach(el => {
                    const content = el.getAttribute('data-content');
                    if (content) {
                      el.innerHTML = decodeURIComponent(content);
                      el.removeAttribute('data-processed');
                      el.removeAttribute('id');
                    }
                  });
                  
                  // Initialize Mermaid with the appropriate theme
                  mermaid.initialize({
                    startOnLoad: false,
                    theme: theme === 'light' ? 'default' : 'dark',
                    securityLevel: 'loose',
                    themeVariables: theme === 'light' ? {
                      primaryColor: '#f4f6f8',
                      edgeLabelBackground: '#ffffff',
                    } : {},
                  });
                  
                  // Run Mermaid parser
                  mermaid.run({
                    nodes: document.querySelectorAll('.mermaid')
                  }).catch(err => console.error('Error al renderizar Mermaid:', err));
                }

                // Initial render on load
                if (document.readyState === 'loading') {
                  window.addEventListener('DOMContentLoaded', renderMermaid);
                } else {
                  renderMermaid();
                }

                // Listen to dynamic theme changes (Observer)
                const observer = new MutationObserver((mutations) => {
                  for (const mutation of mutations) {
                    if (mutation.attributeName === 'data-theme') {
                      renderMermaid();
                      break;
                    }
                  }
                });
                observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
                
                // Keep rendering correct theme across Astro page transitions
                window.addEventListener('astro:page-load', renderMermaid);
              })
              .catch((e) => console.error('Error al cargar Mermaid:', e));
          `
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
          },
        },
        {
          tag: 'script',
          content: `
            function renderMath() {
              if (window.renderMathInElement) {
                // Normalize and replace any <br> tags introduced by the markdown parser inside math expressions
                const elms = document.querySelectorAll('p, li, div, td, span');
                elms.forEach(node => {
                  if (node.innerHTML.includes('$$') || node.innerHTML.includes('$')) {
                    let html = node.innerHTML;
                    // Replace <br> tags with dynamic line breaks/newlines so KaTeX can compile multiline expressions
                    html = html.replace(/<br\s*\/?>/gi, ' \\n ');
                    node.innerHTML = html;
                  }
                });

                window.renderMathInElement(document.body, {
                  delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                  ],
                  throwOnError: false
                });
              }
            }

            function loadKaTeX() {
              if (window.renderMathInElement) {
                renderMath();
                return;
              }
              const s1 = document.createElement('script');
              s1.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
              s1.onload = () => {
                const s2 = document.createElement('script');
                s2.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';
                s2.onload = () => {
                  renderMath();
                };
                document.head.appendChild(s2);
              };
              document.head.appendChild(s1);
            }

            // Execute math render on load and on Astro page transitions
            if (document.readyState === 'loading') {
              window.addEventListener('DOMContentLoaded', loadKaTeX);
            } else {
              loadKaTeX();
            }
            window.addEventListener('astro:page-load', loadKaTeX);
          `
        }
      ],
      logo: {
        light: './public/logo.jpg',
        dark: './public/logo-dark.jpg',
      },
      social: [
        { label: 'GitHub', href: 'https://github.com/yagomilenio/synergia-server', icon: 'github' },
      ],
      sidebar: [
        {
          label: 'Visión General',
          items: [
            { label: 'Introducción', link: '/docs/introduccion/' },
            { label: 'Primeros Pasos', link: '/docs/primeros-pasos/' },
          ],
        },
        {
          label: 'Arquitectura y Flujo',
          items: [
            { label: 'Arquitectura del Sistema', link: '/docs/arquitectura/' },
            { label: 'Flujo de Tareas', link: '/docs/flujo-de-tareas/' },
            { label: 'Internals del Worker', link: '/docs/worker-aislamiento/' },
          ],
        },
        {
          label: 'Especificaciones',
          items: [
            { label: 'Modelo Económico', link: '/docs/modelo-economico/' },
            { label: 'Modelo de Datos', link: '/docs/modelo-de-datos/' },
            { label: 'Seguridad y Autenticación', link: '/docs/seguridad/' },
          ],
        },
        {
          label: 'Referencias Técnicas',
          items: [
            { label: 'Referencia config.toml', link: '/docs/config-toml/' },
            { label: 'Contrato Makefile', link: '/docs/contrato-makefile/' },
            { label: 'Comandos del CLI', link: '/docs/cli/' },
            { label: 'API REST (25 endpoints)', link: '/docs/api-rest/' },
            { label: 'API WebSocket', link: '/docs/api-websocket/' },
            { label: 'Métricas Prometheus', link: '/docs/metricas/' },
          ],
        },
        {
          label: 'Tareas de Ejemplo',
          items: [
            { label: 'Repositorios Demostrativos', link: '/docs/tareas-ejemplo/' },
          ],
        },
      ],
      customCss: [
        './src/styles/starlight-custom.css',
      ],
    }),
  ],
});
