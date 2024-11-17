"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, type Dispatch, type SetStateAction } from "react";

export const CardImage = ({
  url,
  images,
  setImages,
}: {
  url: string;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const rotate = useTransform(() => {
    return rotateRaw.get();
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setImages((prev) => prev.filter((p) => p !== url));
    }
  };

  return (
    <motion.img
      src={url}
      alt={`$Preview-${url}`}
      className="w-full h-full object-cover rounded-md 
      hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
      }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};
