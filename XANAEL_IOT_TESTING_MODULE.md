# XANAEL — Módulo de Testing IoT y Dispositivos

## Contexto

XANAEL es un sistema de bordillos técnicos de hormigón prefabricado que integra puntos de control permanentes para detección, monitorización y control de plagas urbanas en superficie. La cámara interior del bordillo es compatible con cualquier tecnología: cebos tradicionales, trampas mecánicas, sensores IoT, cámaras, sensores PIR, sistemas de telemetría, dispositivos de CO2, etc.

Vamos a iniciar una fase de testeo real en campo con múltiples dispositivos y tecnologías instalados dentro de los bordillos XANAEL. El objetivo es determinar qué dispositivos funcionan mejor en condiciones urbanas reales, cuáles son más duraderos, cuáles ofrecen mejor relación datos/coste, y cuáles aguantan mejor condiciones climáticas extremas.

Todo esto debe quedar almacenado de forma estructurada en la base de datos PostgreSQL existente del dashboard, accesible y comparable en el futuro.

---

## Qué hay que construir

### 1. Modelo de datos (Prisma + PostgreSQL)

Crea los siguientes modelos en `prisma/schema.prisma`:

```prisma
model TestSite {
  id              String   @id @default(cuid())
  nombre          String
  municipio       String
  provincia       String
  direccion       String?
  coordenadas     String?  // "lat,lng"
  descripcion     String?
  fechaInicio     DateTime
  fechaFin        DateTime?
  estado          String   @default("activo") // activo, finalizado, pausado
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  dispositivos    TestDispositivo[]
  mediciones      TestMedicion[]
  fotos           TestFoto[]
  incidencias     TestIncidencia[]
}

model TestDispositivo {
  id              String   @id @default(cuid())
  siteId          String
  site            TestSite @relation(fields: [siteId], references: [id])
  nombre          String   // ej. "Anticimex Smart Eye #1"
  fabricante      String?  // ej. "Anticimex", "Rentokil", "TrapMe", custom
  modelo          String?
  tipo            String   // sensor_pir, camara, trampa_mecanica, trampa_co2, cebo_inteligente, sensor_temperatura, sensor_humedad, telemetria, otro
  conectividad    String?  // wifi, lora, 4g, bluetooth, sin_conectividad
  numeroSerie     String?
  posicionBordillo String? // interior_camara, orificio_frontal, tapa_superior, exterior
  fechaInstalacion DateTime
  fechaRetirada   DateTime?
  estado          String   @default("activo") // activo, retirado, averiado, en_revision
  notas           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  mediciones      TestMedicion[]
  fotos           TestFoto[]
  incidencias     TestIncidencia[]
}

model TestMedicion {
  id              String   @id @default(cuid())
  siteId          String
  site            TestSite @relation(fields: [siteId], references: [id])
  dispositivoId   String?
  dispositivo     TestDispositivo? @relation(fields: [dispositivoId], references: [id])
  fecha           DateTime
  tipo            String   // deteccion_roedor, deteccion_insecto, temperatura, humedad, consumo_cebo, imagen_capturada, actividad_pir, alerta, otro
  valor           Float?   // valor numérico si aplica
  unidad          String?  // ej. "°C", "%", "detecciones", "gramos"
  descripcion     String?
  confianza       Float?   // 0-1 para detecciones IA
  fuenteDatos     String?  // manual, automatico_dispositivo, automatico_api
  createdAt       DateTime @default(now())
}

model TestFoto {
  id              String   @id @default(cuid())
  siteId          String
  site            TestSite @relation(fields: [siteId], references: [id])
  dispositivoId   String?
  dispositivo     TestDispositivo? @relation(fields: [dispositivoId], references: [id])
  url             String   // Vercel Blob URL
  tipo            String   // instalacion, deteccion, incidencia, comparativa, estado_dispositivo, caso_exito, otro
  descripcion     String?
  fecha           DateTime @default(now())
  autor           String?
  createdAt       DateTime @default(now())
}

model TestIncidencia {
  id              String   @id @default(cuid())
  siteId          String
  site            TestSite @relation(fields: [siteId], references: [id])
  dispositivoId   String?
  dispositivo     TestDispositivo? @relation(fields: [dispositivoId], references: [id])
  tipo            String   // averia_dispositivo, vandalismo, condicion_climatica, fallo_conectividad, bateria_baja, resultado_inesperado, otro
  severidad       String   @default("media") // baja, media, alta, critica
  descripcion     String
  accionTomada    String?
  resuelta        Boolean  @default(false)
  fecha           DateTime @default(now())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model TestEvaluacion {
  id              String   @id @default(cuid())
  dispositivoId   String   @unique
  // Puntuaciones 1-10
  fiabilidadDeteccion    Float?
  resistenciaClimatica   Float?
  facilidadInstalacion   Float?
  facilidadMantenimiento Float?
  autonomiaBateria       Float?
  calidadDatos           Float?
  relacionCalidadPrecio  Float?
  compatibilidadXanael   Float?
  puntuacionTotal        Float?   // calculada automáticamente
  recomendado            Boolean  @default(false)
  notas                  String?
  updatedAt              DateTime @updatedAt
}
```

