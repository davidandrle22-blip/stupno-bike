"use client";

import { useState, useEffect } from "react";

function getTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-xl sm:rounded-2xl min-w-[56px] sm:min-w-[80px] overflow-hidden">
        {/* Glass background */}
        <div className="absolute inset-0 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]" />
        {/* Subtle gradient shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
        {/* Middle divider line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/[0.06]" />
        <div className="relative px-3 py-2.5 sm:px-5 sm:py-4">
          <span className="text-2xl sm:text-4xl font-black text-white tabular-nums tracking-tight">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-white/30 text-[9px] sm:text-[10px] mt-2 uppercase tracking-[0.25em] font-semibold">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(new Date(targetDate)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(new Date(targetDate)));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2 sm:gap-3">
      <FlipUnit value={timeLeft.days} label="Dní" />
      <div className="text-white/15 text-xl sm:text-3xl font-light self-start pt-3 sm:pt-4">:</div>
      <FlipUnit value={timeLeft.hours} label="Hodin" />
      <div className="text-white/15 text-xl sm:text-3xl font-light self-start pt-3 sm:pt-4">:</div>
      <FlipUnit value={timeLeft.minutes} label="Minut" />
      <div className="text-white/15 text-xl sm:text-3xl font-light self-start pt-3 sm:pt-4">:</div>
      <FlipUnit value={timeLeft.seconds} label="Sekund" />
    </div>
  );
}
