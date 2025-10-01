import { AuthProvider } from "@/lib/context/authContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
