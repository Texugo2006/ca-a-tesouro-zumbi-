import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { AlertTriangle, Shield, ChevronRight } from 'lucide-react';

/* ── High-Tech Cyber-Zombie Tactical SVG scenes per path slot ── */
const PATH_SCENES = {
  pirates: [
    // 0: Central Highway
    (
      <svg key="p0" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#090d14"/>
        <path d="M0 80 L35 45 L85 45 L120 80Z" fill="#1e293b"/>
        <line x1="60" y1="45" x2="60" y2="80" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4"/>
        <rect x="25" y="52" width="22" height="12" rx="2" fill="#334155"/>
        <polygon points="32,45 28,52 40,52 44,45" fill="#475569" opacity="0.8"/>
        <circle cx="36" cy="48" r="5" fill="#64748b" opacity="0.6"/>
        <circle cx="70" cy="42" r="2" fill="#475569"/>
        <line x1="70" y1="44" x2="70" y2="50" stroke="#475569" strokeWidth="1.5"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">AVENIDA CENTRAL</text>
      </svg>
    ),
    // 1: Subterranean Subway Tunnel
    (
      <svg key="p1" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#030712"/>
        <path d="M20 80 Q20 20 60 20 Q100 20 100 80Z" fill="#0f172a" stroke="#475569" strokeWidth="1.5"/>
        <line x1="45" y1="80" x2="52" y2="50" stroke="#64748b" strokeWidth="2"/>
        <line x1="75" y1="80" x2="68" y2="50" stroke="#64748b" strokeWidth="2"/>
        <line x1="40" y1="72" x2="80" y2="72" stroke="#334155" strokeWidth="1.5"/>
        <line x1="44" y1="64" x2="76" y2="64" stroke="#334155" strokeWidth="1.5"/>
        <line x1="48" y1="56" x2="72" y2="56" stroke="#334155" strokeWidth="1.5"/>
        <circle cx="60" cy="30" r="3" fill="#64748b" opacity="0.8"/>
        <circle cx="60" cy="30" r="1.2" fill="#cbd5e1"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">TÚNEL DO METRÔ</text>
      </svg>
    ),
    // 2: Overpass
    (
      <svg key="p2" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#080c14"/>
        <rect x="25" y="45" width="12" height="35" fill="#1e293b"/>
        <rect x="85" y="45" width="12" height="35" fill="#1e293b"/>
        <polygon points="10,40 110,40 110,48 10,48" fill="#334155"/>
        <line x1="0" y1="42" x2="120" y2="42" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">VIADUTO ELEVADO</text>
      </svg>
    ),
  ],
  forest: [
    (
      <svg key="f0" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#051008"/>
        <circle cx="30" cy="40" r="22" fill="#064e3b" opacity="0.4"/>
        <circle cx="90" cy="40" r="22" fill="#064e3b" opacity="0.4"/>
        <path d="M20 70 Q60 50 100 70" stroke="#334155" strokeWidth="3" fill="none"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">VALA DRENADA</text>
      </svg>
    ),
    (
      <svg key="f1" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#041208"/>
        <polygon points="20,80 60,35 100,80" fill="#0f2918" stroke="#334155" strokeWidth="1.5"/>
        <line x1="60" y1="35" x2="60" y2="80" stroke="#475569" strokeWidth="2"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">CORDILHEIRA ROCHOSA</text>
      </svg>
    ),
    (
      <svg key="f2" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#020804"/>
        <ellipse cx="60" cy="55" rx="45" ry="18" fill="#14532d" opacity="0.5"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">TRILHA PANTANOSA</text>
      </svg>
    ),
  ],
  temple: [
    (
      <svg key="t0" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#100808"/>
        <rect x="30" y="30" width="60" height="40" fill="#1e293b"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">ALA NORTE</text>
      </svg>
    ),
    (
      <svg key="t1" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#0f0707"/>
        <line x1="20" y1="20" x2="100" y2="70" stroke="#334155" strokeWidth="2"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">ALA SUL</text>
      </svg>
    ),
    (
      <svg key="t2" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#080e0a"/>
        <rect x="25" y="20" width="70" height="50" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">CORREDOR CENTRAL</text>
      </svg>
    ),
  ],
  frozen: [
    (
      <svg key="fr0" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#080e18"/>
        <rect x="40" y="25" width="40" height="45" fill="#1e293b"/>
        <line x1="30" y1="60" x2="90" y2="60" stroke="#334155" strokeWidth="2"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">SALA DE MÁQUINAS</text>
      </svg>
    ),
    (
      <svg key="fr1" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#040b12"/>
        <rect x="25" y="20" width="70" height="52" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
        <circle cx="60" cy="46" r="6" fill="#1e293b"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">TÚNEL SUBTERRÂNEO</text>
      </svg>
    ),
    (
      <svg key="fr2" viewBox="0 0 120 80" className="w-full h-full" fill="none">
        <rect width="120" height="80" fill="#03080e"/>
        <path d="M20 50 Q60 20 100 50" stroke="#334155" strokeWidth="3" opacity="0.6"/>
        <text x="60" y="75" textAnchor="middle" fontSize="6.5" fill="#94a3b8" fontFamily="monospace" fontWeight="bold">DUTO DE VENTILAÇÃO</text>
      </svg>
    ),
  ]
};

