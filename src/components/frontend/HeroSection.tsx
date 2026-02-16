"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/frontend/AnimatedSection";
import Countdown from "@/components/frontend/Countdown";
import HeroWithVideo from "@/components/frontend/HeroWithVideo";

export default function HeroSection({
  raceSlug,
  registrationUrl,
}: {
  raceSlug: string | null;
  registrationUrl: string | null;
}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-16 pt-16">
      <HeroWithVideo
        posterUrl="/media/races/stupno/hero-poster.jpg"
        posterMobileUrl="/media/races/stupno/hero-poster-mobile.jpg"
        videoUrl="/media/races/stupno/hero-video-720p.mp4"
        videoWebmUrl="/media/races/stupno/hero-video-720p.webm"
        youtubeUrl="https://www.youtube.com/watch?v=mzn6v-TePEs"
      >
        {(mobileControls, desktopControls) => (
          <>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
              <div className="max-w-3xl">
                <AnimatedSection>
                  <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/[0.1] rounded-full px-5 py-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-white/70 text-[13px] font-medium tracking-wide">
                      UCI C1 &bull; XCO Cross-Country
                    </span>
                  </div>

                  <motion.h1
                    className="font-black text-white uppercase tracking-tight leading-[0.85]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.25, delayChildren: 2 } },
                    }}
                  >
                    <motion.span
                      className="block text-[clamp(2.5rem,6vw,4.5rem)]"
                      variants={{
                        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
                      }}
                    >
                      Mistrovství XC
                    </motion.span>
                    <motion.span
                      className="block text-[clamp(2.5rem,6vw,4.5rem)] gradient-text mt-0.5"
                      variants={{
                        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
                      }}
                    >
                      Horských kol
                    </motion.span>
                    <motion.span
                      className="block text-[clamp(3rem,7vw,5.5rem)] mt-0.5"
                      variants={{
                        hidden: { opacity: 0, y: 40, filter: "blur(14px)", scale: 0.9 },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 1, ease: "easeOut" } },
                      }}
                    >
                      STUPNO
                    </motion.span>
                  </motion.h1>

                  <div className="flex items-center gap-4 mt-7 text-sm sm:text-base">
                    <span className="flex items-center gap-2">
                      <Calendar size={15} className="text-primary-light" />
                      <span className="text-white/70 font-medium">17. července 2026</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-2">
                      <MapPin size={15} className="text-secondary" />
                      <span className="text-white/70 font-medium">Stupno u Rokycan</span>
                    </span>
                  </div>
                </AnimatedSection>

                {/* Countdown + Mobile controls */}
                <AnimatedSection delay={0.25}>
                  <div className="mt-10 mb-10">
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
                      <p className="text-white text-[11px] uppercase tracking-[0.35em] font-semibold">
                        Do startu zbývá
                      </p>
                      {mobileControls}
                    </div>
                    <Countdown targetDate="2026-07-17T09:00:00" />
                  </div>
                </AnimatedSection>

                {/* CTAs */}
                <AnimatedSection delay={0.45}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://www.the-pulse.cz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-7 py-3.5 rounded-xl uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center gap-2 justify-center"
                    >
                      Detail závodu
                      <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <a
                      href="https://www.the-pulse.cz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-accent to-accent-dark text-white font-bold px-7 py-3.5 rounded-xl uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 text-center"
                    >
                      Registrace
                    </a>
                  </div>
                </AnimatedSection>
              </div>
            </div>
            {/* Desktop controls — absolute bottom-right over video */}
            {desktopControls}
          </>
        )}
      </HeroWithVideo>

      {/* Skewed divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white z-10" style={{ clipPath: "polygon(0 75%, 100% 0%, 100% 100%, 0% 100%)" }} />
    </section>
  );
}
