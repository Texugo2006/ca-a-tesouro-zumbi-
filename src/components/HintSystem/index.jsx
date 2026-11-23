import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Lock, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

export default function HintSystem({ phase, mapId, onTriggerHint }) {
  const { hintsUsed, unlockHint, coins } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);

  const phaseNumber = phase.phaseNumber || 1;
  const key = `${mapId}_${phaseNumber}`;
  const usedCount = hintsUsed[key] || 0;
  const hints = phase.hints || [];
  const maxHints = hints.length || 3;

  // Player starts with 3/3 (or maxHints/maxHints) available!
  const availableHints = Math.max(0, maxHints - usedCount);

  // Next hint to unlock
  const nextLevel = usedCount + 1;
  const canUnlockMore = availableHints > 0 && nextLevel <= maxHints;
  const nextHint = hints.find(h => h.level === nextLevel) || hints[usedCount];
  const canAffordNext = nextHint ? (nextHint.cost === 0 || coins >= nextHint.cost) : false;

  const handleRevealNext = () => {
    if (!canUnlockMore) {
      setIsOpen(true);
      return;
    }
    const cost = nextHint?.cost || 0;
    const success = unlockHint(mapId, phaseNumber, nextLevel, cost);
    if (success) {
      if (onTriggerHint) {
        onTriggerHint(nextLevel);
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      {/* ── Toggle button ── */}
      <div className="flex items-center gap-1">
        {/* Quick reveal button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleRevealNext}
          title={canUnlockMore ? (nextHint?.cost === 0 ? 'Revelar dica (Grátis)' : `Revelar dica (${nextHint?.cost} moedas)`) : 'Ver dicas'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all text-xs font-bold font-cinzel shadow-sm"
          style={{
            background: availableHints > 0 ? '#1a2e14' : '#141a0e',
            border: availableHints > 0 ? '1px solid #4a7c2a' : '1px solid #2a3a1e',
            color: availableHints > 0 ? '#b8d870' : '#7a7060',
          }}
        >
          <img src="/assets/images/ui/hint.svg" alt="Dica" className="w-4 h-4 object-contain inline-block drop-shadow-sm" />
          <span>DICAS ({availableHints}/{maxHints})</span>
        </motion.button>

        {/* Expand/view button */}
        {usedCount > 0 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(o => !o)}
            className="flex items-center justify-center p-1.5 rounded-lg cursor-pointer transition-all text-xs"
            style={{
              background: '#0a0f08',
              border: '1px solid #2a3a1e',
              color: '#4a7c2a',
            }}
            title="Ver histórico de dicas"
          >
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </motion.button>
        )}
      </div>

      {/* ── Expanded hints panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-full mb-2 w-72 rounded-xl shadow-2xl z-50"
            style={{
              background: '#0d1108',
              border: '1px solid #2a3a1e',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-3 py-2.5 border-b"
              style={{ borderColor: '#1a2414' }}
            >
              <span className="font-cinzel font-bold text-xs flex items-center gap-1.5" style={{ color: '#7ab648' }}>
                <img src="/assets/images/ui/hint.svg" alt="Dica" className="w-4 h-4 object-contain inline-block" />
                Dicas da Missão
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs cursor-pointer text-[#7a7060] hover:text-[#d4c9a8]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Hints list */}
            <div className="p-3 space-y-2">
              {hints.map((h) => {
                const revealed = h.level <= usedCount;
                return (
                  <div
                    key={h.level}
                    className="rounded-lg p-2.5 text-xs"
                    style={{
                      background: revealed ? '#141a0e' : '#0a0f08',
                      border: `1px solid ${revealed ? '#2a4a1e' : '#1a1e14'}`,
                      color: revealed ? '#d4c9a8' : '#2a2a26',
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1 font-bold">
                      {revealed
                        ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                        : <Lock className="w-3 h-3" style={{ color: '#2a3a1e' }} />
                      }
                      <span style={{ color: revealed ? '#4a7c2a' : '#2a3a1e' }}>
                        Dica {h.level}
                        {!revealed && h.cost > 0 && ` · ${h.cost} moedas`}
                        {!revealed && h.cost === 0 && ' · grátis'}
                      </span>
                    </div>
                    {revealed ? (
                      <p className="leading-snug" style={{ color: '#a89878' }}>{h.text}</p>
                    ) : (
                      <p className="italic" style={{ color: '#1e2618' }}>Clique em "DICA {h.level}" para revelar</p>
                    )}
                  </div>
                );
              })}

              {hints.length === 0 && (
                <p className="text-xs text-center py-2" style={{ color: '#2a3a1e' }}>
                  Sem dicas para esta missão.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
