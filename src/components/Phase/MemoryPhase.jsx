import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles, Check } from 'lucide-react';

// Ornate Mystical Card Back (Verso das Cartas)
const CardBack = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
    <defs>
      <linearGradient id="cardBackBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0B231A" />
        <stop offset="50%" stopColor="#081726" />
        <stop offset="100%" stopColor="#040D16" />
      </linearGradient>
      <linearGradient id="cardGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#F4C542" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
      <radialGradient id="sealGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2ECC71" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#2ECC71" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Background Plate */}
    <rect x="3" y="3" width="94" height="94" rx="14" fill="url(#cardBackBg)" stroke="url(#cardGold)" strokeWidth="2.5" />
    
    {/* Inner Runic Border */}
    <rect x="8" y="8" width="84" height="84" rx="10" fill="none" stroke="url(#cardGold)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />

    {/* Corner Ornaments */}
    <polygon points="4,4 16,4 4,16" fill="url(#cardGold)" />
    <polygon points="96,4 84,4 96,16" fill="url(#cardGold)" />
    <polygon points="4,96 16,96 4,84" fill="url(#cardGold)" />
    <polygon points="96,96 84,96 96,84" fill="url(#cardGold)" />

    {/* Mystical Glow Center */}
    <circle cx="50" cy="50" r="32" fill="url(#sealGlow)" />

    {/* Outer Arcane Ring */}
    <circle cx="50" cy="50" r="26" fill="none" stroke="url(#cardGold)" strokeWidth="1.2" opacity="0.85" />
    <circle cx="50" cy="50" r="22" fill="none" stroke="url(#cardGold)" strokeWidth="0.6" strokeDasharray="2 2" />

    {/* Sacred Tree / Compass Star Emblem */}
    {/* Star rays */}
    <path d="M50,26 L52,48 L50,50 L48,48 Z" fill="url(#cardGold)" />
    <path d="M50,74 L52,52 L50,50 L48,52 Z" fill="url(#cardGold)" />
    <path d="M26,50 L48,52 L50,50 L48,48 Z" fill="url(#cardGold)" />
    <path d="M74,50 L52,52 L50,50 L52,48 Z" fill="url(#cardGold)" />
    <path d="M33,33 L49,49 L47,51 Z" fill="url(#cardGold)" opacity="0.6" />
    <path d="M67,33 L51,49 L53,51 Z" fill="url(#cardGold)" opacity="0.6" />
    <path d="M33,67 L49,51 L47,49 Z" fill="url(#cardGold)" opacity="0.6" />
    <path d="M67,67 L51,51 L53,49 Z" fill="url(#cardGold)" opacity="0.6" />

    {/* Elven Tree of Life Silhouette in Core */}
    <path d="M50,38 C54,34 60,38 56,44 C53,49 50,50 50,58 L50,62" fill="none" stroke="#2ECC71" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M50,38 C46,34 40,38 44,44 C47,49 50,50 50,58" fill="none" stroke="#2ECC71" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="50" cy="46" r="3.5" fill="url(#cardGold)" />
    <circle cx="50" cy="46" r="1.5" fill="#FFFFFF" />
  </svg>
);

