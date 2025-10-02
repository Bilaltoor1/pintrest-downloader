import "./globals.css";

export const metadata = {
  title: "Pinterest Downloader",
  description: "Download Pinterest pins, boards, and profiles with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
