import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { Providers } from "./AuthProvider";
import { InvoiceProvider } from "@/context/invoice-context";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Budget Accounting System – Shiv Furniture",
  description: "Shive Furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased suppressHydrationWarning">
                   <ViewTransitions>
            <InvoiceProvider>
              <Providers>{children}</Providers>
            </InvoiceProvider>
          </ViewTransitions>
        </body>
      </html>
    </ClerkProvider>
  );
}
