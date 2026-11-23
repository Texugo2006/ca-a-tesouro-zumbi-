import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { maps } from '../../data/maps';
import { phasesData } from '../../data/phases';
import { useGameStore } from '../../store/useGameStore';
import { ArrowLeft, CheckCircle, Lock, ChevronRight, Trophy, Star, ScrollText } from 'lucide-react';
import DifficultySelector from '../DifficultySelector';
import TacticalIcon from '../Common/TacticalIcon';
import NetworkStatus from '../Common/NetworkStatus';
import GeolocationRadar from '../Common/GeolocationRadar';
import InventoryModal from '../Inventory/InventoryModal';

/* Phase type labels (zombie flavored) */
const TYPE_LABEL = {
  coordinates:      'Navegação',
  question:         'Interrogatório',
  find_object:      'Busca',
  path_choice:      'Rota de Fuga',
  botanical_choice: 'Identificação',
  code:             'Decifragem',
  symbol_puzzle:    'Código Visual',
  memory:           'Memória',
  difference:       'Análise',
  final_riddle:     'Missão Final',
  wire_cutter:      'Desarme IED',
  frequency:        'Frequência',
  triage:           'Triagem',
};

/* SVG waypoint path — 7 stops winding down the map */
const WAYPOINTS = [
  { cx: 160, cy: 48  },  // 1
  { cx: 260, cy: 100 },  // 2
  { cx: 120, cy: 152 },  // 3
  { cx: 280, cy: 204 },  // 4
  { cx: 100, cy: 256 },  // 5
  { cx: 260, cy: 308 },  // 6
  { cx: 180, cy: 360 },  // 7 final
];

