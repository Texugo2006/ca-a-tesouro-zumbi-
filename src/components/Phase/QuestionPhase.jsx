import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionsBank } from '../../data/questions';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { CheckCircle2, XCircle, ShieldAlert, RefreshCw } from 'lucide-react';
import { getOperatorForPhase } from '../../data/operators';

/* ── Guardian data per map — uses real character PNG images ── */
const GUARDIANS = {
  pirates: {
    name: 'Capitão da Quarentena',
    title: 'Veterano das Ruas Infectadas',
    colorAccent: '#ef4444',
    borderColor: 'border-red-500/60',
    bgGlow: 'from-red-950/80 to-slate-950',
    textAccent: 'text-red-400',
    imgSrc: '/assets/personagems/kael.png',
  },
  forest: {
    name: 'Dra. Silvestre',
    title: 'Cientista de Campo & Virologista',
    colorAccent: '#22c55e',
    borderColor: 'border-emerald-500/60',
    bgGlow: 'from-emerald-950/80 to-slate-950',
    textAccent: 'text-emerald-400',
    imgSrc: '/assets/personagems/lyra.png',
  },
  temple: {
    name: 'Médico-Chefe do Necrotério',
    title: 'Perito em Contenção Biológica',
    colorAccent: '#a855f7',
    borderColor: 'border-purple-500/60',
    bgGlow: 'from-purple-950/80 to-slate-950',
    textAccent: 'text-purple-400',
    imgSrc: '/assets/personagems/nova.png',
  },
  frozen: {
    name: 'Comandante do Bunker Polar',
    title: 'Sentinela do Silo de Defesa',
    colorAccent: '#38bdf8',
    borderColor: 'border-sky-500/60',
    bgGlow: 'from-sky-950/80 to-slate-950',
    textAccent: 'text-sky-400',
    imgSrc: '/assets/personagems/shadow.png',
  },
};