---

### 2. APIs necesarias (Next.js App Router)

Crea las siguientes rutas en `app/api/testing/`:

- `GET/POST /api/testing/sites` — listar y crear sitios de testeo
- `GET/PUT/DELETE /api/testing/sites/[id]` — detalle, editar, eliminar
- `GET/POST /api/testing/dispositivos` — listar y registrar dispositivos
- `GET/PUT /api/testing/dispositivos/[id]` — detalle y editar
- `POST /api/testing/mediciones` — registrar medición (individual o batch)
- `GET /api/testing/mediciones` — listar con filtros por site, dispositivo, tipo, rango fechas
- `POST /api/testing/fotos` — subir foto a Vercel Blob y guardar metadatos
- `GET /api/testing/fotos` — listar fotos con filtros
- `POST /api/testing/incidencias` — registrar incidencia
- `GET/PUT /api/testing/incidencias/[id]` — detalle y resolver
- `GET/PUT /api/testing/evaluaciones/[dispositivoId]` — obtener y actualizar evaluación
- `GET /api/testing/stats` — estadísticas globales del módulo (para dashboard)
- `GET /api/testing/comparativa` — comparativa entre dispositivos por puntuaciones y métricas

Todas las APIs deben usar el middleware de autenticación existente del dashboard. Devuelven JSON. Incluir paginación en los endpoints de listado.

---

### 3. Sección en el dashboard

Crea una nueva sección en el dashboard en `app/dashboard/testing/`. Estructura de páginas:

#### `/dashboard/testing` — Vista general
- KPI cards: sitios activos, dispositivos instalados, total mediciones, incidencias abiertas
- Mapa de sitios (si hay coordenadas, usar un componente simple con leaflet o similar)
- Tabla resumen de sitios activos con estado y últimas mediciones
- Acceso rápido a registrar nueva medición o incidencia

#### `/dashboard/testing/sites` — Gestión de sitios
- Listado de todos los sitios con filtros por estado y municipio
- Botón crear nuevo sitio
- Por cada sitio: nombre, municipio, fechas, nº dispositivos, nº mediciones, estado

#### `/dashboard/testing/sites/[id]` — Detalle de sitio
- Info completa del sitio
- Lista de dispositivos instalados en ese sitio con su estado
- Timeline de mediciones (gráfica temporal por tipo)
- Galería de fotos del sitio organizadas por tipo
- Lista de incidencias
- Botón "Añadir medición", "Añadir foto", "Registrar incidencia"

#### `/dashboard/testing/dispositivos` — Catálogo de dispositivos
- Todos los dispositivos registrados con filtros por tipo, fabricante, estado
- Tabla comparativa con puntuaciones de evaluación
- Gráfica de barras comparativa de puntuaciones entre dispositivos

#### `/dashboard/testing/dispositivos/[id]` — Detalle de dispositivo
- Ficha completa: fabricante, modelo, tipo, conectividad, fechas
- Historial de mediciones de ese dispositivo
- Fotos específicas del dispositivo
- Incidencias relacionadas
- Formulario de evaluación con sliders 1-10 para cada criterio
- Puntuación total calculada automáticamente

#### `/dashboard/testing/mediciones/nueva` — Registrar medición
- Formulario: seleccionar sitio → seleccionar dispositivo → tipo de medición → valor/descripción → fecha
- Soporte para registro manual y bulk (subir CSV)

#### `/dashboard/testing/fotos/subir` — Subir fotos
- Upload múltiple a Vercel Blob
- Campos: sitio, dispositivo (opcional), tipo, descripción, fecha
- Vista previa antes de confirmar

#### `/dashboard/testing/comparativa` — Comparativa de dispositivos
- Tabla pivotante: dispositivos en filas, criterios de evaluación en columnas
- Gráfica radar por dispositivo
- Filtros por tipo de dispositivo
- Exportar a CSV o PDF

#### `/dashboard/testing/casos-exito` — Casos de éxito
- Galería de casos documentados con fotos, descripción, municipio, resultados
- Cada caso vinculado a un sitio de testeo
- Exportable como dossier (preparar datos para que luego se pueda generar PDF)

