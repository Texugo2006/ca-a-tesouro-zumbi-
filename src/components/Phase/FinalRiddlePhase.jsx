import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import {
  Compass,
  KeyRound,
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  Radio,
  Zap,
  ShieldAlert
} from 'lucide-react';
import TacticalIcon from '../Common/TacticalIcon';

/* ── High-Tech Military Cryo-Vault Console SVG ── */
function MilitaryCryoConsoleSVG({ isUnlocked, isShaking, theme }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient Glow when vault unlocks */}
      {isUnlocked && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-72 h-72 rounded-full bg-[radial-gradient(circle,#10b981_0%,#06b6d4_40%,transparent_70%)] blur-2xl" />
        </motion.div>
      )}

      <motion.svg
        viewBox="0 0 240 160"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
        animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={isShaking ? { duration: 0.45 } : {}}
        fill="none"
      >
        <defs>
          <linearGradient id="vaultSteel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0a0f1d" />
          </linearGradient>
          <linearGradient id="titaniumBand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <radialGradient id="cureFluid" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Heavy Pedestal Base */}
        <rect x="25" y="55" width="190" height="95" rx="10" fill="url(#vaultSteel)" stroke="#090d12" strokeWidth="4" />

        {/* Reinforcement Rivets */}
        {[35, 75, 120, 165, 205].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="63" r="2.5" fill="#64748b" />
            <circle cx={x} cy="142" r="2.5" fill="#64748b" />
          </g>
        ))}

        {/* Hazard Warning Stripes */}
        <g opacity="0.9">
          <rect x="35" y="122" width="170" height="10" fill="#090d12" />
          {[0, 18, 36, 54, 72, 90, 108, 126, 144, 162].map((x, i) => (
            <polygon key={i} points={`${38 + x},132 ${46 + x},132 ${52 + x},122 ${44 + x},122`} fill="#facc15" />
          ))}
        </g>

        {/* Digital Pressure & Status HUD */}
        <rect x="80" y="98" width="80" height="20" rx="4" fill="#020805" stroke={isUnlocked ? "#10b981" : isShaking ? "#ef4444" : "#059669"} strokeWidth="1.5" />
        <text x="120" y="108" fontSize="6.5" fill={isUnlocked ? "#34d399" : isShaking ? "#f87171" : "#10b981"} textAnchor="middle" fontFamily="monospace" fontWeight="bold">
          {isUnlocked ? "PRESSÃO: 0 PSI" : isShaking ? "ERRO DE PROTOCOLO" : "VEDAÇÃO: 3000 PSI"}
        </text>
        <text x="120" y="115" fontSize="5" fill={isUnlocked ? "#4ade80" : "#94a3b8"} textAnchor="middle" fontFamily="monospace">
          {isUnlocked ? "AMOSTRA LIBERADA" : "BLOQUEIO DE NÍVEL 5"}
        </text>

        {/* Chamber Viewport */}
        {isUnlocked ? (
          // Cryo Chamber Open with Floating Alpha-Z Vaccine
          <g>
            <rect x="55" y="20" width="130" height="70" rx="8" fill="#021a12" stroke="#10b981" strokeWidth="2.5" />
            <circle cx="120" cy="55" r="32" fill="url(#cureFluid)" opacity="0.75" />

            {/* Suspended Vaccine Ampoule */}
            <g transform="translate(120, 52)">
              <rect x="-12" y="-22" width="24" height="44" rx="7" fill="#042f24" stroke="#34d399" strokeWidth="2" />
              <rect x="-9" y="-10" width="18" height="28" rx="4" fill="#10b981" opacity="0.95" />
              {/* DNA Helix */}
              <path d="M-5,-6 Q0,-1 5,4 M5,-6 Q0,-1 -5,4 M-5,6 Q0,11 5,16 M5,6 Q0,11 -5,16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              {/* Cap */}
              <rect x="-9" y="-28" width="18" height="7" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
              {/* Biohazard symbol */}
              <text x="0" y="2" fontSize="5" fill="#022c22" textAnchor="middle" fontFamily="monospace" fontWeight="bold">BIO</text>
            </g>

            {/* Steam plumes */}
            <path d="M45 45 Q50 30 60 40" stroke="#93c5fd" strokeWidth="2.5" strokeDasharray="3 3" fill="none" opacity="0.8" />
            <path d="M195 45 Q190 30 180 40" stroke="#93c5fd" strokeWidth="2.5" strokeDasharray="3 3" fill="none" opacity="0.8" />
          </g>
        ) : (
          // Armored Blast Shield Closed
          <g>
            <path d="M30 65 L48 18 L192 18 L210 65 Z" fill="url(#vaultSteel)" stroke="#090d12" strokeWidth="4" />
            <rect x="80" y="24" width="80" height="12" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <text x="120" y="32" fontSize="6.5" fill="#facc15" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              CEPA ALPHA-Z // NÍVEL 5
            </text>

            {/* Heavy Hydraulic Locking Latches */}
            <rect x="52" y="38" width="16" height="32" rx="3" fill="url(#titaniumBand)" stroke="#334155" strokeWidth="1.5" />
            <rect x="172" y="38" width="16" height="32" rx="3" fill="url(#titaniumBand)" stroke="#334155" strokeWidth="1.5" />

            {/* Central Bio-Seal */}
            <circle cx="120" cy="50" r="14" fill="#0f172a" stroke={isShaking ? "#ef4444" : "#10b981"} strokeWidth="2" />
            <text x="120" y="53" fontSize="8" fill={isShaking ? "#ef4444" : "#34d399"} textAnchor="middle" fontFamily="monospace" fontWeight="black">
              ALPHA
            </text>
          </g>
        )}
      </motion.svg>
    </div>
  );
}

