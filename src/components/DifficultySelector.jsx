import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Shield, ShieldAlert, Skull, Zap } from 'lucide-react';

export const DIFFICULTIES = [
  {
    id: 'easy',
    title: 'FÁCIL',
    badge: 'RECRUTA',
    desc: '5 Vidas · Tolerância ampliada · Pistas diretas',
    multiplier: '1.0x',
    lives: 5,
    color: '#22c55e',
    bg: '#041a0d',
    border: '#166534',
    icon: Shield
  },
  {
    id: 'normal',
    title: 'MÉDIO',
    badge: 'VETERANO',
    desc: '3 Vidas · Equilíbrio tático padrão · +50% PTS',
    multiplier: '1.5x',
    lives: 3,
    color: '#eab308',
    bg: '#1c1605',
    border: '#854d0e',
    icon: ShieldAlert
  },
  {
    id: 'hard',
    title: 'DIFÍCIL',
    badge: 'ZONA ZERO',
    desc: '2 Vidas · Hardcore · Margem zero · +150% PTS',
    multiplier: '2.5x',
    lives: 2,
    color: '#ef4444',
    bg: '#1c0707',
    border: '#991b1b',
    icon: Skull
  }
];

export default function DifficultySelector({ compact = false }) {
  const { difficulty, setDifficulty } = useGameStore();

  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-[#060a07] p-1 rounded-lg border border-emerald-950 font-mono text-xs">
        {DIFFICULTIES.map((d) => {
          const isSelected = difficulty === d.id;
          const Icon = d.icon;
          return (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-all cursor-pointer font-bold ${
                isSelected
                  ? 'shadow-[0_0_12px_rgba(0,0,0,0.8)]'
                  : 'opacity-50 hover:opacity-80'
              }`}
              style={{
                background: isSelected ? d.bg : 'transparent',
                border: isSelected ? `1px solid ${d.color}` : '1px solid transparent',
                color: isSelected ? d.color : '#71717a'
              }}
              title={d.desc}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: isSelected ? d.color : '#71717a' }} />
              <span className="text-[10px] tracking-wider uppercase">{d.title}</span>
              <span className="text-[9px] px-1 rounded bg-black/60 font-mono" style={{ color: d.color }}>
                {d.multiplier}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
            Nível de Sobrevivência (Dificuldade)
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">
          Muda regras & recompensas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {DIFFICULTIES.map((d) => {
          const isSelected = difficulty === d.id;
          const Icon = d.icon;

          return (
            <motion.button
              key={d.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDifficulty(d.id)}
              className="relative flex flex-col p-3 rounded-xl border-2 cursor-pointer transition-all text-left"
              style={{
                background: isSelected ? d.bg : '#090e0b',
                borderColor: isSelected ? d.color : '#16221a',
                boxShadow: isSelected ? `0 0 18px ${d.color}35` : 'none'
              }}
            >
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4" style={{ color: d.color }} />
                  <span className="font-mono font-black text-xs tracking-wider" style={{ color: isSelected ? '#ffffff' : d.color }}>
                    {d.title}
                  </span>
                </div>
                <span
                  className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border"
                  style={{
                    color: d.color,
                    borderColor: `${d.color}50`,
                    background: '#00000080'
                  }}
                >
                  {d.badge}
                </span>
              </div>

              {/* Description */}
              <p className="text-[11px] text-zinc-400 mt-2 font-sans leading-tight">
                {d.desc}
              </p>

              {/* Bottom spec bar */}
              <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-500">VIDAS: <b className="text-zinc-200">{d.lives}</b></span>
                <span className="font-bold" style={{ color: d.color }}>{d.multiplier} PTS</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
