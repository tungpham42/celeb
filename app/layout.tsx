import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ConfigProvider } from "antd";
import { Metadata } from "next";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://celeb.soft.io.vn"), // Crucial for OpenGraph
  title: "Celebrity Finder",
  description: "Find your favorite stars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3585118770961536`}
          crossOrigin="anonymous"
        />
      </head>
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
        <GoogleAnalytics ga_id="G-HHXZSNQ65X" />
      </body>
    </html>
  );
}
