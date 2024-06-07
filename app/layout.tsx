import type { Metadata } from "next";
import { Noah } from "@/utils/customFonts";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UserContext";


import Image from "next/image";



export const metadata: Metadata = {
  title: "Mopesan",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${Noah.variable} font-noah`}>
        <UserContextProvider>
          <Toaster />
          <Image src="./icons/download.svg" height={32} width={32} alt=""/>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
