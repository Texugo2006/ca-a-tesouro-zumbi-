import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { Target, Dna, User, Shield, Skull, ScrollText, ChevronRight } from 'lucide-react';
import TacticalIcon from '../Common/TacticalIcon';

function SurvivorIcon({ icon }) {
  return <TacticalIcon icon={icon} className="w-7 h-7 text-emerald-400" fallback={<User className="w-7 h-7 text-zinc-400" />} />;
}

/* ── Survivor Triage Phase ───────────────────────────────────────────
   A brutal moral & tactical dilemma. Show 3 survivors with stats.
   Limited antidote / rescue slots. Player must choose who to save.
   Wrong pick (based on mission briefing) = consequence + life lost.
   Correct = harsh but pragmatic military justice served.
────────────────────────────────────────────────────────────────────── */

const INFECTION_COLORS = {
  clean:    { label: 'LIMPO',       bg: '#022c22', border: '#10b981', text: '#34d399', dot: '#10b981' },
  stage1:   { label: 'ESTÁGIO I',   bg: '#2a1a00', border: '#f97316', text: '#fb923c', dot: '#f97316' },
  stage2:   { label: 'ESTÁGIO II',  bg: '#2a0a00', border: '#ef4444', text: '#f87171', dot: '#ef4444' },
  terminal: { label: 'TERMINAL',    bg: '#1a0808', border: '#7f1d1d', text: '#ef4444', dot: '#7f1d1d' },
};

function SurvivorCard({ survivor, selected, eliminated, onSelect, disabled }) {
  const inf = INFECTION_COLORS[survivor.infectionStatus] || INFECTION_COLORS.clean;
  const isCorrect = selected && survivor.isCorrect;
  const isWrong = selected && !survivor.isCorrect;

  return (
    <motion.button
      onClick={() => !disabled && !eliminated && onSelect(survivor)}
      disabled={disabled || eliminated}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: eliminated ? 0.3 : 1, y: 0 }}
      whileHover={!disabled && !eliminated ? { y: -3 } : {}}
      whileTap={!disabled && !eliminated ? { scale: 0.97 } : {}}
      className={`relative flex flex-col rounded-xl border-2 overflow-hidden text-left transition-all cursor-pointer ${
        isCorrect ? 'border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.6)]' :
        isWrong   ? 'border-red-500 shadow-[0_0_24px_rgba(239,68,68,0.6)]' :
        eliminated ? 'border-zinc-800 opacity-40' :
        'hover:border-zinc-500 border-zinc-700/60'
      }`}
      style={{ background: '#0a0a10' }}
    >
      {/* Header strip — infection status */}
      <div className="px-3 py-2 flex items-center justify-between"
        style={{ background: inf.bg, borderBottom: `1px solid ${inf.border}40` }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: inf.dot, boxShadow: `0 0 6px ${inf.dot}` }}/>
          <span className="text-[10px] font-bold tracking-widest" style={{ color: inf.text }}>
            {inf.label}
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">ID #{survivor.id}</span>
      </div>

      {/* Survivor avatar + info */}
      <div className="p-3 flex gap-3">
        {/* Avatar */}
        <div className="w-14 h-14 flex-shrink-0 rounded-lg flex items-center justify-center text-3xl"
          style={{ background: '#111118', border: '1px solid #2a2a3a' }}
        >
          <SurvivorIcon icon={survivor.icon} />
        </div>

        {/* Identity */}
        <div className="flex-1 min-w-0">
          <p className="font-black text-zinc-100 text-sm uppercase tracking-wide truncate">{survivor.name}</p>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{survivor.role}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
        {survivor.stats.map((stat, i) => (
          <div key={i} className="rounded px-2 py-1.5 text-[10px]"
            style={{ background: '#111118', border: '1px solid #1a1a28' }}
          >
            <div className="text-zinc-500 uppercase tracking-widest text-[9px]">{stat.label}</div>
            <div className="font-bold text-zinc-200 mt-0.5">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Notes / Condition */}
      <div className="px-3 pb-3">
        <p className="text-[11px] text-zinc-400 font-sans leading-relaxed italic border-l-2 pl-2"
          style={{ borderColor: inf.border + '60' }}
        >
          {survivor.condition}
        </p>
      </div>

      {/* Selection result overlay */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute inset-0 flex flex-col items-center justify-center ${isCorrect ? 'bg-emerald-950/70' : 'bg-red-950/70'}`}
        >
          <div className="flex items-center justify-center mb-1">
            {isCorrect
              ? <Shield className="w-10 h-10 text-emerald-300" />
              : <Skull className="w-10 h-10 text-red-300" />
            }
          </div>
          <span className={`text-xs font-mono font-black mt-1 uppercase tracking-wider ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
            {isCorrect ? 'RESGATADO' : 'SENTENÇA'}
          </span>
        </motion.div>
      )}

      {!disabled && !selected && !eliminated && (
        <div className="px-3 pb-3">
          <div className="text-[10px] font-bold text-zinc-600 border-t border-zinc-800/50 pt-2 text-center uppercase tracking-wider">
            ▶ Selecionar para resgatar
          </div>
        </div>
      )}
    </motion.button>
  );
}

