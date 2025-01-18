import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/lib/context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import BreadCrumbs from "@/components/common/BreadCrumbs";

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
            <main className="relative w-full max-h-screen overflow-hidden bg-backgroundSupport">
              <BreadCrumbs />
              <div className=" pt-12 w-full h-full overflow-y-auto">
                {children}
                <ToastContainer limit={3} stacked />
              </div>
            </main>
          </SidebarProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
