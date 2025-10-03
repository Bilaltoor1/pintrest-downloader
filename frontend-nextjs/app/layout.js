import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://yttmp3.com"),
  title: {
    default: "YTTMP3.com | Pinterest Downloader",
    template: "%s | YTTMP3.com",
  },
  description:
    "Free Pinterest downloader by YTTMP3.com — download Pinterest videos, images, GIFs and boards in HD. Fast, safe, no login required.",
  applicationName: "YTTMP3 Pinterest Downloader",
  keywords: [
    "Pinterest downloader",
    "download Pinterest videos",
    "Pinterest image download",
    "Pinterest GIF downloader",
    "Pinterest board download",
  ],
  openGraph: {
    type: "website",
    url: "https://yttmp3.com",
    title: "YTTMP3.com | Pinterest Downloader",
    siteName: "YTTMP3.com",
    description:
      "Download Pinterest pins (videos, images, GIFs) quickly and safely with YTTMP3.com.",
  },
  twitter: {
    card: "summary",
    title: "YTTMP3.com | Pinterest Downloader",
    description:
      "Free Pinterest downloader for videos, images, GIFs and boards — no login required.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "YTTMP3.com",
    url: "https://yttmp3.com",
    sameAs: ["https://yttmp3.com"],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YTTMP3.com | Pinterest Downloader",
    url: "https://yttmp3.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://yttmp3.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body>
        {children}
        {/* Global JSON-LD */}
        <Script id="ld-org" type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </Script>
        <Script id="ld-website" type="application/ld+json">
          {JSON.stringify(webSiteSchema)}
        </Script>
      </body>
    </html>
  );
}
