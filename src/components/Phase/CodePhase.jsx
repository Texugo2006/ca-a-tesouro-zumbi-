import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { KeyRound, Delete, Check, ShieldAlert } from 'lucide-react';

export default function CodePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [inputCode, setInputCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const targetCode = String(phase.targetCode || '34');

  const handleDigit = (digit) => {
    if (isSuccess) return;
    if (inputCode.length >= 4) return;
    setInputCode(prev => prev + digit);
    setErrorMessage(null);
  };

  const handleDelete = () => {
    if (isSuccess) return;
    setInputCode(prev => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleConfirm = () => {
    if (isSuccess) return;
    if (inputCode.length === 0) return;

    if (inputCode === targetCode) {
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        onComplete(phase.reward || 150, phase.clue);
      }, 1400);
    } else {
      loseLife();
      setErrorMessage("Código incorreto! O mecanismo de segurança travou.");
      setTimeout(() => {
        setInputCode('');
        setErrorMessage(null);
      }, 1200);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-5 sm:p-7 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-5">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-cinzel">
            Mecanismo Criptográfico
          </span>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200 mt-1">
            {phase.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            {phase.description}
          </p>
        </div>

        {/* Code Display */}
        <div className="bg-slate-950 border-2 border-amber-500/50 rounded-2xl p-4 mb-5 shadow-inner flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <KeyRound className="w-5 h-5" />
            <span className="text-xs uppercase font-cinzel font-bold">Código:</span>
          </div>

          <div className="font-cinzel text-2xl sm:text-3xl font-black text-amber-300 tracking-[0.25em]">
            {inputCode || <span className="opacity-30">____</span>}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-xs mx-auto mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDigit(String(num))}
              disabled={isSuccess}
              className="py-3 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 rounded-xl font-cinzel font-bold text-lg sm:text-xl text-amber-200 cursor-pointer shadow-md transition-colors"
            >
              {num}
            </motion.button>
          ))}

          {/* Backspace */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            disabled={isSuccess}
            className="py-3 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 rounded-xl text-amber-400 flex items-center justify-center cursor-pointer shadow-md"
            title="Apagar"
          >
            <Delete className="w-5 h-5" />
          </motion.button>

          {/* Zero */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDigit("0")}
            disabled={isSuccess}
            className="py-3 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 rounded-xl font-cinzel font-bold text-lg sm:text-xl text-amber-200 cursor-pointer shadow-md transition-colors"
          >
            0
          </motion.button>

          {/* Confirm */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirm}
            disabled={isSuccess || inputCode.length === 0}
            className={`py-3 rounded-xl font-cinzel font-bold text-sm flex items-center justify-center cursor-pointer shadow-md transition-all ${
              inputCode.length > 0 && !isSuccess
                ? 'gold-gradient-btn text-slate-950'
                : 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Feedback messages */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs text-center font-semibold flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Código exato! A trava de segurança se abriu!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
