import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "XANAEL - Infraestructura Urbana Sanitaria Preventiva";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logoData = readFileSync(
    join(process.cwd(), "public/images/logo/logo.webp")
  );
  const logoSrc = `data:image/webp;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1e4535",
          gap: 32,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="XANAEL logo"
          width={180}
          height={180}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            XANAEL
          </span>
          <span
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.75)",
              textAlign: "center",
              maxWidth: 700,
            }}
          >
            Infraestructura Urbana Sanitaria Preventiva
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
