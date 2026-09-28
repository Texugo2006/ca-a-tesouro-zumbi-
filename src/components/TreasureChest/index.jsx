import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../../services/soundEngine';
import Character from '../Character';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles, Trophy, RotateCcw, Map, Home } from 'lucide-react';

export default function TreasureChest({ onRestartMap, onReturnToMap, onReturnHome }) {
  const { selectedCharacter, customization, selectedMap, score, coins } = useGameStore();

  const [step, setStep] = useState(0); // 0: Darken & chest appear, 1: Hero approaches, 2: Hero ability, 3: Chest opens & explosion, 4: Victory screen

  useEffect(() => {
    // Step 0: Sound & Screen Darken
    sound.playAmbient('pirates');

    const t1 = setTimeout(() => {
      setStep(1); // Hero approaches
    }, 1200);

    const t2 = setTimeout(() => {
      setStep(2); // Hero executes special ability
      sound.playSpecial();
    }, 2800);

    const t3 = setTimeout(() => {
      setStep(3); // Chest opens, sound, confetti explosion
      sound.playChestOpen();

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#F4C542', '#FFE082', '#6DD5FA', '#E74C3C', '#2ECC71']
      });

      // Repeat confetti waves
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    }, 4500);

    const t4 = setTimeout(() => {
      sound.playVictory();
      setStep(4); // Final victory banner
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-hidden select-none">
      {/* Cinematic Spotlight Beam */}
      <motion.div
        animate={{
          opacity: step >= 3 ? [0.6, 1, 0.8] : 0.4,
          scale: step >= 3 ? [1, 1.2, 1.1] : 1
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,197,66,0.25)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Main Chest Stage Area */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full text-center">
        {/* The Animated SVG Treasure Chest */}
        <motion.div
          animate={
            step === 0
              ? { scale: [0.7, 1], y: [40, 0] }
              : step === 2
              ? { x: [-3, 3, -3, 3, 0] } // Vibrating before opening
              : step >= 3
              ? { scale: [1, 1.15, 1], y: [0, -10, 0] }
              : {}
          }
          transition={{ duration: step === 2 ? 0.3 : 1 }}
          className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center"
        >
          {/* Golden Rays behind chest when opened */}
          {step >= 3 && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-80 h-80 rounded-full bg-[conic-gradient(from_0deg,#F4C542_0deg,transparent_45deg,#FFE082_90deg,transparent_135deg,#F4C542_180deg,transparent_225deg,#FFE082_270deg,transparent_315deg)] opacity-40 blur-sm" />
            </motion.div>
          )}

          {/* SVG Chest */}
          <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B4513" />
                <stop offset="100%" stopColor="#4A2608" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="50%" stopColor="#F4C542" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>
            </defs>

            {/* Chest Base Body */}
            <rect x="30" y="80" width="140" height="80" rx="8" fill="url(#woodGrad)" stroke="#2C1810" strokeWidth="4" />
            {/* Wooden Planks details */}
            <line x1="30" y1="105" x2="170" y2="105" stroke="#2C1810" strokeWidth="2" opacity="0.6" />
            <line x1="30" y1="135" x2="170" y2="135" stroke="#2C1810" strokeWidth="2" opacity="0.6" />

            {/* Golden reinforcement straps */}
            <rect x="45" y="80" width="14" height="80" fill="url(#goldGrad)" stroke="#7A5600" strokeWidth="1.5" />
            <rect x="141" y="80" width="14" height="80" fill="url(#goldGrad)" stroke="#7A5600" strokeWidth="1.5" />

            {/* Inside Glowing Jewels & Gold Coins when opened */}
            {step >= 3 && (
              <g>
                <ellipse cx="100" cy="80" rx="55" ry="20" fill="#FFE082" opacity="0.8" />
                {/* Coins piles */}
                <circle cx="85" cy="75" r="8" fill="#F4C542" stroke="#B8860B" strokeWidth="1.5" />
                <circle cx="100" cy="70" r="9" fill="#FFE082" stroke="#B8860B" strokeWidth="1.5" />
                <circle cx="115" cy="76" r="8" fill="#F4C542" stroke="#B8860B" strokeWidth="1.5" />
                <polygon points="100,55 106,65 94,65" fill="#6DD5FA" stroke="#FFF" strokeWidth="1" />
                <polygon points="80,68 85,76 75,76" fill="#E74C3C" stroke="#FFF" strokeWidth="1" />
                <polygon points="120,68 126,76 114,76" fill="#2ECC71" stroke="#FFF" strokeWidth="1" />
              </g>
            )}

            {/* Keyhole / Lock */}
            <rect x="90" y="85" width="20" height="24" rx="4" fill="url(#goldGrad)" stroke="#7A5600" strokeWidth="1.5" />
            <circle cx="100" cy="94" r="3.5" fill="#2C1810" />
            <polygon points="98,94 102,94 103,103 97,103" fill="#2C1810" />

            {/* Chest Lid - Closed or Opened */}
            {step < 3 ? (
              // Lid Closed
              <g>
                <path d="M25,80 Q100,35 175,80 Z" fill="url(#woodGrad)" stroke="#2C1810" strokeWidth="4" />
                <path d="M45,80 Q100,43 145,80" fill="none" stroke="url(#goldGrad)" strokeWidth="14" />
              </g>
            ) : (
              // Lid Opened Angled Upwards
              <motion.g
                initial={{ y: 0, rotate: 0 }}
                animate={{ y: -30, rotate: -25 }}
                transition={{ duration: 0.6, ease: 'backOut' }}
              >
                <path d="M20,60 Q100,10 180,60 Z" fill="url(#woodGrad)" stroke="#2C1810" strokeWidth="4" />
                <path d="M40,60 Q100,18 150,60" fill="none" stroke="url(#goldGrad)" strokeWidth="14" />
              </motion.g>
            )}
          </svg>
        </motion.div>

        {/* Hero Character Staging */}
        <div className="mt-[-25px] flex flex-col items-center">
          <Character
            characterId={selectedCharacter}
            customization={customization}
            size="lg"
            animationType={step >= 3 ? 'success' : step === 2 ? 'special' : 'idle'}
          />

          <p className="text-xs text-amber-300 font-cinzel font-semibold mt-2">
            {step === 1 && "O herói se aproxima com a chave mística..."}
            {step === 2 && "Canalizando a habilidade lendária!"}
            {step >= 3 && "O lacre dourado foi rompido!"}
          </p>
        </div>

        {/* Victory Card when step === 4 */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="mt-6 parchment-card p-6 sm:p-8 rounded-3xl border-4 border-amber-500 shadow-2xl text-slate-950 w-full"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-7 h-7 text-amber-600 animate-bounce" />
                <h2 className="text-2xl sm:text-3xl font-cinzel font-black tracking-wider text-amber-950">
                  TESOURO ENCONTRADO!
                </h2>
                <Trophy className="w-7 h-7 text-amber-600 animate-bounce" />
              </div>

              <p className="text-xs sm:text-sm font-semibold text-amber-900 leading-relaxed mb-5">
                "Parabéns, valoroso aventureiro! Você decifrou todas as 7 fases deste mapa, superou enigmas ancestrais e libertou o grande tesouro escondido!"
              </p>

              {/* Stats pill */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-amber-100/80 rounded-2xl border border-amber-900/20">
                  <div className="text-[10px] uppercase font-bold text-amber-800">Recompensa Total</div>
                  <div className="text-lg font-cinzel font-black text-amber-950">+{coins} Moedas</div>
                </div>
                <div className="p-3 bg-amber-100/80 rounded-2xl border border-amber-900/20">
                  <div className="text-[10px] uppercase font-bold text-amber-800">Pontuação de Honra</div>
                  <div className="text-lg font-cinzel font-black text-amber-950">{score} Pontos</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onReturnToMap}
                  className="flex-1 py-3 gold-gradient-btn rounded-xl font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Map className="w-4 h-4" /> Escolher Outro Mapa
                </button>
                <button
                  onClick={onReturnHome}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-amber-500/40 cursor-pointer transition-colors shadow-md"
                >
                  <Home className="w-4 h-4" /> Menu Principal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
