import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { phasesData } from '../../data/phases';
import { ScrollText, X, Lock, CheckCircle2, ArrowUp, ArrowDown, GripVertical, Lightbulb, Key, ShieldCheck } from 'lucide-react';
import TacticalIcon from '../Common/TacticalIcon';

export default function InventoryModal({ isOpen, onClose }) {
  const { selectedMap, mapProgress, reorderClues, setActiveScreen } = useGameStore();
  const [draggedIndex, setDraggedIndex] = useState(null);

  if (!isOpen) return null;

  const currentProg = mapProgress[selectedMap] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] };
  const collectedClues = currentProg.cluesCollected || [];
  const mapPhases = phasesData[selectedMap] || [];
  const totalCluesNeeded = 5;

  // Monta a lista completa com os 3 estados exigidos pelo edital do SENAI:
  // Completa, Incompleta e Bloqueada
  const allClueSlots = Array.from({ length: totalCluesNeeded }, (_, idx) => {
    const collected = collectedClues[idx];
    if (collected) {
      return {
        ...collected,
        slotNumber: idx + 1,
        status: 'complete', // Estado Completo
        statusLabel: 'COMPLETA',
      };
    }

    const phaseForSlot = mapPhases[idx];
    const isCurrentPhase = currentProg.maxPhaseUnlocked === idx + 1;

    if (isCurrentPhase) {
      return {
        id: `clue_in_progress_${idx}`,
        title: `Fragmento da Fase ${idx + 1}`,
        value: 'Decodificação em andamento...',
        icon: 'Radio',
        slotNumber: idx + 1,
        status: 'incomplete', // Estado Incompleto
        statusLabel: 'INCOMPLETA',
      };
    }

    return {
      id: `clue_locked_${idx}`,
      title: `Pista Oculta [Fase ${idx + 1}]`,
      value: 'Criptografia de Segurança Bloqueada',
      icon: 'Lock',
      slotNumber: idx + 1,
      status: 'locked', // Estado Bloqueado
      statusLabel: 'BLOQUEADA',
    };
  });

  // Funções de Drag and Drop
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    // Apenas pistas completas coletadas podem ser reorganizadas
    if (draggedIndex < collectedClues.length && targetIndex < collectedClues.length) {
      const updated = [...collectedClues];
      const [moved] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, moved);
      reorderClues(selectedMap, updated);
    }
    setDraggedIndex(null);
  };

  // Funções de Acessibilidade por Teclado
  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= collectedClues.length) return;
    const updated = [...collectedClues];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    reorderClues(selectedMap, updated);
  };

  const completedCount = collectedClues.length;
  const isReadyForFinal = completedCount >= totalCluesNeeded;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Inventário de Pistas da Aventura"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#0c140e] border-2 border-emerald-500/60 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <ScrollText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-cinzel font-black text-zinc-100 flex items-center gap-2">
                  <span>INVENTÁRIO DE PISTAS</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono">
                    {completedCount}/{totalCluesNeeded} COLETADAS
                  </span>
                </h2>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Reorganize com Drag & Drop ou use as setas para preparar o enigma final.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar inventário"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-emerald-950/60 border border-transparent hover:border-emerald-500/30 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader: Estados das pistas explicados */}
          <div className="flex items-center gap-3 my-3 px-3 py-1.5 bg-black/50 border border-emerald-900/50 rounded-xl text-[10px] font-mono text-zinc-300 flex-wrap">
            <span className="text-zinc-500 uppercase font-bold">Legenda de Estados:</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completa
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Incompleta (Em andamento)
            </span>
            <span className="flex items-center gap-1 text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-zinc-600" /> Bloqueada (Fase futura)
            </span>
          </div>

          {/* Lista de Pistas com Drag and Drop */}
          <div
            role="list"
            aria-label="Lista de Pistas Investigativas"
            className="flex-1 overflow-y-auto space-y-2 pr-1 my-1"
          >
            {allClueSlots.map((clue, idx) => {
              const isComplete = clue.status === 'complete';
              const isIncomplete = clue.status === 'incomplete';
              const isLocked = clue.status === 'locked';

              return (
                <div
                  key={clue.id || idx}
                  role="listitem"
                  draggable={isComplete}
                  onDragStart={(e) => isComplete && handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  aria-grabbed={draggedIndex === idx}
                  className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                    isComplete
                      ? 'bg-[#102016] border-emerald-500/60 shadow-md hover:border-emerald-400 cursor-grab active:cursor-grabbing'
                      : isIncomplete
                      ? 'bg-[#1a170b] border-amber-500/50 animate-pulse'
                      : 'bg-[#0a0f0b] border-zinc-800/80 opacity-55'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Drag handle */}
                    {isComplete ? (
                      <div
                        className="text-emerald-500/70 hover:text-emerald-300 cursor-grab shrink-0"
                        title="Arraste para reorganizar"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-4 shrink-0" />
                    )}

                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                        isComplete
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-sm'
                          : isIncomplete
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-600'
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <TacticalIcon
                          icon={clue.icon}
                          className="w-5 h-5 text-current"
                          fallback={<Key className="w-5 h-5 text-current" />}
                        />
                      )}
                    </div>

                    {/* Text info */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-zinc-400">
                          SLOT 0{clue.slotNumber}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded ${
                            isComplete
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : isIncomplete
                              ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                              : 'bg-zinc-900 text-zinc-500 border border-zinc-700'
                          }`}
                        >
                          {clue.statusLabel}
                        </span>
                      </div>
                      <h3 className="font-cinzel font-black text-sm text-zinc-100 truncate mt-0.5">
                        {clue.title}
                      </h3>
                      <p className="text-xs font-mono text-emerald-300 truncate font-bold">
                        {clue.value}
                      </p>
                    </div>
                  </div>

                  {/* Keyboard Reordering Controls (WCAG AA) */}
                  {isComplete && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveItem(idx, -1)}
                        disabled={idx === 0}
                        aria-label={`Mover ${clue.title} para cima`}
                        className="p-1 rounded bg-black/60 hover:bg-emerald-950 border border-emerald-900 text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        title="Subir ordem (Acessibilidade)"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveItem(idx, 1)}
                        disabled={idx >= collectedClues.length - 1}
                        aria-label={`Mover ${clue.title} para baixo`}
                        className="p-1 rounded bg-black/60 hover:bg-emerald-950 border border-emerald-900 text-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        title="Descer ordem (Acessibilidade)"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer: Preparar Solução do Enigma Final (Item 4.5 e 4.6 do edital) */}
          <div className="mt-3 pt-3 border-t border-emerald-500/30 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                {isReadyForFinal
                  ? 'Todas as 5 pistas foram organizadas! Você pode abrir o Enigma Final na Fase 7.'
                  : `Colete mais ${totalCluesNeeded - completedCount} pista(s) nas próximas fases para abrir o cofre.`}
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs transition-colors cursor-pointer shadow-md"
            >
              OK, Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
