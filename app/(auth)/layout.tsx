import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export const metadata: Metadata = {
  title: "Fitpass",
  description: "The Fitpass",
  icons: {
    icon: "./logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className="overflow-hidden">
        <body className={"font-mono antialiased"}>
          {children}
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
}
