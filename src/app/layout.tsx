import type { Metadata } from "next";
import type { ReactNode } from "react";

import { therapistSiteData } from "@/content/therapist";

import "./globals.css";

export const metadata: Metadata = {
  title: therapistSiteData.site.title,
  description: therapistSiteData.site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