// Build SVG path string through all waypoints
const buildPath = () => {
  const start = { cx: 180, cy: 10 };  // INÍCIO
  const end   = { cx: 180, cy: 400 }; // BAÚ
  const all   = [start, ...WAYPOINTS, end];
  return all.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.cx} ${p.cy}`).join(' ');
};

export default function TreasureMap({ onStartPhase, onBackToMapSelect }) {
  const { selectedMap, mapProgress, startPhase, setActiveScreen, score } = useGameStore();
  const [showInventory, setShowInventory] = React.useState(false);

  const currentMapData = maps.find(m => m.id === selectedMap) || maps[0];
  const phases = phasesData[selectedMap] || [];
  const progress = mapProgress[selectedMap] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} };

  const phaseScores = progress.phaseScores || {};
  const rawZoneScore = Object.values(phaseScores).reduce((a, b) => a + b, 0);
  const zoneScore = rawZoneScore > 0 ? rawZoneScore : (progress.completed ? 1400 : 0);

  const maxUnlocked = progress.maxPhaseUnlocked || 1;
  const clues = progress.cluesCollected || [];
  const activePhaseIndex = progress.completed ? 6 : Math.min(phases.length - 1, maxUnlocked - 1);
  const activePhaseNumber = activePhaseIndex + 1;

  const handlePhaseClick = (num) => {
    const idx = num - 1;
    startPhase(idx);
    if (onStartPhase) onStartPhase(idx);
  };

  const mapPath = buildPath();

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: '#0d1108' }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b flex-wrap gap-2"
        style={{ background: '#0a0f08', borderColor: '#1a2014' }}
      >
        <button
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-1.5 font-outfit text-sm cursor-pointer transition-colors"
          style={{ color: '#4a7c2a' }}
          onMouseOver={e => e.currentTarget.style.color = '#7ab648'}
          onMouseOut={e => e.currentTarget.style.color = '#4a7c2a'}
        >
          <ArrowLeft className="w-4 h-4" />
          Início
        </button>

        <div className="flex items-center gap-2">
          <TacticalIcon icon={currentMapData.visuals.bannerIcon} className="w-4 h-4 text-amber-400" />
          <span className="font-cinzel font-bold text-sm" style={{ color: '#d4c9a8' }}>
            {currentMapData.name}
          </span>
          {zoneScore > 0 && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded font-outfit flex items-center gap-1"
              style={{ background: '#252010', color: '#d4af37', border: '1px solid #5a4515' }}
            >
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{zoneScore.toLocaleString()} pts</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <NetworkStatus />

          <button
            onClick={() => setShowInventory(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            title="Abrir Inventário de Pistas da Aventura"
          >
            <ScrollText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Inventário</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 text-[10px] font-black">
              {clues.length}/5
            </span>
          </button>

          <div className="font-outfit text-xs font-semibold flex items-center gap-1" style={{ color: '#7ab648' }}>
            {progress.completed ? (
              <>
                <span>7/7</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              </>
            ) : (
              `${maxUnlocked > 7 ? 7 : maxUnlocked - 1}/7`
            )}
          </div>

          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-cinzel font-bold"
            style={{ background: '#141c10', borderColor: '#2e471d', border: '1px solid #2e471d', color: '#d4af37' }}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{score.toLocaleString()}</span>
            <span className="text-[9px] text-lime-400">PTS</span>
          </div>
        </div>
      </div>

      {/* ── Map area ── */}
      <div className="flex-1 flex flex-col items-center overflow-y-auto px-4 py-6">
        <div className="w-full max-w-md">

          {/* Zone description */}
          <p className="font-outfit text-xs sm:text-sm mb-4 text-center text-zinc-300 font-medium">
            {currentMapData.description}
          </p>

          {/* Difficulty Selector */}
          <div className="mb-4 flex justify-center">
            <DifficultySelector compact={true} />
          </div>

          {/* Tactical Geolocation Sensor (Requisito Front-End SENAI) */}
          <div className="mb-4">
            <GeolocationRadar />
          </div>

          {/* ── SVG Trail Map ── */}
          <div className="relative w-full" style={{ paddingBottom: '110%' }}>
            <svg
              viewBox="0 0 360 420"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              {/* Subtle grid background */}
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#223318" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="360" height="420" fill="url(#grid)" opacity="0.6"/>

              {/* Dashed trail path */}
              <path
                d={mapPath}
                strokeWidth="2.5"
                strokeDasharray="6 5"
                stroke="#3f6d2b"
                strokeLinecap="round"
                fill="none"
              />

              {/* START marker */}
              <text x="180" y="10" textAnchor="middle" fontSize="10" fill="#a1a1aa" fontFamily="Outfit" fontWeight="bold">
                ▲ INÍCIO
              </text>

              {/* END marker */}
              <text x="180" y="415" textAnchor="middle" fontSize="10" fill="#facc15" fontFamily="monospace" fontWeight="bold">
                BUNKER FINAL
              </text>

              {/* Phase waypoints */}
              {WAYPOINTS.map((wp, i) => {
                const num = i + 1;
                const phase = phases[i];
                const isCompleted = num < maxUnlocked || progress.completed;
                const isCurrent   = num === maxUnlocked && !progress.completed;
                const isLocked    = num > maxUnlocked && !progress.completed;
                const isFinal     = num === 7;

                let fill   = '#182015';
                let stroke = '#3f4f35';
                let textCol = '#a1a1aa';
                if (isCompleted) { fill = '#163815'; stroke = '#22c55e'; textCol = '#4ade80'; }
                if (isCurrent)   { fill = '#2e5820'; stroke = '#86efac'; textCol = '#fef08a'; }

                const r = isCurrent ? 20 : 16;

                return (
                  <g
                    key={num}
                    onClick={() => !isLocked && handlePhaseClick(num)}
                    style={{ cursor: isLocked ? 'default' : 'pointer' }}
                  >
                    {/* pulse ring for current */}
                    {isCurrent && (
                      <circle
                        cx={wp.cx} cy={wp.cy} r={r + 6}
                        fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.6"
                      >
                        <animate attributeName="r" values={`${r+4};${r+12};${r+4}`} dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                      </circle>
                    )}

                    {/* waypoint circle */}
                    <circle
                      cx={wp.cx} cy={wp.cy} r={r}
                      fill={fill} stroke={stroke} strokeWidth="2.5"
                    />

                    {/* icon/number inside */}
                    {isCompleted ? (
                      <text x={wp.cx} y={wp.cy + 4} textAnchor="middle" fontSize="12" fill={textCol} fontFamily="Outfit" fontWeight="bold">
                        OK
                      </text>
                    ) : isLocked ? (
                      <text x={wp.cx} y={wp.cy + 3} textAnchor="middle" fontSize="8" fill="#71717a" fontFamily="monospace" fontWeight="bold">
                        LOCK
                      </text>
                    ) : (
                      <text x={wp.cx} y={wp.cy + 4} textAnchor="middle" fontSize="12" fill={textCol} fontFamily="Cinzel" fontWeight="bold">
                        {num}
                      </text>
                    )}

                    {/* label beside waypoint */}
                    {phase && (
                      <text
                        x={wp.cx + (wp.cx > 180 ? r + 7 : -(r + 7))}
                        y={wp.cy + 4}
                        textAnchor={wp.cx > 180 ? 'start' : 'end'}
                        fontSize="10"
                        fontWeight={isCurrent ? 'bold' : 'normal'}
                        fill={isLocked ? '#9ca3af' : isCompleted ? '#4ade80' : isCurrent ? '#fef08a' : '#e4e4e7'}
                        fontFamily="Outfit"
                      >
                        {phase.title?.length > 15 ? phase.title.slice(0, 14) + '…' : phase.title}
                        {isCompleted && phaseScores[num] ? ` (+${phaseScores[num]}p)` : ''}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── Active phase card ── */}
          {!progress.completed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-lg overflow-hidden"
              style={{ background: '#141a0e', border: '1px solid #2a3a1e' }}
            >
              <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: '#1a2414' }}>
                <div>
                  <span className="font-outfit text-xs font-semibold uppercase tracking-widest" style={{ color: '#4a7c2a' }}>
                    MISSÃO {activePhaseNumber} / 7
                  </span>
                  <h3 className="font-cinzel font-bold text-base mt-0.5" style={{ color: '#d4c9a8' }}>
                    {phases[activePhaseIndex]?.title}
                  </h3>
                  <div className="font-outfit text-xs flex items-center gap-1.5 mt-0.5" style={{ color: '#5a6840' }}>
                    <span>{TYPE_LABEL[phases[activePhaseIndex]?.type] || 'Desafio'}</span>
                    <span>·</span>
                    <span style={{ color: '#b8d870' }}>+{phases[activePhaseIndex]?.reward || 100} moedas</span>
                    <span>·</span>
                    <span style={{ color: '#d4af37' }}>Até +{((phases[activePhaseIndex]?.reward || 100) * 2) + 250} pts</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePhaseClick(activePhaseNumber)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-cinzel font-bold text-sm cursor-pointer transition-all"
                  style={{ background: '#1e3a14', border: '1px solid #4a7c2a', color: '#b8d870' }}
                >
                  ENTRAR
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Progress dots */}
              <div className="px-4 py-2.5 flex items-center gap-1.5">
                {phases.map((_, i) => {
                  const n = i + 1;
                  const done = n < maxUnlocked || progress.completed;
                  const cur  = n === maxUnlocked && !progress.completed;
                  return (
                    <div
                      key={i}
                      className="h-1.5 flex-1 rounded-full"
                      style={{
                        background: done ? '#4a7c2a' : cur ? '#7ab648' : '#1a2014',
                        opacity: cur ? 1 : done ? 0.8 : 0.4,
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Victory card */}
          {progress.completed && (
            <div
              className="mt-4 p-4 rounded-lg text-center border"
              style={{ background: '#0a1208', borderColor: '#2a4a1e' }}
            >
              <p className="font-cinzel font-bold text-base text-lime-400 flex items-center justify-center gap-1.5">
                <Trophy className="w-5 h-5 text-lime-400" />
                <span>Zona Totalmente Concluída!</span>
              </p>
              <p className="font-cinzel font-black text-xl text-amber-300 mt-1">
                {zoneScore.toLocaleString()} PONTOS CONQUISTADOS
              </p>
              <p className="font-outfit text-xs mt-1" style={{ color: '#4a7c2a' }}>
                Todas as 7 missões táticas foram superadas com sucesso.
              </p>
            </div>
          )}

          {/* ── Clues strip ── */}
          {clues.length > 0 && (
            <div className="mt-4 rounded-lg overflow-hidden" style={{ background: '#0a0f08', border: '1px solid #1a2014' }}>
              <div className="px-4 py-2 border-b flex items-center gap-2" style={{ borderColor: '#141a0e' }}>
                <span className="font-outfit text-xs font-bold text-emerald-400">
                  Evidências coletadas
                </span>
                <span className="font-outfit text-xs text-emerald-300 font-semibold">
                  {clues.length}/5
                </span>
              </div>
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {clues.map((clue, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-slate-900 border border-emerald-500/40 text-emerald-200 font-medium shadow-sm"
                  >
                    {clue.icon && <TacticalIcon icon={clue.icon} className="w-3.5 h-3.5 text-amber-400" />}
                    <span className="font-cinzel font-bold text-white">{clue.value || clue.label}</span>
                  </span>
                ))}
                {Array.from({ length: 5 - clues.length }).map((_, i) => (
                  <span
                    key={`empty-${i}`}
                    className="inline-flex items-center px-2.5 py-1 rounded text-xs text-zinc-500 border border-dashed border-zinc-700 bg-zinc-900/50"
                  >
                    ░░░
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal de Inventário Completo (Drag & Drop + Estados) */}
      <InventoryModal
        isOpen={showInventory}
        onClose={() => setShowInventory(false)}
      />
    </div>
  );
}
