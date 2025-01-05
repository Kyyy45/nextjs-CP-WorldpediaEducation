import "@/styles/globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import Providers from "@/provider/providers";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Worldpedia Education",
  description: "Web Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-black text-foreground antialiased max-w-full overflow-x-hidden",
            font.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors theme="light" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
