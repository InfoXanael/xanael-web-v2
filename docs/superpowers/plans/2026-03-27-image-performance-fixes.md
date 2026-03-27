# Image Performance Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar peso innecesario de imágenes y corregir configuración de Next.js Image en xanael-web-v2.

**Architecture:** Cambios aislados en ficheros existentes — ningún componente nuevo, ninguna refactorización estructural. Cada tarea es independiente y verificable con `npm run build`.

**Tech Stack:** Next.js 14, next/image, ffmpeg (recompresión WebP)

---

## Hallazgos relevantes del análisis

- `<img>` en PilotoPage.tsx L254: blob: URLs de file inputs — **no se puede convertir a Image**, es uso correcto.
- `infrastructure/bordillo_1.webp` y `compact_model/bordillo_1.webp` son ficheros idénticos (MD5: `238950d6b440107530afb145fcb25dc1`).
- `tapa.png` no tiene ninguna referencia en el código.

---

### Task 1: Eliminar tapa.png sin referencias

**Files:**
- Delete: `public/images/infrastructure/standard_model/tapa.png`

- [ ] **Step 1: Confirmar que no hay referencias**

```bash
grep -r "tapa\.png" --include="*.tsx" --include="*.ts" --include="*.js" .
```
Expected: sin output.

- [ ] **Step 2: Borrar el fichero**

```bash
rm public/images/infrastructure/standard_model/tapa.png
```

- [ ] **Step 3: Build**

```bash
npm run build
```
Expected: ✓ sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "perf: remove unused tapa.png (2.9 MB)"
```

---

### Task 2: Añadir sizes a NewsSection.tsx

**Files:**
- Modify: `components/home/NewsSection.tsx:37-42`

Las tarjetas son `max-w-[340px]` en flex-wrap. En desktop (≥1024px) caben 3 de ~340px; en tablet 2; en móvil 1 columna full-width.

- [ ] **Step 1: Añadir sizes al componente Image**

En `components/home/NewsSection.tsx`, línea 41, añadir:
```tsx
<Image
  src={item.imagen}
  alt={cards(`${item.cardKey}_title`)}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
  className="object-cover"
/>
```

- [ ] **Step 2: Build**

```bash
npm run build
```
Expected: ✓ sin warnings de missing sizes.

- [ ] **Step 3: Commit**

```bash
git add components/home/NewsSection.tsx && git commit -m "perf: add sizes prop to NewsSection images"
```

---

### Task 3: Eliminar bordillo_1.webp duplicado

**Files:**
- Modify: `components/soluciones/SolucionesPage.tsx:201,287`
- Delete: `public/images/infrastructure/bordillo_1.webp`

Los dos ficheros son idénticos (mismo MD5). Mantener `compact_model/bordillo_1.webp` (ya referenciado en la galería L46) y apuntar las dos referencias de root a esa ruta.

- [ ] **Step 1: Actualizar las dos referencias en SolucionesPage.tsx**

Línea 201 y línea 287, cambiar:
```
/images/infrastructure/bordillo_1.webp
```
por:
```
/images/infrastructure/compact_model/bordillo_1.webp
```

- [ ] **Step 2: Borrar el duplicado**

```bash
rm public/images/infrastructure/bordillo_1.webp
```

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "perf: remove duplicate bordillo_1.webp (162 KB)"
```

---

### Task 4: Recomprimir poster.webp

**Files:**
- Replace: `public/images/news/new-3/poster.webp` (2.9 MB → target <300 KB)

ffmpeg disponible en el sistema. Parámetro `-quality 75` con libwebp.

- [ ] **Step 1: Recomprimir**

```bash
ffmpeg -i public/images/news/new-3/poster.webp \
  -c:v libwebp -quality 75 \
  public/images/news/new-3/poster_new.webp \
  && mv public/images/news/new-3/poster_new.webp public/images/news/new-3/poster.webp
```

- [ ] **Step 2: Verificar tamaño resultante**

```bash
ls -lh public/images/news/new-3/poster.webp
```
Expected: <300 KB.

- [ ] **Step 3: Build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add public/images/news/new-3/poster.webp && git commit -m "perf: recompress poster.webp 2.9MB → <300KB"
```