// High-Fidelity Botanical & Mystical Card Illustrations
const cardArtworks = {
  lotus: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#9C27B0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4A148C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lotusPetalMain" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FF80BF" />
          <stop offset="100%" stopColor="#D81B60" />
        </linearGradient>
        <linearGradient id="lotusPetalDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB6C1" />
          <stop offset="100%" stopColor="#880E4F" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#lotusGlow)" />
      {/* Water pool */}
      <ellipse cx="50" cy="74" rx="36" ry="10" fill="#0277BD" opacity="0.4" />
      <ellipse cx="50" cy="74" rx="28" ry="6" fill="#29B6F6" opacity="0.6" />
      {/* Lilypad */}
      <path d="M18,74 Q50,86 82,74 Q70,68 50,68 Q30,68 18,74 Z" fill="#1B5E20" opacity="0.75" />
      {/* Outer Lotus Petals */}
      <path d="M50,18 Q30,42 16,66 Q36,70 50,60 Q64,70 84,66 Q70,42 50,18 Z" fill="url(#lotusPetalDark)" />
      {/* Mid Petals */}
      <path d="M50,22 Q28,48 26,62 Q40,66 50,56 Z" fill="url(#lotusPetalMain)" opacity="0.95" />
      <path d="M50,22 Q72,48 74,62 Q60,66 50,56 Z" fill="url(#lotusPetalMain)" opacity="0.95" />
      {/* Center Petal */}
      <path d="M50,18 Q40,38 44,56 Q50,52 56,56 Q60,38 50,18 Z" fill="#FFF0F5" />
      {/* Core Seed/Glow */}
      <circle cx="50" cy="50" r="5" fill="#FFD54F" />
      <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
      {/* Starlight sparkles */}
      <circle cx="30" cy="28" r="1.5" fill="#E1F5FE" />
      <circle cx="70" cy="30" r="1.8" fill="#FFF9C4" />
      <circle cx="50" cy="10" r="2" fill="#FFFFFF" />
    </svg>
  ),

  mushroom: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="shroomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7E57C2" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#4A148C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shroomCap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#AB47BC" />
          <stop offset="60%" stopColor="#6A1B9A" />
          <stop offset="100%" stopColor="#311B92" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#shroomGlow)" />
      {/* Mossy ground */}
      <ellipse cx="50" cy="78" rx="34" ry="9" fill="#1B5E20" opacity="0.8" />
      <path d="M26,78 Q30,70 34,78 Q38,68 42,78" stroke="#66BB6A" strokeWidth="2" fill="none" />
      <path d="M58,78 Q62,70 66,78 Q70,71 74,78" stroke="#66BB6A" strokeWidth="2" fill="none" />
      {/* Stalk */}
      <path d="M43,46 C41,60 40,74 38,78 L62,78 C60,74 59,60 57,46 Z" fill="#E0E0E0" />
      <path d="M43,48 Q50,52 57,48 Q50,56 43,48 Z" fill="#BDBDBD" />
      {/* Mushroom Cap */}
      <path d="M16,48 C16,18 84,18 84,48 C72,56 28,56 16,48 Z" fill="url(#shroomCap)" />
      <path d="M16,48 Q50,56 84,48" stroke="#CE93D8" strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Glowing Bioluminescent Spots */}
      <circle cx="50" cy="28" r="4.5" fill="#E1BEE7" />
      <circle cx="34" cy="36" r="3.8" fill="#80DEEA" />
      <circle cx="66" cy="36" r="3.8" fill="#80DEEA" />
      <circle cx="48" cy="42" r="2.8" fill="#FFE082" />
      <circle cx="26" cy="44" r="2.2" fill="#E1BEE7" />
      <circle cx="74" cy="44" r="2.2" fill="#E1BEE7" />
      {/* Floating spores */}
      <circle cx="32" cy="18" r="1.5" fill="#80DEEA" opacity="0.9" />
      <circle cx="68" cy="16" r="1.8" fill="#FFE082" opacity="0.9" />
      <circle cx="50" cy="12" r="1.2" fill="#E1BEE7" />
    </svg>
  ),

  herb: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="cloverGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#1B5E20" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cloverLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5D6A7" />
          <stop offset="40%" stopColor="#43A047" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#cloverGlow)" />
      {/* Stem */}
      <path d="M50,52 Q48,74 36,84" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M50,52 Q48,74 36,84" stroke="#81C784" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* 4 Clover Leaves (Heart-shaped) */}
      {/* Top Leaf */}
      <path d="M50,48 C42,32 30,22 42,16 C48,14 50,22 50,24 C50,22 52,14 58,16 C70,22 58,32 50,48 Z" fill="url(#cloverLeaf)" />
      {/* Bottom Leaf */}
      <path d="M50,52 C42,68 30,78 42,84 C48,86 50,78 50,76 C50,78 52,86 58,84 C70,78 58,68 50,52 Z" fill="url(#cloverLeaf)" />
      {/* Left Leaf */}
      <path d="M48,50 C32,42 22,30 16,42 C14,48 22,50 24,50 C22,50 14,52 16,58 C22,70 32,58 48,50 Z" fill="url(#cloverLeaf)" />
      {/* Right Leaf */}
      <path d="M52,50 C68,42 78,30 84,42 C86,48 78,50 76,50 C78,50 86,52 84,58 C78,70 68,58 52,50 Z" fill="url(#cloverLeaf)" />
      {/* Golden elven rune spiral in center */}
      <circle cx="50" cy="50" r="8" fill="none" stroke="#FFD54F" strokeWidth="1.2" opacity="0.9" />
      <circle cx="50" cy="50" r="3" fill="#FFE082" />
      {/* Starlight accents */}
      <circle cx="28" cy="24" r="1.5" fill="#FFF" />
      <circle cx="72" cy="24" r="1.5" fill="#FFF" />
    </svg>
  ),

  flower: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFA000" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#E65100" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sunPetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="40%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sunGlow)" />
      {/* Sun Ray Petals in circle */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={i}
          d="M50,50 L45,18 Q50,10 55,18 Z"
          fill="url(#sunPetal)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <path
          key={`sub_${i}`}
          d="M50,50 L47,24 Q50,18 53,24 Z"
          fill="#FFB300"
          transform={`rotate(${angle} 50 50)`}
          opacity="0.9"
        />
      ))}
      {/* Solar Core */}
      <circle cx="50" cy="50" r="14" fill="#E65100" stroke="#FFD54F" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="10" fill="#FF8F00" />
      <circle cx="50" cy="50" r="5" fill="#FFE082" />
      <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
      {/* Solar Flare Sparkles */}
      <circle cx="50" cy="8" r="1.8" fill="#FFF" />
      <circle cx="80" cy="20" r="1.5" fill="#FFF9C4" />
      <circle cx="20" cy="80" r="1.5" fill="#FFF9C4" />
    </svg>
  ),

  // Fallbacks for Arctic / Frozen Map
  snowflake: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="snowGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#80DEEA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#snowGlow)" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="14" stroke="#E0F7FA" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="26" x2="43" y2="20" stroke="#80DEEA" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="26" x2="57" y2="20" stroke="#80DEEA" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="36" x2="41" y2="30" stroke="#B2EBF2" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="36" x2="59" y2="30" stroke="#B2EBF2" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="14" r="2.5" fill="#FFFFFF" />
        </g>
      ))}
      <circle cx="50" cy="50" r="6" fill="#E0F7FA" stroke="#0097A7" strokeWidth="1.5" />
    </svg>
  ),

  gem: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="gemGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#29B6F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#gemGlow)" />
      <polygon points="50,16 78,34 70,76 30,76 22,34" fill="#0288D1" stroke="#E1F5FE" strokeWidth="1.5" />
      <polygon points="50,16 66,34 50,76 34,34" fill="#03A9F4" />
      <polygon points="50,16 66,34 78,34" fill="#4FC3F7" />
      <polygon points="50,16 34,34 22,34" fill="#81D4FA" />
      <polygon points="66,34 78,34 70,76 50,76" fill="#0277BD" />
      <polygon points="34,34 22,34 30,76 50,76" fill="#01579B" />
      <polygon points="50,22 56,30 50,38 44,30" fill="#FFFFFF" opacity="0.7" />
    </svg>
  ),

  crystal: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="crystGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#CE93D8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#crystGlow)" />
      <polygon points="50,12 62,38 58,84 42,84 38,38" fill="#BA68C8" stroke="#F3E5F5" strokeWidth="1.5" />
      <polygon points="50,12 50,84 38,38" fill="#CE93D8" />
      <polygon points="68,30 76,46 72,82 58,82 58,40" fill="#8E24AA" opacity="0.85" />
      <polygon points="32,30 24,46 28,82 42,82 42,40" fill="#AB47BC" opacity="0.85" />
      <line x1="50" y1="12" x2="50" y2="84" stroke="#FFF" strokeWidth="1" opacity="0.6" />
    </svg>
  ),

  comet: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="cometGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD54F" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#cometGlow)" />
      <path d="M68,26 Q40,44 18,72 Q46,58 74,32 Z" fill="#40C4FF" opacity="0.8" />
      <path d="M72,28 Q48,46 28,68 Q52,56 76,32 Z" fill="#E040FB" opacity="0.6" />
      <circle cx="70" cy="30" r="10" fill="#FFE57F" />
      <circle cx="70" cy="30" r="5" fill="#FFFFFF" />
      <circle cx="48" cy="48" r="2.5" fill="#80D8FF" />
      <circle cx="32" cy="62" r="1.8" fill="#EA80FC" />
      <circle cx="22" cy="74" r="1.2" fill="#FFFFFF" />
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
    const rawPairs = phase.pairs || [
      { id: "lotus", name: "Lótus Estelar", icon: "🌸" },
      { id: "mushroom", name: "Cogumelo Astral", icon: "🍄" },
      { id: "herb", name: "Trevo de Quatro Folhas", icon: "🍀" },
      { id: "flower", name: "Orquídea Solar", icon: "🌻" }
    ];

    const deck = [];
    rawPairs.forEach((p) => {
      deck.push({ uniqueId: `${p.id}_a`, pairId: p.id, icon: p.icon, name: p.name });
      deck.push({ uniqueId: `${p.id}_b`, pairId: p.id, icon: p.icon, name: p.name });
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

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsLocked(true);
      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        // Match!
        const nextMatched = [...matchedIds, firstCard.pairId];
        setMatchedIds(nextMatched);
        setFlippedIndices([]);
        setIsLocked(false);

        // Check if all pairs matched
        const totalPairs = (phase.pairs || []).length || 4;
        if (nextMatched.length >= totalPairs) {
          setTimeout(() => {
            onComplete(phase.reward || 130, phase.clue);
          }, 1200);
        }
      } else {
        // Miss!
        setTimeout(() => {
          loseLife();
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const totalPairsCount = (phase.pairs || []).length || 4;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-4 sm:p-5 rounded-3xl shadow-2xl relative">
        
        {/* Thematic Botanical Spring Visual Banner */}
        <div className="relative w-full h-20 sm:h-24 rounded-2xl overflow-hidden mb-3 border border-amber-500/30 bg-gradient-to-r from-emerald-950/80 via-slate-950 to-emerald-950/80 shadow-inner flex items-center justify-between px-4 sm:px-6">
          <div className="flex flex-col text-left z-10">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-cinzel flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Santuário Botânico Ancestral
            </span>
            <h3 className="text-base sm:text-lg font-cinzel font-black text-amber-200">
              {phase.title}
            </h3>
            <p className="text-[11px] text-amber-100/75 max-w-xs sm:max-w-sm truncate">
              {phase.description}
            </p>
          </div>

          {/* Glowing Botanical Rune Orbs Status */}
          <div className="flex items-center gap-1.5 z-10 bg-slate-900/90 border border-amber-500/40 px-3 py-1.5 rounded-xl shadow-lg shrink-0">
            {Array.from({ length: totalPairsCount }).map((_, i) => {
              const active = i < matchedIds.length;
              return (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-500 ${
                    active
                      ? 'bg-emerald-400 border-emerald-200 shadow-[0_0_10px_#10B981]'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                  title={active ? 'Runa Desperta' : 'Runa Adormecida'}
                />
              );
            })}
            <span className="text-[10px] font-cinzel font-bold text-amber-300 ml-1">
              {matchedIds.length}/{totalPairsCount}
            </span>
          </div>

          {/* Background ambient lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,204,113,0.15),transparent_70%)] pointer-events-none" />
        </div>

        {/* 4x2 Grid of Cards with Rich Artwork & Cardbacks */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-md mx-auto">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx);
            const isMatched = matchedIds.includes(card.pairId);
            const artwork = cardArtworks[card.pairId] || (
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
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative preserve-3d"
                >
                  {/* Front: Ornate Fantasy Card Back (Verso Ilustrado) */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-lg border border-amber-500/50 bg-slate-950 flex items-center justify-center">
                    <CardBack />
                  </div>

                  {/* Back: Illustrated Magical Botanical / Relic Face (Frente Ilustrada) */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex flex-col items-center justify-between p-1.5 border-2 shadow-2xl transition-all ${
                      isMatched
                        ? 'bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-gradient-to-b from-amber-950/90 via-slate-950 to-amber-950/90 border-amber-400 shadow-[0_0_12px_rgba(244,197,66,0.3)]'
                    }`}
                  >
                    {/* Illustrated SVG Artwork */}
                    <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                      {artwork}
                    </div>

                    {/* Badge with Plant / Rune Name */}
                    <div className="w-full bg-slate-950/90 border border-amber-500/40 rounded-lg py-0.5 px-1 text-center">
                      <span className="text-[9px] sm:text-[10px] font-cinzel font-bold text-amber-200 block truncate">
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
            className="mt-3.5 p-2.5 bg-emerald-950/90 border-2 border-emerald-400 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-xl"
          >
            <Check className="w-4 h-4 text-emerald-300" />
            <span>As 4 runas botânicas floresceram! A fonte sagrada despertou!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
