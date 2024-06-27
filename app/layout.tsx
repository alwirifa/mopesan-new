import type { Metadata } from "next";
import { Noah } from "@/utils/customFonts";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UserContext";

export const metadata: Metadata = {
  title: "Mopesan",
  description: "Mopesan",
  icons: {
    icon:['/favicon/favicon.ico?v=4'],
    apple:['/favicon/apple-touch-icon.png?v=4'],
    shortcut:['/favicon/apple-touch-icon.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Noah.variable} font-noah`}>
        <UserContextProvider>
          <Toaster />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
