import React from 'react';
import { motion } from 'framer-motion';
import { Skull, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function GameLogo({ size = 'md', className = '' }) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex items-center justify-center"
      >
        {/* Ambient Toxic Blood & Biohazard Aura */}
        <div className="absolute -inset-6 bg-gradient-to-r from-red-600/30 via-emerald-500/20 to-red-700/30 rounded-full blur-2xl pointer-events-none" />

        {/* Logo Container */}
        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          {/* Biohazard Icon Left */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
          >
            <AlertTriangle className={isLarge ? 'w-10 h-10 md:w-12 md:h-12' : isSmall ? 'w-5 h-5' : 'w-8 h-8'} />
          </motion.div>

          <div className="flex flex-col items-center">
            {/* Top Hazard Alert Badge */}
            {!isSmall && (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/80 border border-red-500/60 text-red-400 text-[10px] sm:text-xs font-cinzel font-black tracking-widest uppercase mb-1 shadow-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>DEAD AHEAD · PROTOCOLO DE CONTENÇÃO</span>
              </div>
            )}

            {/* Main Title */}
            <h1
              className={`font-cinzel font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-red-100 via-red-500 to-red-950 drop-shadow-[0_5px_12px_rgba(0,0,0,1)] ${
                isLarge
                  ? 'text-4xl sm:text-5xl md:text-6xl tracking-[0.15em]'
                  : isSmall
                  ? 'text-xl tracking-wider'
                  : 'text-2xl sm:text-3xl md:text-4xl tracking-widest'
              }`}
              style={{
                textShadow: '0 0 25px rgba(239, 68, 68, 0.6), 0 2px 6px rgba(0,0,0,1)'
              }}
            >
              CAÇA-TESOURO
            </h1>

            {/* Subtitle with hazard line */}
            {!isSmall && (
              <div className="flex items-center gap-3 w-full justify-center mt-0.5">
                <div className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent to-red-500" />
                <span className="text-[10px] md:text-xs tracking-[0.25em] font-bold text-emerald-400 uppercase font-cinzel drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">
                  ZOMBIE OUTBREAK · A CURA FINAL
                </span>
                <div className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent to-red-500" />
              </div>
            )}
          </div>

          {/* Zombie Skull Right */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-emerald-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
          >
            <Skull className={isLarge ? 'w-10 h-10 md:w-12 md:h-12' : isSmall ? 'w-5 h-5' : 'w-8 h-8'} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