/* ── Helper to dynamically prepare question variant & shuffle its options ── */
function prepareQuestion(pool, seed = 0) {
  if (!pool || pool.length === 0) return null;

  // Pick question based on seed
  const qIndex = Math.abs(seed) % pool.length;
  const baseQ = pool[qIndex] || pool[0];

  const originalOptions = baseQ.options || baseQ.choices || [];
  const originalCorrectOpt = originalOptions.find(
    o => o.id === baseQ.correctAnswer || o.isCorrect
  );
  const correctText = originalCorrectOpt ? originalCorrectOpt.text : (originalOptions[0]?.text || '');

  // Shuffle the options array using Fisher-Yates
  const shuffled = [...originalOptions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Re-assign letters A, B, C, D and recalculate new correct letter
  const letters = ['A', 'B', 'C', 'D'];
  let newCorrectLetter = 'A';

  const newOptions = shuffled.map((opt, idx) => {
    const letter = letters[idx] || String.fromCharCode(65 + idx);
    if (opt.text === correctText) {
      newCorrectLetter = letter;
    }
    return {
      id: letter,
      text: opt.text,
      originalId: opt.id
    };
  });

  return {
    ...baseQ,
    options: newOptions,
    choices: newOptions,
    correctAnswer: newCorrectLetter,
    variantIndex: qIndex + 1,
    totalVariants: pool.length
  };
}

export default function QuestionPhase({ phase, onComplete }) {
  const { loseLife, selectedMap, questionSeed } = useGameStore();
  const [selectedId, setSelectedId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const phaseOperator = getOperatorForPhase(phase.phaseNumber || 1);
  const mapGuardian = GUARDIANS[selectedMap] || GUARDIANS.pirates;
  const guardian = {
    ...mapGuardian,
    ...phaseOperator,
    borderColor: phaseOperator.borderColor || mapGuardian.borderColor,
    imgSrc: phaseOperator.avatar || mapGuardian.imgSrc,
  };

  const rawBank = questionsBank[phase.questionKey];
  const questionPool = Array.isArray(rawBank)
    ? rawBank
    : (rawBank?.variants ? rawBank.variants : [rawBank || {
        title: phase.title,
        scenario: phase.description,
        options: [
          { id: 'A', text: 'Primeira alternativa tática' },
          { id: 'B', text: 'Segunda alternativa — protocolo correto' },
          { id: 'C', text: 'Terceira alternativa arriscada' },
          { id: 'D', text: 'Quarta alternativa errada' }
        ],
        correctAnswer: 'B',
        explanation: 'Protocolo de sobrevivência tático validado.',
        reward: 120
      }]);

  // Active question state populated with shuffled answers
  const [questionData, setQuestionData] = useState(() => prepareQuestion(questionPool, questionSeed || 0));

  // Whenever questionSeed changes (e.g. after Game Over & retry), update question and shuffle options
  useEffect(() => {
    const updated = prepareQuestion(questionPool, questionSeed || 0);
    setQuestionData(updated);
    setSelectedId(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [questionSeed, phase.questionKey]);

  const options = questionData?.options || questionData?.choices || [];

  const handleSelect = (opt) => {
    if (isAnswered) return;
    sound.playClick?.();
    setSelectedId(opt.id);
    setIsAnswered(true);

    const correct = opt.id === questionData.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect?.();
      setTimeout(() => {
        onComplete(questionData.reward || 120, questionData.clueGiven || phase.clue);
      }, 1600);
    } else {
      sound.playError?.();
      loseLife();
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedId(null);
      }, 1800);
    }
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Tactical Question Box */}
      <div
        className={`w-full relative rounded-3xl overflow-hidden shadow-2xl border-2 ${guardian.borderColor} p-5 sm:p-7 bg-[#0d140e]`}
      >
        {/* Top: Guardian portrait + Scenario */}
        <div className="flex items-start gap-4 pb-4 mb-4 border-b border-emerald-500/30">
          {/* Guardian portrait */}
          <div
            className={`shrink-0 w-16 h-20 sm:w-20 sm:h-24 border-2 ${guardian.borderColor} rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-md`}
          >
            <img
              src={guardian.imgSrc}
              alt={guardian.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/assets/personagems/kael.png'; }}
            />
          </div>

          {/* Dialogue / Scenario */}
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`font-cinzel font-black text-sm sm:text-base ${guardian.textAccent}`}>
                  {guardian.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium">
                  • {guardian.title}
                </span>
              </div>

              {/* Dynamic Round Badge */}
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1 shadow-sm">
                <RefreshCw className="w-2.5 h-2.5 text-emerald-400" />
                <span>CENÁRIO {questionData?.variantIndex || 1}/{questionData?.totalVariants || 3}</span>
              </span>
            </div>

            <p className="text-zinc-100 text-xs sm:text-sm font-medium leading-relaxed bg-black/50 p-2.5 rounded-xl border border-emerald-500/20">
              "{questionData?.scenario || questionData?.questionText || phase.description}"
            </p>
          </div>
        </div>

        {/* Question Title Header */}
        <div className="mb-4 text-center">
          <span className="text-[11px] font-cinzel font-black tracking-widest text-amber-400 uppercase">
            DESAFIO TÁTICO DE SOBREVIVÊNCIA
          </span>
          <h3 className="text-lg sm:text-xl font-cinzel font-black text-white mt-0.5 drop-shadow-md">
            {questionData?.title || phase.title}
          </h3>
        </div>

        {/* High-Contrast Interactive Options (Shuffled Positions) */}
        <div className="space-y-3">
          {options.map((opt, idx) => {
            const isSelected = selectedId === opt.id;
            const isThisCorrect = opt.id === questionData.correctAnswer;

            let btnStyle = "bg-[#141e15] hover:bg-[#1a281c] border-emerald-500/40 text-white";
            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle = "bg-emerald-950 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(34,197,94,0.5)]";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-red-950 border-red-500 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.5)]";
              }
            }

            return (
              <motion.button
                key={`${opt.id}-${opt.text}`}
                whileHover={!isAnswered ? { scale: 1.015, x: 4 } : {}}
                whileTap={!isAnswered ? { scale: 0.985 } : {}}
                onClick={() => handleSelect(opt)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer shadow-md ${btnStyle}`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className="w-8 h-8 rounded-xl bg-slate-950 border border-emerald-400/60 font-cinzel font-black text-xs sm:text-sm text-emerald-300 flex items-center justify-center shrink-0 shadow-inner"
                  >
                    {letters[idx] || opt.id}
                  </span>
                  <span className="text-zinc-100 font-semibold leading-snug">
                    {opt.text}
                  </span>
                </div>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Message */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm ${
                isCorrect
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100'
                  : 'bg-red-950/90 border-red-500 text-red-100'
              }`}
            >
              <div className="font-bold flex items-center gap-2 mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono uppercase tracking-wider text-emerald-300">Decisão tática correta. Você continua vivo por enquanto.</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span className="font-mono uppercase tracking-wider text-red-400">Decisão suicida! O barulho atraiu rastejadores e você sangrou (-1 Vida).</span>
                  </>
                )}
              </div>
              <p className="text-zinc-200 mt-1 font-outfit">
                {isCorrect
                  ? `"${questionData?.explanation} Não baixe a guarda. Guarde o fôlego para o que vem a seguir."`
                  : `"Idiota! ${questionData?.explanation} Os infectados estão quebrando as barricadas lá fora!"`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
