import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const url = "https://prashrijan.github.io";
const description =
  "An interactive, cinematic journey through the story of Prashrijan Shrestha — a full-stack developer in Sydney building humane, secure web products with the MERN stack.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${profile.name} — ${profile.role}, ${profile.location}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Prashrijan Shrestha",
    "Full-Stack Developer",
    "Sydney",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "MERN",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url,
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
    images: [{ url: "/prashrijan.jpg", width: 1200, height: 1200, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
    images: ["/prashrijan.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: url },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url,
  address: { "@type": "PostalAddress", addressLocality: "Sydney", addressCountry: "AU" },
  sameAs: [profile.github, profile.linkedin],
  alumniOf: "Kent Institute Australia",
  knowsAbout: ["React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Python"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night" className={`${display.variable} ${sans.variable}`}>
      <body className="grain vignette">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
