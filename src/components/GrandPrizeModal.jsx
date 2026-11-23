import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '../store/useGameStore';
import { Trophy, ShieldCheck, Sparkles, Coins, RotateCcw, Award, CheckCircle2, X, Plane } from 'lucide-react';

export default function GrandPrizeModal() {
  const {
    showGrandPrizeModal,
    closeGrandPrizeModal,
    openLeaderboardModal,
    startNewGame,
    score,
    coins,
    difficulty
  } = useGameStore();

  useEffect(() => {
    if (showGrandPrizeModal) {
      confetti({
        particleCount: 160,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#10b981', '#34d399', '#06b6d4', '#facc15', '#ef4444']
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#10b981', '#facc15', '#38bdf8']
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#10b981', '#facc15', '#38bdf8']
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [showGrandPrizeModal]);

  if (!showGrandPrizeModal) return null;

  const handleStartNewGame = () => {
    if (window.confirm("Deseja iniciar um Novo Jogo? Sua pontuação histórica permanecerá registrada no Hall da Fama e todas as 4 Zonas serão reabertas para você testar uma nova estratégia!")) {
      startNewGame();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl select-none overflow-y-auto font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: 'backOut' }}
          className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border text-center my-auto bg-[#040906]"
          style={{
            borderColor: '#10b981',
            boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 50px rgba(16, 185, 129, 0.3)'
          }}
        >
          {/* Close button */}
          <button
            onClick={closeGrandPrizeModal}
            className="absolute top-4 right-4 p-2 text-emerald-400/70 hover:text-emerald-300 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tactical Hero Emblem */}
          <div className="relative mx-auto w-20 h-20 mb-3 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/25 blur-xl animate-pulse" />
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center border-2 shadow-2xl bg-[#08170d]"
              style={{
                borderColor: '#10b981',
                color: '#34d399'
              }}
            >
              <Plane className="w-10 h-10 text-emerald-400 animate-bounce" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            OPERAÇÃO ZONA ZERO: PURIFICAÇÃO GLOBAL 100%
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-wide text-emerald-300 uppercase">
            A CURA DA HUMANIDADE RESGATADA!
          </h2>

          <p className="text-xs text-zinc-300 mt-2 leading-relaxed font-sans">
            "O comando da resistência interceptou o transponder do seu helicóptero. As 4 Zonas de Quarentena foram completamente purificadas e as 28 missões executadas com maestria. A Vacina Cepa Alpha está garantida. Você salvou a espécie humana da extinção."
          </p>

          {/* Grand Prize Rewards Grid */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <div
              className="p-3 rounded-xl border text-center bg-[#09130c]"
              style={{ borderColor: '#166534' }}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-400 mb-0.5">
                <Trophy className="w-4 h-4 text-emerald-400" /> Bônus de Vitória
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">
                +5.000 PTS
              </div>
              <div className="text-[10px] text-emerald-400/80 uppercase">Comandante Supremo</div>
            </div>

            <div
              className="p-3 rounded-xl border text-center bg-[#09130c]"
              style={{ borderColor: '#166534' }}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-400 mb-0.5">
                <Coins className="w-4 h-4 text-amber-400" /> Arsenal Geral
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                +2.500
              </div>
              <div className="text-[10px] text-amber-400/80 uppercase">Suprimentos Bélicos</div>
            </div>
          </div>

          {/* Saved Score Confirmation Pill */}
          <div
            className="p-3 rounded-xl border flex items-center justify-between mb-5 bg-[#061009]"
            style={{ borderColor: '#064e3b' }}
          >
            <div className="flex items-center gap-2.5 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-emerald-300 uppercase">
                  Pontuação Registrada no Hall da Fama!
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  Score Final: <strong className="text-emerald-400">{score.toLocaleString()} PTS</strong> · Suprimentos: <strong className="text-amber-400">{coins}</strong>
                </div>
              </div>
            </div>
            <Award className="w-6 h-6 text-emerald-400 shrink-0" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleStartNewGame}
              className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 border border-emerald-300"
            >
              <RotateCcw className="w-4 h-4 text-slate-950" />
              <span>Iniciar Nova Campanha (Testar Outra Dificuldade)</span>
            </button>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={() => {
                  closeGrandPrizeModal();
                  openLeaderboardModal();
                }}
                className="flex-1 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors bg-[#08140c] border border-emerald-800 text-emerald-300 hover:bg-emerald-950 uppercase"
              >
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>Ver Hall de Recordes</span>
              </button>

              <button
                onClick={closeGrandPrizeModal}
                className="flex-1 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors bg-[#050b07] border border-zinc-800 text-zinc-400 hover:text-zinc-200 uppercase"
              >
                <span>Fechar</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
