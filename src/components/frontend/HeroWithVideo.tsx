"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Youtube, Volume2, VolumeX } from "lucide-react";

export default function HeroWithVideo({
  posterUrl,
  posterMobileUrl,
  videoUrl,
  videoWebmUrl,
  youtubeUrl,
  children,
}: {
  posterUrl: string;
  posterMobileUrl?: string;
  videoUrl: string;
  videoWebmUrl?: string;
  youtubeUrl: string;
  children?: (mobileControls: React.ReactNode, desktopControls: React.ReactNode) => React.ReactNode;
}) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [muted, setMuted] = useState(true);
  const [shrunk, setShrunk] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Start video after 5-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoStarted(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Shrink controls after 4 seconds on mobile
  useEffect(() => {
    if (!isMobile) return;
    const timer = setTimeout(() => {
      setShrunk(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Play video once loaded and delay passed
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

  const activePoster = isMobile && posterMobileUrl ? posterMobileUrl : posterUrl;

  // Shared button markup
  const soundButton = (
    <button
      onClick={toggleSound}
      className={`group flex items-center gap-1.5 backdrop-blur-xl border rounded-lg px-3 py-2 transition-all duration-500 hover:scale-105 ${
        muted
          ? "bg-white/10 border-white/15 hover:bg-white/20"
          : "bg-primary/20 border-primary/30 hover:bg-primary/30"
      }`}
    >
      {muted ? (
        <VolumeX size={15} className="text-white/70" />
      ) : (
        <Volume2 size={15} className="text-primary-light" />
      )}
      <span className="text-white text-[11px] font-semibold">
        {muted ? "Zvuk" : "Ztlumit"}
      </span>
    </button>
  );

  const youtubeButton = (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 bg-white/10 hover:bg-red-600 backdrop-blur-xl border border-white/15 hover:border-red-600 rounded-lg px-3 py-2 transition-all duration-300 hover:scale-105"
    >
      <div className="relative w-6 h-6 rounded-full bg-red-600 group-hover:bg-white flex items-center justify-center transition-colors shadow-lg">
        <Play size={11} className="text-white group-hover:text-red-600 ml-0.5 fill-current transition-colors" />
      </div>
      <div className="text-left">
        <p className="text-white font-bold text-[11px] leading-tight">
          Celé video
        </p>
        <p className="text-white/50 group-hover:text-white/80 text-[9px] font-medium flex items-center gap-1 transition-colors">
          <Youtube size={9} />
          YouTube
        </p>
      </div>
    </a>
  );

  // Mobile: inline above countdown (shown via md:hidden)
  const mobileControls = (
    <motion.div
      initial={{ opacity: 0, scale: 1.15 }}
      animate={{ opacity: 1, scale: shrunk ? 0.85 : 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex items-center gap-2 origin-left transition-transform duration-700 md:hidden"
    >
      {soundButton}
      {youtubeButton}
    </motion.div>
  );

  // Desktop: absolute bottom-right (shown via hidden md:flex)
  const desktopControls = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute bottom-28 right-10 z-20 hidden md:flex flex-col gap-3 items-end"
    >
      {soundButton}
      {youtubeButton}
    </motion.div>
  );

  return (
    <>
      {/* Background poster */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] ${
          !videoLoaded || !videoStarted ? "animate-ken-burns" : ""
        }`}
        style={{ backgroundImage: `url(${activePoster})` }}
      />

      {/* Background video */}
      {videoStarted && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={activePoster}
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {videoWebmUrl && <source src={videoWebmUrl} type="video/webm" />}
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-dark/30 to-transparent" />
      <div className="absolute inset-0 bg-primary/[0.03] mix-blend-overlay" />

      {/* Render children with controls passed in */}
      {children ? children(mobileControls, desktopControls) : <>{mobileControls}{desktopControls}</>}
    </>
  );
}
