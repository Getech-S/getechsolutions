import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getechsolutions.com"),
  title: {
    default: "GeTech Solutions — Engineering High-Impact Digital Futures",
    template: "%s | GeTech Solutions",
  },
  description:
    "GeTech Solutions is a futuristic technology venture building high-impact digital solutions for startups, companies, visionaries, and communities — consultancy, UI/UX design, and web & mobile engineering.",
  keywords: [
    "GeTech Solutions",
    "technology consultancy",
    "UI/UX design",
    "web development",
    "mobile apps",
    "digital solutions",
    "software engineering",
  ],
  openGraph: {
    title: "GeTech Solutions — Engineering High-Impact Digital Futures",
    description:
      "We build lasting tech solutions for startups, companies, visionaries, and communities.",
    url: "https://getechsolutions.com",
    siteName: "GeTech Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GeTech Solutions — Engineering High-Impact Digital Futures",
    description:
      "We build lasting tech solutions for startups, companies, visionaries, and communities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#020406",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-obsidian text-platinum antialiased">
        {children}
      </body>
    </html>
  );
}
