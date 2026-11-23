import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { Target, AlertTriangle, Check, X } from 'lucide-react';

/* ── Background scene SVGs per map — Cyber Zombie Apocalypse Theme ── */
const BG_SCENES = {
  /* MAP: Delegacia / Arsenal SWAT sitiado */
  pirates: (
    <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* Dark concrete bunker floor */}
      <rect width="400" height="220" fill="#0a0a0a"/>
      {/* Concrete floor panels */}
      {[0,55,110,165,220,275,330,385].map(x => (
        <line key={x} x1={x} y1="165" x2={x} y2="220" stroke="#1a1a1a" strokeWidth="1.5"/>
      ))}
      {[165,180,195,210].map(y => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#1a1a1a" strokeWidth="1"/>
      ))}
      <rect x="0" y="165" width="400" height="55" fill="#111111"/>
      {/* Shattered SWAT weapon rack */}
      <rect x="0" y="30" width="12" height="145" fill="#1c1c1c"/>
      <rect x="388" y="30" width="12" height="145" fill="#1c1c1c"/>
      {/* Horizontal rack bars */}
      <line x1="0" y1="60" x2="40" y2="60" stroke="#2a2a2a" strokeWidth="5"/>
      <line x1="360" y1="60" x2="400" y2="60" stroke="#2a2a2a" strokeWidth="5"/>
      <line x1="0" y1="100" x2="40" y2="100" stroke="#2a2a2a" strokeWidth="5"/>
      <line x1="360" y1="100" x2="400" y2="100" stroke="#2a2a2a" strokeWidth="5"/>
      {/* Hanging tactical rifles (silhouettes) */}
      <rect x="15" y="62" width="4" height="32" rx="1" fill="#333"/>
      <rect x="11" y="68" width="12" height="3" rx="1" fill="#3a3a3a"/>
      <rect x="375" y="62" width="4" height="32" rx="1" fill="#333"/>
      <rect x="371" y="68" width="12" height="3" rx="1" fill="#3a3a3a"/>
      {/* Bloodstain pools on floor */}
      <ellipse cx="80" cy="195" rx="22" ry="8" fill="#4a0000" opacity="0.7"/>
      <ellipse cx="310" cy="200" rx="16" ry="6" fill="#4a0000" opacity="0.5"/>
      <ellipse cx="200" cy="190" rx="10" ry="4" fill="#3a0000" opacity="0.4"/>
      {/* Toppled metal shelving */}
      <rect x="60" y="130" width="80" height="5" rx="1" fill="#1f1f1f" transform="rotate(-8 60 130)"/>
      <rect x="62" y="135" width="78" height="3" rx="1" fill="#252525" transform="rotate(-8 60 130)"/>
      {/* Scattered ammo casings / debris */}
      <circle cx="120" cy="180" r="2" fill="#5a5a3a"/>
      <circle cx="135" cy="175" r="1.5" fill="#5a5a3a"/>
      <circle cx="150" cy="182" r="1.5" fill="#5a5a3a"/>
      <circle cx="260" cy="178" r="2" fill="#5a5a3a"/>
      {/* Emergency red light glow (left corner) */}
      <circle cx="20" cy="20" r="6" fill="#c00000" opacity="0.8"/>
      <ellipse cx="20" cy="20" rx="40" ry="25" fill="#c00000" opacity="0.04"/>
      {/* CCTV camera (cracked) */}
      <rect x="185" y="5" width="30" height="16" rx="3" fill="#1c1c1c" stroke="#333" strokeWidth="1"/>
      <circle cx="197" cy="13" r="5" fill="#080808" stroke="#292929" strokeWidth="1.5"/>
      <circle cx="197" cy="13" r="2.5" fill="#111" stroke="#ef4444" strokeWidth="0.5" opacity="0.8"/>
      {/* Static interference scan line */}
      <line x1="0" y1="88" x2="400" y2="88" stroke="#10b981" strokeWidth="0.5" opacity="0.15"/>
      <line x1="0" y1="140" x2="400" y2="140" stroke="#10b981" strokeWidth="0.5" opacity="0.1"/>
    </svg>
  ),

  /* MAP: Laboratório de Bio-Síntese Abandonado */
  forest: (
    <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#030808"/>
      {/* Ceiling light strips (flickering left) */}
      <rect x="50" y="0" width="100" height="5" rx="1" fill="#004a3a" opacity="0.6"/>
      <rect x="250" y="0" width="100" height="5" rx="1" fill="#004a3a" opacity="0.3"/>
      {/* Floor tiles w/ bio-stains */}
      {[0,40,80,120,160,200,240,280,320,360,400].map(x => (
        <line key={x} x1={x} y1="170" x2={x} y2="220" stroke="#0a1a0a" strokeWidth="1.5"/>
      ))}
      {[170,188,205].map(y => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#0a1a0a" strokeWidth="1"/>
      ))}
      <rect x="0" y="170" width="400" height="50" fill="#050e05"/>
      {/* Lab workbench countertops */}
      <rect x="0" y="120" width="110" height="8" rx="2" fill="#0c1a10"/>
      <rect x="290" y="120" width="110" height="8" rx="2" fill="#0c1a10"/>
      <rect x="0" y="128" width="110" height="42" fill="#080d08"/>
      <rect x="290" y="128" width="110" height="42" fill="#080d08"/>
      {/* Bio-waste containers (left bench) */}
      <rect x="10" y="105" width="16" height="18" rx="2" fill="#1a3a1a"/>
      <rect x="30" y="108" width="12" height="15" rx="2" fill="#1a1a00"/>
      {/* Broken containment flask on bench */}
      <path d="M55 108 L60 122 L72 122 L77 108 Z" fill="#0a2a1a" stroke="#10b981" strokeWidth="1.5"/>
      <ellipse cx="66" cy="122" rx="6" ry="2" fill="#052a0a"/>
      {/* Drip / contamination on floor from bench */}
      <path d="M66 128 Q68 140 70 155 Q72 165 68 170" stroke="#006633" strokeWidth="2" fill="none" opacity="0.5"/>
      {/* Bio-hazard drums right side */}
      <ellipse cx="320" cy="120" rx="14" ry="5" fill="#1a1a00"/>
      <rect x="306" y="100" width="28" height="22" rx="3" fill="#111100"/>
      <text x="320" y="114" fontSize="8" fill="#facc15" textAnchor="middle" fontFamily="monospace" fontWeight="bold" opacity="0.9">BIO</text>
      <ellipse cx="355" cy="125" rx="12" ry="4" fill="#1a0000"/>
      <rect x="343" y="107" width="24" height="19" rx="3" fill="#110000"/>
      <text x="355" y="120" fontSize="8" fill="#ef4444" textAnchor="middle" fontFamily="monospace" fontWeight="bold" opacity="0.9">BIO</text>
      {/* Cracked containment tube (center) */}
      <rect x="192" y="80" width="16" height="70" rx="4" fill="#020e06" stroke="#10b981" strokeWidth="1.5"/>
      <rect x="194" y="92" width="12" height="52" rx="3" fill="#062210" opacity="0.8"/>
      <path d="M196 100 L200 115 L197 130" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Green phosphorescent drip on tube */}
      <path d="M200 150 Q202 158 200 165" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.7"/>
      {/* HUD glow lines */}
      <line x1="0" y1="65" x2="400" y2="65" stroke="#10b981" strokeWidth="0.5" opacity="0.12"/>
      <line x1="0" y1="120" x2="400" y2="120" stroke="#10b981" strokeWidth="0.5" opacity="0.1"/>
      {/* Dim ceiling ambient */}
      <ellipse cx="100" cy="2" rx="60" ry="20" fill="#10b981" opacity="0.04"/>
      <ellipse cx="300" cy="2" rx="50" ry="15" fill="#10b981" opacity="0.02"/>
    </svg>
  ),

  /* MAP: Bunker de Comando Nuclear */
  temple: (
    <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#020208"/>
      {/* Reinforced concrete wall panels */}
      {[0, 80, 160, 240, 320, 400].map((x, i) => (
        <line key={i} x1={x} y1="0" x2={x} y2="220" stroke="#0c0c18" strokeWidth="2"/>
      ))}
      {[60, 120, 180].map(y => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#0c0c18" strokeWidth="1"/>
      ))}
      {/* Server rack columns */}
      {[18, 98, 178, 258, 338].map((x, i) => (
        <g key={i}>
          <rect x={x - 12} y="20" width="24" height="145" rx="3" fill="#0a0a1a"/>
          <rect x={x - 10} y="22" width="20" height="8" rx="1" fill="#0f0f2a"/>
          <rect x={x - 10} y="35" width="20" height="3" fill="#1a1a40" opacity="0.8"/>
          <rect x={x - 10} y="43" width="20" height="3" fill="#1a1a40" opacity="0.6"/>
          {/* LED indicator lights */}
          <circle cx={x - 4} cy={24} r="1.5" fill="#10b981" opacity="0.8"/>
          <circle cx={x + 2} cy={24} r="1.5" fill="#ef4444" opacity="0.7"/>
          <circle cx={x + 8} cy={24} r="1.5" fill="#facc15" opacity="0.6"/>
        </g>
      ))}
      {/* Main tactical console - center */}
      <rect x="140" y="130" width="120" height="45" rx="4" fill="#050514" stroke="#1a1a50" strokeWidth="2"/>
      <rect x="145" y="135" width="110" height="30" rx="2" fill="#08083a"/>
      {/* Holographic map lines on console */}
      <line x1="148" y1="145" x2="248" y2="145" stroke="#10b981" strokeWidth="1" opacity="0.4"/>
      <line x1="148" y1="155" x2="248" y2="155" stroke="#10b981" strokeWidth="1" opacity="0.3"/>
      <circle cx="200" cy="150" r="8" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
      <circle cx="200" cy="150" r="4" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4"/>
      {/* Warning stripe floor */}
      <rect x="0" y="175" width="400" height="45" fill="#080806"/>
      {[0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384].map((x, i) => (
        i % 2 === 0 ? (
          <rect key={x} x={x} y="175" width="32" height="4" fill="#facc15" opacity="0.12"/>
        ) : null
      ))}
      {/* Emergency lighting — red ceiling panels */}
      <rect x="0" y="0" width="400" height="15" fill="#0a0000" opacity="0.9"/>
      <ellipse cx="60" cy="4" rx="30" ry="8" fill="#c00000" opacity="0.15"/>
      <ellipse cx="200" cy="4" rx="30" ry="8" fill="#c00000" opacity="0.12"/>
      <ellipse cx="340" cy="4" rx="30" ry="8" fill="#c00000" opacity="0.15"/>
      {/* Dead body slumped in chair silhouette */}
      <ellipse cx="70" cy="168" rx="10" ry="5" fill="#0f0808"/>
      <rect x="60" y="148" width="20" height="22" rx="4" fill="#0c0808" opacity="0.7"/>
      <circle cx="70" cy="143" r="7" fill="#100a0a" opacity="0.6"/>
    </svg>
  ),

  /* MAP: Instalação Criogênica de Contenção Ártica */
  frozen: (
    <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="220" fill="#010c14"/>
      {/* Arctic facility — frozen pipes and frost */}
      {/* Corrugated metal wall */}
      {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400].map((x, i) => (
        <line key={i} x1={x} y1="0" x2={x} y2="220" stroke="#071521" strokeWidth="1.5"/>
      ))}
      {/* Ice frost overlay on top */}
      <path d="M0 0 Q100 20 200 10 Q300 0 400 18 L400 30 Q300 12 200 22 Q100 32 0 15Z" fill="#7dd3fc" opacity="0.05"/>
      {/* Cryogenic tubes left cluster */}
      {[35, 55, 75].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y="30" width="16" height="140" rx="6" fill="#030e18" stroke="#164e63" strokeWidth="2"/>
          <rect x={x - 6} y="50" width="12" height="100" rx="4" fill="#062030" opacity="0.9"/>
          {/* Frost condensation */}
          <rect x={x - 8} y="30" width="4" height="140" rx="3" fill="#bae6fd" opacity="0.04"/>
          {/* Cryo status light */}
          <circle cx={x} cy={i === 1 ? 36 : 36} r="3" fill={i === 0 ? '#22d3ee' : i === 1 ? '#ef4444' : '#22d3ee'} opacity="0.9"/>
        </g>
      ))}
      {/* Cryogenic tubes right cluster */}
      {[325, 345, 365].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y="30" width="16" height="140" rx="6" fill="#030e18" stroke="#164e63" strokeWidth="2"/>
          <rect x={x - 6} y="50" width="12" height="100" rx="4" fill="#062030" opacity="0.9"/>
          <rect x={x - 8} y="30" width="4" height="140" rx="3" fill="#bae6fd" opacity="0.04"/>
          <circle cx={x} cy="36" r="3" fill={i === 1 ? '#ef4444' : '#22d3ee'} opacity="0.9"/>
        </g>
      ))}
      {/* Frozen floor — ice cracks */}
      <rect x="0" y="175" width="400" height="45" fill="#061018"/>
      <path d="M30 178 L60 185 L90 180 L120 190 L155 183" stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.4"/>
      <path d="M200 180 L230 188 L260 182 L285 190" stroke="#93c5fd" strokeWidth="0.8" fill="none" opacity="0.3"/>
      {/* Thick frost pipe across ceiling */}
      <rect x="0" y="12" width="400" height="12" rx="3" fill="#071c2a" stroke="#164e63" strokeWidth="1"/>
      {/* Dripping frost icicles */}
      <polygon points="80,24 83,38 86,24" fill="#bae6fd" opacity="0.3"/>
      <polygon points="160,24 162,35 164,24" fill="#bae6fd" opacity="0.25"/>
      <polygon points="240,24 243,40 246,24" fill="#bae6fd" opacity="0.35"/>
      <polygon points="320,24 322,33 324,24" fill="#bae6fd" opacity="0.28"/>
      {/* Temperature display panel */}
      <rect x="170" y="90" width="60" height="30" rx="3" fill="#020c14" stroke="#164e63" strokeWidth="1.5"/>
      <text x="200" y="107" fontSize="11" fill="#22d3ee" textAnchor="middle" fontFamily="monospace" fontWeight="bold">-196°C</text>
      <text x="200" y="117" fontSize="7" fill="#0ea5e9" textAnchor="middle" fontFamily="monospace">CRIOSTÁTICO</text>
      {/* Ambient cryo glow */}
      <ellipse cx="200" cy="110" rx="100" ry="30" fill="#0ea5e9" opacity="0.03"/>
    </svg>
  ),
};

