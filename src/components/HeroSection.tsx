import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ContactButtons } from "./ContactButtons";
import Typewriter from "typewriter-effect";

interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const fadeEnd = window.innerHeight * 0.75; // fade over 75% of viewport for smoother transition
        const minOpacity = 0.08; // how faded the hero should be at the end
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const progress = Math.min(Math.max(y / fadeEnd, 0), 1);
        const eased = easeOutCubic(progress);
        const target = 1 - eased * (1 - minOpacity);
        if (heroRef.current) {
          heroRef.current.style.opacity = String(target);
        }
        tickingRef.current = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  return (
    <div
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        opacity: 1,
        transition: "opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
      }}
    >
      {/* Fullscreen Background Video */}
      <video
        disablePictureInPicture
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="./videos/Loop.mp4" type="video/mp4" />
        {/* Fallback gradient */}
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
      </video>

      {/* Dark Overlay */}
      <motion.div
        initial={{ backgroundColor: "rgba(0,0,0,1.0)" }}
        animate={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        transition={{ duration: 6.0 }}
        className="absolute inset-0 z-10"
      ></motion.div>

      {/* Overlay Content */}
      <div className="relative z-20 flex flex-col justify-between h-full p-6 sm:p-8 lg:p-12">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12">
            <ContactButtons />
          </div>
        </motion.div>

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-left px 100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
          >
            <h1
              className="text-[18vh] sm:text-[28vh] md:text-[34vh] leading-[0.10]"
              style={{
                fontSize: "clamp(2rem, 4vw, 10vh)",
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <span
                className="block"
                style={{
                  fontFamily:
                    '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace',
                  letterSpacing: "0.02em",
                }}
              >
                Hi, I'm Louis
              </span>
              <span
                className="block"
                style={{
                  fontFamily:
                    '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace',
                  letterSpacing: "0.02em",
                }}
              >
                <br />I do
              </span>
              <span
                className="block text-[4.5vh] sm:text-[6.5vh] md:text-[7.5vh]"
                style={{
                  fontFamily:
                    '"JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace',
                  letterSpacing: "0.02em",
                }}
              >
                <Typewriter
                  options={{
                    strings: ["Game Development", "Software Engineering"],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: "natural",
                  }}
                />
              </span>
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