export default function PathChoicePhase({ phase, onComplete }) {
  const { loseLife, selectedMap, questionSeed } = useGameStore();
  const [selectedPath, setSelectedPath] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [failInfo, setFailInfo] = useState(null);

  const rawPaths = phase.paths || [];
  const mapScenes = PATH_SCENES[selectedMap] || PATH_SCENES.pirates;

  const [pathsWithScenes, setPathsWithScenes] = useState(() => {
    const combined = rawPaths.map((p, idx) => ({ ...p, scene: mapScenes[idx % mapScenes.length] }));
    return [...combined].sort(() => Math.random() - 0.5);
  });

  React.useEffect(() => {
    const combined = rawPaths.map((p, idx) => ({ ...p, scene: mapScenes[idx % mapScenes.length] }));
    setPathsWithScenes([...combined].sort(() => Math.random() - 0.5));
    setSelectedPath(null);
    setIsSuccess(false);
    setFailInfo(null);
  }, [questionSeed, phase.id]);

  const handleChoosePath = (path, idx) => {
    if (selectedPath) return;
    sound.playClick?.();
    setSelectedPath(path.id);

    if (path.isCorrect) {
      setIsSuccess(true);
      if (sound.playReload) sound.playReload();
      setTimeout(() => {
        sound.playCorrect?.();
        onComplete(phase.reward || 120, phase.clue);
      }, 1500);
    } else {
      if (sound.playZombieGrowl) sound.playZombieGrowl();
      else sound.playError?.();
      loseLife();
      setFailInfo({ msg: path.failMessage || 'Emboscada de infectados!', idx });
      setTimeout(() => {
        setSelectedPath(null);
        setFailInfo(null);
      }, 1700);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none">
      {/* ── Scene header ── */}
      <div className="w-full bg-gradient-to-b from-[#0a110d] to-[#0e1712] rounded-t-3xl border-2 border-b-0 border-emerald-500/50 px-5 pt-5 pb-3 text-center">
        <p className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">ROTA TÁTICA DE FUGA · PROTOCOLO DEAD AHEAD</p>
        <h3 className="font-cinzel font-black text-white text-lg sm:text-2xl mt-0.5">{phase.title}</h3>
        <p className="text-xs text-zinc-300 mt-1 max-w-lg mx-auto font-outfit">{phase.description}</p>
      </div>

      {/* ── Crossroad visual ── */}
      <div className="w-full border-2 border-t-0 border-b-0 border-emerald-500/50 bg-[#070e09] py-4 px-4">
        {/* Tactical HUD fork schematic */}
        <div className="w-full bg-[#030704] rounded-xl border border-emerald-950 p-2.5 mb-4 flex items-center justify-between text-[10px] font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            <span>TELEMETRIA DE ROTA: 3 VETORES DETECTADOS</span>
          </div>
          <span className="text-zinc-500 font-bold">AVALIAÇÃO DE RISCO: ATIVA</span>
        </div>

        {/* Path cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pathsWithScenes.map((path, idx) => {
            const isSelected = selectedPath === path.id;
            const scene = path.scene;

            let wrapClass = 'border-emerald-900/60 hover:border-emerald-400 hover:-translate-y-1 bg-[#0b140e]';
            if (isSelected && isSuccess) wrapClass = 'border-emerald-400 shadow-[0_0_25px_rgba(34,197,94,0.7)] bg-emerald-950';
            if (isSelected && !isSuccess) wrapClass = 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.7)] bg-red-950 animate-pulse';

            const dirLabel = idx === 0 ? '← VETOR OESTE' : idx === 1 ? '↑ AVANÇO DIRETO' : '→ VETOR LESTE';

            return (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={!selectedPath ? { scale: 1.02 } : {}}
                whileTap={!selectedPath ? { scale: 0.97 } : {}}
                onClick={() => handleChoosePath(path, idx)}
                disabled={Boolean(selectedPath)}
                className={`flex flex-col rounded-xl border-2 overflow-hidden cursor-pointer transition-all shadow-xl ${wrapClass} text-left`}
              >
                {/* Illustrated scene */}
                <div className="h-28 w-full bg-[#020503] overflow-hidden relative">
                  {scene}
                  <div className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded bg-black/80 border border-emerald-900 text-[9px] font-mono text-emerald-400 font-bold">
                    ROTA 0{idx + 1}
                  </div>
                </div>

                {/* Card info */}
                <div className="p-3 bg-[#08120c] flex-1 flex flex-col justify-between border-t border-emerald-950">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400 font-bold font-mono tracking-wider">{dirLabel}</span>
                    </div>
                    <h4 className="font-mono font-black text-zinc-100 text-xs sm:text-sm uppercase tracking-wide mt-1 leading-snug">
                      {(path.title || '').replace(/\[SEGURO\]|\[PERIGO\]|🟢|🔴/gi, '').trim()}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-sans">
                      {path.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-950 flex items-center justify-between text-[10px] font-mono font-bold text-emerald-400">
                    <span className="flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> AVANÇAR NESTA ROTA</span>
                    <span className="text-zinc-600">CONFIRMAR</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>


      {/* ── Feedback strip ── */}
      <div className="w-full border-2 border-t-0 border-emerald-500/50 rounded-b-3xl bg-[#080d0a] px-5 py-3 min-h-[52px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {failInfo && (
            <motion.p
              key="fail"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-300 text-xs font-bold text-center flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{failInfo.msg} — Emboscada de infectados! (-1 Vida)</span>
            </motion.p>
          )}
          {isSuccess && (
            <motion.p
              key="succ"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Rota desimpedida! O comboio militar avançou com segurança…</span>
            </motion.p>
          )}
          {!failInfo && !isSuccess && (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zinc-400 text-[11px] font-mono italic text-center"
            >
              Examine o nível de risco e a presença de carniçais em cada setor antes de avançar.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