export default function TriagePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [selectedId, setSelectedId] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [done, setDone] = useState(false);

  const survivors = phase.survivors || [];

  const handleSelect = (survivor) => {
    if (done || selectedId) return;
    sound.playClick?.();
    setSelectedId(survivor.id);

    if (survivor.isCorrect) {
      setDone(true);
      sound.playCorrect?.();
      setStatusMsg({
        type: 'success',
        text: phase.successText || `Decisão tática correta. ${survivor.name} resgatado e transportado para a zona segura. Os demais ficaram para trás.`,
      });
      setTimeout(() => onComplete(phase.reward || 160, phase.clue), 2000);
    } else {
      loseLife();
      sound.playError?.();
      setStatusMsg({
        type: 'fail',
        text: phase.failText || `Erro tático. ${survivor.name} comprometeu o grupo. Você perdeu tempo e recursos preciosos. (-1 Vida)`,
      });
      setTimeout(() => {
        setSelectedId(null);
        setStatusMsg(null);
      }, 2200);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none font-mono">

      {/* Header */}
      <div className="w-full bg-[#08060a] rounded-t-2xl border-2 border-b-0 border-purple-700/50 p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/80 border border-purple-600/40 rounded text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"/>
            TRIAGEM TÁTICA · DECISÃO IRREVERSÍVEL
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"/>
          </div>
          <h3 className="font-black text-purple-100 text-lg uppercase tracking-wide">
            {phase.title || 'Protocolo de Triagem de Sobreviventes'}
          </h3>
          <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed max-w-lg mx-auto">
            {phase.description}
          </p>
        </div>
      </div>

      {/* Briefing / Context */}
      <div className="w-full border-x-2 border-purple-700/50 bg-[#0b080e] px-5 py-3">
        <div className="rounded-lg border border-amber-700/40 bg-amber-950/20 p-3">
          <div className="text-[9px] font-bold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <ScrollText className="w-3.5 h-3.5 text-amber-400" />
            <span>BRIEFING DO CAPITÃO</span>
          </div>
          <p className="text-sm text-amber-100 font-sans leading-relaxed">
            {phase.briefing || phase.description}
          </p>
        </div>
      </div>

      {/* Survivors Grid */}
      <div className="w-full border-2 border-t-0 border-b-0 border-purple-700/50 bg-[#080608] p-4">
        <div className={`grid gap-3 ${survivors.length === 2 ? 'grid-cols-2' : survivors.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {survivors.map((s) => (
            <SurvivorCard
              key={s.id}
              survivor={s}
              selected={selectedId === s.id}
              eliminated={false}
              disabled={Boolean(selectedId) && selectedId !== s.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* GM Feedback */}
      <div className="w-full border-2 border-t-0 border-purple-700/50 rounded-b-2xl bg-[#08060a] px-5 py-3 min-h-[60px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {statusMsg ? (
            <motion.p
              key="msg"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-xs font-mono font-bold text-center leading-snug ${statusMsg.type === 'success' ? 'text-emerald-300' : 'text-red-400'}`}
            >
              {statusMsg.text}
            </motion.p>
          ) : (
            <motion.p key="idle" className="text-zinc-500 text-[11px] font-mono italic text-center">
              Não há tempo para sentimentalismo. O helicóptero decola em 3 minutos. Escolha com a cabeça, não com o coração.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
