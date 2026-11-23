import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Cpu, Check, Terminal, ShieldAlert, Wifi, HardDrive } from 'lucide-react';
import { sound } from '../../services/soundEngine';

// Holographic Cyber-Chip Card Back (Verso Tático Militar / Cyber-Deck)
const CyberCardBack = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
    <defs>
      <linearGradient id="cyberBackBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#030712" />
        <stop offset="50%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>
      <linearGradient id="neonGreenBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="50%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
      <pattern id="hexGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 5 0 L 10 2.5 L 10 7.5 L 5 10 L 0 7.5 L 0 2.5 Z" fill="none" stroke="#22c55e" strokeWidth="0.4" opacity="0.15" />
      </pattern>
    </defs>

    {/* Background Plate */}
    <rect x="3" y="3" width="94" height="94" rx="14" fill="url(#cyberBackBg)" stroke="url(#neonGreenBorder)" strokeWidth="2.5" />
    <rect x="5" y="5" width="90" height="90" rx="12" fill="url(#hexGrid)" />

    {/* Inner Circuit Corner Brackets */}
    <path d="M 12 24 L 12 12 L 24 12" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
    <path d="M 88 24 L 88 12 L 76 12" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
    <path d="M 12 76 L 12 88 L 24 88" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
    <path d="M 88 76 L 88 88 L 76 88" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />

    {/* Central CPU Die / Cyber-Hazard Emblem */}
    <rect x="35" y="35" width="30" height="30" rx="6" fill="#022c22" stroke="#4ade80" strokeWidth="2" />
    {/* Micro-bus pins */}
    <line x1="42" y1="35" x2="42" y2="28" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="50" y1="35" x2="50" y2="28" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="58" y1="35" x2="58" y2="28" stroke="#4ade80" strokeWidth="1.5" />

    <line x1="42" y1="65" x2="42" y2="72" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="50" y1="65" x2="50" y2="72" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="58" y1="65" x2="58" y2="72" stroke="#4ade80" strokeWidth="1.5" />

    <line x1="35" y1="42" x2="28" y2="42" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="35" y1="50" x2="28" y2="50" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="35" y1="58" x2="28" y2="58" stroke="#4ade80" strokeWidth="1.5" />

    <line x1="65" y1="42" x2="72" y2="42" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="65" y1="50" x2="72" y2="50" stroke="#4ade80" strokeWidth="1.5" />
    <line x1="65" y1="58" x2="72" y2="58" stroke="#4ade80" strokeWidth="1.5" />

    {/* Glowing Core Dot */}
    <circle cx="50" cy="50" r="6" fill="#22c55e" />
    <circle cx="50" cy="50" r="3" fill="#ffffff" />
  </svg>
);

