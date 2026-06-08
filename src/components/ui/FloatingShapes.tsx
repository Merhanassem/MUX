'use client';

import { motion } from 'framer-motion';

interface Shape {
  id: number;
  type: 'circle' | 'blob' | 'ring' | 'dot';
  color: 'olive' | 'pink';
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
}

const shapes: Shape[] = [
  { id: 1, type: 'blob', color: 'pink', size: 120, x: '8%', y: '20%', delay: 0, duration: 8 },
  { id: 2, type: 'ring', color: 'olive', size: 80, x: '90%', y: '15%', delay: 1.5, duration: 10 },
  { id: 3, type: 'dot', color: 'pink', size: 16, x: '15%', y: '70%', delay: 0.5, duration: 6 },
  { id: 4, type: 'circle', color: 'olive', size: 60, x: '85%', y: '65%', delay: 2, duration: 9 },
  { id: 5, type: 'dot', color: 'olive', size: 10, x: '50%', y: '85%', delay: 1, duration: 7 },
  { id: 6, type: 'ring', color: 'pink', size: 48, x: '70%', y: '40%', delay: 3, duration: 11 },
];

const colorMap = {
  olive: '#718F6B',
  pink: '#F08CA6',
};

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -24, -10, 0],
            rotate: [0, 8, -5, 0],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                backgroundColor: colorMap[shape.color],
                opacity: 0.18,
              }}
            />
          )}
          {shape.type === 'blob' && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <path
                d="M50 10 C70 5 90 20 92 42 C94 64 78 85 56 90 C34 95 12 80 8 58 C4 36 18 12 50 10 Z"
                fill={colorMap[shape.color]}
                opacity={0.15}
              />
            </svg>
          )}
          {shape.type === 'ring' && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                border: `2px solid ${colorMap[shape.color]}`,
                opacity: 0.3,
              }}
            />
          )}
          {shape.type === 'dot' && (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                backgroundColor: colorMap[shape.color],
                opacity: 0.5,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
