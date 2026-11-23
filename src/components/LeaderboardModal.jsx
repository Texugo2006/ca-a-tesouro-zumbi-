import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Trophy, Award, Calendar, RotateCcw, X, ShieldAlert, Sparkles, CheckCircle, Star } from 'lucide-react';

export default function LeaderboardModal() {
  const {
    showLeaderboardModal,
    closeLeaderboardModal,
    savedRuns,
    startNewGame,
    score
  } = useGameStore();

  if (!showLeaderboardModal) return null;

  const runs = savedRuns || [];
  const bestRun = runs.length > 0
    ? [...runs].sort((a, b) => b.score - a.score)[0]
    : null;

  const handleStartNewGame = () => {
    if (window.confirm("Deseja iniciar um Novo Jogo? Seu histórico de recordes permanecerá intacto e as fases serão resetadas para você buscar uma nova pontuação!")) {
      closeLeaderboardModal();
      startNewGame();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg select-none overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border text-left my-auto"
          style={{
            background: 'linear-gradient(180deg, #151e10 0%, #0a0f08 100%)',
            borderColor: '#3e5e26',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(74, 124, 42, 0.2)'
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLeaderboardModal}
            className="absolute top-4 right-4 p-2 text-lime-400/70 hover:text-lime-300 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner"
              style={{ background: '#1e2c16', borderColor: '#4a7c2a', color: '#b8d870' }}
            >
              <Trophy className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-cinzel font-black tracking-wide text-amber-200">
                HALL DA FAMA & RECORDES
              </h2>
              <p className="text-xs font-outfit text-lime-400/80">
                Histórico de campanhas salvas e pontuações registradas.
              </p>
            </div>
          </div>

          {/* Best Record Banner */}
          {bestRun && (
            <div
              className="p-3.5 rounded-2xl border mb-4 flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, #302609 0%, #171d0e 100%)',
                borderColor: '#d4af37'
              }}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-400">
                    Maior Recorde Histórico
                  </div>
                  <div className="text-xl font-cinzel font-black text-amber-300">
                    {bestRun.score.toLocaleString()} PTS
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px] font-outfit text-amber-300/80">
                <div>{bestRun.date}</div>
                <div className="text-lime-400 font-bold">{bestRun.rank || 'Lenda'}</div>
              </div>
            </div>
          )}

          {/* Runs List */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1 mb-5">
            {runs.length === 0 ? (
              <div className="p-6 text-center rounded-xl border border-dashed border-[#2a3a1e] text-xs text-[#7a8868] font-outfit">
                Nenhuma campanha arquivada ainda. Conclua as 4 zonas para registrar seu primeiro recorde histórico no Hall da Fama!
              </div>
            ) : (
              runs.map((run, idx) => (
                <div
                  key={run.id || idx}
                  className="p-3 rounded-xl border flex items-center justify-between text-xs transition-colors"
                  style={{ background: '#11170c', borderColor: '#233017' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-cinzel font-bold text-amber-400/80 w-5 text-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="font-cinzel font-bold text-sm text-lime-300 flex items-center gap-1.5">
                        <span>{run.score.toLocaleString()} PTS</span>
                        {idx === 0 && <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline ml-1" />}
                      </div>
                      <div className="text-[11px] font-outfit text-[#8a9a78] flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#5a6a48]" />
                          {run.date}
                        </span>
                        <span>·</span>
                        <span>{run.zonesCompleted || 4}/4 Zonas</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded font-outfit" style={{ background: '#1a2612', color: '#b8d870', border: '1px solid #3e5e26' }}>
                      {run.rank || 'Concluído'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleStartNewGame}
              className="flex-1 py-3 px-4 rounded-xl font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(to right, #4a7c2a, #629c36)',
                color: '#0a0e08',
                border: '1px solid #7ab648'
              }}
            >
              <RotateCcw className="w-4 h-4 text-slate-950" />
              <span>Iniciar Novo Jogo</span>
            </button>

            <button
              onClick={closeLeaderboardModal}
              className="py-3 px-4 rounded-xl font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              style={{
                background: '#141c10',
                border: '1px solid #2a3a1e',
                color: '#8a9a78'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#b8d870'}
              onMouseOut={e => e.currentTarget.style.color = '#8a9a78'}
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
