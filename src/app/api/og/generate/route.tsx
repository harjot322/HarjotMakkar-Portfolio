import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { baseURL, person } from "@/resources";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Portfolio";

  // Load avatar directly from disk as base64 to avoid network dependencies
  let avatarDataUri = "";
  try {
    const cleanAvatar = (person.avatar || "/images/harjot.jpg").replace(/^\//, "");
    const avatarFile = path.join(process.cwd(), "public", cleanAvatar);
    if (fs.existsSync(avatarFile)) {
      const buf = fs.readFileSync(avatarFile);
      avatarDataUri = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }
  } catch {
    avatarDataUri = "";
  }

  // Graceful font loading with fallback
  let fontData: ArrayBuffer | null = null;
  try {
    const fontUrl = "https://fonts.googleapis.com/css2?family=Geist:wght@600";
    const css = await (
      await fetch(fontUrl, {
        headers: {
          // Use a User-Agent that triggers TTF/OTF responses from Google Fonts
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      })
    ).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
    if (resource) {
      const response = await fetch(resource[1]);
      if (response.ok) {
        fontData = await response.arrayBuffer();
      }
    }
  } catch {
    // Graceful fallback to default system sans-serif
    fontData = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "56px 64px",
          background: "linear-gradient(145deg, #090a0f 0%, #12151f 100%)",
          color: "#ffffff",
          fontFamily: fontData ? "Geist" : "sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(6, 182, 212, 0.12)",
              border: "1px solid rgba(6, 182, 212, 0.35)",
              borderRadius: "9999px",
              padding: "8px 18px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#06b6d4",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#67e8f9",
                fontWeight: 600,
              }}
            >
              Cloud SRE &amp; Platform Architecture
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: "0.02em",
            }}
          >
            harjotmakkar.dev
          </span>
        </div>

        {/* Title Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: title.length > 60 ? "46px" : "54px",
              lineHeight: 1.22,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
              textWrap: "balance",
            }}
          >
            {title}
          </span>
        </div>

        {/* Footer with Author Information */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {avatarDataUri ? (
              <img
                src={avatarDataUri}
                alt={person.name}
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid rgba(6, 182, 212, 0.5)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "#1e293b",
                  border: "2px solid rgba(6, 182, 212, 0.5)",
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {person.name}
              </span>
              <span
                style={{
                  fontSize: "15px",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                {person.role} · Production Engineering Notes
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "14px",
            }}
          >
            <span>Verified Technical Deep-Dive</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Geist",
                data: fontData,
                style: "normal",
              },
            ],
          }
        : {}),
    },
  );
}
