
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FacebookPixel from "@/modules/components/FacebookPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/DBdark.png" id="light-favicon"  media="(prefers-color-scheme: light)"/>
        <link rel="icon" href="/DB.png" id="dark-favicon"  media="(prefers-color-scheme: dark)"/>
        <title>DuhaBum</title>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,100..900;1,100..900&family=Sarpanch:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      
      
      </head>
      <body className={inter.className}>
          {children}
          <FacebookPixel />
      </body>
    </html>
  );
}
