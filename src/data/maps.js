export const maps = [
  {
    id: "pirates",
    name: "Terminal Urbano Infectado",
    subtitle: "Distrito Central · Ruas Sob Quarentena",
    description: "Prédios abandonados com janelas estilhaçadas e carcaças de viaturas queimadas. A horda bloqueia o cruzamento principal. Rastreie os nós de comunicação das antenas de emergência antes que os infectados fechem o cerco.",
    theme: "pirates",
    soundtrack: "pirates",
    primaryColor: "#475569",
    accentColor: "#991b1b",
    badge: "Zona Urbana Crítica",
    icon: "Compass",
    particleTheme: "pirates",
    difficulty: "Iniciante",
    flavor: "O asfalto está coberto de vidro quebrado e sangue coagulado. Não corra: o som de sola em concreto atrai tudo em um raio de cem metros.",
    visuals: {
      bgGradient: "from-[#0c0f12] via-[#15191f] to-[#0c0f12]",
      cardBorder: "border-zinc-800/80",
      accentGlow: "rgba(153, 27, 27, 0.3)",
      bannerIcon: "Building2"
    },
    cluesRequired: 5
  },
  {
    id: "forest",
    name: "Bosque Contaminado",
    subtitle: "Mata Fechada · Pântano & Carcaças",
    description: "Trilhas tomadas por névoa densa com odor de decomposição e esporos tóxicos. Criaturas mutadas e outros sobreviventes armados rondam a escuridão. Encontre o bunker dos pesquisadores antes do anoitecer.",
    theme: "forest",
    soundtrack: "forest",
    primaryColor: "#14532d",
    accentColor: "#4ade80",
    badge: "Zona Silvestre Tóxica",
    icon: "Trees",
    particleTheme: "forest",
    difficulty: "Intermediário",
    flavor: "Galhos estalando a vinte metros. Não é o vento. Aponte a lanterna e mantenha o dedo fora do gatilho até ter certeza do que está vindo.",
    visuals: {
      bgGradient: "from-[#07130a] via-[#0d1f11] to-[#07130a]",
      cardBorder: "border-emerald-950/80",
      accentGlow: "rgba(20, 83, 45, 0.35)",
      bannerIcon: "Trees"
    },
    cluesRequired: 5
  },
  {
    id: "temple",
    name: "Hospital de Quarentena",
    subtitle: "Alas Isoladas · Necrotério & Subsolo",
    description: "O epicentro da primeira onda de contaminação. Corredores cobertos de plástico amarelo rasgado, macas tombadas e manchas secas de sangue. O laboratório subterrâneo guarda dados que a força de contenção tentou queimar.",
    theme: "temple",
    soundtrack: "temple",
    primaryColor: "#7f1d1d",
    accentColor: "#ef4444",
    badge: "Contaminação Nível 4",
    icon: "Landmark",
    particleTheme: "temple",
    difficulty: "Avançado",
    flavor: "O cheiro de necrotério e água sanitária seca embrulha o estômago. Portas lacradas com correntes pesadas guardam o que sobrou dos primeiros pacientes.",
    visuals: {
      bgGradient: "from-[#140808] via-[#210c0c] to-[#140808]",
      cardBorder: "border-red-950/80",
      accentGlow: "rgba(127, 29, 29, 0.4)",
      bannerIcon: "Hospital"
    },
    cluesRequired: 5
  },
  {
    id: "frozen",
    name: "Bunker Militar Selado",
    subtitle: "Instalação Subterrânea · Câmaras Blindadas",
    description: "Instalação militar nas profundezas do relevo rochoso. Sistemas autônomos operando com geradores a diesel quase sem combustível. Para romper o lacre das portas blindadas, é preciso sincronizar as frequências de resgate.",
    theme: "frozen",
    soundtrack: "frozen",
    primaryColor: "#1e293b",
    accentColor: "#38bdf8",
    badge: "Instalação Militar Restrita",
    icon: "Snowflake",
    particleTheme: "frozen",
    difficulty: "Extremo",
    flavor: "Uma transmissão em loop no rádio quebrado: 'Se ainda houver alguém vivo nessa frequência... fechem as portas por dentro. Eles aprenderam a usar ferramentas.'",
    visuals: {
      bgGradient: "from-[#080d14] via-[#0f172a] to-[#080d14]",
      cardBorder: "border-slate-800/80",
      accentGlow: "rgba(30, 41, 59, 0.4)",
      bannerIcon: "ShieldAlert"
    },
    cluesRequired: 5
  }
];
