"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <div
      ref={ref}
      className={cn("relative w-full max-w-full mx-auto", className)}>
      <div className="absolute -left-4 md:-left-12 top-0 bottom-0 pointer-events-none z-20">
        <motion.div
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center bg-background">
          <motion.div
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "var(--primary)" : "white",
            }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white" />
        </motion.div>
        
        <svg
          viewBox={`0 0 40 ${svgHeight}`}
          width="40"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true">
          <motion.path
            d={`M 20 0 V ${svgHeight - 200} l 5 -10 l 5 20 l 5 -30 l 5 20 l 5 -10 V ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-800"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
          
          <motion.path
            d={`M 20 0 V ${svgHeight - 200} l 5 -10 l 5 20 l 5 -30 l 5 20 l 5 -10 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="motion-reduce:hidden"
          />
          
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="relative z-10">{children}</div>
    </div>
  );
};
