"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Youtube, Volume2, VolumeX } from "lucide-react";

export default function VideoPreview({
  posterUrl,
  videoUrl,
  videoWebmUrl,
  youtubeUrl,
}: {
  posterUrl: string;
  videoUrl: string;
  videoWebmUrl?: string;
  youtubeUrl?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playing && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [playing]);

  return (
    <>
      {/* Thumbnail card */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative group cursor-pointer"
        onClick={() => setPlaying(true)}
      >
        {/* Decorative glow behind */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 aspect-video">
          {/* Poster image */}
          <img
            src={posterUrl}
            alt="Video ze závodu horských kol Stupno"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-dark/20 group-hover:from-dark/50 group-hover:via-transparent transition-all duration-700" />

          {/* Film grain texture */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className="relative"
            >
              {/* Outer pulse */}
              <div className="absolute -inset-3 rounded-full bg-white/10 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute -inset-3 rounded-full bg-white/5 animate-ping" style={{ animationDuration: "3s", animationDelay: "1.5s" }} />
              {/* Button */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-black/30 group-hover:bg-white transition-all duration-300 group-hover:shadow-white/20">
                <Play size={26} className="text-dark ml-1 fill-dark" />
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-dark/80 to-transparent">
            <div className="flex items-center justify-between">
              <p className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-wider">
                Trailer 2022
              </p>
              <div className="flex items-center gap-1.5 text-white/50">
                <Volume2 size={14} />
                <span className="text-[11px] font-medium">Se zvukem</span>
              </div>
            </div>
          </div>

          {/* Corner badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-dark/60 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">Video</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen video modal */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-dark/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setPlaying(false)}
          >
            {/* Top controls */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 z-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-black text-[10px]">XC</span>
                </div>
                <span className="text-white/60 text-sm font-medium hidden sm:block">
                  Mistrovství XC Horských kol Stupno
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Mute toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMuted(!muted);
                    if (videoRef.current) videoRef.current.muted = !muted;
                  }}
                  className="text-white/50 hover:text-white p-2.5 rounded-xl hover:bg-white/10 transition-all"
                >
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                {/* Close */}
                <button
                  onClick={() => setPlaying(false)}
                  className="text-white/50 hover:text-white p-2.5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Video */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">
                <video
                  ref={videoRef}
                  autoPlay
                  controls
                  playsInline
                  poster={posterUrl}
                  className="w-full"
                >
                  {videoWebmUrl && (
                    <source src={videoWebmUrl} type="video/webm" />
                  )}
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* YouTube link below video */}
              {youtubeUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center mt-6"
                >
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/10 hover:bg-red-600 border border-white/10 hover:border-red-600 rounded-xl px-6 py-3 text-white font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/30 group"
                  >
                    <Youtube size={22} className="text-red-500 group-hover:text-white transition-colors" />
                    Celé video na YouTube
                  </a>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