/* ── Tactical Military Credentials (replaces childish symbols) ── */
const TACTICAL_CREDENTIALS = [
  {
    id: 'CHAVE-SWAT',
    aliases: ['trident', 'chave-swat', 'swat', 'chave'],
    label: 'Chave-Mestra SWAT',
    category: 'Credencial Bélica',
    icon: 'Key',
    color: '#34d399'
  },
  {
    id: 'CHIP-CRIPTO',
    aliases: ['eye', 'chip-cripto', 'chip', 'cripto', 'solaris'],
    label: 'Chip Criptográfico',
    category: 'Bypass Militar',
    icon: 'HardDrive',
    color: '#60a5fa'
  },
  {
    id: 'TOKEN-BIO',
    aliases: ['clover', 'token-bio', 'bio', 'raizes', 'cepa-alfa'],
    label: 'Token Biohazard',
    category: 'Quarentena N5',
    icon: 'AlertTriangle',
    color: '#a78bfa'
  },
  {
    id: 'CELULA-EMP',
    aliases: ['gem', 'anchor', 'star', 'celula-emp', 'emp', 'safira-polar', 'aurora'],
    label: 'Célula de Pulso EMP',
    category: 'Trava Magnética',
    icon: 'Zap',
    color: '#fbbf24'
  }
];

const DIRECTIONS = [
  { id: 'NORTE', short: 'N', deg: 0, label: 'Norte (0°)' },
  { id: 'LESTE', short: 'L', deg: 90, label: 'Leste (90°)' },
  { id: 'SUL',   short: 'S', deg: 180, label: 'Sul (180°)' },
  { id: 'OESTE', short: 'O', deg: 270, label: 'Oeste (270°)' }
];

const MAP_TITLES = {
  pirates: { label: 'Câmara Criogênica Alfa // Setor Urbano', accent: '#34d399' },
  forest:  { label: 'Bunker de Quarentena // Cepa Zero', accent: '#4ade80' },
  temple:  { label: 'Cofre Bélico de Contenção // Setor Subterrâneo', accent: '#60a5fa' },
  frozen:  { label: 'Câmara Criostática Polar // Projeto Ártico', accent: '#38bdf8' }
};

