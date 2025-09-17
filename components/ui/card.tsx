"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type CardProps = {
    className?: string;
    children: ReactNode;
}

export default function Card({ children, className = "" }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -4 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}