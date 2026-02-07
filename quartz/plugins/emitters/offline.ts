import { QuartzEmitterPlugin } from "../types"
import { joinSegments } from "../../util/path"
import { write } from "./helpers"

export const Offline: QuartzEmitterPlugin = () => ({
    name: "Offline",
    getQuartzComponents() {
        return []
    },
    async emit({ argv, cfg }, _content, _resources) {
        // Generate Manifest
        const manifest = {
            name: "DevEnsino",
            short_name: "DevEnsino",
            description: "Conteúdo sobre Tecnologia, Produtividade e IA",
            theme_color: "#EA580C",
            background_color: "#faf8f8",
            display: "standalone",
            orientation: "portrait",
            scope: "/",
            start_url: "/",
            icons: [
                {
                    src: "/static/icon.svg",
                    sizes: "any",
                    type: "image/svg+xml",
                },
            ],
        }

        await write({
            ctx: { argv, cfg },
            slug: "manifest",
            ext: ".json",
            content: JSON.stringify(manifest, null, 2),
        })

        // Generate Service Worker
        const sw = `
const CACHE_NAME = 'devensino-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/icon.svg',
  '/styles/custom.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
`

        await write({
            ctx: { argv, cfg },
            slug: "sw",
            ext: ".js",
            content: sw,
        })

        return []
    },
})
