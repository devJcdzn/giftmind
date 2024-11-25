import type { Metadata } from "next";
import { Header } from "../../components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "GiftMind",
  description: "Generated by create next app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />
      {children}
      <Footer className="mt-36" />
    </div>
  );
}
