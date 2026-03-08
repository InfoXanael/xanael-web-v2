# XANAEL Web v2 — Contexto para Claude Code

## Regla principal
NUNCA explores el proyecto al inicio de una tarea. Lee este archivo y ve directo a los archivos indicados en cada prompt.

## Stack
- Next.js 14 + TypeScript + Tailwind CSS
- Prisma ORM + SQLite (dev.db en raíz)
- Autenticación: cookies httpOnly propias (sin NextAuth)

## Estructura de carpetas clave
src/
  app/
    dashboard/        → Panel interno (protegido)
    login/            → Página de login
    api/
      auth/           → login/route.ts, logout/route.ts
      formularios/    → API formularios
      pipeline/       → API pipeline
  components/
    Header.tsx
    Footer.tsx
    Hero.tsx
    SurfaceSection.tsx
    ProductSection.tsx
  lib/
    auth.ts           → usuarios hardcodeados
prisma/
  schema.prisma
public/
  images/

## Modelos Prisma
- User (id, email, name, image, createdAt)
- FormSubmission (id, tipo, nombre, email, telefono, empresa, sector, mensaje, estado, notas, syncMautic, createdAt, updatedAt)
- PipelineLead (id, nombre, empresa, email, telefono, origen, etapa, notas, ultimoContacto, createdAt, updatedAt)

## Autenticación
Cookie httpOnly: dashboard_session
Usuarios:
- ayoub@xanael.es / xanael2026ayoub
- carlos@xanael.es / xanael2026carlos
Middleware protege: /dashboard/*
Redirige a: /login

## Colores y diseño
- Verde principal: #2D6A4F
- Verde oscuro (sidebar): #1A4A3A
- Fondo contenido: #F0F4F2
- Fondo gris secciones: #F5F5F5
- Texto: #1A1A1A
- Bordes redondeados: rounded-md máximo, nunca rounded-xl ni rounded-full
- Tipografía: igual que la web pública

## Páginas del dashboard
- /dashboard → Vista general con KPIs y feed actividad
- /dashboard/formularios → Bandeja por tipo (comercial, instalador, general, incidencia)
- /dashboard/pipeline → Kanban con drag & drop
- /dashboard/mautic → Placeholder (pendiente)
- /dashboard/analytics → Placeholder (pendiente)
- /dashboard/configuracion → Placeholder (pendiente)

## Integración Mautic
- Pendiente configurar URL del VPS
- Solo formularios tipo "comercial" e "instalador" se sincronizan
- API REST con Basic Auth

## Páginas públicas
- / → Home
- /infraestructuras → Página de producto (antes /soluciones)
- /nosotros
- /noticias
- /contacto
- /colaboradores
- /distribuidores

## Reglas de trabajo
1. Lee CLAUDE.md primero, no explores el proyecto
2. Toca solo los archivos indicados en el prompt
3. No reescribas archivos completos si solo hay que cambiar una cosa
4. Usa str_replace para cambios puntuales
5. Confirma qué vas a hacer antes de empezar si hay dudas

## Web pública — Componentes clave
- Header.tsx → navegación sticky, transparente en home, oscuro en interiores, logo SVG
- Footer.tsx → logo footer en logo.webp (pendiente fix), enlaces navegación + legales
- Hero.tsx → banner principal con imagen hero-banner.webp
- SurfaceSection.tsx → sección vídeo YouTube (url: ztZ8FHfuzbQ), pendiente rediseño
- ProductSection.tsx → acordeones con imágenes de producto
- NewsSection.tsx → 3 noticias desde src/data/noticias.ts
- ScrollRevealText.tsx → texto animado al scroll
- NewsletterSection.tsx → banda verde newsletter

## Imágenes públicas relevantes
public/images/
  hero-banner.webp
  textura-hormigon.jpg
  logo/logo.svg (header)
  logo/logo.webp (footer, pendiente fix)
  nosotros/expocida-fundadores.jpeg
  nosotros/expocida-equipo.jpeg
  nosotros/bordillo-prototipo.jpeg
  infraestructuras/bordillo_1/2/3.webp (Modelo Compact)
  infraestructuras/standard_model/bordillo_1/2/3.webp (Modelo Standard)
  infraestructuras/basuras.webp

## Producto — datos técnicos bordillo
- Modelo Compact: 40x50x14cm, agujeros frontales 5cm diámetro, cámara interna 35x45x12cm
- Modelo Standard: peso 42kg, acceso circular termitas, 2 ranuras laterales para varilla con cebo, sin bandeja técnica
