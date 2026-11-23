import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { maps } from '../data/maps';
import { Volume2, VolumeX, Music, Settings, Trophy, Coins, Crown, RotateCcw, Award, AlertTriangle, Skull, Target, Star, Check, Play, ArrowRight } from 'lucide-react';
import DifficultySelector from '../components/DifficultySelector';
import TacticalIcon from '../components/Common/TacticalIcon';
import NetworkStatus from '../components/Common/NetworkStatus';

const ROUTES = maps.map(m => ({
  id: m.id,
  label: m.name,
  sub: m.subtitle,
  icon: m.visuals.bannerIcon,
  difficulty: m.difficulty,
}));

export default function Home() {
  const {
    selectedMap,
    setSelectedMap,
    setActiveScreen,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
    mapProgress,
    score,
    coins,
    claimGrandPrize,
    grandPrizeClaimed,
    openGrandPrizeModal,
    openLeaderboardModal,
    startNewGame,
    resetZone,
  } = useGameStore();

  const allZonesCompleted = ['pirates', 'forest', 'temple', 'frozen'].every(id => mapProgress[id]?.completed);

  const currentZoneProg = mapProgress[selectedMap] || { maxPhaseUnlocked: 1, completed: false };
  const hasSavedProgress = Object.values(mapProgress).some(p => p.maxPhaseUnlocked > 1 || p.completed || score > 0);
  const currentPhaseUnlocked = currentZoneProg.completed ? 7 : (currentZoneProg.maxPhaseUnlocked || 1);

  const handleStartNewGame = () => {
    startNewGame();
  };

  const handleResetCurrentZone = () => {
    resetZone(selectedMap);
  };

  const handleStart = () => {
    setActiveScreen('map_overview');
  };

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: '#0d1108' }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 max-w-2xl mx-auto w-full gap-2">
        <div className="flex items-center gap-3">
          <span className="font-cinzel text-xs font-bold tracking-widest" style={{ color: '#4a7c2a' }}>
            ZONA ZERO
          </span>

          {/* Overall Score Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs"
            style={{ background: '#141c10', borderColor: '#2e471d' }}
            title="Pontuação Total"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-cinzel font-bold text-amber-300">
              {score.toLocaleString()} <span className="text-[10px] text-lime-400">PTS</span>
            </span>
          </div>

          {/* Coins Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs"
            style={{ background: '#141c10', borderColor: '#2e471d' }}
            title="Suprimentos (Moedas)"
          >
            <img src="/assets/images/ui/coin.svg" alt="Moedas" className="w-3.5 h-3.5 object-contain inline-block shrink-0" />
            <span className="font-outfit font-bold text-amber-300">
              {coins}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {/* Status PWA Online/Offline */}
          <NetworkStatus />

          {/* Hall of Fame / Recordes */}
          <button
            onClick={openLeaderboardModal}
            className="px-2.5 py-1.5 rounded-lg border text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
            style={{ background: '#141c10', borderColor: '#3e5e26' }}
            title="Ver Histórico de Recordes Salvos"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Recordes</span>
          </button>

          {/* Novo Jogo */}
          <button
            onClick={handleStartNewGame}
            className="px-2.5 py-1.5 rounded-lg border text-xs font-cinzel font-bold text-lime-400 flex items-center gap-1 cursor-pointer transition-colors"
            style={{ background: '#141c10', borderColor: '#2a3a1e' }}
            title="Iniciar Novo Jogo e Zerar Placar (mantendo recordes)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-lime-400" />
            <span className="hidden sm:inline">Novo Jogo</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg transition-colors cursor-pointer"
            style={{ color: soundEnabled ? '#7ab648' : '#3a3a36', background: '#141a0e', border: '1px solid #2a3a1e' }}
            title={soundEnabled ? 'Silenciar' : 'Ativar som'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMusic}
            className="p-1.5 rounded-lg transition-colors cursor-pointer"
            style={{ color: musicEnabled ? '#7ab648' : '#3a3a36', background: '#141a0e', border: '1px solid #2a3a1e' }}
            title={musicEnabled ? 'Pausar música' : 'Ativar música'}
          >
            <Music className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Hero section ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto w-full">

        {/* Title */}
        <div className="text-center mb-6">
          {/* Top Hazard Warning Tape */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/70 text-red-400 text-[11px] font-cinzel font-black tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>PROTOCOLO DEAD AHEAD · INFECÇÃO GLOBAL NÍVEL 5</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Skull className="w-9 h-9 text-emerald-400 drop-shadow-[0_0_12px_#22c55e]" />
            <h1
              className="font-cinzel font-black tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-b from-red-100 via-red-500 to-red-950"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.5))' }}
            >
              DEAD AHEAD
            </h1>
            <AlertTriangle className="w-9 h-9 text-red-500 drop-shadow-[0_0_12px_#ef4444]" />
          </div>

          <div className="text-sm font-cinzel font-bold text-emerald-400 tracking-[0.2em] uppercase mt-1">
            ZONA ZERO · CAÇA AO COFRE DA CURA
          </div>

          <p className="mt-2 font-outfit text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Sobreviva à horda, decifre as coordenadas de quarentena e abra o bunker blindado antes que a munição acabe!
          </p>

          {/* Interactive Zombie Shooter Pill */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-cinzel font-bold shadow-md">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Zumbis na tela?</span>
            <span className="text-amber-300 font-semibold">Clique neles para HEADSHOT (+Moedas)!</span>
          </div>

          {/* horizontal rule */}
          <div className="mx-auto mt-4 h-0.5 w-48" style={{ background: 'linear-gradient(to right, transparent, #ef4444, #22c55e, transparent)' }} />
        </div>

        {/* ── Grand Prize Alert / Completion Banner ── */}
        {allZonesCompleted && (
          <div className="w-full mb-6">
            {!grandPrizeClaimed ? (
              <motion.div
                animate={{ scale: [1, 1.015, 1], boxShadow: ['0 0 15px rgba(212,175,55,0.2)', '0 0 30px rgba(212,175,55,0.5)', '0 0 15px rgba(212,175,55,0.2)'] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                onClick={claimGrandPrize}
                className="p-4 rounded-2xl border-2 flex items-center justify-between gap-3 cursor-pointer shadow-2xl transition-transform hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #382c06 0%, #17240f 100%)',
                  borderColor: '#f4c542'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                    <Crown className="w-7 h-7 text-amber-400 animate-bounce" />
                  </div>
                  <div className="text-left">
                    <div className="font-cinzel font-black text-sm sm:text-base text-amber-200">
                      TODAS AS 4 ZONAS CONCLUÍDAS!
                    </div>
                    <div className="text-xs font-outfit text-lime-300 mt-0.5">
                      Clique aqui para resgatar o <strong>Prêmio Geral</strong> (+5.000 pts / +2.500 moedas) e salvar sua pontuação!
                    </div>
                  </div>
                </div>

                <button
                  className="px-4 py-2.5 rounded-xl font-cinzel font-black text-xs text-slate-950 shrink-0 shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(to right, #f4c542, #ffe082)', border: '1px solid #ffffff' }}
                >
                  RESGATAR →
                </button>
              </motion.div>
            ) : (
              <div
                className="p-3.5 rounded-2xl border flex items-center justify-between flex-wrap gap-3"
                style={{ background: '#121a0e', borderColor: '#3e5e26' }}
              >
                <div className="flex items-center gap-2.5 text-left">
                  <Crown className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <div className="font-cinzel font-bold text-xs sm:text-sm text-lime-300">
                      CAMPANHA ZONA ZERO CONCLUÍDA & SALVA!
                    </div>
                    <div className="text-[11px] font-outfit text-amber-300/80">
                      Pontuação final arquivada com sucesso no Hall da Fama.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openLeaderboardModal}
                    className="px-3 py-1.5 rounded-xl border text-xs font-cinzel font-bold text-amber-300 cursor-pointer transition-colors flex items-center gap-1"
                    style={{ background: '#1a2414', borderColor: '#5a4515' }}
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Recordes</span>
                  </button>
                  <button
                    onClick={handleStartNewGame}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-cinzel font-black text-slate-950 cursor-pointer shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-1"
                    style={{ background: 'linear-gradient(to right, #7ab648, #b8d870)' }}
                  >
                    <span>Novo Jogo</span>
                    <RotateCcw className="w-3 h-3 text-slate-950" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Route selection ── */}
        <div className="w-full mb-6">
          <p className="font-outfit text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#4a7c2a' }}>
            Escolha sua zona
          </p>
          <div className="space-y-2">
            {ROUTES.map((route) => {
              const isSelected = selectedMap === route.id;
              const prog = mapProgress[route.id] || { maxPhaseUnlocked: 1, completed: false, phaseScores: {} };
              const done = prog.completed;
              const phaseScores = prog.phaseScores || {};
              const rawZoneScore = Object.values(phaseScores).reduce((a, b) => a + b, 0);
              const zoneScore = rawZoneScore > 0 ? rawZoneScore : (done ? 1400 : 0);
              const phasesCompleted = done ? 7 : Math.max(0, (prog.maxPhaseUnlocked || 1) - 1);

              return (
                <motion.button
                  key={route.id}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedMap(route.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-left"
                  style={{
                    background: isSelected ? '#1a2e14' : '#141a0e',
                    border: isSelected ? '1px solid #4a7c2a' : '1px solid #1e2618',
                    borderLeft: isSelected ? '3px solid #7ab648' : '3px solid transparent',
                  }}
                >
                  {/* icon */}
                  <div className="shrink-0" style={{ opacity: isSelected ? 1 : 0.6 }}>
                    <TacticalIcon icon={route.icon} className="w-5 h-5 text-amber-400" />
                  </div>

                  {/* text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-cinzel font-bold text-sm truncate"
                        style={{ color: isSelected ? '#d4c9a8' : '#5a5848' }}
                      >
                        {route.label}
                      </span>
                      {done && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1" style={{ background: '#1a2e14', color: '#7ab648', border: '1px solid #2a4a1e' }}>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Concluída</span>
                        </span>
                      )}
                      {zoneScore > 0 && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded font-outfit flex items-center gap-1"
                          style={{ background: '#252010', color: '#d4af37', border: '1px solid #5a4515' }}
                        >
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{zoneScore.toLocaleString()} pts</span>
                        </span>
                      )}
                    </div>
                    <span className="font-outfit text-xs" style={{ color: '#3a3830' }}>
                      {route.difficulty} · {route.sub} {phasesCompleted > 0 && !done ? ` · ${phasesCompleted}/7 fases` : ''}
                    </span>
                  </div>

                  {/* radio indicator */}
                  <div
                    className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: isSelected ? '#7ab648' : '#2a3a1e',
                      background: isSelected ? '#4a7c2a' : 'transparent',
                    }}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#b8d870' }} />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Difficulty Selector ── */}
        <div className="mb-4">
          <DifficultySelector />
        </div>

        {/* ── CTA: Iniciar / Continuar Progresso (Requisito OBR SENAI Pág 5) ── */}
        <div className="w-full space-y-2.5">
          {hasSavedProgress ? (
            <>
              {/* Botão de Continuar Progresso */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="w-full py-3.5 rounded-xl font-cinzel font-bold text-base cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg"
                style={{
                  background: 'linear-gradient(to right, #1e3a14, #2a521c)',
                  border: '2px solid #7ab648',
                  color: '#b8d870',
                  letterSpacing: '0.08em',
                }}
              >
                <Play className="w-4 h-4 text-lime-400 fill-lime-400" />
                <span>CONTINUAR PROGRESSO (FASE {currentPhaseUnlocked})</span>
                <ArrowRight className="w-4 h-4 text-lime-400" />
              </motion.button>

              {/* Botão Secundário para Reiniciar / Nova Jornada */}
              <div className="flex gap-2 flex-wrap">
                {currentZoneProg.completed && (
                  <button
                    onClick={handleResetCurrentZone}
                    className="flex-1 py-2 px-3 rounded-xl font-cinzel font-semibold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300"
                    title="Reiniciar apenas as fases desta zona concluída"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rejogar Zona Atual</span>
                  </button>
                )}

                <button
                  onClick={handleStartNewGame}
                  className="flex-1 py-2 px-3 rounded-xl font-cinzel font-semibold text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5 bg-black/40 hover:bg-black/70 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  title="Reiniciar todas as zonas e zerar a pontuação da campanha"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Novo Jogo (Reset Total)</span>
                </button>
              </div>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full py-3.5 rounded-xl font-cinzel font-bold text-base cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg"
              style={{
                background: 'linear-gradient(to right, #1e3a14, #2a521c)',
                border: '1px solid #4a7c2a',
                color: '#b8d870',
                letterSpacing: '0.08em',
              }}
            >
              <Play className="w-4 h-4 text-lime-400 fill-lime-400" />
              <span>INICIAR AVENTURA</span>
              <ArrowRight className="w-4 h-4 text-lime-400" />
            </motion.button>
          )}
        </div>

        {/* Divider + secondary links */}
        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={() => setActiveScreen('character_select')}
            className="font-outfit text-xs cursor-pointer transition-colors"
            style={{ color: '#3a3830' }}
            onMouseOver={e => e.target.style.color = '#7a7060'}
            onMouseOut={e => e.target.style.color = '#3a3830'}
          >
            Mudar sobrevivente
          </button>
          <span style={{ color: '#1e2618' }}>·</span>
          <button
            onClick={() => setActiveScreen('character_edit')}
            className="font-outfit text-xs cursor-pointer transition-colors"
            style={{ color: '#3a3830' }}
            onMouseOver={e => e.target.style.color = '#7a7060'}
            onMouseOut={e => e.target.style.color = '#3a3830'}
          >
            Personalizar
          </button>
          <span style={{ color: '#1e2618' }}>·</span>
          <button
            onClick={openLeaderboardModal}
            className="font-outfit text-xs cursor-pointer transition-colors flex items-center gap-1"
            style={{ color: '#7a7060' }}
            onMouseOver={e => e.target.style.color = '#d4af37'}
            onMouseOut={e => e.target.style.color = '#7a7060'}
          >
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>Hall de Recordes</span>
          </button>
          <span style={{ color: '#1e2618' }}>·</span>
          <button
            onClick={handleStartNewGame}
            className="font-outfit text-xs cursor-pointer transition-colors flex items-center gap-1"
            style={{ color: '#7a7060' }}
            onMouseOver={e => e.target.style.color = '#b8d870'}
            onMouseOut={e => e.target.style.color = '#7a7060'}
          >
            <RotateCcw className="w-3 h-3 text-lime-400" />
            <span>Novo Jogo</span>
          </button>
        </div>
      </div>

      {/* ── Bottom status bar ── */}
      <div className="px-4 pb-4 max-w-2xl mx-auto w-full">
        <div
          className="flex items-center justify-center gap-1 py-2 rounded-lg"
          style={{ background: '#0a0f08', border: '1px solid #1a2014' }}
        >
          <span className="text-xs" style={{ color: '#2a4a1e' }}>
            ● Servidor de emergência ativo
          </span>
          <span className="font-outfit text-xs" style={{ color: '#1e2618' }}>
            · 4 zonas mapeadas · Transmissão segura
          </span>
        </div>
      </div>
    </div>
  );
}
