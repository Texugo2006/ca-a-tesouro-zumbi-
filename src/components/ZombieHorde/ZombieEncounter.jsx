import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import confetti from 'canvas-confetti';
import { Crosshair, Skull, ShieldAlert } from 'lucide-react';

export default function ZombieEncounter() {
  const { gainCoins } = useGameStore();
  const [zombies, setZombies] = useState([]);
  const [scorePopups, setScorePopups] = useState([]);

  // Spawn wandering zombies periodically
  useEffect(() => {
    const spawnZombie = () => {
      // Don't spawn if already 3 zombies on screen
      if (zombies.length >= 3) return;

      const types = [
        { name: "Carniçal Rastejante", speed: 18, y: Math.random() * 60 + 20, points: 15, scale: 0.9, color: '#22c55e' },
        { name: "Infectado Veloz (Runner)", speed: 10, y: Math.random() * 60 + 20, points: 25, scale: 1.1, color: '#ef4444' },
        { name: "Mutante Blindado", speed: 22, y: Math.random() * 60 + 20, points: 40, scale: 1.3, color: '#a855f7' }
      ];

      const chosen = types[Math.floor(Math.random() * types.length)];
      const direction = Math.random() > 0.5 ? 1 : -1;

      const newZombie = {
        id: Date.now() + Math.random(),
        ...chosen,
        direction,
        startX: direction === 1 ? -10 : 110,
        targetX: direction === 1 ? 110 : -10
      };

      setZombies((prev) => [...prev, newZombie]);
    };

    const interval = setInterval(spawnZombie, 7000);
    // Initial spawn
    const initTimer = setTimeout(spawnZombie, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initTimer);
    };
  }, [zombies.length]);

  const handleShootZombie = (e, z) => {
    e.stopPropagation();

    // Sound effects: Gunshot!
    sound.playGunshot();
    setTimeout(() => sound.playZombieGrowl(), 120);

    // Reward coins
    gainCoins(z.points);

    // Particle blood/slime burst
    confetti({
      particleCount: 25,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#22c55e', '#ef4444', '#7f1d1d', '#facc15']
    });

    // Score floating popup
    const popup = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      text: `HEADSHOT! +${z.points} MOEDAS`
    };
    setScorePopups((prev) => [...prev, popup]);
    setTimeout(() => {
      setScorePopups((prev) => prev.filter((p) => p.id !== popup.id));
    }, 900);

    // Remove zombie
    setZombies((prev) => prev.filter((item) => item.id !== z.id));
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {/* Floating score text on kill */}
      <AnimatePresence>
        {scorePopups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 1, scale: 0.8, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, y: -45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ left: popup.x, top: popup.y }}
            className="fixed -translate-x-1/2 -translate-y-1/2 font-cinzel font-black text-sm sm:text-base text-yellow-300 drop-shadow-[0_2px_8px_rgba(239,68,68,1)] tracking-wider z-50 pointer-events-none"
          >
            {popup.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Wandering Zombies */}
      {zombies.map((z) => (
        <motion.div
          key={z.id}
          initial={{ left: `${z.startX}%`, top: `${z.y}%` }}
          animate={{ left: `${z.targetX}%` }}
          transition={{ duration: z.speed, ease: 'linear' }}
          onAnimationComplete={() => {
            setZombies((prev) => prev.filter((item) => item.id !== z.id));
          }}
          onClick={(e) => handleShootZombie(e, z)}
          style={{ top: `${z.y}%` }}
          className="pointer-events-auto absolute -translate-y-1/2 cursor-crosshair group"
        >
          {/* Target Reticle Hover */}
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-2 rounded-full border-2 border-red-500/0 group-hover:border-red-500/80 group-hover:bg-red-500/10 transition-all flex items-center justify-center animate-pulse">
              <Crosshair className="w-8 h-8 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Zombie Character Sprite */}
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: z.direction === 1 ? [-4, 4, -4] : [4, -4, 4]
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: `scaleX(${z.direction === 1 ? 1 : -1}) scale(${z.scale})` }}
              className="p-1 rounded-xl bg-black/60 border border-red-500/50 flex items-center justify-center drop-shadow-[0_4px_10px_rgba(34,197,94,0.6)]"
            >
              <Skull className="w-9 h-9" style={{ color: z.color }} />
            </motion.div>

            {/* Click to shoot badge */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] bg-red-950 border border-red-500 text-red-200 px-1.5 py-0.5 rounded font-cinzel font-bold mt-1 shadow-lg whitespace-nowrap">
              DISPARAR!
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
