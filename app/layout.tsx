import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Cormorant_Garamond, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const bodoniModa = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-bodoni", display: "swap" });
const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-cormorant", display: "swap", style: ["normal", "italic"] });

const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], variable: "--font-instrument-serif", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
    title: "ReportGuard - AI-Powered Academic Report Analyzer",
    description: "Automatically validate and analyze student project reports according to Anna University formatting standards using AI.",
    keywords: ["academic report", "Anna University", "report validator", "AI analysis", "project report"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} ${bodoniModa.variable} ${cormorantGaramond.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
