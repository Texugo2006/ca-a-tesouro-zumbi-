import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../../services/soundEngine';
import Character from '../Character';
import { useGameStore } from '../../store/useGameStore';
import { ShieldCheck, Trophy, RotateCcw, Map, Home, Award, Plane, FlaskConical } from 'lucide-react';

/* ── High-Tech Military Cryo-Vault SVG (Zona Zero Post-Apocalyptic Prize) ── */
function MilitaryCryoVaultSVG({ step }) {
  const isOpening = step === 2;
  const isOpen = step >= 3;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Intense Cyan/Emerald Ambient Glow when vault opens */}
      {isOpen && (
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.15, 1] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-80 h-80 rounded-full bg-[radial-gradient(circle,#10b981_0%,#06b6d4_40%,transparent_70%)] opacity-35 blur-xl" />
        </motion.div>
      )}

      {/* SVG Cryo-Vault Body */}
      <svg viewBox="0 0 220 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]" fill="none">
        <defs>
          <linearGradient id="armorSteel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="titaniumStrap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="cureGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Vault Heavy Pedestal Base */}
        <rect x="25" y="90" width="170" height="90" rx="10" fill="url(#armorSteel)" stroke="#090d12" strokeWidth="4" />
        {/* Reinforcement Rivets */}
        {[35, 65, 110, 155, 185].map((x, i) => (
          <circle key={i} cx={x} cy="100" r="2.5" fill="#64748b" />
        ))}
        {[35, 65, 110, 155, 185].map((x, i) => (
          <circle key={i} cx={x} cy="165" r="2.5" fill="#64748b" />
        ))}

        {/* Hazard Warning Stripes along base */}
        <g opacity="0.85">
          <rect x="35" y="142" width="150" height="10" fill="#090d12" />
          {[0, 18, 36, 54, 72, 90, 108, 126, 144].map((x, i) => (
            <polygon key={i} points={`${40 + x},152 ${48 + x},152 ${54 + x},142 ${46 + x},142`} fill="#facc15" />
          ))}
        </g>

        {/* Digital Pressure & Status HUD */}
        <rect x="75" y="112" width="70" height="22" rx="4" fill="#020805" stroke="#10b981" strokeWidth="1.5" />
        <text x="110" y="123" fontSize="6.5" fill="#34d399" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
          {isOpen ? "PRESSÃO: 0 PSI" : "VEDAÇÃO: 100% PSI"}
        </text>
        <text x="110" y="130" fontSize="5.5" fill={isOpen ? "#4ade80" : "#facc15"} textAnchor="middle" fontFamily="monospace">
          {isOpen ? "COFRE LIBERADO" : "TRAVA BIOMÉTRICA"}
        </text>

        {/* When Vault Opens: Cryo-Interior with Floating Alpha-Z Vaccine */}
        {isOpen && (
          <g>
            {/* Interior Cryo-Chamber */}
            <rect x="45" y="55" width="130" height="42" rx="6" fill="#021a12" stroke="#10b981" strokeWidth="2" />
            <circle cx="110" cy="72" r="32" fill="url(#cureGlow)" opacity="0.6" />

            {/* Suspended Supreme Alpha-Z Vaccine Ampoule */}
            <g transform="translate(110, 70)">
              {/* Ampoule Glass Body */}
              <rect x="-14" y="-24" width="28" height="48" rx="8" fill="#042f24" stroke="#34d399" strokeWidth="2" />
              {/* Luminescent Liquid Core */}
              <rect x="-11" y="-12" width="22" height="32" rx="5" fill="#10b981" opacity="0.9" />
              {/* DNA Double Helix inside Vaccine */}
              <path d="M-6,-8 Q0,-2 6,4 M6,-8 Q0,-2 -6,4 M-6,6 Q0,12 6,18 M6,6 Q0,12 -6,18" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              {/* Titanium Cryo Cap */}
              <rect x="-10" y="-30" width="20" height="8" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="-6" y1="-26" x2="6" y2="-26" stroke="#10b981" strokeWidth="2" />
              {/* Biohazard Symbol on Ampoule */}
              <circle cx="0" cy="8" r="4" fill="#022c22" />
              <text x="0" y="11" fontSize="5" fill="#34d399" textAnchor="middle" fontFamily="monospace" fontWeight="bold">BIO</text>
            </g>

            {/* Key / Transmitter next to Vaccine */}
            <g transform="translate(155, 74)">
              <rect x="-4" y="-14" width="8" height="28" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
              <circle cx="0" cy="-10" r="2.5" fill="#ffffff" />
              <text x="0" y="22" fontSize="5" fill="#38bdf8" textAnchor="middle" fontFamily="monospace">BLACK HAWK</text>
            </g>
          </g>
        )}

        {/* Vault Blast Shield Door — Closed vs Opened Angled Upwards */}
        {!isOpen ? (
          // Sealed Hydraulic Door
          <g>
            <path d="M20 90 L35 38 L185 38 L200 90 Z" fill="url(#armorSteel)" stroke="#090d12" strokeWidth="4" />
            <rect x="75" y="44" width="70" height="12" rx="2" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <text x="110" y="52" fontSize="6.5" fill="#facc15" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              CEPA ALPHA-Z // NÍVEL 5
            </text>
            {/* Locking Clamps */}
            <rect x="45" y="65" width="16" height="30" rx="3" fill="url(#titaniumStrap)" stroke="#334155" strokeWidth="1.5" />
            <rect x="159" y="65" width="16" height="30" rx="3" fill="url(#titaniumStrap)" stroke="#334155" strokeWidth="1.5" />
            {/* Center Biometric Dial */}
            <circle cx="110" cy="74" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <circle cx="110" cy="74" r="6" fill="#10b981" />
          </g>
        ) : (
          // Hydraulic Blast Shield Lifted & Steam Release
          <motion.g
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: -36, rotate: -18 }}
            transition={{ duration: 0.7, ease: 'backOut' }}
          >
            <path d="M15 72 L32 20 L182 20 L198 72 Z" fill="url(#armorSteel)" stroke="#090d12" strokeWidth="4" />
            <rect x="75" y="26" width="70" height="10" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="110" y="33" fontSize="6" fill="#34d399" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              DESPRESSURIZADO
            </text>
            {/* Steam release plumes */}
            <path d="M40 70 Q45 55 52 65" stroke="#93c5fd" strokeWidth="2" strokeDasharray="2 2" fill="none" opacity="0.8" />
            <path d="M170 70 Q165 55 158 65" stroke="#93c5fd" strokeWidth="2" strokeDasharray="2 2" fill="none" opacity="0.8" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}

