import { ImageResponse } from "next/og";
import { getCelebrityDetail, getOpenGraphImage } from "@/lib/api";

export const runtime = "edge";

export const alt = "Celebrity Profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Image({ params }: Props) {
  const { id } = await params;
  const person = await getCelebrityDetail(id);

  // Fetch the high-resolution image
  const imageSrc = getOpenGraphImage(person.profile_path);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundColor: "#fff1eb",
          position: "relative",
        }}
      >
        {/* Background Image Layer */}
        <img
          src={imageSrc}
          alt={person.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "0% 0%",
          }}
        />

        {/* Text Overlay Layer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: 40,
            left: 40,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "24px 40px",
            borderRadius: 24,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#111827",
              lineHeight: 1,
              marginBottom: 10,
              letterSpacing: "-0.03em",
            }}
          >
            {person.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#8b5cf6",
              backgroundColor: "#f3e8ff",
              padding: "4px 16px",
              borderRadius: 12,
            }}
          >
            {person.known_for_department}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
