import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Search, Check, AlertCircle } from 'lucide-react';

export default function FindObjectPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [clickedItem, setClickedItem] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const items = phase.items || [];
  const targetItemName = phase.targetItemName || "Relíquia";

  const handleItemClick = (item) => {
    if (isSuccess) return;
    setClickedItem(item.id);

    if (item.isTarget) {
      setIsSuccess(true);
      setFeedback({ type: 'success', text: `Você encontrou: ${item.name}! A pista foi revelada!` });
      setTimeout(() => {
        onComplete(phase.reward || 130, phase.clue);
      }, 1500);
    } else {
      loseLife();
      setFeedback({ type: 'error', text: `Isto é apenas um(a) ${item.name}. Não é o objeto procurado! (-1 Vida)` });
      setTimeout(() => {
        setClickedItem(null);
      }, 1200);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-5 sm:p-7 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-cinzel font-bold mb-2">
            <Search className="w-3.5 h-3.5" /> Busca de Objeto Escondido
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200">
            {phase.title}
          </h3>
          <p className="mt-1 text-xs text-amber-100/80">
            {phase.description}
          </p>
          <div className="mt-2 text-sm font-bold text-amber-300 bg-slate-900/90 py-1.5 px-4 rounded-xl border border-amber-500/30 inline-block">
            🎯 Procure por: <span className="text-amber-400 uppercase tracking-wide">{targetItemName}</span>
          </div>
        </div>

        {/* The Illustrated Exploration Scenery */}
        <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/40 rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-inner">
          {/* Subtle background environmental shapes */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,197,66,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(47,107,79,0.2),transparent_70%)]" />

          {/* Decorative atmospheric plants / rocks / stars */}
          <span className="absolute top-4 left-6 text-2xl opacity-40">🌿</span>
          <span className="absolute bottom-6 right-8 text-3xl opacity-30">🪨</span>
          <span className="absolute top-8 right-12 text-xl opacity-20">✨</span>
          <span className="absolute bottom-4 left-10 text-3xl opacity-30">🌴</span>

          {/* Interactive Items */}
          {items.map((item) => {
            const isClicked = clickedItem === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.25, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleItemClick(item)}
                disabled={isSuccess}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`p-2 rounded-2xl transition-all cursor-pointer flex items-center justify-center ${
                  isClicked && item.isTarget
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_25px_rgba(244,197,66,0.9)] scale-125'
                    : isClicked
                    ? 'bg-red-500 text-white animate-shake'
                    : 'bg-slate-900/40 hover:bg-amber-500/20 hover:shadow-lg'
                }`}
                title="Examinar"
              >
                <span className="text-3xl sm:text-4xl filter drop-shadow-md">
                  {item.icon}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-xl border text-xs text-center font-bold flex items-center justify-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-red-950/80 border-red-500 text-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{feedback.text}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