export default function FinalRiddlePhase({ phase, onComplete }) {
  const { loseLife, selectedMap, mapProgress } = useGameStore();

  const reqs = phase.finalRequirements || {
    direction: 'OESTE',
    symbol: 'trident',
    code: '34',
    word: 'AVANTE'
  };

  const currentClues = mapProgress[selectedMap]?.cluesCollected || [];
  const theme = MAP_TITLES[selectedMap] || MAP_TITLES.pirates;

  // Selected Tactical States
  const [chosenDir, setChosenDir] = useState('NORTE');
  const [chosenCredential, setChosenCredential] = useState('');
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [wrongFields, setWrongFields] = useState([]);
  const [attempt, setAttempt] = useState(0);

  const scanIntervalRef = useRef(null);
  const currentDirObj = DIRECTIONS.find(d => d.id === chosenDir) || DIRECTIONS[0];

  // Auto-fill from extracted clues on mount if available
  useEffect(() => {
    currentClues.forEach(clue => {
      const val = String(clue.value || clue.label || clue).toUpperCase();
      if (['NORTE', 'SUL', 'LESTE', 'OESTE'].includes(val)) {
        setChosenDir(val);
      } else if (val.includes('OESTE')) {
        setChosenDir('OESTE');
      } else if (val.includes('NORTE')) {
        setChosenDir('NORTE');
      } else if (val.includes('SUL')) {
        setChosenDir('SUL');
      } else if (val.includes('LESTE')) {
        setChosenDir('LESTE');
      }

      if (val.includes('SWAT') || val.includes('CHAVE')) {
        setChosenCredential('CHAVE-SWAT');
      } else if (val.includes('CEPA') || val.includes('RAIZES') || val.includes('RAÍZES')) {
        setChosenCredential('TOKEN-BIO');
      } else if (val.includes('SAFIRA') || val.includes('POLAR') || val.includes('AURORA')) {
        setChosenCredential('CELULA-EMP');
      }
    });
  }, [currentClues]);

  // Biometric scanner hold/press handling
  const startBiometricScan = () => {
    if (isBiometricVerified || isUnlocked) return;
    setIsScanning(true);
    sound.playClick?.();

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    scanIntervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanIntervalRef.current);
          setIsScanning(false);
          setIsBiometricVerified(true);
          sound.playSuccess?.();
          return 100;
        }
        return prev + 12;
      });
    }, 60);
  };

  const stopBiometricScan = () => {
    if (!isBiometricVerified) {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  // Instant one-click verify fallback for accessibility
  const handleInstantVerifyBiometric = () => {
    if (isBiometricVerified || isUnlocked) return;
    setIsScanning(true);
    setScanProgress(100);
    setIsBiometricVerified(true);
    setIsScanning(false);
    sound.playSuccess?.();
  };

  const handleUnlock = () => {
    if (isUnlocked) return;
    sound.playClick?.();

    const wrong = [];

    // 1. Check Direction
    if (chosenDir !== reqs.direction) {
      wrong.push('dir');
    }

    // 2. Check Credential (flexible matching against aliases and collected clues)
    const activeCred = TACTICAL_CREDENTIALS.find(c => c.id === chosenCredential);
    const targetSymbol = String(reqs.symbol || '').toLowerCase();

    let isCredentialValid = false;
    if (activeCred) {
      if (activeCred.aliases.includes(targetSymbol) || activeCred.id.toLowerCase().includes(targetSymbol)) {
        isCredentialValid = true;
      } else if (currentClues.some(c => String(c.value || c.label || '').toUpperCase().includes(activeCred.id))) {
        isCredentialValid = true;
      } else if (!reqs.symbol) {
        isCredentialValid = true;
      }
    }

    if (!isCredentialValid) {
      wrong.push('cred');
    }

    // 3. Check Biometric
    if (!isBiometricVerified) {
      wrong.push('bio');
    }

    if (wrong.length === 0) {
      setIsUnlocked(true);
      sound.playSpecial?.();
      setTimeout(() => {
        onComplete(phase.reward || 500, { id: 'final_chest', label: 'Cofre Criogênico Nível 5' });
      }, 2500);
    } else {
      setWrongFields(wrong);
      setIsShaking(true);
      loseLife();
      sound.playError?.();
      setAttempt(a => a + 1);
      setTimeout(() => {
        setIsShaking(false);
        setWrongFields([]);
      }, 1200);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none pb-8">
      {/* ── Console Header ── */}
      <div className="w-full bg-gradient-to-b from-[#060c08] to-[#0a140e] rounded-t-3xl border-2 border-b-0 border-emerald-500/50 px-5 pt-4 pb-3 text-center shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 mb-1">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>CONSOLE DE DESCOMPRESSÃO DO COFRE CRIOGÊNICO // ACESSO NÍVEL 5</span>
        </div>
        <h3 className="font-cinzel font-black text-white text-lg sm:text-xl">{phase.title}</h3>
        <p className="text-xs text-zinc-300 mt-1 font-outfit max-w-lg mx-auto leading-relaxed">
          {phase.description}
        </p>
      </div>

      {/* ── High-Tech Cryo-Chamber Viewport ── */}
      <div className="w-full border-2 border-t-0 border-b-0 border-emerald-500/50 px-6 py-4 flex flex-col items-center bg-[#040806]">
        <div className="w-64 h-40 relative">
          <MilitaryCryoConsoleSVG isUnlocked={isUnlocked} isShaking={isShaking} theme={theme} />
        </div>
        <p className="text-center text-[11px] font-mono font-bold mt-2 tracking-wider" style={{ color: theme.accent }}>
          {theme.label}
        </p>
      </div>

      {/* ── Extracted Clues Ribbon (Quick Inject) ── */}
      <div className="w-full border-2 border-t-0 border-b-0 border-emerald-500/50 bg-[#070e0a] px-4 py-2.5 flex flex-wrap items-center gap-2 border-dashed">
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400 mr-1">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>DADOS EXTRAÍDOS:</span>
        </div>
        {currentClues.length === 0 ? (
          <span className="text-[11px] text-zinc-500 italic font-mono">Nenhuma evidência registrada ainda</span>
        ) : (
          currentClues.map((clue, idx) => {
            const val = clue.value || clue.label || clue;
            const handleClickClue = () => {
              sound.playClick?.();
              const upper = String(val).toUpperCase();
              if (['NORTE', 'SUL', 'LESTE', 'OESTE'].includes(upper)) {
                setChosenDir(upper);
              } else if (upper.includes('OESTE')) {
                setChosenDir('OESTE');
              } else if (upper.includes('NORTE')) {
                setChosenDir('NORTE');
              } else if (upper.includes('SUL')) {
                setChosenDir('SUL');
              } else if (upper.includes('LESTE')) {
                setChosenDir('LESTE');
              }

              if (upper.includes('SWAT') || upper.includes('CHAVE')) {
                setChosenCredential('CHAVE-SWAT');
              } else if (upper.includes('CEPA') || upper.includes('BIO') || upper.includes('RAIZES')) {
                setChosenCredential('TOKEN-BIO');
              } else if (upper.includes('SAFIRA') || upper.includes('EMP') || upper.includes('AURORA')) {
                setChosenCredential('CELULA-EMP');
              }
            };

            return (
              <button
                key={idx}
                type="button"
                onClick={handleClickClue}
                title="Clique para injetar este dado no console"
                className="px-2.5 py-1 bg-zinc-900/90 hover:bg-emerald-950 border border-emerald-500/50 rounded-lg text-[11px] text-emerald-300 font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm hover:border-emerald-400"
              >
                {clue.icon && <TacticalIcon icon={clue.icon} className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{val}</span>
              </button>
            );
          })
        )}
      </div>

      {/* ── Tactical Interactive Modules (Cleaned: No text input, no childish runes, no spinners) ── */}
      <div className="w-full border-2 border-t-0 border-b-0 border-emerald-500/50 bg-gradient-to-b from-[#08120b] to-[#040805] p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* 1. Vector of Evacuation (Tactical Compass) */}
        <div
          className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
            wrongFields.includes('dir')
              ? 'border-red-500 bg-red-950/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
              : 'border-emerald-900/60 bg-[#09120b]'
          }`}
        >
          <div>
            <p className="text-[10px] font-mono font-black text-emerald-400 mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>1. VETOR DE EVACUAÇÃO (AZIMUTE)</span>
            </p>

            {/* Compass Visualizer */}
            <div className="flex items-center justify-center my-2">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 80 80" className="absolute inset-0 w-full h-full" fill="none">
                  <circle cx="40" cy="40" r="38" fill="#030604" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#064e3b" strokeWidth="0.8" strokeDasharray="2 2" />
                  {['N', 'L', 'S', 'O'].map((l, i) => (
                    <text
                      key={l}
                      x={40 + Math.sin((i * Math.PI) / 2) * 26}
                      y={43 - Math.cos((i * Math.PI) / 2) * 26}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#34d399"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {l}
                    </text>
                  ))}
                </svg>
                <motion.svg
                  viewBox="0 0 80 80"
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotate: currentDirObj.deg }}
                  transition={{ type: 'spring', stiffness: 140, damping: 16 }}
                  fill="none"
                >
                  <polygon points="40,8 44,40 40,46 36,40" fill="#ef4444" opacity="0.95" />
                  <polygon points="40,46 44,40 40,72 36,40" fill="#10b981" opacity="0.85" />
                  <circle cx="40" cy="40" r="4.5" fill="#facc15" stroke="#000" strokeWidth="1" />
                </motion.svg>
              </div>
            </div>
          </div>

          {/* Direction Buttons */}
          <div className="grid grid-cols-4 gap-1.5 mt-2">
            {DIRECTIONS.map(d => (
              <button
                key={d.id}
                onClick={() => {
                  setChosenDir(d.id);
                  sound.playClick?.();
                }}
                className={`py-2 rounded-lg text-xs font-mono font-black cursor-pointer transition-all ${
                  chosenDir === d.id
                    ? 'bg-emerald-500 text-slate-950 scale-105 shadow-[0_0_12px_#10b981]'
                    : 'bg-zinc-900 text-emerald-400 hover:bg-zinc-800 border border-emerald-900/50'
                }`}
              >
                {d.short}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Tactical Security Credential (replaces childish symbols) */}
        <div
          className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
            wrongFields.includes('cred')
              ? 'border-red-500 bg-red-950/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
              : 'border-emerald-900/60 bg-[#09120b]'
          }`}
        >
          <div>
            <p className="text-[10px] font-mono font-black text-emerald-400 mb-2 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>2. CREDENCIAL DE SEGURANÇA</span>
            </p>
            <p className="text-[10px] text-zinc-400 font-mono mb-2">
              Selecione a chave militar de contenção resgatada:
            </p>

            <div className="grid grid-cols-2 gap-2">
              {TACTICAL_CREDENTIALS.map(cred => {
                const isSelected = chosenCredential === cred.id;
                return (
                  <button
                    key={cred.id}
                    onClick={() => {
                      setChosenCredential(cred.id);
                      sound.playClick?.();
                    }}
                    className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all text-center ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_14px_rgba(16,185,129,0.5)] scale-102'
                        : 'border-zinc-800 bg-zinc-900/60 hover:border-emerald-600/50 hover:bg-zinc-800/80'
                    }`}
                  >
                    <TacticalIcon icon={cred.icon} className="w-5 h-5 text-emerald-300" />
                    <span className="text-[10px] text-zinc-100 font-mono font-bold leading-tight">
                      {cred.label}
                    </span>
                    <span className="text-[8px] text-emerald-400 font-mono">
                      {cred.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-[9px] font-mono text-zinc-500">
              {chosenCredential ? `SELECIONADO: ${chosenCredential}` : 'Selecione uma credencial'}
            </span>
          </div>
        </div>

        {/* 3. Biometric Scanner (replaces repetitive numbers & keyboard inputs) */}
        <div
          className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
            wrongFields.includes('bio')
              ? 'border-red-500 bg-red-950/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
              : 'border-emerald-900/60 bg-[#09120b]'
          }`}
        >
          <div>
            <p className="text-[10px] font-mono font-black text-emerald-400 mb-2 flex items-center gap-1.5">
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>3. LEITOR BIOMÉTRICO (OVERRIDE)</span>
            </p>
            <p className="text-[10px] text-zinc-400 font-mono mb-2">
              Autenticação de DNA do oficial de campo:
            </p>

            {/* Scanner Pad */}
            <div className="flex flex-col items-center justify-center py-2">
              <div
                onMouseDown={startBiometricScan}
                onMouseUp={stopBiometricScan}
                onMouseLeave={stopBiometricScan}
                onTouchStart={startBiometricScan}
                onTouchEnd={stopBiometricScan}
                onClick={handleInstantVerifyBiometric}
                className={`relative w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                  isBiometricVerified
                    ? 'border-emerald-400 bg-emerald-950/90 shadow-[0_0_20px_rgba(16,185,129,0.7)]'
                    : isScanning
                    ? 'border-cyan-400 bg-slate-900 shadow-[0_0_18px_rgba(6,182,212,0.6)]'
                    : 'border-zinc-700 bg-zinc-950 hover:border-emerald-500/70'
                }`}
              >
                {/* Laser scan line animation */}
                {isScanning && !isBiometricVerified && (
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {isBiometricVerified ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
                ) : (
                  <Fingerprint className={`w-10 h-10 transition-colors ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-emerald-500/70'}`} />
                )}

                <span className="text-[8px] font-mono font-bold mt-1 text-center text-zinc-300">
                  {isBiometricVerified ? 'AUTORIZADO' : isScanning ? `${scanProgress}%` : 'PRESSIONE'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-center">
            {isBiometricVerified ? (
              <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> BIOMETRIA CONFIRMADA
              </span>
            ) : (
              <button
                type="button"
                onClick={handleInstantVerifyBiometric}
                className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                Toque para validar biometria
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ── Master Decompression / Unlock Button ── */}
      <div className="w-full border-2 border-t-0 border-emerald-500/50 rounded-b-3xl bg-[#060b08] px-5 py-4 shadow-xl">
        <AnimatePresence mode="wait">
          {isUnlocked ? (
            <motion.div
              key="opened"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-2"
            >
              <div className="inline-flex items-center gap-2 text-emerald-400 font-cinzel font-black text-xl sm:text-2xl">
                <Unlock className="w-6 h-6 animate-pulse" />
                <span>COFRE CRIOGÊNICO DESCOMPRIMIDO!</span>
              </div>
              <p className="text-xs text-zinc-200 mt-1 font-outfit">
                A Amostra Zero da Vacina Alpha-Z foi resgatada com sucesso! Extração tática autorizada…
              </p>
            </motion.div>
          ) : (
            <div>
              <motion.button
                key="unlock-btn"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={handleUnlock}
                className="w-full py-4 rounded-2xl font-mono font-black text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-2xl transition-all bg-emerald-500 text-slate-950 hover:bg-emerald-400 border border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
              >
                <Unlock className="w-5 h-5 text-slate-950" />
                <span>EXECUTAR DESCOMPRESSÃO — DESTRAVAR COFRE CRIOGÊNICO</span>
              </motion.button>

              {attempt > 0 && (
                <p className="text-[11px] text-red-400 mt-2 text-center font-mono font-bold flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>
                    {attempt} tentativa{attempt > 1 ? 's' : ''} incorreta{attempt > 1 ? 's' : ''}.
                    {wrongFields.includes('dir') && ' Ajuste o vetor da bússola.'}
                    {wrongFields.includes('cred') && ' Selecione a credencial correta.'}
                    {wrongFields.includes('bio') && ' Confirme o leitor biométrico.'}
                  </span>
                </p>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
