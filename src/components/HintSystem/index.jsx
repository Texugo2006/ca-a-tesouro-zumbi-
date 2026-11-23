import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Lock, ChevronDown, ChevronUp, Check, X, Lightbulb } from 'lucide-react';

export default function HintSystem({ phase, mapId, onTriggerHint }) {
  const { hintsUsed, unlockHint, coins } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toastHint, setToastHint] = useState(null); // { text, level }

  const phaseNumber = phase?.phaseNumber || phase?.id || 1;
  const key = `${mapId}_${phaseNumber}`;
  const usedCount = hintsUsed[key] || 0;
  const hints = phase?.hints || [];
  const maxHints = hints.length || 3;

  const availableHints = Math.max(0, maxHints - usedCount);

  const nextLevel = usedCount + 1;
  const canUnlockMore = availableHints > 0 && nextLevel <= maxHints;
  const nextHint = hints.find(h => h.level === nextLevel) || hints[usedCount];
  const canAffordNext = nextHint ? (nextHint.cost === 0 || coins >= nextHint.cost) : false;

  const handleRevealNext = () => {
    // Se não há mais dicas disponíveis, apenas abre o painel
    if (!canUnlockMore) {
      setIsOpen(o => !o);
      return;
    }

    // Se não pode pagar, abre painel mostrando o custo
    if (!canAffordNext) {
      setIsOpen(true);
      return;
    }

    const cost = nextHint?.cost || 0;
    const success = unlockHint(mapId, phaseNumber, nextLevel, cost);

    if (success) {
      // Mostra o toast com o texto da dica revelada
      const revealedText = nextHint?.text || 'Dica revelada!';
      setToastHint({ text: revealedText, level: nextLevel });

      // Abre o painel de dicas
      setIsOpen(true);

      // Fecha o toast após 5s
      setTimeout(() => setToastHint(null), 5000);

      if (onTriggerHint) {
        onTriggerHint(nextLevel);
      }
    }
  };

  return (
    <div className="relative">
      {/* ── Toast da dica revelada ── */}
      <AnimatePresence>
        {toastHint && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 bottom-full mb-2 w-72 rounded-xl shadow-2xl z-50 overflow-hidden"
            style={{
              background: '#0d1f08',
              border: '1px solid #4a7c2a',
            }}
          >
            {/* Header do toast */}
            <div
              className="flex items-center justify-between px-3 py-2 border-b"
              style={{ borderColor: '#1a3a10', background: '#0a1808' }}
            >
              <span className="font-cinzel font-bold text-xs flex items-center gap-1.5" style={{ color: '#7ab648' }}>
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                💡 Dica {toastHint.level} Revelada!
              </span>
              <button
                onClick={() => setToastHint(null)}
                className="text-xs cursor-pointer text-[#7a7060] hover:text-[#d4c9a8]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Texto da dica */}
            <div className="px-3 py-3">
              <p className="text-xs leading-relaxed" style={{ color: '#d4c9a8' }}>
                {toastHint.text}
              </p>
            </div>

            {/* Barra de progresso de expiração */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-0.5"
              style={{ background: '#4a7c2a' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Botões do HintSystem ── */}
      <div className="flex items-center gap-1">
        {/* Botão principal */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleRevealNext}
          title={
            !canUnlockMore
              ? 'Todas as dicas usadas — ver histórico'
              : !canAffordNext
              ? `Sem moedas suficientes (precisa: ${nextHint?.cost})`
              : nextHint?.cost === 0
              ? 'Revelar dica (Grátis)'
              : `Revelar dica (${nextHint?.cost} moedas)`
          }
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all text-xs font-bold font-cinzel shadow-sm"
          style={{
            background: availableHints > 0 ? '#1a2e14' : '#141a0e',
            border: availableHints > 0 ? '1px solid #4a7c2a' : '1px solid #2a3a1e',
            color: availableHints > 0 ? '#b8d870' : '#7a7060',
          }}
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>DICAS ({availableHints}/{maxHints})</span>
        </motion.button>

        {/* Botão expandir histórico — aparece sempre que há dicas usadas */}
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
            title="Ver histórico de dicas reveladas"
          >
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </motion.button>
        )}
      </div>

      {/* ── Painel expandido com histórico de dicas ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-full mb-2 w-72 rounded-xl shadow-2xl z-40"
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
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Dicas da Missão
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs cursor-pointer text-[#7a7060] hover:text-[#d4c9a8]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lista de dicas */}
            <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
              {hints.length === 0 ? (
                <p className="text-xs text-center py-3" style={{ color: '#3a4a30' }}>
                  Sem dicas disponíveis para esta missão.
                </p>
              ) : (
                hints.map((h) => {
                  const revealed = h.level <= usedCount;
                  return (
                    <div
                      key={h.level}
                      className="rounded-lg p-2.5 text-xs"
                      style={{
                        background: revealed ? '#141a0e' : '#0a0f08',
                        border: `1px solid ${revealed ? '#2a4a1e' : '#1a1e14'}`,
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
                        <p
                          className="italic text-[10px] cursor-pointer underline"
                          style={{ color: '#3a4a30' }}
                          onClick={() => { setIsOpen(false); handleRevealNext(); }}
                        >
                          {canAffordNext ? 'Clique em "DICAS" para revelar' : `Precisa de ${h.cost} moedas`}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
