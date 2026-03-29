import { ImageResponse } from "next/og";

export const alt = "DARA Marketing Agency - Dare to be Different";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#444444",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 16,
          }}
        >
          DARA
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#B89D5E",
            marginBottom: 12,
          }}
        >
          Dare to be Different
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Marketing Agency
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
