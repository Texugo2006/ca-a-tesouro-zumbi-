/**
 * Adapts phase configurations based on player difficulty:
 * - easy:   More lenient tolerances, fewer wires, hints visible, 5 lives, 1.0x score
 * - normal: Balanced tactical challenges, standard parameters, 3 lives, 1.5x score
 * - hard:   Narrow tolerances, 6 wires, extra decoys, 2 lives, 2.5x score
 */
export function adaptPhaseForDifficulty(phase, difficulty = 'normal') {
  if (!phase) return phase;

  // Deep clone phase to avoid mutating raw data
  const p = JSON.parse(JSON.stringify(phase));

  switch (p.type) {
    case 'wire_cutter': {
      if (difficulty === 'easy') {
        const correct = p.correctWire || 'green';
        const otherOptions = ['red', 'blue', 'yellow'].filter(c => c !== correct);
        p.wires = [otherOptions[0], correct, otherOptions[1]].filter(Boolean);
        p.riddle = `[PROTOCOLO RECRUTA] Dispositivo com voltagem estabilizada e número reduzido de fios. Consulte a pista com calma antes de cortar.`;
      } else if (difficulty === 'hard') {
        p.wires = ['red', 'blue', 'yellow', 'green', 'white', 'purple'];
        p.riddle = `[ZONA ZERO · HARDCORE] ${p.riddle} AVISO: Micro-oscilações no detonador. Fio errado causa detonação instantânea.`;
      }
      break;
    }

    case 'frequency': {
      if (difficulty === 'easy') {
        p.minFreq = Math.max(60, Math.round(p.targetFreq - 12));
        p.maxFreq = Math.min(130, Math.round(p.targetFreq + 12));
        p.tolerance = 0.35; // Easy lock window
        p.description = `${p.description} (Radar auxiliar travado na faixa de ${Math.floor(p.targetFreq)} MHz)`;
      } else if (difficulty === 'hard') {
        p.minFreq = Math.max(50, Math.round(p.targetFreq - 30));
        p.maxFreq = Math.min(150, Math.round(p.targetFreq + 30));
        p.tolerance = 0.06; // Hardcore precision needed
        p.description = `[ZONA ZERO · SINAL ULTRA-INSTÁVEL] ${p.description}`;
      } else {
        p.tolerance = 0.15;
      }
      break;
    }

    case 'triage': {
      if (difficulty === 'easy' && p.survivors && p.survivors.length > 2) {
        const correct = p.survivors.find(s => s.isCorrect);
        const wrong = p.survivors.find(s => !s.isCorrect);
        p.survivors = [correct, wrong].filter(Boolean);
        p.briefing = `[PROTOCOLO RECRUTA] Triagem simplificada entre 2 sobreviventes. Escolha quem tem sangue limpo.`;
      } else if (difficulty === 'hard' && p.survivors) {
        p.briefing = `[ZONA ZERO · TRIAGEM DE EMERGÊNCIA MÁXIMA] ${p.briefing}`;
      }
      break;
    }

    case 'coordinates': {
      if (difficulty === 'easy') {
        p.gridSize = 5;
        p.targetCoord = {
          x: Math.min(p.targetCoord?.x || 3, 5),
          y: Math.min(p.targetCoord?.y || 3, 5),
        };
        p.highlightSector = true;
      } else if (difficulty === 'hard') {
        p.gridSize = 7;
        p.targetCoord = {
          x: Math.min(p.targetCoord?.x || 3, 7),
          y: Math.min(p.targetCoord?.y || 3, 7),
        };
      } else {
        p.gridSize = 6;
      }
      break;
    }

    case 'symbol_puzzle': {
      if (difficulty === 'easy') {
        if (p.targetSequence && p.targetSequence.length > 3) {
          p.targetSequence = p.targetSequence.slice(0, 3);
          p.symbols = p.symbols.filter(s => p.targetSequence.includes(s.id));
        }
      } else if (difficulty === 'hard') {
        if (p.symbols && p.symbols.length === 4) {
          p.symbols.push({ id: 'decoy', label: 'Relé Danificado', icon: 'AlertTriangle' });
        }
      }
      break;
    }

    case 'difference': {
      if (difficulty === 'easy') {
        p.description = `${p.description} — [SENSOR ÓPTICO: Verifique os detalhes do selo de integridade com atenção].`;
      } else if (difficulty === 'hard') {
        p.description = `[ZONA ZERO · ALERTA CRÍTICO] ${p.description} Examine com atenção máxima: um falso positivo condena a base.`;
      }
      break;
    }

    case 'path_choice': {
      // Keep titles clean without spoiling answers
      break;
    }

    default:
      break;
  }

  // Multiplier for rewards
  const multMap = { easy: 1.0, normal: 1.5, hard: 2.5 };
  p.reward = Math.round((p.reward || 100) * (multMap[difficulty] || 1.5));
  p.difficultyLevel = difficulty;

  return p;
}
