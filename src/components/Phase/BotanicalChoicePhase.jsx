import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { ShieldAlert, CheckCircle2, Dna, Activity, FlaskConical, Zap, AlertTriangle } from 'lucide-react';
import { sound } from '../../services/soundEngine';
import TacticalIcon from '../Common/TacticalIcon';

// High-Tech Bio-Chemical Ampoules & Nanite Vials SVGs (Dead Ahead / Cyber-Zombie Theme)
const compoundArtworks = {
  crispr: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-lg">
      <defs>
        <radialGradient id="crisprGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#0891b2" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#083344" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cyanLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#crisprGlow)" />
      {/* Heavy Military Ampoule Glass */}
      <rect x="34" y="20" width="32" height="64" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2.5" />
      {/* Liquid Core */}
      <rect x="37" y="38" width="26" height="42" rx="6" fill="url(#cyanLiquid)" opacity="0.9" />
      {/* Meniscus wave */}
      <path d="M37,42 Q43,36 50,42 T63,42 L63,80 L37,80 Z" fill="#22d3ee" opacity="0.4" />
      {/* Molecular DNA helix inside */}
      <path d="M43,44 Q50,52 57,60 M57,44 Q50,52 43,60 M43,62 Q50,70 57,76 M57,62 Q50,70 43,76" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="52" r="2.5" fill="#fef08a" />
      {/* Reinforced Titanium Cap */}
      <rect x="38" y="14" width="24" height="8" rx="2" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="42" y1="18" x2="58" y2="18" stroke="#38bdf8" strokeWidth="2" />
      {/* Measurement ticks */}
      <line x1="37" y1="48" x2="42" y2="48" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
      <line x1="37" y1="58" x2="42" y2="58" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
      <line x1="37" y1="68" x2="42" y2="68" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
    </svg>
  ),

  neuro: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-lg">
      <defs>
        <radialGradient id="neuroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#7e22ce" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="purpleLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6b21a8" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#neuroGlow)" />
      {/* Bio-Canister Flask */}
      <polygon points="40,24 60,24 72,78 28,78" fill="#2e1065" stroke="#c084fc" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="42,42 58,42 68,76 32,76" fill="url(#purpleLiquid)" opacity="0.9" />
      {/* Synaptic Lightning Arcs */}
      <path d="M48,46 L53,54 L46,60 L54,70" stroke="#fef08a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="46" r="2" fill="#ffffff" />
      <circle cx="54" cy="70" r="2" fill="#ffffff" />
      {/* Top nozzle */}
      <rect x="42" y="16" width="16" height="8" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="50" cy="20" r="2" fill="#a855f7" />
    </svg>
  ),

  nanite: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-lg">
      <defs>
        <radialGradient id="naniteGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#15803d" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#052e16" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="greenLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#naniteGlow)" />
      {/* Cylindrical Nanite Injector */}
      <rect x="32" y="24" width="36" height="58" rx="8" fill="#064e3b" stroke="#4ade80" strokeWidth="2.5" />
      <rect x="36" y="36" width="28" height="42" rx="4" fill="url(#greenLiquid)" opacity="0.9" />
      {/* Micro-Nanite Swarm Particles */}
      {[
        [44, 46], [56, 44], [48, 54], [54, 62], [42, 66], [58, 70]
      ].map(([px, py], idx) => (
        <rect key={idx} x={px} y={py} width="3.5" height="3.5" fill="#fef08a" transform="rotate(45)" />
      ))}
      {/* High-pressure plunger */}
      <rect x="44" y="12" width="12" height="12" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="38" y="10" width="24" height="4" rx="1" fill="#64748b" />
    </svg>
  ),

  plasma: (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 drop-shadow-lg">
      <defs>
        <radialGradient id="plasmaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#b45309" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#451a03" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="amberLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#plasmaGlow)" />
      {/* Heavy Hazard Core */}
      <circle cx="50" cy="50" r="28" fill="#451a03" stroke="#f59e0b" strokeWidth="3" />
      <circle cx="50" cy="50" r="22" fill="url(#amberLiquid)" opacity="0.85" />
      {/* Biohazard Icon in Center */}
      <circle cx="50" cy="50" r="6" fill="#000000" />
      <circle cx="50" cy="42" r="5" fill="none" stroke="#000000" strokeWidth="2.5" />
      <circle cx="43" cy="54" r="5" fill="none" stroke="#000000" strokeWidth="2.5" />
      <circle cx="57" cy="54" r="5" fill="none" stroke="#000000" strokeWidth="2.5" />
      {/* External Warning Tabs */}
      <rect x="47" y="14" width="6" height="8" rx="1" fill="#f59e0b" />
      <rect x="47" y="78" width="6" height="8" rx="1" fill="#f59e0b" />
      <rect x="14" y="47" width="8" height="6" rx="1" fill="#f59e0b" />
      <rect x="78" y="47" width="8" height="6" rx="1" fill="#f59e0b" />
    </svg>
  )
};