export default function TreasureChest({ onRestartMap, onReturnToMap, onReturnHome }) {
  const { selectedCharacter, customization, selectedMap, score, coins, difficulty } = useGameStore();

  const [step, setStep] = useState(0); // 0: Darken, 1: Hero approaches, 2: Ability/bypass, 3: Cryo-vault opens, 4: Victory briefing

  useEffect(() => {
    sound.playAmbient('pirates');

    const t1 = setTimeout(() => setStep(1), 1200);

    const t2 = setTimeout(() => {
      setStep(2);
      sound.playSpecial();
    }, 2800);

    const t3 = setTimeout(() => {
      setStep(3);
      sound.playChestOpen();

      // Confetti burst in biohazard toxic green & emergency amber
      confetti({
        particleCount: 130,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#06b6d4', '#facc15', '#ef4444']
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#10b981', '#facc15', '#38bdf8']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#10b981', '#facc15', '#38bdf8']
        });
      }, 400);
    }, 4500);

    const t4 = setTimeout(() => {
      sound.playVictory();
      setStep(4);
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl select-none p-4 sm:p-6 flex flex-col items-center font-mono">
      {/* Top Bar with Return Button & Skip */}
      <div className="relative z-20 w-full max-w-xl flex items-center justify-between py-2 mb-2">
        <button
          onClick={onReturnHome}
          className="px-4 py-2 bg-[#09120c] hover:bg-[#0f1d14] text-emerald-400 rounded-xl font-mono font-bold text-xs sm:text-sm flex items-center gap-2 border border-emerald-500/50 cursor-pointer shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4 text-emerald-400" /> Menu Principal
        </button>

        {step < 4 ? (
          <button
            onClick={() => setStep(4)}
            className="px-3 py-1.5 text-xs text-emerald-400/90 hover:text-emerald-200 font-mono font-semibold underline cursor-pointer transition-colors"
          >
            Pular Animação ⏩
          </button>
        ) : (
          <button
            onClick={onReturnToMap}
            className="px-3 py-1.5 text-xs text-emerald-300/80 hover:text-emerald-200 font-mono flex items-center gap-1 cursor-pointer"
          >
            <Map className="w-3.5 h-3.5" /> Ver Mapa de Zonas
          </button>
        )}
      </div>

      {/* Atmospheric Cold Mist Light */}
      <motion.div
        animate={{
          opacity: step >= 3 ? [0.4, 0.8, 0.6] : 0.25,
          scale: step >= 3 ? [1, 1.15, 1.05] : 1
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Main Vault Stage Area */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full text-center my-auto pb-8">
        {/* Animated Cryo-Vault */}
        <motion.div
          animate={
            step === 0
              ? { scale: [0.7, 1], y: [40, 0] }
              : step === 2
              ? { x: [-3, 3, -3, 3, 0] }
              : step >= 3
              ? { scale: [1, 1.12, 1], y: [0, -8, 0] }
              : {}
          }
          transition={{ duration: step === 2 ? 0.3 : 1 }}
          className={`relative transition-all duration-500 flex items-center justify-center ${
            step === 4 ? 'w-48 h-48 sm:w-56 sm:h-56' : 'w-64 h-64 sm:w-72 sm:h-72'
          }`}
        >
          <MilitaryCryoVaultSVG step={step} />
        </motion.div>

        {/* Hero Character Staging */}
        <div className={`flex flex-col items-center transition-all ${step === 4 ? 'mt-[-10px]' : 'mt-[-20px]'}`}>
          <Character
            characterId={selectedCharacter}
            customization={customization}
            size={step === 4 ? 'md' : 'lg'}
            animationType={step >= 3 ? 'success' : step === 2 ? 'special' : 'idle'}
          />

          <p className="text-xs text-emerald-300 font-mono font-bold mt-2 tracking-wide">
            {step === 1 && "O sobrevivente alcança a câmara de contenção do cofre criogênico..."}
            {step === 2 && "Despressurizando as travas de titânio a -196°C..."}
            {step >= 3 && "COMPORTAS ABERTAS! A VACINA SUPREMA ALPHA-Z FOI RESGATADA!"}
          </p>
        </div>

        {/* Victory Card when step === 4 */}
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className="mt-4 bg-[#050b07] p-5 sm:p-7 rounded-3xl border-2 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.35)] text-zinc-100 w-full"
            >
              {/* Badge & Title */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CONTENÇÃO CONCLUÍDA · EXTRAÇÃO BLACK HAWK ATIVA
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <FlaskConical className="w-6 h-6 text-emerald-400 animate-bounce" />
                <h2 className="text-xl sm:text-2xl font-black tracking-wide text-emerald-300 uppercase">
                  VACINA CEPA ALPHA-Z RESGATADA!
                </h2>
                <Plane className="w-6 h-6 text-emerald-400 animate-bounce" />
              </div>

              {/* Visceral GM Narrative */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 text-center font-sans">
                "O compressor criogênico chia liberando a névoa de nitrogênio a -196°C. No centro do pedestal blindado, o soro da Vacina Alpha pulsa com luminescência estável. O sangue dos infectados não vai mais reivindicar este mundo. O helicóptero Black Hawk de extração já sobrevoa as ruínas da cidade."
              </p>

              {/* Special Reward Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                <div className="p-2.5 bg-[#09130c] rounded-xl border border-emerald-500/40 text-center flex flex-col items-center">
                  <FlaskConical className="w-5 h-5 text-emerald-400 mb-1" />
                  <div className="text-[10px] font-bold text-emerald-400 uppercase">Vacina Alpha-Z</div>
                  <div className="text-[9px] text-zinc-400">100% Estabilizada</div>
                </div>
                <div className="p-2.5 bg-[#09130c] rounded-xl border border-emerald-500/40 text-center flex flex-col items-center">
                  <Plane className="w-5 h-5 text-cyan-400 mb-1" />
                  <div className="text-[10px] font-bold text-cyan-400 uppercase">Black Hawk</div>
                  <div className="text-[9px] text-zinc-400">Exfiltração Pronta</div>
                </div>
                <div className="p-2.5 bg-[#09130c] rounded-xl border border-emerald-500/40 text-center col-span-2 sm:col-span-1 flex flex-col items-center">
                  <Award className="w-5 h-5 text-yellow-400 mb-1" />
                  <div className="text-[10px] font-bold text-yellow-400 uppercase">Patente Militar</div>
                  <div className="text-[9px] text-zinc-400">Lenda da Zona Zero</div>
                </div>
              </div>

              {/* Stats pill */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-[#080e0a] rounded-xl border border-emerald-900 text-center">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Suprimentos Resgatados</div>
                  <div className="text-base sm:text-lg font-black text-amber-300">+{coins} Moedas</div>
                </div>
                <div className="p-3 bg-[#080e0a] rounded-xl border border-emerald-900 text-center">
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Pontuação de Combate</div>
                  <div className="text-base sm:text-lg font-black text-emerald-300">{score.toLocaleString()} PTS</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={onReturnHome}
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95 border border-emerald-300 uppercase tracking-wider"
                >
                  <Home className="w-4 h-4 text-slate-950" /> Menu Principal
                </button>
                <button
                  onClick={onReturnToMap}
                  className="flex-1 py-3.5 bg-[#0a140d] hover:bg-[#112217] text-emerald-300 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-emerald-500/40 cursor-pointer transition-colors shadow-md hover:scale-105 active:scale-95 uppercase tracking-wider"
                >
                  <Map className="w-4 h-4 text-emerald-400" /> Próxima Zona
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
