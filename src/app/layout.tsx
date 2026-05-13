import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "덕 쌓기 · 환생",
  description: "오늘 1덕만 쌓아볼까요? — Brush Up Life에서 영감받은 모바일 라이프 게임",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fafafa",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ko">
    <body>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
        <main className="flex-1 pb-24">{children}</main>
        <BottomNav />
      </div>
    </body>
  </html>
);

export default RootLayout;