// High-Tech Cyber-Zombie Tactical Nodes (Illustrated Vector Art)
const nodeArtworks = {
  ssd: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <rect x="22" y="16" width="56" height="68" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
      <rect x="26" y="22" width="48" height="24" rx="4" fill="#0f172a" />
      {/* Circuit lines */}
      <line x1="32" y1="30" x2="48" y2="30" stroke="#38bdf8" strokeWidth="2" />
      <line x1="32" y1="38" x2="62" y2="38" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="60" cy="30" r="3" fill="#38bdf8" />
      {/* Golden Connector Pins */}
      <rect x="34" y="80" width="32" height="6" rx="1" fill="#facc15" />
      <line x1="40" y1="80" x2="40" y2="86" stroke="#000" strokeWidth="1.5" />
      <line x1="48" y1="80" x2="48" y2="86" stroke="#000" strokeWidth="1.5" />
      <line x1="56" y1="80" x2="56" y2="86" stroke="#000" strokeWidth="1.5" />
      <text x="50" y="64" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">DUMP 0x4F</text>
    </svg>
  ),

  cctv: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      {/* CCTV Camera Head */}
      <polygon points="18,34 56,26 62,56 22,54" fill="#334155" stroke="#f43f5e" strokeWidth="2.5" />
      <polygon points="62,34 82,24 82,58 62,50" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
      {/* Camera Lens with Red Eye of Infected Monitor */}
      <ellipse cx="72" cy="41" rx="5" ry="9" fill="#e11d48" />
      <circle cx="72" cy="41" r="3" fill="#fecdd3" />
      {/* Mount arm */}
      <rect x="26" y="54" width="8" height="22" rx="2" fill="#475569" />
      <circle cx="30" cy="76" r="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
      {/* Blinking REC dot */}
      <circle cx="30" cy="34" r="3" fill="#ef4444" />
      <text x="50" y="88" textAnchor="middle" fontSize="9" fill="#f43f5e" fontFamily="monospace" fontWeight="bold">REC · BIO 02</text>
    </svg>
  ),

  dna: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Double Helix Strands */}
      <path d="M 32 18 Q 50 32 68 18 Q 50 42 32 54 Q 50 68 68 82" fill="none" stroke="url(#dnaGrad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 68 18 Q 50 32 32 18 Q 50 42 68 54 Q 50 68 32 82" fill="none" stroke="url(#dnaGrad)" strokeWidth="4" strokeLinecap="round" />
      {/* Rungs */}
      <line x1="38" y1="23" x2="62" y2="23" stroke="#fef08a" strokeWidth="2.5" />
      <line x1="42" y1="36" x2="58" y2="36" stroke="#fef08a" strokeWidth="2.5" />
      <line x1="36" y1="48" x2="64" y2="48" stroke="#fef08a" strokeWidth="2.5" />
      <line x1="42" y1="60" x2="58" y2="60" stroke="#fef08a" strokeWidth="2.5" />
      <line x1="38" y1="74" x2="62" y2="74" stroke="#fef08a" strokeWidth="2.5" />
      <text x="50" y="92" textAnchor="middle" fontSize="8" fill="#4ade80" fontFamily="monospace" fontWeight="bold">RNA ALPHA-Z</text>
    </svg>
  ),

  token: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      {/* Cyber Security Token Key */}
      <circle cx="50" cy="50" r="32" fill="#1e1b4b" stroke="#a855f7" strokeWidth="3" />
      <circle cx="50" cy="50" r="22" fill="#0f172a" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* Quantum Encryption Glyph */}
      <polygon points="50,28 66,40 66,60 50,72 34,60 34,40" fill="none" stroke="#fef08a" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="6" fill="#a855f7" />
      <line x1="50" y1="32" x2="50" y2="68" stroke="#c084fc" strokeWidth="2" />
      <line x1="36" y1="50" x2="64" y2="50" stroke="#c084fc" strokeWidth="2" />
      <text x="50" y="92" textAnchor="middle" fontSize="8" fill="#c084fc" fontFamily="monospace" fontWeight="bold">TOKEN 2FA</text>
    </svg>
  )
};

