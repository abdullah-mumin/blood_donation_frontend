import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Blood Hero",
  description: "Join BloodHero: Save lives through blood donation today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <>
            <Toaster position="top-center" />
            {children}
          </>
        </body>
      </html>
    </Providers>
  );
}
