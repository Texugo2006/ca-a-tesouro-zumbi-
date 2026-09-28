import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles, Check } from 'lucide-react';

export default function MemoryPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const rawPairs = phase.pairs || [
      { id: "p1", name: "Glifo 1", icon: "💎" },
      { id: "p2", name: "Glifo 2", icon: "🔮" },
      { id: "p3", name: "Glifo 3", icon: "✨" },
      { id: "p4", name: "Glifo 4", icon: "🌙" }
    ];

    const deck = [];
    rawPairs.forEach((p, idx) => {
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

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-5 sm:p-7 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-5">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-cinzel">
            Desafio de Foco & Memória
          </span>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200 mt-1">
            {phase.title}
          </h3>
          <p className="mt-1 text-xs text-amber-100/80">
            {phase.description} ({matchedIds.length}/{(phase.pairs || []).length || 4} pares encontrados)
          </p>
        </div>

        {/* 4x2 Grid of Cards */}
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx);
            const isMatched = matchedIds.includes(card.pairId);

            return (
              <motion.div
                key={card.uniqueId}
                whileHover={!isFlipped && !isMatched ? { scale: 1.05 } : {}}
                whileTap={!isFlipped && !isMatched ? { scale: 0.95 } : {}}
                onClick={() => handleCardClick(idx)}
                className="aspect-square cursor-pointer perspective-1000"
              >
                <motion.div
                  animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative preserve-3d"
                >
                  {/* Front (Hidden Face) */}
                  <div className="absolute inset-0 backface-hidden bg-slate-900 border-2 border-amber-500/40 rounded-2xl flex items-center justify-center shadow-md">
                    <span className="text-xl text-amber-500/60 font-cinzel font-black">
                      ?
                    </span>
                  </div>

                  {/* Back (Revealed Face) */}
                  <div
                    className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl flex flex-col items-center justify-center border-2 shadow-lg transition-colors ${
                      isMatched
                        ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
                        : 'bg-amber-950/90 border-amber-400 text-amber-200'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl drop-shadow-md">
                      {card.icon}
                    </span>
                    <span className="text-[9px] font-semibold mt-1 truncate max-w-[90%] opacity-80">
                      {card.name}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {matchedIds.length >= ((phase.pairs || []).length || 4) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Todos os pares descobertos! A relíquia foi revelada!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
