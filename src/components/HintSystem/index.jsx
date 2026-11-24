import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Lock, Check, X, Lightbulb } from 'lucide-react';

export default function HintSystem({ phase, mapId, onTriggerHint }) {
  const { hintsUsed, unlockHint, coins } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toastHint, setToastHint] = useState(null);

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
    if (!canUnlockMore) { setIsOpen(o => !o); return; }
    if (!canAffordNext) { setIsOpen(true); return; }
    const cost = nextHint?.cost || 0;
    const success = unlockHint(mapId, phaseNumber, nextLevel, cost);
    if (success) {
      setToastHint({ text: nextHint?.text || 'Dica revelada!', level: nextLevel });
      setIsOpen(false); // fecha painel, foca no toast
      setTimeout(() => setToastHint(null), 6000);
      if (onTriggerHint) onTriggerHint(nextLevel);
    }
  };

  return (
    <>
      {/* ── Botão no header ── */}
      <div className="flex items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleRevealNext}
          title={
            !canUnlockMore ? 'Todas as dicas usadas'
            : !canAffordNext ? `Sem moedas (precisa: ${nextHint?.cost})`
            : nextHint?.cost === 0 ? 'Revelar dica (Grátis)'
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

        {usedCount > 0 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(o => !o)}
            className="flex items-center justify-center p-1.5 rounded-lg cursor-pointer transition-all text-xs"
            style={{ background: '#0a0f08', border: '1px solid #2a3a1e', color: '#4a7c2a' }}
            title="Ver dicas reveladas"
          >
            <Lightbulb className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>

      {/* ── Portais (renderizados no body, fora de qualquer overflow) ── */}
      {ReactDOM.createPortal(
        <>
          {/* TOAST — aparece no centro-inferior da tela */}
          <AnimatePresence>
            {toastHint && (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{
                  position: 'fixed',
                  bottom: 32,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 320,
                  maxWidth: 'calc(100vw - 32px)',
                  zIndex: 99999,
                  borderRadius: 14,
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                  background: '#0d1f08',
                  border: '2px solid #4a7c2a',
                }}
              >
                {/* Cabeçalho do toast */}
                <div style={{
                  background: '#0a1808',
                  borderBottom: '1px solid #1a3a10',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ color: '#7ab648', fontWeight: 800, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lightbulb style={{ width: 15, height: 15, color: '#fbbf24' }} />
                    💡 DICA {toastHint.level} REVELADA!
                  </span>
                  <button
                    onClick={() => setToastHint(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7a7060', padding: 2 }}
                  >
                    <X style={{ width: 14, height: 14 }} />
                  </button>
                </div>

                {/* Texto da dica */}
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ color: '#d4c9a8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                    {toastHint.text}
                  </p>
                </div>

                {/* Barra de progresso */}
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  style={{ height: 3, background: '#4a7c2a' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* PAINEL HISTÓRICO — aparece no lado direito da tela */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Overlay para fechar ao clicar fora */}
                <div
                  onClick={() => setIsOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 99990 }}
                />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'fixed',
                    top: '50%',
                    right: 16,
                    transform: 'translateY(-50%)',
                    width: 300,
                    maxHeight: '70vh',
                    zIndex: 99995,
                    borderRadius: 14,
                    overflow: 'hidden',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                    background: '#0d1108',
                    border: '1px solid #2a3a1e',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Cabeçalho do painel */}
                  <div style={{
                    borderBottom: '1px solid #1a2414',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                  }}>
                    <span style={{ color: '#7ab648', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Lightbulb style={{ width: 14, height: 14, color: '#fbbf24' }} />
                      Dicas da Missão
                    </span>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7a7060', padding: 2 }}
                    >
                      <X style={{ width: 14, height: 14 }} />
                    </button>
                  </div>

                  {/* Lista de dicas */}
                  <div style={{ padding: 12, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {hints.length === 0 ? (
                      <p style={{ color: '#3a4a30', fontSize: 11, textAlign: 'center', margin: 8 }}>
                        Sem dicas disponíveis para esta missão.
                      </p>
                    ) : hints.map((h) => {
                      const revealed = h.level <= usedCount;
                      return (
                        <div
                          key={h.level}
                          style={{
                            background: revealed ? '#141a0e' : '#0a0f08',
                            border: `1px solid ${revealed ? '#2a4a1e' : '#1a1e14'}`,
                            borderRadius: 8,
                            padding: '8px 10px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: revealed ? 6 : 0 }}>
                            {revealed
                              ? <Check style={{ width: 13, height: 13, color: '#34d399', flexShrink: 0 }} />
                              : <Lock style={{ width: 12, height: 12, color: '#2a3a1e', flexShrink: 0 }} />
                            }
                            <span style={{ color: revealed ? '#4a7c2a' : '#2a3a1e', fontSize: 11, fontWeight: 700 }}>
                              Dica {h.level}
                              {!revealed && h.cost > 0 && ` · ${h.cost} moedas`}
                              {!revealed && h.cost === 0 && ' · grátis'}
                            </span>
                          </div>
                          {revealed
                            ? <p style={{ color: '#a89878', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{h.text}</p>
                            : <p style={{ color: '#3a4a30', fontSize: 10, margin: 0, fontStyle: 'italic' }}>
                                {canAffordNext
                                  ? 'Feche este painel e clique em "DICAS" para revelar'
                                  : `Precisa de ${h.cost} moedas`}
                              </p>
                          }
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </>
  );
}