export default function FindObjectPhase({ phase, onComplete, hintTrigger }) {
  const { loseLife, selectedMap } = useGameStore();
  const [foundIds, setFoundIds] = useState(new Set());
  const [errorId, setErrorId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false, highlightTarget: false });
  const sceneRef = useRef(null);

  const items = phase.items || [];
  const targetItemName = phase.targetItemName || 'Alvo';

  // Hint: flashlight snap to target
  React.useEffect(() => {
    if (!hintTrigger) return;
    const targetItem = items.find(i => i.isTarget);
    if (targetItem) {
      setSpotlight({ x: targetItem.x, y: targetItem.y, visible: true, highlightTarget: true });
      const timer = setTimeout(() => {
        setSpotlight(s => ({ ...s, highlightTarget: false }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [hintTrigger]);

  const handleMouseMove = useCallback((e) => {
    const rect = sceneRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight(prev => ({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      visible: true,
      highlightTarget: prev.highlightTarget,
    }));
  }, []);

  const handleItemClick = (item) => {
    if (isSuccess || foundIds.has(item.id)) return;
    sound.playClick?.();

    if (item.isTarget) {
      setFoundIds(prev => new Set([...prev, item.id]));
      setIsSuccess(true);
      sound.playCorrect?.();
      setTimeout(() => {
        onComplete(phase.reward || 130, phase.clue);
      }, 1500);
    } else {
      sound.playError?.();
      loseLife();
      setErrorId(item.id);
      setTimeout(() => setErrorId(null), 1200);
    }
  };

  const bgScene = BG_SCENES[selectedMap] || BG_SCENES.pirates;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none font-mono">
      {/* Tactical Header */}
      <div className="w-full bg-[#040805] rounded-t-2xl border-2 border-b-0 border-emerald-500/50 px-5 pt-4 pb-3 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            VARRENDO LOCAL &bull; LANTERNA ATIVA
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          </div>
          <h3 className="font-black text-emerald-100 text-lg uppercase tracking-wide">{phase.title}</h3>
          <p className="text-xs text-zinc-400 mt-1 font-sans">{phase.description}</p>
        </div>

        {/* Target indicator — HUD bar */}
        <div className="relative z-10 mt-3 flex items-center justify-between gap-3 px-3 py-2 rounded-lg border border-red-900/60 bg-red-950/40">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <div className="text-[9px] font-bold text-red-400 uppercase tracking-widest">ALVO PRIMÁRIO</div>
              <div className="text-sm font-black text-red-100 uppercase tracking-wider">{targetItemName}</div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded">
            {items.filter(i => !i.isTarget).length} FALSAS PISTAS
          </div>
        </div>
      </div>

      {/* Dark Scene Viewport */}
      <div
        ref={sceneRef}
        className="w-full relative overflow-hidden border-2 border-t-0 border-b-0 border-emerald-500/50 cursor-crosshair"
        style={{ height: '220px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setSpotlight(s => ({ ...s, visible: false }))}
      >
        {/* Background scene */}
        {bgScene}

        {/* Tactical flashlight cone */}
        {spotlight.visible && (
          <div
            className="absolute pointer-events-none transition-[left,top] duration-50"
            style={{
              left: `${spotlight.x}%`,
              top: `${spotlight.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '100px',
              height: '100px',
              background: spotlight.highlightTarget
                ? 'radial-gradient(circle, rgba(52,211,153,0.35) 0%, rgba(52,211,153,0.12) 40%, transparent 75%)'
                : 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(251,191,36,0.08) 50%, transparent 80%)',
              borderRadius: '50%',
            }}
          />
        )}

        {/* Heavy darkness vignette — forces careful searching */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: spotlight.visible
              ? `radial-gradient(circle 55px at ${spotlight.x}% ${spotlight.y}%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.88) 100%)`
              : 'rgba(0,0,0,0.88)',
          }}
        />

        {/* Items */}
        {items.map((item) => {
          const isFound = foundIds.has(item.id);
          const isError = errorId === item.id;
          const isHighlighted = spotlight.highlightTarget && item.isTarget;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.85 }}
              animate={isError ? { x: [-5, 5, -5, 5, 0] } : isHighlighted ? { scale: [1, 1.25, 1] } : {}}
              transition={isError ? { duration: 0.25 } : isHighlighted ? { repeat: 4, duration: 0.5 } : {}}
              onClick={() => handleItemClick(item)}
              disabled={isSuccess || isFound}
              className="absolute cursor-pointer p-0.5 rounded transition-transform"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: isFound ? 1 : isError ? 1 : isHighlighted ? 1 : (item.isTarget ? 0.68 : 0.55),
                filter: isFound
                  ? 'drop-shadow(0 0 12px rgba(52,211,153,1)) brightness(1.3)'
                  : isError
                  ? 'drop-shadow(0 0 10px rgba(239,68,68,0.9)) saturate(0.2)'
                  : isHighlighted
                  ? 'drop-shadow(0 0 14px rgba(52,211,153,0.9)) brightness(1.4)'
                  : 'contrast(1.05) brightness(0.6) saturate(0.6)',
              }}
              title="Examinar"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain pointer-events-none select-none drop-shadow-sm"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <span
                className="text-sm leading-none select-none"
                style={{ display: item.image ? 'none' : 'block' }}
              >
                {item.icon}
              </span>

              {isFound && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-600 border border-emerald-300 rounded-full flex items-center justify-center text-white shadow-sm"
                >
                  <Check className="w-2.5 h-2.5" />
                </motion.span>
              )}
              {isError && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-700 border border-red-300 rounded-full flex items-center justify-center text-white shadow-sm"
                >
                  <X className="w-2.5 h-2.5" />
                </motion.span>
              )}
            </motion.button>
          );
        })}

        {/* Success Overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center z-40"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.4 }}
                className="text-center px-6 py-4 rounded-xl bg-black/60 border border-emerald-500/50 flex flex-col items-center"
              >
                <Target className="w-8 h-8 text-emerald-400 mb-1" />
                <p className="font-black text-emerald-300 text-base uppercase tracking-widest mt-1">ALVO NEUTRALIZADO</p>
                <p className="text-emerald-400 text-xs mt-0.5 font-mono">{targetItemName} — RESGATADO</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GM Feedback Bar */}
      <div className="w-full border-2 border-t-0 border-emerald-500/50 rounded-b-2xl bg-[#040805] px-5 py-3 min-h-[56px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {errorId && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs font-mono font-bold text-center leading-tight flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Cuidado com onde põe as mãos. Sucata barulhenta chamou os carniçais do corredor (-1 Vida).</span>
            </motion.p>
          )}
          {isSuccess && (
            <motion.p
              key="suc"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-300 text-xs font-mono font-bold text-center leading-tight flex items-center justify-center gap-1.5"
            >
              <Target className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{targetItemName} resgatado entre os cadáveres. Recue agora antes que o cheiro atraia o bando.</span>
            </motion.p>
          )}
          {!errorId && !isSuccess && (
            <motion.p
              key="idle"
              className="text-zinc-500 text-[11px] font-mono italic text-center"
            >
              A escuridão é sufocante. Varra com a lanterna e não faça barulho — eles ouvem tudo.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
