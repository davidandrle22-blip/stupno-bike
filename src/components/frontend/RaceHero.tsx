"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";

type RaceHeroProps = {
  title: string;
  date: string;
  location: string;
  uciCategory: string | null;
  heroImage: string | null;
  heroVideo: string | null;
  heroVideoWebm: string | null;
  registrationUrl: string | null;
};

export default function RaceHero({
  date,
  location,
  uciCategory,
  heroImage,
  heroVideo,
  heroVideoWebm,
  registrationUrl,
}: RaceHeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image — always present */}
      {heroImage ? (
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] ${
            !videoLoaded ? "animate-ken-burns" : ""
          }`}
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark">
          <div className="absolute top-1/3 -left-20 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 -right-20 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[100px]" />
        </div>
      )}

      {/* Video — desktop only, if available */}
      {!isMobile && heroVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage || undefined}
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {heroVideoWebm && (
            <source src={heroVideoWebm} type="video/webm" />
          )}
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
      <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-primary-light" />
          <span className="text-primary-light text-xs sm:text-sm font-semibold uppercase tracking-[0.3em]">
            {formatDate(date)} &bull; {location}
          </span>
          <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-primary-light" />
        </motion.div>

        <motion.h1
          className="font-black uppercase tracking-tight leading-[0.85]"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block text-3xl sm:text-5xl md:text-6xl text-white">
            Mistrovství České republiky
          </span>
          <span className="block text-3xl sm:text-5xl md:text-6xl gradient-text mt-1">
            Horských kol XCO
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl text-white mt-1">
            STUPNO
          </span>
          <span className="block text-lg sm:text-2xl text-white/60 font-semibold tracking-widest mt-2">
            Velká cena CUBE
          </span>
        </motion.h1>


        {registrationUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white font-bold px-8 py-3.5 rounded-xl uppercase tracking-wide transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/30"
            >
              Registrace do závodu
            </a>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <ChevronDown className="text-white/30 w-7 h-7" />
      </motion.div>

      {/* Skewed divider at bottom — tmavý gradient místo bílé */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-10"
        style={{
          clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0% 100%)",
          background: "linear-gradient(to bottom right, rgba(6,182,212,0.18), #0F172A)",
        }}
      />
    </section>
  );
}
