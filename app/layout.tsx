import "../app/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Fairform – Automated Compliance Packs",
  description: "Generate ready-to-use policies for your business in minutes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="w-full border-b py-4 px-6">
          <div className="max-w-7xl mx-auto font-bold text-xl">Fairform</div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}