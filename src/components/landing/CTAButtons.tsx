"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const buttons = [
  { href: "/register", label: "Create Account", primary: true },
  { href: "/login", label: "Login", primary: false },
  { href: "/feed", label: "View as Guest", primary: false },
];

export function CTAButtons({ visible }: { visible: boolean }) {
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {buttons.map((btn, i) => (
        <motion.div
          key={btn.href}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.12 + 0.2 }}
        >
          <Link
            href={btn.href}
            className={
              btn.primary
                ? "px-8 py-3 bg-accent text-white font-heading font-semibold rounded-full hover:opacity-90 transition"
                : "px-8 py-3 glass text-white font-heading font-semibold rounded-full hover:opacity-90 transition"
            }
          >
            {btn.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
