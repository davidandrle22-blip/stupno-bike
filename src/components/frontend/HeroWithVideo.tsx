"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Youtube, Volume2, VolumeX } from "lucide-react";

export default function HeroWithVideo({
  posterUrl,
  videoUrl,
  videoWebmUrl,
  youtubeUrl,
}: {
  posterUrl: string;
  videoUrl: string;
  videoWebmUrl?: string;
  youtubeUrl: string;
}) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Start video after 5-second delay
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => {
      setVideoStarted(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Play video once it's loaded and delay has passed
  useEffect(() => {
    if (videoStarted && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoStarted, videoLoaded]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      {/* Background poster — always present, Ken Burns while no video */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] ${
          !videoLoaded || !videoStarted ? "animate-ken-burns" : ""
        }`}
        style={{ backgroundImage: `url(${posterUrl})` }}
      />

      {/* Background video — desktop only, delayed start */}
      {!isMobile && videoStarted && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {videoWebmUrl && <source src={videoWebmUrl} type="video/webm" />}
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-dark/30 to-transparent" />
      <div className="absolute inset-0 bg-primary/[0.03] mix-blend-overlay" />

      {/* Bottom-right controls — always visible on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-28 right-6 sm:right-10 z-20 flex flex-col gap-3 items-end"
      >
        {/* Sound toggle — always visible on desktop */}
        {!isMobile && (
          <button
            onClick={toggleSound}
            className={`group flex items-center gap-2.5 backdrop-blur-xl border rounded-xl px-4 py-2.5 transition-all duration-300 hover:scale-105 ${
              muted
                ? "bg-white/10 border-white/15 hover:bg-white/20"
                : "bg-primary/20 border-primary/30 hover:bg-primary/30"
            }`}
          >
            {muted ? (
              <VolumeX size={18} className="text-white/70" />
            ) : (
              <Volume2 size={18} className="text-primary-light" />
            )}
            <span className="text-white text-xs font-semibold">
              {muted ? "Zapnout zvuk" : "Ztlumit"}
            </span>
          </button>
        )}

        {/* YouTube link */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-white/10 hover:bg-red-600 backdrop-blur-xl border border-white/15 hover:border-red-600 rounded-xl px-4 py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping group-hover:bg-white/20" style={{ animationDuration: "2.5s" }} />
            <div className="relative w-8 h-8 rounded-full bg-red-600 group-hover:bg-white flex items-center justify-center transition-colors shadow-lg">
              <Play size={14} className="text-white group-hover:text-red-600 ml-0.5 fill-current transition-colors" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-xs leading-tight">
              Celé video
            </p>
            <p className="text-white/50 group-hover:text-white/80 text-[10px] font-medium flex items-center gap-1 transition-colors">
              <Youtube size={10} />
              YouTube
            </p>
          </div>
        </a>
      </motion.div>
    </>
  );
}
