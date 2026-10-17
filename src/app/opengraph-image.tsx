import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Just Distinguish Films. Stories Worth Feeling.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 90px",
          color: "#f0e8dc",
          background: "linear-gradient(135deg, #0a0708 0%, #1b1416 55%, #4a0b10 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={340} alt="" style={{ borderRadius: 340 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 8, color: "#d6a24a", textTransform: "uppercase" }}>Movies &amp; Entertainment</div>
          <div style={{ marginTop: 22, fontSize: 96, fontWeight: 700, lineHeight: 0.95, textTransform: "uppercase" }}>Just Distinguish</div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.95, textTransform: "uppercase", color: "#e63946" }}>Films</div>
          <div style={{ marginTop: 28, fontSize: 38, fontStyle: "italic", color: "#d6a24a" }}>Stories Worth Feeling.</div>
        </div>
      </div>
    ),
    size,
  );
}
