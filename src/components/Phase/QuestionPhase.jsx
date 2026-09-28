import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { questionsBank } from '../../data/questions';
import { useGameStore } from '../../store/useGameStore';
import { CheckCircle2, XCircle, Award } from 'lucide-react';

export default function QuestionPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questionData = questionsBank[phase.questionKey] || {
    title: phase.title,
    scenario: phase.description,
    choices: [
      { id: "A", text: "Primeira alternativa" },
      { id: "B", text: "Segunda alternativa (Correta)" },
      { id: "C", text: "Terceira alternativa" },
      { id: "D", text: "Quarta alternativa" }
    ],
    correctAnswer: "B",
    explanation: "Esta é a resposta correta de acordo com as tradições antigas!",
    reward: 120
  };

  const options = questionData.choices || questionData.options || [];

  const handleSelect = (optionId) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
    setIsAnswered(true);

    const correct = optionId === questionData.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        onComplete(questionData.reward || 120, questionData.clueGiven || phase.clue);
      }, 1500);
    } else {
      loseLife();
      setTimeout(() => {
        setIsAnswered(false);
        setSelectedOption(null);
      }, 1600);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full parchment-dark p-5 sm:p-7 rounded-3xl relative overflow-hidden shadow-2xl">
        {/* Glow corner accents */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <span>📜 Enigma de Sabedoria</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200">
            {questionData.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-amber-100/90 leading-relaxed">
            {questionData.scenario || questionData.questionText}
          </p>
        </div>

        {/* Options list */}
        <div className="space-y-3 mt-5">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isThisCorrect = opt.id === questionData.correctAnswer;

            let btnStyle = "bg-slate-900/80 hover:bg-slate-800 border-amber-500/30 text-amber-100";
            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.4)]";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-red-950 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
              }
            }

            return (
              <motion.button
                key={opt.id}
                whileHover={!isAnswered ? { scale: 1.01, x: 4 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                onClick={() => handleSelect(opt.id)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-cinzel font-black text-xs flex items-center justify-center">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Message */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-5 p-4 rounded-2xl border text-xs sm:text-sm ${
              isCorrect
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/60 border-red-500/50 text-red-200'
            }`}
          >
            <div className="font-bold flex items-center gap-2 mb-1">
              {isCorrect ? '✨ Resposta Correta!' : '❌ Ops! Resposta Incorreta (-1 Vida)'}
            </div>
            <p className="text-xs text-amber-100/80">
              {questionData.explanation}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
