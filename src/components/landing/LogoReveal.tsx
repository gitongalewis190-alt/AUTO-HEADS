"use client";

import { motion } from "framer-motion";

// Framer Motion logo scale + opacity entrance with spring overshoot.
// Frames 151–180 per the animation spec.
export function LogoReveal({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
      className="text-center"
    >
      <h1 className="text-display font-heading font-bold text-gradient">AUTO HEADS</h1>
      <p className="text-body-lg text-text-muted mt-2">Where automotive passion meets commerce</p>
    </motion.div>
  );
}
