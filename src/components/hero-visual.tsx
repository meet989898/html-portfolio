"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-[2rem] bg-white/10" />,
});

export function HeroVisual() {
  return (
    <div
      className="group relative min-h-[16rem] overflow-hidden rounded-[2rem] border border-white/15 bg-[#101112] shadow-2xl shadow-black/30 sm:min-h-[22rem]"
      data-testid="hero-visual"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(80,200,255,0.18),transparent_34%),linear-gradient(225deg,rgba(246,200,95,0.16),transparent_35%),linear-gradient(0deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0.07)_1px,transparent_1px,transparent_64px),repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_64px)] opacity-35" />
      <div className="absolute -left-24 top-10 h-44 w-44 rounded-full bg-[#50c8ff]/20 blur-3xl transition duration-700 group-hover:translate-x-10" />
      <div className="absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-[#f6c85f]/18 blur-3xl transition duration-700 group-hover:-translate-x-8" />
      <HeroScene />
      <div className="absolute bottom-4 left-4 right-4 grid gap-2 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-white backdrop-blur-xl sm:grid-cols-3">
        <span>AI</span>
        <span>Software</span>
        <span>Data</span>
      </div>
    </div>
  );
}
