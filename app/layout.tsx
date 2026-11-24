import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sacrament-meetings-phi.vercel.app"),
  title: {
    default: "Sunrise Ward | Sacrament Meeting Planner",
    template: "%s | Sunrise Ward Planner",
  },
  description:
    "Plan and review sacrament meeting agendas for bishoprics, branch leaders, and members of Sunrise Ward.",
  openGraph: {
    title: "Sunrise Ward | Sacrament Meeting Planner",
    description:
      "Plan and review sacrament meeting agendas for bishoprics and ward members.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sunrise Ward chapel",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full antialiased`}>
      <body className={`${sourceSans.className} min-h-full flex flex-col`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
