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
}: {
  posterUrl: string;
  posterMobileUrl?: string;
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

  // Start video after 5-second delay (both mobile and desktop)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoStarted(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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

  // Choose poster based on screen size
  const activePoster = isMobile && posterMobileUrl ? posterMobileUrl : posterUrl;

  return (
    <>
      {/* Background poster — always present, Ken Burns while no video */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] ${
          !videoLoaded || !videoStarted ? "animate-ken-burns" : ""
        }`}
        style={{ backgroundImage: `url(${activePoster})` }}
      />

      {/* Background video — both mobile and desktop, delayed start */}
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

      {/* Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-dark/30 to-transparent" />
      <div className="absolute inset-0 bg-primary/[0.03] mix-blend-overlay" />

      {/* Bottom-right controls — higher on mobile to avoid overlapping CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-36 sm:bottom-28 right-4 sm:right-10 z-20 flex items-center gap-2 sm:flex-col sm:gap-3 sm:items-end"
      >
        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className={`group flex items-center gap-1.5 sm:gap-2.5 backdrop-blur-xl border rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2.5 transition-all duration-300 hover:scale-105 ${
            muted
              ? "bg-white/10 border-white/15 hover:bg-white/20"
              : "bg-primary/20 border-primary/30 hover:bg-primary/30"
          }`}
        >
          {muted ? (
            <VolumeX size={16} className="text-white/70 sm:w-[18px] sm:h-[18px]" />
          ) : (
            <Volume2 size={16} className="text-primary-light sm:w-[18px] sm:h-[18px]" />
          )}
          <span className="text-white text-[10px] sm:text-xs font-semibold">
            {muted ? "Zvuk" : "Ztlumit"}
          </span>
        </button>

        {/* YouTube link */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-red-600 backdrop-blur-xl border border-white/15 hover:border-red-600 rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping group-hover:bg-white/20 hidden sm:block" style={{ animationDuration: "2.5s" }} />
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-600 group-hover:bg-white flex items-center justify-center transition-colors shadow-lg">
              <Play size={12} className="text-white group-hover:text-red-600 ml-0.5 fill-current transition-colors sm:w-[14px] sm:h-[14px]" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-[10px] sm:text-xs leading-tight">
              Video
            </p>
            <p className="text-white/50 group-hover:text-white/80 text-[9px] sm:text-[10px] font-medium flex items-center gap-1 transition-colors">
              <Youtube size={9} />
              YouTube
            </p>
          </div>
        </a>
      </motion.div>
    </>
  );
}
