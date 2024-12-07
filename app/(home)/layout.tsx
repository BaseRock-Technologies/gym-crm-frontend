import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import BreadCrumbs from "@/components/BreadCrumbs";

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
        <body className={"font-mono antialiased"}>
          <SidebarProvider>
            <AppSidebar />
            <main className="overflow-hidden">
              <BreadCrumbs />
              {children}
              <ToastContainer limit={3} stacked />
            </main>
          </SidebarProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
