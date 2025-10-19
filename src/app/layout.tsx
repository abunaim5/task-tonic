import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import DndWrapper from "@/components/DndWrapper/DndWrapper";

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
          <DndWrapper>
            <LayoutWrapper>
              {children}
              <Toaster />
            </LayoutWrapper>
          </DndWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
