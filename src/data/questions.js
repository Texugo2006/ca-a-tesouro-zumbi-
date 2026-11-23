export const questionsBank = {
  pirates_2: [
    {
      id: "pirates_q2_1",
      title: "Triagem Balística & Furtividade Urbana",
      scenario: "Um espreitador blindado de 2 metros ronda o beco à frente farejando cartuchos quentes. O que você faz antes que ele vire o pescoço?",
      options: [
        { id: "A", text: "Descarregar o fuzil de assalto no tórax da criatura em rajada contínua" },
        { id: "B", text: "Congelar o passo, usar a sombra do contêiner e cortar a garganta por trás com lâmina silenciosa" },
        { id: "C", text: "Jogar uma granada de impacto no meio da rua para assustá-lo" },
        { id: "D", text: "Correr gritando pelo meio da avenida disparando sinalizadores luminosos" }
      ],
      correctAnswer: "B",
      explanation: "Disparos sem supressor na zona urbana reverberam por quilômetros atraindo corredores vorazes. Em combate corpo a corpo tático, o aço frio e a sombra são sua única garantia de não virar carcaça.",
      reward: 120,
      penalty: 1,
      clueGiven: {
        id: "clue_pirates_2",
        type: "word",
        label: "Código Alfa",
        value: "AVANTE",
        icon: "📜"
      }
    },
    {
      id: "pirates_q2_2",
      title: "Protocolo de Ruptura de Barricada",
      scenario: "O sonar perimétrico aponta uma matilha de infectados velozes correndo pelo asfalto em direção ao posto avançado. Como fortificar a posição antes do impacto?",
      options: [
        { id: "A", text: "Ativar a concertina de arame eletrificado, armar minas direcionais Claymore e recuar para a elevação de fogo" },
        { id: "B", text: "Abrir os portões principais e disparar pistolas calibre .22 em campo aberto" },
        { id: "C", text: "Subir no capô de uma van de entregas batendo panelas para chamar atenção" },
        { id: "D", text: "Esconder-se embaixo de caixas de papelão úmidas no meio da via expressa" }
      ],
      correctAnswer: "A",
      explanation: "Em invasões de alta velocidade, a concertina retarda o avanço das hordas enquanto a elevação permite fogo supressivo com cobertura balística.",
      reward: 120,
      penalty: 1,
      clueGiven: {
        id: "clue_pirates_2",
        type: "word",
        label: "Código Alfa",
        value: "AVANTE",
        icon: "📜"
      }
    },
    {
      id: "pirates_q2_3",
      title: "Extração de Ferido sob Fogo Cruzado",
      scenario: "Um recruta da SWAT caiu baleado na perna no meio do cruzamento aberto e infectados rastejantes estão se aproximando dele a 10 metros. Qual a manobra tática de resgate?",
      options: [
        { id: "A", text: "Abandonar o recruta imediatamente e fugir correndo sem prestar socorro" },
        { id: "B", text: "Avançar de pé no meio da rua sem fumaça gritando pelo companheiro" },
        { id: "C", text: "Lançar granada de fumaça densa de fósforo, dar cobertura com tiros supressores e arrastar o recruta pela alça de resgate do colete" },
        { id: "D", text: "Aguardar 30 minutos até anoitecer sem fazer nenhuma ação" }
      ],
      correctAnswer: "C",
      explanation: "Cortinas de fumaça quebram a linha de visão de atiradores e mutantes visuais, permitindo a extração rápida com alça tática drag-handle.",
      reward: 120,
      penalty: 1,
      clueGiven: {
        id: "clue_pirates_2",
        type: "word",
        label: "Código Alfa",
        value: "AVANTE",
        icon: "📜"
      }
    }
  ],

  forest_4: [
    {
      id: "forest_q4_1",
      title: "Neuro-Patologia da Mutação Z-28",
      scenario: "Seu companheiro de esquadrão foi arranhado há 15 minutos. Ele começa a apresentar delírio febril, saliva espumosa e midríase ocular. Qual é o protocolo de contenção imediato?",
      options: [
        { id: "A", text: "Imobilizar os membros com lacres táticos, aplicar torniquete hemostático e isolá-lo antes do espasmo fatal" },
        { id: "B", text: "Dar dois analgésicos e deixá-lo vigiar a retaguarda com um rifle carregado" },
        { id: "C", text: "Lavar o ferimento com água doce do riacho e ignorar as convulsões" },
        { id: "D", text: "Fazer uma fogueira alta para mantê-lo aquecido" }
      ],
      correctAnswer: "A",
      explanation: "A cepa Z-28 atinge o bulbo raquidiano em menos de 25 minutos. Hesitar em imobilizar ou neutralizar um aliado infectado é o motivo de 90% dos pelotões terem sido aniquilados por dentro.",
      reward: 140,
      penalty: 1,
      clueGiven: {
        id: "clue_forest_4",
        type: "word",
        label: "Código Químico",
        value: "RAÍZES",
        icon: "🌿"
      }
    },
    {
      id: "forest_q4_2",
      title: "Vazamento de Toxinas Esporíferas",
      scenario: "Ao cruzar a estufa de quarentena, o visor do seu respirador começa a embaçar e o sensor acusa saturação por névoa cáustica. Qual o procedimento de emergência?",
      options: [
        { id: "A", text: "Arrancar a máscara para respirar o ar do pântano a plenos pulmões" },
        { id: "B", text: "Conectar o cilindro de ar puro reserva, acionar a purga positiva e lacrar as bordas com fita de vedação militar" },
        { id: "C", text: "Molhar a máscara na poça de esgoto químico para limpar o vidro" },
        { id: "D", text: "Bater o filtro contra as árvores para tentar soltar os esporos" }
      ],
      correctAnswer: "B",
      explanation: "Sistemas de pressão positiva impedem a entrada de esporos corrosivos, mantendo o fluxo de oxigênio estéril até a evacuação da área contaminada.",
      reward: 140,
      penalty: 1,
      clueGiven: {
        id: "clue_forest_4",
        type: "word",
        label: "Código Químico",
        value: "RAÍZES",
        icon: "🌿"
      }
    },
    {
      id: "forest_q4_3",
      title: "Coleta da Cultura Fúngica Mutante",
      scenario: "A Dra. Silvestre precisa de uma amostra pura de cogumelo bioluminescente que cresce sobre carcaças mutantes. Como extrair o tecido sem contaminação?",
      options: [
        { id: "A", text: "Arrancar o cogumelo com as mãos desprotegidas e guardar no bolso da calça" },
        { id: "B", text: "Queimar a carcaça com querosene e recolher os restos carbonizados" },
        { id: "C", text: "Morder um pedaço para testar se é venenoso" },
        { id: "D", text: "Utilizar pinças cirúrgicas esterilizadas com álcool isopropílico e armazenar em tubo criogênico hermético" }
      ],
      correctAnswer: "D",
      explanation: "Contaminação cruzada destrói o princípio ativo antiviral. O isolamento criogênico estéril é obrigatório para pesquisas virológicas de campo.",
      reward: 140,
      penalty: 1,
      clueGiven: {
        id: "clue_forest_4",
        type: "word",
        label: "Código Químico",
        value: "RAÍZES",
        icon: "🌿"
      }
    }
  ],

  temple_6: [
    {
      id: "temple_q6_1",
      title: "Guerra Bacteriológica & Bio-Segurança",
      scenario: "A câmara fria do necrotério rompeu e uma névoa espessa com esporos biológicos de Cepa Alpha está vazando pelo duto de ventilação. Qual é o único procedimento que impede a liquefação pulmonar?",
      options: [
        { id: "A", text: "Cobrir a boca com um pano seco e respirar devagar" },
        { id: "B", text: "Selar a máscara MOPP nível 4 com filtro carvão-HEPA e injetar atropina profilática no músculo femoral" },
        { id: "C", text: "Ligar os ventiladores comuns de teto para espalhar o gás" },
        { id: "D", text: "Beber água sanitária pura para esterilizar a garganta" }
      ],
      correctAnswer: "B",
      explanation: "Esporos virais militarizados penetram alvéolos pulmonares por osmose. Filtros de carvão ativado com pressão positiva MOPP-4 e atropina intramuscular são a única linha entre respiração e hemorragia interna.",
      reward: 160,
      penalty: 1,
      clueGiven: {
        id: "clue_temple_6",
        type: "word",
        label: "Composto da Cura",
        value: "SOLARIS",
        icon: "☀️"
      }
    },
    {
      id: "temple_q6_2",
      title: "Neutralização de Cobaia Reanimada",
      scenario: "Um infectado de 200 kg com placas dérmicas calcificadas desperta na mesa de autópsia e rompe os grilhões de aço. Em qual ponto anatômico disparar para imobilização?",
      options: [
        { id: "A", text: "Articulações patelares (joelhos) e forame magno na base occipital para anular a coordenação locomotora" },
        { id: "B", text: "No abdômen para tentar perfurar o estômago" },
        { id: "C", text: "Nas solas dos pés para fazer cócegas na criatura" },
        { id: "D", text: "Disparar para o alto no teto de gesso" }
      ],
      correctAnswer: "A",
      explanation: "A destruição da articulação dos joelhos neutraliza o avanço físico, enquanto o disparo no forame magno secciona o tronco encefálico.",
      reward: 160,
      penalty: 1,
      clueGiven: {
        id: "clue_temple_6",
        type: "word",
        label: "Composto da Cura",
        value: "SOLARIS",
        icon: "☀️"
      }
    },
    {
      id: "temple_q6_3",
      title: "Descontaminação de Fluidos Virais",
      scenario: "Um frasco de sangue mutagênico concentrado estourou na câmara pressurizada e respingou nas luvas de proteção. Qual o protocolo de esterilização?",
      options: [
        { id: "A", text: "Secar as luvas esfregando-as na própria jaqueta militar" },
        { id: "B", text: "Lamber as pontas dos dedos para checar o gosto do vírus" },
        { id: "C", text: "Submergir as luvas em solução de hipoclorito a 10% por 120 segundos antes do descarte no tambor de risco biológico" },
        { id: "D", text: "Ignorar e continuar manuseando munições com as mãos sujas de sangue" }
      ],
      correctAnswer: "C",
      explanation: "Hipoclorito concentrado com tempo de contato suficiente degrada o capsídeo proteico do vírus, impedindo infecção secundária por contato dérmico.",
      reward: 160,
      penalty: 1,
      clueGiven: {
        id: "clue_temple_6",
        type: "word",
        label: "Composto da Cura",
        value: "SOLARIS",
        icon: "☀️"
      }
    }
  ],

  frozen_4: [
    {
      id: "frozen_q4_1",
      title: "Crioterapia & Estabilização Termonuclear",
      scenario: "O reator da base ártica está em colapso térmico enquanto a horda força as blindagens externas. Por que a amostra-mãe do antídoto neural exige criogenia a -80°C sob nitrogênio líquido?",
      options: [
        { id: "A", text: "Para evitar a desnaturação da cadeia polipeptídica sintética e frear mutações catastróficas do vetor" },
        { id: "B", text: "Porque os carniçais odeiam o cheiro de gelo seco" },
        { id: "C", text: "Para economizar combustível do gerador diesel reserva" },
        { id: "D", text: "Para transformar a vacina em projéteis de gelo" }
      ],
      correctAnswer: "A",
      explanation: "Em temperaturas superiores a -70°C, os ligantes nanogenéticos entram em autofagia e o antídoto se degenera em uma toxina neuroparalisante letal em questão de segundos.",
      reward: 150,
      penalty: 1,
      clueGiven: {
        id: "clue_frozen_4",
        type: "word",
        label: "Frequência de Acesso",
        value: "AURORA",
        icon: "🌌"
      }
    },
    {
      id: "frozen_q4_2",
      title: "Prevenção de Hipotermia Severa",
      scenario: "Ao reparar as antenas externas sob nevasca de -50°C, a temperatura corporal do operador cai para 31°C e ele perde a fala e o reflexo motor. Qual a conduta correta de reaquecimento?",
      options: [
        { id: "A", text: "Colocá-lo diretamente sob a chama aberta de um maçarico industrial" },
        { id: "B", text: "Remover roupas úmidas, aplicar mantas térmicas aluminizadas reflexivas e aquecer o tronco central com bolsas térmicas a 42°C" },
        { id: "C", text: "Jogar baldes de água gelada para forçar o corpo a tremer" },
        { id: "D", text: "Forçá-lo a correr na tempestade para gerar calor muscular" }
      ],
      correctAnswer: "B",
      explanation: "Reaquecimento brusco periférico causa 'choque de desaquecimento' por retorno de sangue frio e acidótico ao coração. O aquecimento gradual do tronco é vital.",
      reward: 150,
      penalty: 1,
      clueGiven: {
        id: "clue_frozen_4",
        type: "word",
        label: "Frequência de Acesso",
        value: "AURORA",
        icon: "🌌"
      }
    },
    {
      id: "frozen_q4_3",
      title: "Procedimento de Corte do Reator Nuclear (SCRAM)",
      scenario: "A temperatura do núcleo de fissão ultrapassa 1.200°C e o sistema automático falhou. Qual a sequência manual para impedir derretimento do silo polar?",
      options: [
        { id: "A", text: "Jogar óleo diesel dentro da câmara do reator para lubrificar as barras" },
        { id: "B", text: "Bater na carcaça de chumbo com marreta de aço" },
        { id: "C", text: "Inserir manualmente as barras de controle de boro até o fundo e ativar as bombas de injeção de água borada de alta pressão" },
        { id: "D", text: "Desligar todos os disjuntores e deixar o núcleo queimar sozinho" }
      ],
      correctAnswer: "C",
      explanation: "Barras de boro absorvem nêutrons térmicos interrompendo a reação em cadeia de fissão, e a injeção borada resfria o núcleo impedindo a fusão catastrófica.",
      reward: 150,
      penalty: 1,
      clueGiven: {
        id: "clue_frozen_4",
        type: "word",
        label: "Frequência de Acesso",
        value: "AURORA",
        icon: "🌌"
      }
    }
  ]
};
