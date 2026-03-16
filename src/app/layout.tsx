import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratik & Sneha | Wedding Invitation",
  description:
    "You are cordially invited to the wedding celebration of Pratik & Sneha. Join us on May 1st, 2026 at Hyatt Place.",
  keywords:
    "wedding, invitation, Pratik, Sneha, Indian wedding, Hyatt Place",
  openGraph: {
    title: "Pratik & Sneha | Wedding Invitation",
    description: "Join us as we celebrate our love story!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
