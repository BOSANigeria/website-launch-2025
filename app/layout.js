import "./globals.css";
import ClientLayout from "../components/layout/ClientLayout";

export const metadata = {
  title: "Body of Senior Advocates of Nigeria (BOSAN) | Membership, News & Events",
  description:
    "Nigeria’s elite legal association. Access latest announcements, notable SANs in the body, and BOSAN news, Induction, many more.",
  keywords: [
    "Body of Senior Advocates of Nigeria",
    "BOSAN",
    "Senior Advocates of Nigeria",
    "How to become a SAN in Nigeria",
    "SAN Nigeria",
    "Legal Practitioners Privileges Committee",
    "Nigerian legal system",
    "BOSAN events",
    "Nigerian Bar Association",
    "List of SANs in Nigeria",
  ],
  authors: [{ name: "Hokage Creative Labs", url: "https://hokagecreativelabs.com" }],
  creator: "Hokage Creative Labs",
  publisher: "BOSAN Nigeria",
  metadataBase: new URL("https://bosanigeria.com"),
  icons: {
    icon: "/assets/BOSAN-logo.png", // Favicon (ensure it exists in /public/assets)
    shortcut: "/assets/BOSAN-logo.png",
    apple: "/assets/BOSAN-logo.png",
  },
  openGraph: {
    title: "Body of Senior Advocates of Nigeria (BOSAN)",
    description:
      "Official website of the Body of Senior Advocates of Nigeria. Discover how to become a SAN, view recent appointees, announcements, upcoming events and explore BOSAN's impact on legal reform in Nigeria.",
    url: "https://bosanigeria.com",
    siteName: "BOSAN Nigeria",
    images: [
      {
        url: "https://bosanigeria.com/og-image.jpg", // should be a wide 1200x630 image with logo + branding
        width: 1200,
        height: 630,
        alt: "BOSAN - Body of Senior Advocates of Nigeria",
        type: "image/jpeg",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body of Senior Advocates of Nigeria (BOSAN)",
    description:
      "The elite legal body of Nigeria's Senior Advocates. Get updates on appointments, announcements, upcoming events, scholarships, inductions and legal excellence.",
    site: "@bosan_ng",
    creator: "@bosan_ng",
    images: ["https://bosanigeria.com/og-image.jpg"],
  },
  themeColor: "#4BADFD",
  category: "Legal",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  applicationName: "BOSAN Nigeria",
  generator: "Next.js",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
