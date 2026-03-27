# XANAEL Web v2 — Contexto para Claude Code

## Proyecto
xanael-web-v2 — Web pública y dashboard interno de XANAEL (Grupo Rubio)
Repo: InfoXanael/xanael-web-v2, branch: master
Deploy: Vercel automático al hacer push a master

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS + Framer Motion + Lucide React
- next-intl (i18n es/en, localePrefix: always)
- Prisma + PostgreSQL (VPS 116.203.230.143:5432, db xanael_dashboard)
- Vercel Blob Storage
- GA4: G-XE9J0TJ7CW (cargar solo tras consentimiento cookies)

## Estructura clave
- app/[locale]/ — páginas públicas con i18n
- app/dashboard/ — panel interno (sin prefijo locale)
- app/api/ — endpoints (auth, formularios, pipeline, mautic, piloto)
- components/home/ — componentes página principal
- public/images/ — imágenes WebP optimizadas
- messages/ — traducciones i18n JSON
- prisma/schema.prisma — modelos: User, FormSubmission, PipelineLead, PilotoSubmission

## Diseño
- Verde principal: #2D6A4F
- Verde oscuro: #1A4A3A (sidebar dashboard)
- Fondo: #F0F4F2
- Texto: #1A1A1A
- Bordes: máximo rounded-md, nunca rounded-xl ni rounded-full
- Iconos: Lucide React siempre, nunca emojis
- Imágenes: siempre WebP, con sizes prop, alt descriptivo y skeleton loading

## VPS / Mautic
- IP: 116.203.230.143
- SSH: ssh claudeuser@116.203.230.143 (sudo NOPASSWD)
- Mautic URL: https://mautic.xanael.es
- Contenedor: mautic-mautic-1
- CONTEXT.md en VPS: /opt/xanael/CONTEXT.md

## Reglas obligatorias
1. Leer este CLAUDE.md SIEMPRE al inicio de cada sesión
2. npm run build debe pasar sin errores antes de declarar éxito
3. Nunca tocar el builder visual de Mautic — solo editar HTML local y subir via API
4. Todas las páginas públicas bajo app/[locale]/ con metadata en cada page.tsx
5. Nunca usar emojis como iconos — usar Lucide React
6. Skeleton loading con animate-pulse en todas las imágenes
7. Hacer testing visual antes de declarar cualquier cambio completo

## Subagentes disponibles
- xanael-web-dev → web pública, componentes, estilos, i18n
- xanael-dashboard → dashboard interno, Prisma, Mautic proxy
- xanael-mautic → VPS, Mautic, segmentos, campañas, SSH
- xanael-copy → emails, textos web, copy B2G en español
- xanael-legal → RGPD, LSSI, cookies, privacidad
- xanael-seo → meta tags, structured data, sitemap
- xanael-performance → PageSpeed, LCP, imágenes, bundle

No usar Claude Code principal para tareas que un subagente puede manejar.
