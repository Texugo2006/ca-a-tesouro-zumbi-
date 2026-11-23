import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Trophy, ShieldCheck, Heart, Sparkles, Coins, ArrowRight, Map, CheckCircle2, Gift } from 'lucide-react';

const PHASE_TREASURES = {
  1: { name: 'Transmissor Militar de Emergência', desc: 'Rádio criptografado com frequências de resgate.' },
  2: { name: 'Ampola Bioquímica de Sororresistência', desc: 'Amostra purificada do agente neutralizador.' },
  3: { name: 'Cartão de Acesso de Alta Segurança', desc: 'Credencial ótica para destrancar comportas.' },
  4: { name: 'Módulo Sintonizador de Pulso', desc: 'Equipamento de telecomunicação de longo alcance.' },
  5: { name: 'Microchip Criptográfico de Glifos', desc: 'Decodificador de terminais de quarentena.' },
  6: { name: 'Dossiê Forense do Paciente Zero', desc: 'Relatório confidencial do início do surto.' },
  7: { name: 'Chave-Mestra do Bunker Antiatômico', desc: 'Mecanismo final para resgatar a cura da humanidade.' },
};

export default function PhaseScoreModal() {
  const {
    showPhaseScoreModal,
    lastPhaseScore,
    closePhaseScoreModal,
    returnToMapAfterScore,
    score
  } = useGameStore();

  if (!showPhaseScoreModal || !lastPhaseScore) return null;

  const {
    phaseNumber,
    basePoints,
    lifeBonus,
    precisionBonus,
    totalPhaseScore,
    reward,
    lives,
    isFinal
  } = lastPhaseScore;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-md rounded-2xl p-6 sm:p-7 shadow-2xl border"
          style={{
            background: 'linear-gradient(180deg, #12190e 0%, #0a0e08 100%)',
            borderColor: '#2e471d',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(74, 124, 42, 0.2)'
          }}
        >
          {/* Header Badge */}
          <div className="flex flex-col items-center text-center mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border shadow-inner"
              style={{ background: '#1c2e14', borderColor: '#4a7c2a', color: '#b8d870' }}
            >
              <CheckCircle2 className="w-8 h-8 text-lime-400" />
            </div>

            <span className="font-outfit text-xs uppercase tracking-widest font-semibold" style={{ color: '#7ab648' }}>
              Setor Estabilizado
            </span>
            <h2 className="text-2xl font-cinzel font-black tracking-wide mt-0.5" style={{ color: '#e8dec4' }}>
              MISSÃO {phaseNumber} CUMPRIDA!
            </h2>
          </div>

          {/* Score Breakdown List */}
          <div className="space-y-2 mb-5">
            {/* Base Points */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs"
              style={{ background: '#141c10', borderColor: '#1f2d18' }}
            >
              <span className="flex items-center gap-2" style={{ color: '#a09880' }}>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Desafio Primário
              </span>
              <span className="font-cinzel font-bold text-sm text-lime-300">
                +{basePoints} pts
              </span>
            </div>

            {/* Life Bonus */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs"
              style={{ background: '#141c10', borderColor: '#1f2d18' }}
            >
              <span className="flex items-center gap-2" style={{ color: '#a09880' }}>
                <Heart className="w-4 h-4 text-red-400 fill-red-400/30" />
                Sobrevivência ({lives}/3 Vidas)
              </span>
              <span className="font-cinzel font-bold text-sm text-lime-300">
                +{lifeBonus} pts
              </span>
            </div>

            {/* Precision / Hint Bonus */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs"
              style={{ background: '#141c10', borderColor: '#1f2d18' }}
            >
              <span className="flex items-center gap-2" style={{ color: '#a09880' }}>
                <Sparkles className="w-4 h-4 text-amber-400" />
                Precisão Tática {precisionBonus > 0 ? '(Sem dicas)' : '(Dicas usadas)'}
              </span>
              <span className="font-cinzel font-bold text-sm text-lime-300">
                +{precisionBonus} pts
              </span>
            </div>

            {/* Coins / Supplies Reward */}
            <div
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs"
              style={{ background: '#141c10', borderColor: '#1f2d18' }}
            >
              <span className="flex items-center gap-2" style={{ color: '#a09880' }}>
                <Coins className="w-4 h-4 text-amber-400" />
                Suprimentos Resgatados
              </span>
              <span className="font-outfit font-bold text-sm text-amber-300">
                +{reward} moedas
              </span>
            </div>

            {/* Tesouro Narrativo Encontrado (Requisito 4.3 & Pág 5 SENAI) */}
            {PHASE_TREASURES[phaseNumber] && (
              <div
                className="px-3.5 py-2.5 rounded-xl border text-xs flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #1f1b0a 0%, #141c10 100%)', borderColor: '#d4af37' }}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-400/50 flex items-center justify-center shrink-0 text-amber-400 shadow-sm">
                  <Gift className="w-4 h-4 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Tesouro / Artefato Encontrado:
                  </div>
                  <div className="font-cinzel font-black text-amber-200 truncate text-xs sm:text-sm">
                    {PHASE_TREASURES[phaseNumber].name}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-sans truncate">
                    {PHASE_TREASURES[phaseNumber].desc}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Phase Total Highlight Box */}
          <div
            className="p-3.5 rounded-xl border text-center mb-5"
            style={{
              background: 'linear-gradient(135deg, #1c2e14 0%, #162410 100%)',
              borderColor: '#4a7c2a',
              boxShadow: '0 4px 14px rgba(74,124,42,0.25)'
            }}
          >
            <div className="text-[10px] uppercase font-bold tracking-widest" style={{ color: '#7ab648' }}>
              Pontuação Conquistada na Fase
            </div>
            <div className="text-2xl sm:text-3xl font-cinzel font-black tracking-wider text-lime-300 mt-0.5">
              +{totalPhaseScore} PTS
            </div>
            <div className="text-xs font-outfit mt-1 flex items-center justify-center gap-1.5" style={{ color: '#90a078' }}>
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Pontuação Geral: <strong className="text-amber-300">{score.toLocaleString()} pts</strong>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={closePhaseScoreModal}
              className="flex-1 py-3 px-4 rounded-xl font-cinzel font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(to right, #4a7c2a, #629c36)',
                color: '#0a0e08',
                border: '1px solid #7ab648'
              }}
            >
              {isFinal ? (
                <>
                  <span>Abrir Bunker</span>
                  <Trophy className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Próxima Missão</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={returnToMapAfterScore}
              className="py-3 px-4 rounded-xl font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{
                background: '#141c10',
                borderColor: '#2a3a1e',
                borderWidth: '1px',
                color: '#8a9a78'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#b8d870'}
              onMouseOut={e => e.currentTarget.style.color = '#8a9a78'}
            >
              <Map className="w-4 h-4 text-emerald-400" />
              <span>Mapa da Zona</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
