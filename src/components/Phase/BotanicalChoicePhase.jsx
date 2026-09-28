import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles, CheckCircle2, ShieldAlert, BookOpen, Leaf } from 'lucide-react';

// Illustrated Botanical Artwork SVGs
const botanicalArtworks = {
  lotus: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="bcLotusGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#9C27B0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4A148C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bcLotusPetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FF80BF" />
          <stop offset="100%" stopColor="#D81B60" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#bcLotusGlow)" />
      <ellipse cx="50" cy="74" rx="36" ry="10" fill="#0277BD" opacity="0.4" />
      <ellipse cx="50" cy="74" rx="28" ry="6" fill="#29B6F6" opacity="0.6" />
      <path d="M18,74 Q50,86 82,74 Q70,68 50,68 Q30,68 18,74 Z" fill="#1B5E20" opacity="0.75" />
      <path d="M50,18 Q30,42 16,66 Q36,70 50,60 Q64,70 84,66 Q70,42 50,18 Z" fill="#C2185B" />
      <path d="M50,22 Q28,48 26,62 Q40,66 50,56 Z" fill="url(#bcLotusPetal)" />
      <path d="M50,22 Q72,48 74,62 Q60,66 50,56 Z" fill="url(#bcLotusPetal)" />
      <path d="M50,18 Q40,38 44,56 Q50,52 56,56 Q60,38 50,18 Z" fill="#FFF0F5" />
      <circle cx="50" cy="50" r="4" fill="#FFD54F" />
      <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
    </svg>
  ),

  mushroom: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="bcShroomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7E57C2" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#4A148C" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bcShroomCap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#AB47BC" />
          <stop offset="60%" stopColor="#6A1B9A" />
          <stop offset="100%" stopColor="#311B92" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#bcShroomGlow)" />
      <ellipse cx="50" cy="78" rx="34" ry="9" fill="#1B5E20" opacity="0.8" />
      <path d="M43,46 C41,60 40,74 38,78 L62,78 C60,74 59,60 57,46 Z" fill="#E0E0E0" />
      <path d="M16,48 C16,18 84,18 84,48 C72,56 28,56 16,48 Z" fill="url(#bcShroomCap)" />
      <circle cx="50" cy="28" r="4" fill="#E1BEE7" />
      <circle cx="34" cy="36" r="3.5" fill="#80DEEA" />
      <circle cx="66" cy="36" r="3.5" fill="#80DEEA" />
      <circle cx="48" cy="42" r="2.5" fill="#FFE082" />
      <circle cx="32" cy="18" r="1.5" fill="#80DEEA" opacity="0.9" />
    </svg>
  ),

  herb: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="bcCloverGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#1B5E20" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bcCloverLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5D6A7" />
          <stop offset="40%" stopColor="#43A047" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#bcCloverGlow)" />
      <path d="M50,52 Q48,74 36,84" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M50,48 C42,32 30,22 42,16 C48,14 50,22 50,24 C50,22 52,14 58,16 C70,22 58,32 50,48 Z" fill="url(#bcCloverLeaf)" />
      <path d="M50,52 C42,68 30,78 42,84 C48,86 50,78 50,76 C50,78 52,86 58,84 C70,78 58,68 50,52 Z" fill="url(#bcCloverLeaf)" />
      <path d="M48,50 C32,42 22,30 16,42 C14,48 22,50 24,50 C22,50 14,52 16,58 C22,70 32,58 48,50 Z" fill="url(#bcCloverLeaf)" />
      <path d="M52,50 C68,42 78,30 84,42 C86,48 78,50 76,50 C78,50 86,52 84,58 C78,70 68,58 52,50 Z" fill="url(#bcCloverLeaf)" />
      <circle cx="50" cy="50" r="7" fill="none" stroke="#FFD54F" strokeWidth="1.2" opacity="0.9" />
      <circle cx="50" cy="50" r="3" fill="#FFE082" />
    </svg>
  ),

  flower: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-md">
      <defs>
        <radialGradient id="bcSunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFA000" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#E65100" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bcSunPetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="40%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#F57C00" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#bcSunGlow)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={i}
          d="M50,50 L45,18 Q50,10 55,18 Z"
          fill="url(#bcSunPetal)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="13" fill="#E65100" stroke="#FFD54F" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="9" fill="#FF8F00" />
      <circle cx="50" cy="50" r="4" fill="#FFE082" />
    </svg>
  )
};

