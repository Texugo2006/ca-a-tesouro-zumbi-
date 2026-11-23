// Operadores táticos para cada uma das 7 fases do jogo
export const PHASE_OPERATORS = {
  1: {
    id: 'kael',
    name: 'Kael "Vanguard"',
    callsign: 'ALPHA-01',
    role: 'Sentinela Tático & Reconhecimento',
    avatar: '/assets/personagems/kael.png',
    color: '#22c55e',
    borderColor: 'border-emerald-500/50',
    quote: 'Varredura de perímetro iniciada. Identifique as coordenadas antes que a horda avance.',
  },
  2: {
    id: 'lyra',
    name: 'Dra. Lyra Vance',
    callsign: 'VIROLOGIA-02',
    role: 'Oficial Científica & Bioquímica',
    avatar: '/assets/personagems/lyra.png',
    color: '#06b6d4',
    borderColor: 'border-cyan-500/50',
    quote: 'Amostras genéticas ativas. Siga o protocolo de biossegurança à risca.',
  },
  3: {
    id: 'shadow',
    name: 'Shadow "Specter"',
    callsign: 'GHOST-03',
    role: 'Infiltrador Fantasma & Demolições',
    avatar: '/assets/personagems/shadow.png',
    color: '#a855f7',
    borderColor: 'border-purple-500/50',
    quote: 'Sem ruído. Corte o circuito exato no tempo limite ou toda a contenção colapsa.',
  },
  4: {
    id: 'redd',
    name: 'Redd "Hammer"',
    callsign: 'HEAVY-04',
    role: 'Engenheiro Balístico & Especialista em Armas',
    avatar: '/assets/personagems/redd.png',
    color: '#f97316',
    borderColor: 'border-orange-500/50',
    quote: 'Sinal de rádio oscilando. Encontre a frequência do esquadrão antes da interferência total.',
  },
  5: {
    id: 'hana',
    name: 'Hana "Radar"',
    callsign: 'SIGINT-05',
    role: 'Operadora de Rádio & Telecomunicações',
    avatar: '/assets/personagems/hana.png',
    color: '#eab308',
    borderColor: 'border-yellow-500/50',
    quote: 'Símbolos táticos detectados nos terminais. Decodifique os glifos de segurança militar.',
  },
  6: {
    id: 'nova',
    name: 'Nova "Medic"',
    callsign: 'RESCUE-06',
    role: 'Médica de Combate & Triagem Forense',
    avatar: '/assets/personagems/nova.png',
    color: '#ec4899',
    borderColor: 'border-pink-500/50',
    quote: 'Análise forense em andamento. Compare as evidências adulteradas com precisão cirúrgica.',
  },
  7: {
    id: 'zira',
    name: 'Comandante Zira',
    callsign: 'OVERLORD-07',
    role: 'Comandante Chefe de Extração',
    avatar: '/assets/personagems/zira.png',
    color: '#ef4444',
    borderColor: 'border-red-500/50',
    quote: 'Helicóptero de extração em aproximação final. Insira todos os dados coletados no cofre blindado!',
  },
};

export function getOperatorForPhase(phaseNumber) {
  const num = Number(phaseNumber) || 1;
  const clamped = ((num - 1) % 7) + 1;
  return PHASE_OPERATORS[clamped] || PHASE_OPERATORS[1];
}
