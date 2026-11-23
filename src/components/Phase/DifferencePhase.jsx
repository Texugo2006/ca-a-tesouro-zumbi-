import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { Shield, AlertTriangle, Microscope, Skull, CheckCircle2 } from 'lucide-react';

/* ── High-Tech Survival Forensic Artwork SVGs ── */
function renderTacticalArt(opt, idx) {
  const title = (opt.title || '').toLowerCase();
  const id = (opt.id || '').toLowerCase();

  // 1. Contaminated / Toxic Ampoule
  if (id.includes('statue_left') || title.includes('adulterad') || title.includes('toxina')) {
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md" fill="none">
        <defs>
          <linearGradient id="toxicSludge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="50%" stopColor="#713f12" />
            <stop offset="100%" stopColor="#291e0a" />
          </linearGradient>
          <radialGradient id="sludgeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="65" r="45" fill="url(#sludgeGlow)" />
        {/* Ampoule Body */}
        <rect x="32" y="24" width="36" height="74" rx="8" fill="#140f0c" stroke="#dc2626" strokeWidth="2.5" />
        {/* Murky Contaminated Liquid */}
        <rect x="35" y="48" width="30" height="47" rx="5" fill="url(#toxicSludge)" opacity="0.95" />
        {/* Toxic bubbles & necrotic residue */}
        <circle cx="44" cy="80" r="3" fill="#854d0e" />
        <circle cx="56" cy="72" r="2.5" fill="#a16207" />
        <circle cx="48" cy="62" r="2" fill="#ca8a04" opacity="0.7" />
        <circle cx="40" cy="52" r="1.5" fill="#facc15" opacity="0.6" />
        {/* Cracks in Glass */}
        <path d="M42 35 L50 48 L46 60 L54 75" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M50 48 L58 52" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Broken Seal */}
        <rect x="36" y="16" width="28" height="10" rx="2" fill="#3f3f46" stroke="#ef4444" strokeWidth="1.5" />
        <path d="M38 18 L62 24" stroke="#ef4444" strokeWidth="2" />
        {/* Biohazard warning skull */}
        <text x="50" y="47" fontSize="8" fill="#ef4444" textAnchor="middle" fontFamily="monospace" fontWeight="bold">BIO</text>
        <text x="50" y="112" fontSize="9" fill="#ef4444" textAnchor="middle" fontFamily="monospace" fontWeight="bold">FALHA: VAZAMENTO</text>
      </svg>
    );
  }

  // 2. Pure CRISPR Military Ampoule
  if (id.includes('statue_right') || title.includes('estabilidade') || title.includes('pura') || title.includes('autêntic')) {
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md" fill="none">
        <defs>
          <linearGradient id="pureSerum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          <radialGradient id="serumGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="65" r="45" fill="url(#serumGlow)" />
        {/* Ampoule Body */}
        <rect x="32" y="24" width="36" height="74" rx="8" fill="#041a12" stroke="#10b981" strokeWidth="2.5" />
        {/* Luminescent Pure Liquid */}
        <rect x="35" y="44" width="30" height="51" rx="5" fill="url(#pureSerum)" opacity="0.9" />
        {/* Meniscus */}
        <path d="M35 44 Q42 41 50 44 Q58 47 65 44 L65 52 L35 52 Z" fill="#6ee7b7" opacity="0.6" />
        {/* Stable DNA Helix */}
        <path d="M42 55 Q50 62 58 69 M58 55 Q50 62 42 69 M42 71 Q50 78 58 85 M58 71 Q50 78 42 85" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="50" cy="62" r="2" fill="#ecfdf5" />
        <circle cx="50" cy="78" r="2" fill="#ecfdf5" />
        {/* Titanium Hermetic Cap */}
        <rect x="36" y="16" width="28" height="10" rx="2" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
        <line x1="40" y1="21" x2="60" y2="21" stroke="#10b981" strokeWidth="2" />
        {/* Volumetric ticks */}
        <line x1="36" y1="52" x2="40" y2="52" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
        <line x1="36" y1="64" x2="40" y2="64" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
        <line x1="36" y1="76" x2="40" y2="76" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
        <text x="50" y="38" fontSize="10" fill="#34d399" textAnchor="middle" fontWeight="bold">CRISPR-Z</text>
        <text x="50" y="112" fontSize="9" fill="#10b981" textAnchor="middle" fontFamily="monospace" fontWeight="bold">GRAU MILITAR 100%</text>
      </svg>
    );
  }

  // 3. Pressurized Intact Airlock (Frozen map)
  if (id.includes('vitral_left') || title.includes('selada') || title.includes('perfeito')) {
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md" fill="none">
        {/* Heavy Circular Hatch */}
        <rect x="18" y="15" width="64" height="85" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
        <circle cx="50" cy="55" r="26" fill="#1e293b" stroke="#334155" strokeWidth="3" />
        {/* Locking Gears / Bolts */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
          <circle
            key={i}
            cx={50 + Math.cos((ang * Math.PI) / 180) * 22}
            cy={55 + Math.sin((ang * Math.PI) / 180) * 22}
            r="2.5"
            fill="#10b981"
          />
        ))}
        {/* Pressure Gauge */}
        <circle cx="50" cy="55" r="14" fill="#022c22" stroke="#10b981" strokeWidth="2" />
        <line x1="50" y1="55" x2="58" y2="48" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="55" r="2.5" fill="#10b981" />
        <text x="50" y="76" fontSize="7" fill="#34d399" textAnchor="middle" fontFamily="monospace" fontWeight="bold">VÁCUO: OK</text>
        <rect x="24" y="20" width="8" height="4" rx="1" fill="#10b981" />
        <text x="50" y="112" fontSize="9" fill="#10b981" textAnchor="middle" fontFamily="monospace" fontWeight="bold">HERMÉTICO: 100%</text>
      </svg>
    );
  }

  // 4. Fractured Airlock with Pressure Leak (Frozen map)
  if (id.includes('vitral_right') || title.includes('fissura') || title.includes('fadiga')) {
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md" fill="none">
        {/* Heavy Hatch with Fractures */}
        <rect x="18" y="15" width="64" height="85" rx="10" fill="#111827" stroke="#ef4444" strokeWidth="3" />
        <circle cx="50" cy="55" r="26" fill="#1f2937" stroke="#4b5563" strokeWidth="3" />
        {/* Cracks across the hatch */}
        <path d="M30 40 L45 52 L55 50 L68 68" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M45 52 L42 66 L34 74" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Leaking steam/frost plumes */}
        <path d="M68 68 Q75 62 82 66" stroke="#93c5fd" strokeWidth="2" strokeDasharray="2 2" fill="none" opacity="0.8" />
        <path d="M42 66 Q48 72 52 80" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="2 2" fill="none" opacity="0.8" />
        {/* Pressure Gauge in RED */}
        <circle cx="50" cy="55" r="14" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
        <line x1="50" y1="55" x2="42" y2="48" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="55" r="2.5" fill="#ef4444" />
        <text x="50" y="76" fontSize="7" fill="#ef4444" textAnchor="middle" fontFamily="monospace" fontWeight="bold">DESCOMPRESSÃO</text>
        <rect x="24" y="20" width="8" height="4" rx="1" fill="#ef4444" />
        <text x="50" y="112" fontSize="9" fill="#ef4444" textAnchor="middle" fontFamily="monospace" fontWeight="bold">ALERTA DE FISSURA</text>
      </svg>
    );
  }

  // Fallback: Tritium Battery / NBC Filter
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md" fill="none">
      <rect x="28" y="20" width="44" height="78" rx="8" fill="#09130c" stroke="#10b981" strokeWidth="2" />
      <rect x="34" y="28" width="32" height="62" rx="4" fill="#064e3b" opacity="0.8" />
      <circle cx="50" cy="59" r="12" fill="#10b981" opacity="0.3" />
      <text x="50" y="63" fontSize="10" fill="#34d399" textAnchor="middle" fontFamily="monospace" fontWeight="bold">NBC</text>
      <text x="50" y="112" fontSize="9" fill="#10b981" textAnchor="middle" fontFamily="monospace" fontWeight="bold">LOTE #0{idx + 1}</text>
    </svg>
  );
}