export default function MemoryPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // 4 High-Tech Cyber-Zombie Survival Nodes
    const rawPairs = phase.pairs || [
      { id: "ssd", name: "Dump de Memória", subtitle: "Kernel Dump Militar", icon: "💾" },
      { id: "cctv", name: "CCTV Corrompido", subtitle: "Câmera Quarentena", icon: "📹" },
      { id: "dna", name: "Genoma Alpha-Z", subtitle: "Mutação de RNA", icon: "🧬" },
      { id: "token", name: "Chave Quântica", subtitle: "Bypass de Firewall", icon: "🔑" }
    ];

    const deck = [];
    rawPairs.forEach((p) => {
      deck.push({ uniqueId: `${p.id}_a`, pairId: p.id, icon: p.icon, name: p.name, subtitle: p.subtitle });
      deck.push({ uniqueId: `${p.id}_b`, pairId: p.id, icon: p.icon, name: p.name, subtitle: p.subtitle });
    });

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
  }, [phase]);

  const handleCardClick = (idx) => {
    if (isLocked) return;
    if (flippedIndices.includes(idx)) return;
    if (matchedIds.includes(cards[idx].pairId)) return;

    sound.playClick();
    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsLocked(true);
      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        sound.playCyberHacking();
        const nextMatched = [...matchedIds, firstCard.pairId];
        setMatchedIds(nextMatched);
        setFlippedIndices([]);
        setIsLocked(false);

        // Check if all pairs matched
        const totalPairs = 4;
        if (nextMatched.length >= totalPairs) {
          sound.playCorrect();
          setTimeout(() => {
            onComplete(phase.reward || 140, phase.clue);
          }, 1400);
        }
      } else {
        // MISS!
        setTimeout(() => {
          sound.playError();
          loseLife();
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const totalPairsCount = 4;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none">
      <div className="w-full bg-[#0a110d] p-4 sm:p-5 rounded-3xl shadow-2xl relative border-2 border-emerald-500/50">
        
        {/* Tactical Cyber-Buffer Visual Banner */}
        <div className="relative w-full h-22 sm:h-24 rounded-2xl overflow-hidden mb-3 border border-emerald-500/40 bg-gradient-to-r from-emerald-950/90 via-slate-950 to-emerald-950/90 shadow-inner flex items-center justify-between px-4 sm:px-6">
          <div className="flex flex-col text-left z-10">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> BUFFER DE MEMÓRIA DO MAINFRAME
            </span>
            <h3 className="text-base sm:text-lg font-cinzel font-black text-white leading-tight">
              {phase.title || "Descriptografia dos Nódulos de Vigilância"}
            </h3>
            <p className="text-[11px] text-zinc-300 max-w-xs sm:max-w-sm truncate font-outfit">
              {phase.description || "Alinhe os 4 pares de dados criptografados para restaurar o controle das defesas do complexo."}
            </p>
          </div>

          {/* Glowing Quantum Node Status */}
          <div className="flex items-center gap-1.5 z-10 bg-black/80 border border-emerald-500/50 px-3 py-1.5 rounded-xl shadow-lg shrink-0">
            {Array.from({ length: totalPairsCount }).map((_, i) => {
              const active = i < matchedIds.length;
              return (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-md border transition-all duration-500 ${
                    active
                      ? 'bg-emerald-400 border-emerald-200 shadow-[0_0_12px_#22c55e]'
                      : 'bg-zinc-800 border-zinc-700'
                  }`}
                  title={active ? 'Nódulo Descriptografado' : 'Nódulo Corrompido'}
                />
              );
            })}
            <span className="text-[11px] font-mono font-bold text-amber-300 ml-1">
              {matchedIds.length}/{totalPairsCount}
            </span>
          </div>

          {/* Background scanline effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_70%)] pointer-events-none" />
        </div>

        {/* 4x2 Grid of Tactical Cyber-Cards with 3D Flip */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-md mx-auto">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx);
            const isMatched = matchedIds.includes(card.pairId);
            const artwork = nodeArtworks[card.pairId] || (
              <span className="text-3xl sm:text-4xl drop-shadow-md">{card.icon}</span>
            );

            return (
              <motion.div
                key={card.uniqueId}
                whileHover={!isFlipped && !isMatched ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isFlipped && !isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleCardClick(idx)}
                className="aspect-square cursor-pointer perspective-1000"
              >
                <motion.div
                  animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full relative preserve-3d"
                >
                  {/* Front: Holographic Cyber-Chip Card Back */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg border border-emerald-500/50 bg-slate-950 flex items-center justify-center">
                    <CyberCardBack />
                  </div>

                  {/* Back: Decrypted System Node */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex flex-col items-center justify-between p-1.5 border-2 shadow-2xl transition-all ${
                      isMatched
                        ? 'bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 border-emerald-400 shadow-[0_0_18px_rgba(34,197,94,0.6)]'
                        : 'bg-gradient-to-b from-cyan-950 via-slate-950 to-cyan-950 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    }`}
                  >
                    {/* Illustrated Cyber Artwork */}
                    <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                      {artwork}
                    </div>

                    {/* Node Label Badge */}
                    <div className="w-full bg-black/90 border border-emerald-500/40 rounded-lg py-0.5 px-1 text-center">
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-300 block truncate">
                        {card.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Victory Notification Banner */}
        {matchedIds.length >= totalPairsCount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3.5 p-2.5 bg-emerald-950 border-2 border-emerald-400 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-2xl"
          >
            <Check className="w-4 h-4 text-emerald-300" />
            <span>Todos os 4 nódulos foram sincronizados! O firewall caiu e a evidência militar foi decifrada!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
