import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ConfigProvider } from "antd";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: '"Lexend Deca", sans-serif',
                colorPrimary: "#8b5cf6", // Friendly Purple
                borderRadius: 16,
                colorTextHeading: "#1f2937",
              },
              components: {
                Button: {
                  borderRadius: 50, // Pill-shaped buttons are friendlier
                  controlHeightLG: 50,
                  fontSizeLG: 16,
                  fontWeight: 600,
                },
                Input: {
                  borderRadius: 50, // Pill-shaped search bars
                  controlHeightLG: 54,
                  activeShadow: "0 0 0 2px rgba(139, 92, 246, 0.2)",
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
