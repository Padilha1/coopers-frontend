import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Coopers - Organize Your Daily Jobs",
  description:
    "A simple and effective To-Do app to help you manage your daily tasks. Boost your productivity with Coopers.",
  keywords: [
    "to-do app",
    "task manager",
    "daily planner",
    "productivity",
    "Coopers",
    "organize tasks",
  ],
  authors: [{ name: "Coopers", url: "https://coopers.digital/pt/" }],
  openGraph: {
    title: "Coopers - Organize Your Daily Jobs",
    description:
      "Boost your productivity by organizing your daily jobs with Coopers.",
    url: "https://coopers.digital/pt/",
    siteName: "Coopers",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Preview of Coopers To-Do App",
    //   },
    // ],
    locale: "en_US", //ou pt_BR
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
      <body className={`${montserrat.variable}  antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