---

### 4. Tipos de dispositivos que hay que contemplar

El sistema debe estar preparado para registrar y comparar los siguientes tipos de dispositivos que se van a testear en los bordillos XANAEL:

**Detección de roedores:**
- Sensores PIR (infrarrojo pasivo) — detectan movimiento por calor corporal
- Cámaras con visión nocturna — captura de imágenes/vídeo
- Cámaras térmicas — detectan huella calórica de roedores
- Sensores de vibración/presión — detectan peso o movimiento sobre superficie
- Break-beam sensors — haz de luz infrarrojo que se interrumpe al paso del roedor

**Control activo:**
- Trampas mecánicas tradicionales con sensor de activación (snap trap conectado)
- Trampas de CO2 humanitarias con telemetría
- Portacebos con sensor de consumo (mide pérdida de peso del cebo)
- Trampas pegajosas con cámara

**Monitorización ambiental:**
- Sensor de temperatura interior del bordillo
- Sensor de humedad interior
- Sensor de temperatura exterior (comparativa interior/exterior)
- Sensor de luz (detecta si la tapa ha sido abierta)
- Sensor de inundación/agua (para zonas con riesgo de encharcamiento)

**Conectividad y telemetría:**
- WiFi (requiere cobertura cercana)
- LoRa/LoRaWAN (largo alcance, bajo consumo — ideal urbano)
- 4G/LTE (independiente, más costoso)
- Bluetooth + gateway (económico, rango limitado)
- Sin conectividad / lectura manual en visita

**Sistemas integrados (fabricantes referencia):**
- Anticimex Smart Eye / Smart Rodent
- Rentokil RADAR Connect
- TrapMe (trampa conectada)
- Sistemas custom con Arduino/Raspberry Pi
- Soluciones propias XANAEL a desarrollar

---

### 5. Variables a registrar por dispositivo para comparativa

Para cada dispositivo en cada sitio se deben poder registrar y comparar:

**Rendimiento técnico:**
- Tasa de detección real vs falsos positivos
- Tiempo de respuesta (detección → alerta)
- Uptime / disponibilidad del dispositivo
- Duración de batería real vs especificada
- Pérdida de datos (% mediciones fallidas)

**Resistencia y durabilidad:**
- Comportamiento en lluvia / humedad alta
- Comportamiento en frío extremo / calor extremo
- Resistencia a vandalismo
- Estado físico del dispositivo en revisiones

**Operacional:**
- Tiempo de instalación en bordillo
- Frecuencia de mantenimiento requerida
- Facilidad de acceso para técnico
- Compatibilidad con la cámara interior del bordillo
- Compatibilidad con los orificios frontales del bordillo

**Económico:**
- Coste del dispositivo
- Coste de conectividad mensual
- Coste de mantenimiento estimado
- Coste total por detección confirmada

---

### 6. Consideraciones técnicas

- Usar Vercel Blob para almacenamiento de fotos e imágenes. Las URLs se guardan en PostgreSQL.
- Las fotos deben tener thumbnails automáticos o lazy loading para no penalizar rendimiento.
- El esquema debe soportar importación de datos desde dispositivos IoT vía webhook o API POST — dejar endpoint `/api/testing/mediciones/ingest` preparado con autenticación por API key para recibir datos automáticos de dispositivos conectados.
- Todos los formularios deben tener validación con zod.
- Usar los componentes UI existentes del dashboard (shadcn/ui).
- Mantener consistencia visual con el resto del dashboard.
- Ejecutar `npm run build` antes de declarar completo.
- Aplicar migraciones con `npx prisma migrate dev --name add_testing_module`.

---

### 7. Qué NO hay que hacer ahora

- No construir integración real con dispositivos IoT (eso vendrá después)
- No construir generador de PDF de casos de éxito (preparar los datos, la generación después)
- No construir el mapa interactivo si complica el build (dejarlo como placeholder)
- No añadir IA de análisis de imágenes (se añadirá cuando haya datos reales)

---

## Resultado esperado

Al terminar debe existir en el dashboard una sección completa `/dashboard/testing` donde se puede:

1. Registrar sitios de testeo piloto con toda su información
2. Dar de alta dispositivos con sus especificaciones técnicas
3. Registrar mediciones manualmente o por API
4. Subir fotos de instalación, detecciones e incidencias
5. Registrar y gestionar incidencias
6. Evaluar cada dispositivo con puntuaciones por criterio
7. Ver una comparativa visual entre todos los dispositivos testados
8. Consultar casos de éxito documentados

Todo almacenado en PostgreSQL, seguro, accesible y comparable en el futuro.
