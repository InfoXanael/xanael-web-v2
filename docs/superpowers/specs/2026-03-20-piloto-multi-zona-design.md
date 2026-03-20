# Piloto Multi-Zona Design

**Goal:** Support multiple zones per piloto submission — one set of personal data + N zones.

**Data model:** `PilotoSubmission.zonas Json` — array of `{ zona, tipo_plaga, frecuencia, descripcion?, fotos[] }`. Replaces individual zone fields. Single table, no joins needed.

**API:** `POST /api/piloto` accepts `multipart/form-data`:
- `nombre`, `cargo`, `municipio` — plain fields
- `zonas_meta` — JSON string: `[{ zona, tipo_plaga, frecuencia, descripcion? }]`
- `zona_0_fotos`, `zona_1_fotos`, ... — file arrays per zone index

**Frontend:** Fully controlled state. Two sections:
1. Personal data (nombre, cargo, municipio)
2. Zones list: each zone card has header "Zona N" + X (disabled when only 1), fields, photo upload. "+ Añadir zona" button below list.

**Constraints:** Min 1 zone, no max. Max 5 photos per zone. Validation: all zone required fields must be filled before submit.
