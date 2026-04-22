import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import React from "react";

interface Zona {
  zona: string;
  tipo_plaga: string;
  frecuencia: string;
  tipo_ubicacion?: string;
  prioridad?: string;
  descripcion?: string;
  fotos?: string[];
}

export interface PilotoSubmission {
  id: string;
  nombre: string;
  cargo: string;
  municipio: string;
  zonas: Zona[];
  interesesControl: string[];
  estado: string;
  createdAt: Date | string;
}

const GREEN = "#2D6A4F";
const DARK_GREEN = "#1A4A3A";
const LIGHT_BG = "#F0F4F2";
const GRAY = "#6B7280";
const BORDER = "#E5E7EB";
const TEXT = "#1A1A1A";

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: TEXT, paddingTop: 40, paddingBottom: 50, paddingHorizontal: 45 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 16, borderBottom: `2px solid ${GREEN}` },
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: DARK_GREEN, marginBottom: 3 },
  headerSubtitle: { fontSize: 10, color: GRAY },
  headerMeta: { fontSize: 9, color: GRAY, textAlign: "right" },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: GREEN, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid ${BORDER}` },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  label: { fontSize: 9, color: GRAY, width: 120 },
  value: { fontSize: 10, color: TEXT, flex: 1, fontFamily: "Helvetica-Bold" },
  valueNormal: { fontSize: 10, color: TEXT, flex: 1 },
  zonaCard: { backgroundColor: LIGHT_BG, borderRadius: 4, padding: 12, marginBottom: 10, border: `1px solid ${BORDER}` },
  zonaHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  zonaNum: { fontSize: 8, fontFamily: "Helvetica-Bold", color: GREEN, textTransform: "uppercase", letterSpacing: 1, marginRight: 8 },
  zonaName: { fontSize: 11, fontFamily: "Helvetica-Bold", color: DARK_GREEN, flex: 1 },
  zonaGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 6 },
  zonaChip: { flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 3, paddingHorizontal: 7, paddingVertical: 3, border: `1px solid ${BORDER}` },
  chipLabel: { fontSize: 8, color: GRAY, marginRight: 4 },
  chipValue: { fontSize: 8, fontFamily: "Helvetica-Bold", color: TEXT },
  prioAlta: { color: "#DC2626" },
  prioMedia: { color: "#D97706" },
  prioBaja: { color: "#16A34A" },
  descripcion: { fontSize: 9, color: GRAY, fontStyle: "italic", marginTop: 4, lineHeight: 1.4 },
  fotosRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  foto: { width: 236, height: 177, borderRadius: 3, objectFit: "cover" },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  tag: { backgroundColor: LIGHT_BG, borderRadius: 3, paddingHorizontal: 8, paddingVertical: 3, border: `1px solid ${BORDER}` },
  tagText: { fontSize: 8, color: GREEN, fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 24, left: 45, right: 45, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: `1px solid ${BORDER}` },
  footerText: { fontSize: 8, color: GRAY },
});

function formatDate(d: Date | string): string {
  const date = new Date(d as string);
  const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function prioColor(p: string | undefined) {
  if (p === "Alta") return s.prioAlta;
  if (p === "Media") return s.prioMedia;
  return s.prioBaja;
}

export function PilotoPDF({ submission }: { submission: PilotoSubmission }) {
  const { nombre, cargo, municipio, zonas, interesesControl, createdAt, id } = submission;
  const generatedAt = formatDate(new Date());

  return (
    <Document
      title={`Solicitud Piloto — ${municipio}`}
      author="XANAEL"
      subject="Solicitud de zona piloto municipal"
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerTitle}>Solicitud de Zona Piloto</Text>
            <Text style={s.headerSubtitle}>XANAEL · Infraestructura sanitaria urbana</Text>
          </View>
          <View>
            <Text style={s.headerMeta}>Ref: #{id.slice(-8).toUpperCase()}</Text>
            <Text style={[s.headerMeta, { marginTop: 2 }]}>Generado: {generatedAt}</Text>
          </View>
        </View>

        {/* Datos de contacto */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Datos de contacto</Text>
          <View style={s.row}>
            <Text style={s.label}>Nombre</Text>
            <Text style={s.value}>{nombre}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Cargo</Text>
            <Text style={s.valueNormal}>{cargo}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Municipio</Text>
            <Text style={s.value}>{municipio}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Fecha de solicitud</Text>
            <Text style={s.valueNormal}>{formatDate(createdAt)}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.label}>Zonas propuestas</Text>
            <Text style={s.valueNormal}>{zonas?.length ?? 0} zona{(zonas?.length ?? 0) !== 1 ? "s" : ""}</Text>
          </View>
        </View>

        {/* Zonas */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Zonas propuestas para el piloto</Text>
          {(zonas ?? []).map((zona, i) => (
            <View key={i} style={s.zonaCard}>
              <View style={s.zonaHeader}>
                <Text style={s.zonaNum}>Zona {i + 1}</Text>
                <Text style={s.zonaName}>{zona.zona}</Text>
              </View>

              <View style={s.zonaGrid}>
                <View style={s.zonaChip}>
                  <Text style={s.chipLabel}>Plaga:</Text>
                  <Text style={s.chipValue}>{zona.tipo_plaga}</Text>
                </View>
                <View style={s.zonaChip}>
                  <Text style={s.chipLabel}>Frecuencia:</Text>
                  <Text style={s.chipValue}>{zona.frecuencia}</Text>
                </View>
                {zona.tipo_ubicacion && (
                  <View style={s.zonaChip}>
                    <Text style={s.chipLabel}>Ubicación:</Text>
                    <Text style={s.chipValue}>{zona.tipo_ubicacion}</Text>
                  </View>
                )}
                {zona.prioridad && (
                  <View style={s.zonaChip}>
                    <Text style={s.chipLabel}>Prioridad:</Text>
                    <Text style={[s.chipValue, prioColor(zona.prioridad)]}>{zona.prioridad}</Text>
                  </View>
                )}
              </View>

              {zona.descripcion && (
                <Text style={s.descripcion}>{zona.descripcion}</Text>
              )}

              {zona.fotos && zona.fotos.length > 0 && (
                <View>
                  <Text style={[s.chipLabel, { marginBottom: 4, marginTop: 6 }]}>
                    Fotografías ({zona.fotos.length})
                  </Text>
                  <View style={s.fotosRow}>
                    {zona.fotos.slice(0, 5).map((src, fi) => (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image key={fi} src={src} style={s.foto} />
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Intereses de control */}
        {interesesControl && interesesControl.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Otros tipos de control de interés</Text>
            <View style={s.tagRow}>
              {interesesControl.map((interes, i) => (
                <View key={i} style={s.tag}>
                  <Text style={s.tagText}>{interes}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>XANAEL · Solicitud zona piloto municipal</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
