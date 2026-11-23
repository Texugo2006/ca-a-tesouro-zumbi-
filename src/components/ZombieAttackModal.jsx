import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { ShieldAlert, Skull, AlertTriangle, Zap, Radio } from 'lucide-react';
import Character from './Character';

export default function ZombieAttackModal() {
  const { zombieAttackEvent, closeZombieAttack, infiniteLives, selectedCharacter, customization } = useGameStore();

  useEffect(() => {
    if (zombieAttackEvent) {
      const timer = setTimeout(() => {
        closeZombieAttack();
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [zombieAttackEvent, closeZombieAttack]);

  if (!zombieAttackEvent) return null;

  const charImg = `/assets/personagems/${selectedCharacter || 'kael'}.png`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none overflow-hidden"
      >
        {/* Pulsing red emergency alert background vignette */}
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/70 via-black to-red-950/90"
        />

        {/* Scanlines / Glitch overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #ef4444 0px, #ef4444 1px, transparent 1px, transparent 4px)',
          }}
        />

        {/* Claw slash marks animated across screen */}
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0.6] }}
          transition={{ duration: 0.4 }}
          viewBox="0 0 400 300"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <path d="M 60 40 L 320 260" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
          <path d="M 100 20 L 360 240" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <path d="M 30 70 L 290 290" stroke="#991b1b" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        </motion.svg>

        {/* Tactical Attack Card */}
        <motion.div
          initial={{ scale: 0.8, y: 30 }}
          animate={{ scale: [0.8, 1.05, 1], y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-20 w-full max-w-lg bg-[#0f0505] border-2 border-red-500/80 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.5)] text-center flex flex-col items-center"
        >
          {/* Top Warning Strip */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-500/60 text-red-300 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
            <span>ALERTA DE INFECÇÃO · CONTATO HOSTIL</span>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          </div>

          {/* Attacker vs Survivor Visual */}
          <div className="relative my-3 flex items-center justify-center gap-4">
            {/* Survivor visual */}
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/60 bg-black/80 shadow-lg flex items-center justify-center p-1">
              <Character
                characterId={selectedCharacter || 'kael'}
                customization={customization}
                size="sm"
                animationType="error"
              />
            </div>

            {/* Clash icon */}
            <motion.div
              animate={{ rotate: [-10, 10, -10], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-12 h-12 rounded-full bg-red-950/90 border-2 border-red-500 flex items-center justify-center shrink-0 shadow-md"
            >
              <Skull className="w-6 h-6 text-red-400" />
            </motion.div>

            {/* Zombie horde silhouette box */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-red-600 bg-red-950/80 shadow-lg flex items-center justify-center relative p-1">
              <motion.div
                animate={{ scale: [1, 1.15, 1], y: [0, -2, 0] }}
                transition={{ duration: 0.4, repeat: Infinity }}
                className="text-red-400 flex flex-col items-center justify-center"
              >
                <Skull className="w-10 h-10 text-red-500 drop-shadow-[0_0_12px_#ef4444]" />
                <span className="text-[9px] font-mono font-black text-red-300 mt-1 uppercase">HORDA</span>
              </motion.div>
            </div>
          </div>

          {/* Event Content */}
          <h2 className="text-xl sm:text-2xl font-black font-cinzel text-red-100 tracking-wider uppercase mt-1">
            {zombieAttackEvent.title}
          </h2>
          <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mt-0.5">
            {zombieAttackEvent.subtitle}
          </span>

          <p className="mt-3 text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed max-w-md bg-black/60 p-3 rounded-xl border border-red-900/50">
            "{zombieAttackEvent.description}"
          </p>

          {/* Damage / Status Badge */}
          <div className="mt-4 flex items-center gap-3">
            <span className={`px-3 py-1 rounded-lg font-mono font-black text-xs uppercase tracking-wider ${
              infiniteLives
                ? 'bg-amber-950 border border-amber-500/60 text-amber-300'
                : 'bg-red-950 border border-red-500/60 text-red-400 animate-pulse'
            }`}>
              {zombieAttackEvent.damage}
            </span>

            <button
              onClick={closeZombieAttack}
              className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer uppercase"
            >
              Recuar & Defender →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