export default function BotanicalChoicePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [selectedId, setSelectedId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // High-Tech Survival Antidote Formulas (Mature, Dev / Sci-Fi Theme)
  const defaultCompounds = [
    {
      id: "crispr",
      name: "Soro CRISPR-Z9",
      codename: "ANTÍDOTO DE PURIFICAÇÃO",
      icon: "Dna",
      purity: "99.8% Estabilidade",
      hazardLevel: "BIO-SEGURANÇA NÍVEL 4",
      desc: "Inibidor quântico de replicação celular. Neutraliza a cepa Alpha de zumbis atacando diretamente a sequência de RNA mutante.",
      isCorrect: true,
      successMessage: "Soro CRISPR-Z9 estabilizado com sucesso! O reator sintetizou o antídoto neural e a porta blindada foi destrancada."
    },
    {
      id: "neuro",
      name: "Neuro-Toxina Sináptica",
      codename: "BLOQUEADOR NERVOSO",
      icon: "Zap",
      purity: "Instabilidade Crítica",
      hazardLevel: "PERIGO BIOLÓGICO",
      desc: "Provoca choque elétrico nos nervos cerebrais. Interrompe impulsos de dor, mas destrói células saudáveis do hospedeiro.",
      isCorrect: false,
      failMessage: "FALHA CRÍTICA: A Neuro-Toxina causou sobrecarga sináptica e colapso na câmara de testes!"
    },
    {
      id: "nanite",
      name: "Coquetel Bio-Nanite",
      codename: "REPARO MECÂNICO",
      icon: "Microscope",
      purity: "84.2% Estabilidade",
      hazardLevel: "EXPERIMENTAL",
      desc: "Micro-robôs que cauterizam feridas no sangue. Eficaz contra sangramento, mas inerte contra a toxina viral necrótica.",
      isCorrect: false,
      failMessage: "INCOMPATÍVEL: Os nanites foram desativados pela acidez da infecção sem neutralizar a toxina!"
    },
    {
      id: "plasma",
      name: "Plasma Térmico Incendiário",
      codename: "AGENTE CORROSIVO",
      icon: "Flame",
      purity: "Altamente Volátil",
      hazardLevel: "EXTREMO RISCO",
      desc: "Composto inflamável desenvolvido para cremação em massa de carcaças. Se injetado no reator, provoca explosão térmica.",
      isCorrect: false,
      failMessage: "ALERTA DE INCÊNDIO: O Plasma superaqueceu o reator de purificação e disparou os alarmes de quarentena!"
    }
  ];

  const cards = phase.cards || defaultCompounds;

  const handleSelectCard = (card) => {
    if (isSuccess || selectedId) return;
    sound.playClick();
    setSelectedId(card.id);

    if (card.isCorrect) {
      sound.playCyberHacking();
      setTimeout(() => {
        sound.playCorrect();
        setIsSuccess(true);
        setErrorMessage(null);
        setTimeout(() => {
          onComplete(phase.reward || 150, phase.clue);
        }, 1600);
      }, 500);
    } else {
      sound.playAlarm();
      loseLife();
      setErrorMessage(card.failMessage || "Composto químico incompatível com o protocolo de cura!");
      setTimeout(() => {
        setSelectedId(null);
        setErrorMessage(null);
      }, 1900);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none">
      {/* Tactical Bio-Reactor HUD Container */}
      <div className="w-full bg-[#0a110d] p-4 sm:p-6 rounded-3xl shadow-2xl relative border-2 border-emerald-500/50">
        
        {/* Terminal Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold mb-1 shadow-md">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>LABORATÓRIO DE SÍNTESE BIOQUÍMICA · TERMINAL BIOHAZARD</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-white tracking-wide mt-1">
            {phase.title || "Síntese Molecular da Vacina Neural"}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto font-outfit">
            {phase.description || "Identifique e injete o único composto molecular capaz de anular a mutação da Cepa Alpha antes da violação do laboratório."}
          </p>
        </div>

        {/* Tactical Mission Briefing Order Box */}
        <div className="mb-4 p-3.5 bg-black/70 border border-cyan-500/50 rounded-2xl text-center shadow-inner max-w-2xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-cyan-300 font-mono font-bold text-xs uppercase mb-1">
            <Dna className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>DIAGNÓSTICO PATOLÓGICO: ANÁLISE DE VULNERABILIDADE VIRAL</span>
          </div>
          <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed max-w-xl">
            {phase.riddle || "A infecção zumbi se propaga por reprogramação do RNA humano. Para neutralizar o patógeno, necessita-se de um agente de interferência genética CRISPR que desestruture a replicação molecular."}
          </p>
        </div>

        {/* 4 High-Tech Chemical Compound Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {cards.map((card) => {
            const isSelected = selectedId === card.id;
            const artwork = compoundArtworks[card.id] || (
              <div className="w-12 h-12 flex items-center justify-center"><TacticalIcon icon={card.icon} className="w-10 h-10" /></div>
            );

            let borderStyle = "border-emerald-900/60 bg-[#0e1612] hover:border-emerald-400 hover:bg-[#14231b]";
            if (isSelected) {
              borderStyle = isSuccess
                ? "border-emerald-400 bg-emerald-950 shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-102"
                : "border-red-500 bg-red-950/90 shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-shake";
            }

            return (
              <motion.div
                key={card.id}
                whileHover={!selectedId ? { scale: 1.03, y: -4 } : {}}
                whileTap={!selectedId ? { scale: 0.97 } : {}}
                onClick={() => handleSelectCard(card)}
                className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between transition-all cursor-pointer shadow-xl relative group ${borderStyle}`}
              >
                {/* Visual Glass Ampoule Display */}
                <div className="w-full aspect-square rounded-xl bg-black/60 border border-emerald-500/20 p-2 flex items-center justify-center mb-2.5 overflow-hidden shadow-inner group-hover:border-emerald-400/50 transition-colors">
                  <div className="w-24 h-24 sm:w-26 sm:h-26 flex items-center justify-center">
                    {artwork}
                  </div>
                </div>

                {/* Compound Title & Specs */}
                <div className="text-center mb-2">
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    {card.codename || "COMPOSTO QUÍMICO"}
                  </span>
                  <h4 className="font-cinzel font-bold text-white text-sm group-hover:text-emerald-200 transition-colors">
                    {card.name}
                  </h4>
                  <span className="text-[10px] text-amber-300 font-mono font-semibold block mt-0.5">
                    {card.purity || "Pureza: 98%"}
                  </span>
                </div>

                {/* Lore / Tactical Description */}
                <p className="text-[11px] text-zinc-300 leading-relaxed text-center mb-3 min-h-[44px]">
                  {card.desc}
                </p>

                {/* Action CTA Button */}
                <button
                  disabled={Boolean(selectedId)}
                  className={`w-full py-2 px-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isSelected
                      ? isSuccess
                        ? "bg-emerald-500 text-slate-950 font-black"
                        : "bg-red-600 text-white font-black"
                      : "bg-emerald-950/80 hover:bg-emerald-600 hover:text-slate-950 text-emerald-300 border border-emerald-500/50 group-hover:border-emerald-300"
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>{isSelected && isSuccess ? "COMPOSTO APROVADO" : "INJETAR NO REATOR"}</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Error Feedback Banner */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-950/95 border-2 border-red-500 rounded-xl text-red-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-2xl"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {/* Success Feedback Banner */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-emerald-950/95 border-2 border-emerald-400 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-2xl"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>Reação de síntese concluída com 100% de estabilidade! O antídoto foi gerado e a pista revelada!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
