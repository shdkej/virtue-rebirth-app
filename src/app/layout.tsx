import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { ToastViewport } from "@/components/toast";

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

// Inline script to apply theme class before hydration — avoids flash.
// Keeps in sync with `THEME_KEY` in src/lib/store.ts ("virtue.theme.v1").
const THEME_INIT_SCRIPT = `(()=>{try{var t=localStorage.getItem('virtue.theme.v1');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ko">
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
    </head>
    <body>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
        <main className="flex-1 pb-24">{children}</main>
        <BottomNav />
      </div>
      <ToastViewport />
    </body>
  </html>
);

export default RootLayout;
