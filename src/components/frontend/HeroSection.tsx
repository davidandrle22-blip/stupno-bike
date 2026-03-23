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
import SocialLinks from "@/components/frontend/SocialLinks";

export default function HeroSection({
  raceSlug,
  registrationUrl,
  facebookUrl,
  instagramUrl,
}: {
  raceSlug: string | null;
  registrationUrl: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
}) {
  return (
    <section className="relative min-h-screen flex items-center -mt-16 pt-16">
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
                  <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-primary/25 rounded-full px-5 py-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-white/70 text-[13px] font-medium tracking-wide">
                      MČR XCO – Cross Country
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
                      className="block text-[clamp(2rem,4.5vw,3.5rem)]"
                      style={{ color: "#4A90E2" }}
                      variants={{
                        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
                      }}
                    >
                      Mistrovství České republiky
                    </motion.span>
                    <motion.span
                      className="block text-[clamp(2rem,4.5vw,3.5rem)] text-white mt-0.5"
                      variants={{
                        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
                      }}
                    >
                      Horských kol XCO
                    </motion.span>
                    <motion.span
                      className="block text-[clamp(2.8rem,6.5vw,5rem)] mt-0.5"
                      style={{ color: "#D7141A" }}
                      variants={{
                        hidden: { opacity: 0, y: 40, filter: "blur(14px)", scale: 0.9 },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 1, ease: "easeOut" } },
                      }}
                    >
                      STUPNO
                    </motion.span>
                    <motion.span
                      className="block text-[clamp(1rem,2vw,1.5rem)] text-white/60 font-semibold tracking-widest mt-2"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                      }}
                    >
                      Velká cena CUBE
                    </motion.span>
                  </motion.h1>

                  <div className="flex items-center gap-4 mt-7 text-sm sm:text-base">
                    <span className="flex items-center gap-2">
                      <Calendar size={15} className="text-primary-light" />
                      <span className="text-white/70 font-medium">17. — 19. července 2026</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <a
                      href="https://www.google.com/maps/place/Ultramarinka/@49.8324452,13.5836209,598m/data=!3m1!1e3!4m14!1m7!3m6!1s0x470af9219db26c77:0x11c7c7e94b250ab4!2sUltramarinka!8m2!3d49.8325514!4d13.5833951!16s%2Fg%2F11t1fbwdp4!3m5!1s0x470af9219db26c77:0x11c7c7e94b250ab4!8m2!3d49.8325514!4d13.5833951!16s%2Fg%2F11t1fbwdp4!5m1!1e2?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-white transition-colors group"
                    >
                      <MapPin size={15} className="text-secondary group-hover:text-white transition-colors" />
                      <span className="text-white/70 font-medium group-hover:text-white underline-offset-2 group-hover:underline">Areál Ultramarinka, Břasy</span>
                    </a>
                  </div>
                </AnimatedSection>

                {/* Countdown + Mobile controls */}
                <AnimatedSection delay={0.25}>
                  <div className="mt-10 mb-6">
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
                      <p className="text-white text-[11px] uppercase tracking-[0.35em] font-semibold">
                        Do startu zbývá
                      </p>
                      {mobileControls}
                    </div>
                    <Countdown targetDate="2026-07-17T09:00:00" />
                  </div>
                </AnimatedSection>

                {/* Social links */}
                <AnimatedSection delay={0.35}>
                  <div className="mb-8">
                    <SocialLinks facebookUrl={facebookUrl} instagramUrl={instagramUrl} />
                  </div>
                </AnimatedSection>

                {/* CTAs */}
                <AnimatedSection delay={0.45}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={raceSlug ? `/zavod/${raceSlug}/program` : "/zavod/stupno/program"}
                      className="group bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-7 py-3.5 rounded-full uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 flex items-center gap-2 justify-center w-full sm:w-auto"
                    >
                      Detail závodu
                      <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <a
                      href={registrationUrl || "https://cycling.sportsoft.cz/mtb/#registrace"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-accent to-accent-dark text-white font-bold px-7 py-3.5 rounded-full uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 text-center w-full sm:w-auto"
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

    </section>
  );
}
