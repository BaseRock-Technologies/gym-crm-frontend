import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/lib/context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gym Management",
  description: "The Gym Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          className={"font-mono antialiased"}
        >
          {children}
          <ToastContainer limit={3} stacked />
        </body>
      </html>
    </AuthProvider>
  );
}
