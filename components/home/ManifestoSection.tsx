"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";

function AnimatedWord({
  word,
  start,
  end,
  scrollProgress,
}: {
  word: string;
  start: number;
  end: number;
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

export default function ManifestoSection() {
  const t = useTranslations("Manifesto");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const words = t("text").split(" ");
  const totalWords = words.length;

  return (
    <section ref={containerRef} className="bg-[#2D6A4F] pt-32 pb-20 overflow-hidden">
      <div className="px-6 sm:px-10 lg:px-20">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight text-left max-w-4xl">
          {words.map((word, i) => {
            const start = (i / totalWords) * 0.75;
            const end = start + 1.2 / totalWords;

            return (
              <AnimatedWord
                key={i}
                word={word}
                start={start}
                end={Math.min(end, 1)}
                scrollProgress={scrollYProgress}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
