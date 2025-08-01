import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

const urbanist = Urbanist({
  subsets: ["latin"],
  // variable: "--font-urbanist",
  // Optional: Add fallbacks and adjust font settings
  // display: "swap",
  // weight: ["400", "500", "600", "700"], // Specify needed weights
});

export async function generateMetadata(): Promise<Metadata> {
 const client = createClient();
 const settings = await client.getSingle("settings");
 return {
  title: settings.data.meta_title,
  description: settings.data.meta_description
 }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100"> 
      <body className={clsx(urbanist.className, 'relative min-h-screen')}>
        <Header/>
        {children}
        {/* <div className="h-[500vh]"></div> */}
        <Footer/>
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
      </body>
      <PrismicPreview repositoryName={repositoryName}/>
    </html>
  );
}
