import React from 'react';
import { motion } from 'framer-motion';

export default function GameLogo({ size = 'md', className = '' }) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex items-center justify-center"
      >
        {/* Ambient golden aura behind logo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-600/20 rounded-full blur-xl pointer-events-none" />

        {/* Decorative Compass & Crossed Swords emblem */}
        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className={`text-amber-400 drop-shadow-[0_0_12px_rgba(244,197,66,0.6)] ${
              isLarge ? 'text-4xl md:text-5xl' : isSmall ? 'text-xl' : 'text-3xl'
            }`}
          >
            🧭
          </motion.span>

          <div className="flex flex-col items-center">
            <h1
              className={`font-cinzel font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-amber-300 to-amber-600 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] ${
                isLarge
                  ? 'text-4xl sm:text-5xl md:text-6xl tracking-[0.2em]'
                  : isSmall
                  ? 'text-xl tracking-wider'
                  : 'text-2xl sm:text-3xl md:text-4xl tracking-widest'
              }`}
              style={{
                textShadow: '0 0 20px rgba(244, 197, 66, 0.4), 0 2px 4px rgba(0,0,0,0.9)'
              }}
            >
              CAÇA-TESOURO
            </h1>

            {!isSmall && (
              <div className="flex items-center gap-3 w-full justify-center mt-1">
                <div className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-[10px] md:text-xs tracking-[0.3em] font-semibold text-amber-200/90 uppercase font-cinzel">
                  Em Busca do Baú Lendário
                </span>
                <div className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent to-amber-400" />
              </div>
            )}
          </div>

          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`text-amber-400 drop-shadow-[0_0_12px_rgba(244,197,66,0.6)] ${
              isLarge ? 'text-4xl md:text-5xl' : isSmall ? 'text-xl' : 'text-3xl'
            }`}
          >
            ⚔️
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
