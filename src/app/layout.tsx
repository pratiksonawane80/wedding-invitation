import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Pratik & Sneha | Wedding Invitation",
  icons: {
    icon: "/tab-icon.png",
  },
  description:
    "You are cordially invited to the wedding celebration of Pratik & Sneha. Join us on May 1st, 2026 at Hyatt Place.",
  keywords:
    "wedding, invitation, Pratik, Sneha, Indian wedding, Hyatt Place",
  openGraph: {
    title: "Pratik & Sneha | Wedding Invitation",
    description: "Join us as we celebrate our love story!",
    images: [
      {
        url: "https://wedding-invitation-kappa-ebon.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pratik & Sneha | Wedding Invitation",
      },
    ],
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = savedTheme || systemTheme;
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Failed to set theme:', e);
                }
              })()
            `,
          }}
        />
      </head>
      <body>
        <ThemeToggle />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