export default function BotanicalChoicePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [selectedId, setSelectedId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const cards = phase.cards || [
    {
      id: "lotus",
      name: "Lótus Estelar",
      icon: "🪷",
      subtitle: "Flor das Águas da Meia-Noite",
      desc: "Bioluminescente e delicada, floresce sob o luar. Suas raízes são venenosas se colhidas de dia.",
      isCorrect: false,
      failMessage: "A Lótus Estelar emitiu névoas sonolentas! Suas raízes rejeitam a luz da fonte sagrada."
    },
    {
      id: "mushroom",
      name: "Cogumelo Astral",
      icon: "🍄",
      subtitle: "Fungo das Cavernas Nebulosas",
      desc: "Esporos fluorescentes roxos que atraem espíritos errantes e causam ilusões ópticas.",
      isCorrect: false,
      failMessage: "Os esporos do Cogumelo Astral causaram alucinações e confundiram os aventureiros!"
    },
    {
      id: "herb",
      name: "Trevo de Quatro Folhas",
      icon: "🍀",
      subtitle: "Amuleto da Fortuna Élfica",
      desc: "Raríssimo vegetal abençoado pelos espíritos antigos. Carrega a virtude da sorte e pureza total.",
      isCorrect: true,
      successMessage: "A energia pura do Trevo Dourado purificou o altar e despertou as águas sagradas!"
    },
    {
      id: "flower",
      name: "Orquídea Solar",
      icon: "🌻",
      subtitle: "Pétala do Calor Ardente",
      desc: "Irradia calor como uma pequena chama. Se colocada na água fria da fonte, murcha instantaneamente.",
      isCorrect: false,
      failMessage: "O calor excessivo da Orquídea Solar ferveu a água e fechou os selos da fonte!"
    }
  ];

  const handleSelectCard = (card) => {
    if (isSuccess || selectedId) return;
    setSelectedId(card.id);

    if (card.isCorrect) {
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        onComplete(phase.reward || 140, phase.clue);
      }, 1600);
    } else {
      loseLife();
      setErrorMessage(card.failMessage || "Esta planta não é compatível com o ritual sagrado.");
      setTimeout(() => {
        setSelectedId(null);
        setErrorMessage(null);
      }, 1800);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-4 sm:p-6 rounded-3xl shadow-2xl relative">
        {/* Header Title & Theme */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-cinzel font-bold mb-1 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Desafio de Dedução Botânica
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200">
            {phase.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-amber-100/80 max-w-2xl mx-auto">
            {phase.description}
          </p>
        </div>

        {/* Riddle Scroll / Parchment Box */}
        {phase.riddle && (
          <div className="mb-4 p-3 sm:p-3.5 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-amber-950/40 border border-amber-500/40 rounded-2xl text-center shadow-inner max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 font-cinzel font-bold text-xs uppercase mb-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> O Enigma da Mãe Árvore
            </div>
            <p className="italic text-xs sm:text-sm text-amber-100/90 font-medium leading-relaxed">
              {phase.riddle}
            </p>
          </div>
        )}

        {/* 4 Illustrated Sacred Botanical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {cards.map((card) => {
            const isSelected = selectedId === card.id;
            const artwork = botanicalArtworks[card.id] || (
              <span className="text-4xl">{card.icon}</span>
            );

            let borderStyle = "border-amber-500/40 bg-slate-900/90 hover:border-amber-300 hover:bg-slate-850";
            if (isSelected) {
              borderStyle = isSuccess
                ? "border-emerald-400 bg-emerald-950/90 shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                : "border-red-500 bg-red-950/90 shadow-[0_0_20px_rgba(239,68,68,0.6)]";
            }

            return (
              <motion.div
                key={card.id}
                whileHover={!selectedId ? { scale: 1.03, y: -4 } : {}}
                whileTap={!selectedId ? { scale: 0.97 } : {}}
                onClick={() => handleSelectCard(card)}
                className={`p-3 rounded-2xl border-2 flex flex-col justify-between transition-all cursor-pointer shadow-lg relative group ${borderStyle}`}
              >
                {/* Visual Artwork Container */}
                <div className="w-full aspect-square rounded-xl bg-slate-950/80 border border-amber-500/20 p-2 flex items-center justify-center mb-2 overflow-hidden shadow-inner group-hover:border-amber-400/40 transition-colors">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                    {artwork}
                  </div>
                </div>

                {/* Plant Name & Subtitle */}
                <div className="text-center mb-2">
                  <h4 className="font-cinzel font-bold text-amber-200 text-sm group-hover:text-amber-100 transition-colors">
                    {card.name}
                  </h4>
                  <span className="text-[10px] text-amber-400/70 font-semibold block truncate">
                    {card.subtitle}
                  </span>
                </div>

                {/* Lore / Description */}
                <p className="text-[11px] text-amber-100/75 leading-relaxed text-center mb-3 min-h-[40px]">
                  {card.desc}
                </p>

                {/* Action CTA Button */}
                <button
                  disabled={Boolean(selectedId)}
                  className={`w-full py-1.5 px-2 rounded-xl text-xs font-cinzel font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isSelected
                      ? isSuccess
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-red-500 text-white"
                      : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 group-hover:bg-amber-500 group-hover:text-slate-950"
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Ofertar Esta Flor</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Error Feedback Banner */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-950/90 border border-red-500 rounded-xl text-red-200 text-xs sm:text-sm text-center font-semibold flex items-center justify-center gap-2 shadow-xl"
          >
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {/* Success Feedback Banner */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-emerald-950/90 border-2 border-emerald-400 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-2xl"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>A fonte sagrada despertou em luz esmeralda! A insígnia da Mãe Árvore foi revelada!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
