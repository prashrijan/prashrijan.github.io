"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeSync from "@/components/ThemeSync";
import Preloader from "@/components/Preloader";
import Hud from "@/components/hud/Hud";
import Terminal from "@/components/Terminal";
import SoundManager from "@/components/SoundManager";
import AchievementToast from "@/components/AchievementToast";

import Chapter1 from "@/components/chapters/Chapter1";
import Chapter2 from "@/components/chapters/Chapter2";
import Chapter3 from "@/components/chapters/Chapter3";
import Chapter4 from "@/components/chapters/Chapter4";
import Chapter5 from "@/components/chapters/Chapter5";
import Chapter6 from "@/components/chapters/Chapter6";
import Chapter7 from "@/components/chapters/Chapter7";

// WebGL backdrop is dynamically imported so the bundle stays lean and it never
// blocks first paint.
const CosmicBackdrop = dynamic(
  () => import("@/components/three/CosmicBackdrop"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <ThemeSync />
      <Preloader />
      <CosmicBackdrop />
      <SoundManager />

      <SmoothScroll>
        <Hud />
        <main className="relative">
          <Chapter1 />
          <Chapter2 />
          <Chapter3 />
          <Chapter4 />
          <Chapter5 />
          <Chapter6 />
          <Chapter7 />
        </main>
      </SmoothScroll>

      <Terminal />
      <AchievementToast />
    </>
  );
}
