import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { Compass, KeyRound, ShieldAlert, Sparkles, Lock, Unlock } from 'lucide-react';

export default function FinalRiddlePhase({ phase, onComplete }) {
  const { loseLife, selectedMap, mapProgress } = useGameStore();

  const reqs = phase.finalRequirements || {
    direction: "OESTE",
    symbol: "trident",
    number: "34",
    word: "AVANTE",
    code: "34"
  };

  const currentClues = mapProgress[selectedMap]?.cluesCollected || [];

  // Player controls
  const [chosenDir, setChosenDir] = useState('NORTE');
  const [chosenSymbol, setChosenSymbol] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [enteredWord, setEnteredWord] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const directions = [
    { id: 'NORTE', label: 'Norte (N)', deg: 0 },
    { id: 'LESTE', label: 'Leste (L)', deg: 90 },
    { id: 'SUL', label: 'Sul (S)', deg: 180 },
    { id: 'OESTE', label: 'Oeste (O)', deg: 270 }
  ];

  const availableSymbols = [
    { id: 'trident', label: 'Tridente', icon: '🔱' },
    { id: 'clover', label: 'Trevo', icon: '🍀' },
    { id: 'eye', label: 'Olho Sagrado', icon: '👁️' },
    { id: 'gem', label: 'Safira Polar', icon: '💎' }
  ];

  const handleUnlockAttempt = () => {
    if (isUnlocked) return;

    const dirMatches = chosenDir === reqs.direction;
    const symMatches = chosenSymbol === reqs.symbol;
    const codeMatches = enteredCode.trim() === (reqs.number || reqs.code);
    const wordMatches = enteredWord.trim().toUpperCase() === reqs.word;

    if (dirMatches && symMatches && (codeMatches || !reqs.number) && (wordMatches || !reqs.word)) {
      setIsUnlocked(true);
      setErrorMessage(null);
      sound.playSpecial();

      setTimeout(() => {
        onComplete(phase.reward || 500, { id: 'final_chest', label: 'O Grande Tesouro' });
      }, 1200);
    } else {
      loseLife();

      const errors = [];
      if (!dirMatches) errors.push("Direção da Bússola incorreta");
      if (!symMatches) errors.push("Símbolo Sagrado incorreto");
      if (!codeMatches && reqs.number) errors.push("Número/Código incorreto");
      if (!wordMatches && reqs.word) errors.push("Palavra de Passe incorreta");

      setErrorMessage(`Trava emperrada! Verifique: ${errors.join(', ')}.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2500);
    }
  };

  const currentDirObj = directions.find(d => d.id === chosenDir) || directions[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-5 sm:p-7 rounded-3xl shadow-2xl relative border-2 border-amber-500/80">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-cinzel font-black mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>O Grande Altar Final — Fase 7</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-cinzel font-black text-amber-300">
            {phase.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-amber-100/90 max-w-lg mx-auto">
            {phase.description}
          </p>
        </div>

        {/* Clues Ribbon Helper */}
        <div className="mb-6 p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-cinzel font-bold text-amber-400 flex items-center gap-1.5">
            📜 Suas Pistas Coletadas:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {currentClues.length === 0 ? (
              <span className="text-[11px] text-amber-200/50 italic">Nenhuma pista gravada</span>
            ) : (
              currentClues.map((clue, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-900 border border-amber-500/40 rounded-lg text-[11px] text-amber-200 font-bold flex items-center gap-1"
                >
                  <span>{clue.icon}</span>
                  <span>{clue.value}</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* The 4 Mechanism Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* 1. Golden Compass Rotation */}
          <div className="p-4 bg-slate-950/80 border border-amber-500/40 rounded-2xl flex flex-col items-center text-center">
            <span className="text-xs font-cinzel font-bold text-amber-400 mb-2 flex items-center gap-1">
              <Compass className="w-4 h-4" /> 1. Orientação da Bússola
            </span>

            {/* Rotating compass needle */}
            <div className="relative w-24 h-24 my-2 flex items-center justify-center bg-slate-900 rounded-full border-2 border-amber-500/50 shadow-inner">
              <motion.div
                animate={{ rotate: currentDirObj.deg }}
                transition={{ duration: 0.5, ease: 'backOut' }}
                className="w-1.5 h-16 bg-gradient-to-t from-slate-400 via-amber-400 to-red-500 rounded-full shadow-md"
              />
              <div className="absolute w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-950" />
            </div>

            {/* Direction Selector Buttons */}
            <div className="grid grid-cols-4 gap-1.5 w-full mt-2">
              {directions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setChosenDir(d.id)}
                  className={`py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                    chosenDir === d.id
                      ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                      : 'bg-slate-900 text-amber-200 hover:bg-slate-850'
                  }`}
                >
                  {d.id.slice(0, 1)}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-amber-300/80 mt-1 font-semibold">
              Rumo atual: <strong>{chosenDir}</strong>
            </span>
          </div>

          {/* 2. Sacred Symbol Inlay */}
          <div className="p-4 bg-slate-950/80 border border-amber-500/40 rounded-2xl flex flex-col items-center text-center">
            <span className="text-xs font-cinzel font-bold text-amber-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> 2. Símbolo do Encaixe
            </span>

            <div className="grid grid-cols-2 gap-2 w-full mt-2">
              {availableSymbols.map((sym) => {
                const isSelected = chosenSymbol === sym.id;
                return (
                  <button
                    key={sym.id}
                    onClick={() => setChosenSymbol(sym.id)}
                    className={`p-2.5 rounded-xl border-2 flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(244,197,66,0.5)]'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-amber-500/40'
                    }`}
                  >
                    <span className="text-2xl">{sym.icon}</span>
                    <span className="text-[11px] font-cinzel font-bold">{sym.label}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] text-amber-300/80 mt-2 font-semibold">
              Símbolo escolhido: <strong>{chosenSymbol ? availableSymbols.find(s=>s.id===chosenSymbol)?.label : 'Nenhum'}</strong>
            </span>
          </div>

          {/* 3. Number / Code Dial */}
          <div className="p-4 bg-slate-950/80 border border-amber-500/40 rounded-2xl flex flex-col text-left">
            <span className="text-xs font-cinzel font-bold text-amber-400 mb-2 flex items-center gap-1">
              <KeyRound className="w-4 h-4" /> 3. Código Numérico
            </span>
            <input
              type="text"
              placeholder="Digite o número (ex: 34)"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              className="w-full mt-2 px-3 py-2 bg-slate-900 border border-amber-500/40 rounded-xl font-cinzel font-black text-amber-200 tracking-widest text-center text-lg focus:outline-none focus:border-amber-400"
            />
            <span className="text-[10px] text-amber-200/60 mt-2 italic">
              *O número calculado ou descoberto durante a rota.
            </span>
          </div>

          {/* 4. Secret Word */}
          <div className="p-4 bg-slate-950/80 border border-amber-500/40 rounded-2xl flex flex-col text-left">
            <span className="text-xs font-cinzel font-bold text-amber-400 mb-2 flex items-center gap-1">
              📜 4. Palavra Secreta
            </span>
            <input
              type="text"
              placeholder="Digite a palavra (ex: AVANTE)"
              value={enteredWord}
              onChange={(e) => setEnteredWord(e.target.value.toUpperCase())}
              className="w-full mt-2 px-3 py-2 bg-slate-900 border border-amber-500/40 rounded-xl font-cinzel font-black text-amber-200 tracking-widest text-center text-base uppercase focus:outline-none focus:border-amber-400"
            />
            <span className="text-[10px] text-amber-200/60 mt-2 italic">
              *A palavra-chave transmitida pelos guardiões.
            </span>
          </div>
        </div>

        {/* Master Unlock Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUnlockAttempt}
          disabled={isUnlocked}
          className="w-full py-4 gold-gradient-btn rounded-2xl font-cinzel font-black text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-2xl relative overflow-hidden"
        >
          {isUnlocked ? (
            <>
              <Unlock className="w-6 h-6 text-slate-950" />
              <span>FECHADURA DESARMADA! ABRINDO O BAÚ...</span>
            </>
          ) : (
            <>
              <Lock className="w-6 h-6 text-slate-950" />
              <span>GIRAR O MECANISMO & DESTRANCAR O TESOURO</span>
            </>
          )}
        </motion.button>

        {/* Error Feedback */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs text-center font-semibold flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