export default function DifferencePhase({ phase, onComplete }) {
  const { loseLife, questionSeed } = useGameStore();
  const [selectedId, setSelectedId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [failMsg, setFailMsg] = useState(null);
  const [magnifyPos, setMagnifyPos] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const rawOptions = phase.options || [];

  const [shuffledOptions, setShuffledOptions] = useState(() => {
    return (questionSeed || 0) % 2 === 1 ? [...rawOptions].reverse() : [...rawOptions];
  });

  React.useEffect(() => {
    setShuffledOptions((questionSeed || 0) % 2 === 1 ? [...rawOptions].reverse() : [...rawOptions]);
    setSelectedId(null);
    setIsSuccess(false);
    setFailMsg(null);
  }, [questionSeed, phase.id]);

  const handleSelect = (opt) => {
    if (isSuccess || selectedId) return;
    sound.playClick?.();
    setSelectedId(opt.id);

    if (opt.isCorrect) {
      setIsSuccess(true);
      sound.playCorrect?.();
      setTimeout(() => {
        onComplete(phase.reward || 150, phase.clue);
      }, 1500);
    } else {
      sound.playError?.();
      loseLife();
      setFailMsg(opt.failText || 'Amostra contaminada por necrotoxina! Lacre corrompido detectado.');
      setTimeout(() => {
        setSelectedId(null);
        setFailMsg(null);
      }, 1800);
    }
  };

  const handleMouseMove = (e, cardEl) => {
    const rect = cardEl.getBoundingClientRect();
    setMagnifyPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none font-mono">
      {/* Tactical HUD Header */}
      <div className="w-full bg-[#040805] rounded-t-2xl border-2 border-b-0 border-emerald-500/50 p-4 text-center relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            TRIAGEM FORENSE // CONTENÇÃO QUARENTENA
          </div>
          <h3 className="font-black text-emerald-100 text-lg sm:text-xl mt-2 tracking-wide uppercase">
            {phase.title}
          </h3>
          <p className="text-xs text-zinc-300 mt-1 max-w-lg mx-auto font-sans leading-relaxed">
            {phase.description}
          </p>
        </div>
      </div>

      {/* Examination Table Surface */}
      <div className="w-full border-2 border-t-0 border-b-0 border-emerald-500/50 bg-[#070e0a] p-4 relative">
        {/* Scan instruction indicator */}
        <div className="w-full rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 mb-4 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <Microscope className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase">
              Varredura Óptica Espectrométrica: Compare os componentes
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-500/80 bg-black/60 px-2 py-0.5 rounded border border-emerald-900">
            UV-SENSOR: ATIVO
          </span>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shuffledOptions.map((opt, idx) => {
            const isSelected = selectedId === opt.id;
            let borderStyle = 'border-emerald-900/60 hover:border-emerald-500/80 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]';
            if (isSelected && isSuccess) borderStyle = 'border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.7)] bg-emerald-950/30';
            if (isSelected && !isSuccess && failMsg) borderStyle = 'border-red-500 shadow-[0_0_24px_rgba(239,68,68,0.7)] bg-red-950/30';

            const isActive = activeCard === opt.id;

            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                whileHover={!selectedId ? { y: -2 } : {}}
                whileTap={!selectedId ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(opt)}
                onMouseMove={(e) => {
                  setActiveCard(opt.id);
                  handleMouseMove(e, e.currentTarget);
                }}
                onMouseLeave={() => {
                  setActiveCard(null);
                  setMagnifyPos(null);
                }}
                disabled={Boolean(selectedId)}
                className={`relative flex flex-col rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${borderStyle} bg-[#0a140f] text-left`}
              >
                {/* Visual Area */}
                <div className="relative h-44 bg-gradient-to-b from-[#040805] via-[#09150e] to-[#040805] overflow-hidden flex items-center justify-center p-3">
                  {/* Subtle Grid overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-15"
                    style={{
                      backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
                      backgroundSize: '12px 12px'
                    }}
                  />

                  {/* Render Tactical SVG */}
                  <div className="h-full w-auto relative z-10 py-1">
                    {renderTacticalArt(opt, idx)}
                  </div>

                  {/* High-tech Magnifier Reticle */}
                  {isActive && magnifyPos && (
                    <div
                      className="absolute pointer-events-none w-20 h-20 rounded-full border-2 border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.5)] z-20"
                      style={{
                        left: `${magnifyPos.x}%`,
                        top: `${magnifyPos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 75%)',
                      }}
                    >
                      {/* Crosshairs */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-emerald-400/50 -translate-x-1/2" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-emerald-400/50 -translate-y-1/2" />
                    </div>
                  )}

                  {/* Specimen Tag */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-emerald-700/60 text-[9px] font-mono text-emerald-400 font-bold tracking-wider z-10">
                    AMOSTRA #{String.fromCharCode(65 + idx)}
                  </div>

                  {/* Success / Error Overlay */}
                  {isSelected && isSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-emerald-900/60 z-30 flex flex-col items-center justify-center"
                    >
                      <Shield className="w-10 h-10 text-emerald-300" />
                      <span className="text-xs font-mono font-bold text-emerald-200 mt-1 uppercase tracking-wider">APROVADO</span>
                    </motion.div>
                  )}
                  {isSelected && !isSuccess && failMsg && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-red-950/70 z-30 flex flex-col items-center justify-center"
                    >
                      <AlertTriangle className="w-10 h-10 text-red-400" />
                      <span className="text-xs font-mono font-bold text-red-300 mt-1 uppercase tracking-wider">CONTAMINADO</span>
                    </motion.div>
                  )}
                </div>

                {/* Info & Decision Panel */}
                <div className="p-3 bg-[#08120c] border-t border-emerald-900/50 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-emerald-200 text-sm tracking-wide">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-sans">
                      {opt.desc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-emerald-400 border-t border-emerald-950 pt-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      SELECIONAR COMPONENTE
                    </span>
                    <span className="text-zinc-500 font-mono">CONFIRMAR →</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Visceral Game Master Feedback Strip */}
      <div className="w-full border-2 border-t-0 border-emerald-500/50 rounded-b-2xl bg-[#040805] px-5 py-3 min-h-[56px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {failMsg && (
            <motion.p
              key="fail"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs font-mono font-bold text-center leading-tight flex items-center justify-center gap-2"
            >
              <Skull className="w-4 h-4 text-red-400 shrink-0" />
              <span>{failMsg} — O cheiro de decomposição vazou do lacre. A horda nas imediações já farejou o composto (-1 Vida).</span>
            </motion.p>
          )}
          {isSuccess && (
            <motion.p
              key="succ"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-300 text-xs font-mono font-bold text-center leading-tight flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Análise espectral confirmada. Soro estabilizado sem mutação e pronto para síntese imediata.</span>
            </motion.p>
          )}
          {!failMsg && !isSuccess && (
            <motion.p
              key="idle"
              className="text-zinc-400 text-[11px] font-mono italic text-center"
            >
              Atenção aos detalhes. No apocalipse, injetar um lote adulterado liquefaz seus órgãos em segundos.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
