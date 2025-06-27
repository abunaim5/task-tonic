import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import ReactQueryProvider from "./providers/ReactQueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Task Tonic",
  description: "Task management web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ReactQueryProvider>
          <LayoutWrapper>
            {children}
            <Toaster />
          </LayoutWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
