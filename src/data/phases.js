export const phasesData = {
  pirates: [
    {
      id: 1,
      phaseNumber: 1,
      mapId: "pirates",
      type: "coordinates",
      title: "Varredura de Satélite Militar: Coordenada de Suprimentos",
      subtitle: "Setor Urbano 01 · Triangulação do Droppack",
      description: "O sensor tático interceptou o sinal de um container de fuzis e munição 7.62mm arremessado antes do colapso da barreira. A horda se aglomera no perímetro.",
      instructions: "Analise a grade tática e trave a mira no quadrante de evacuação: Coluna 3 (C), Linha 4.",
      targetCoord: { x: 3, y: 4 },
      gridSize: 6,
      clue: {
        id: "clue_p1",
        type: "coord",
        title: "Ponto de Extração",
        value: "34° Oeste",
        icon: "🧭",
        description: "Vetor de azimute do comboio de extração blindado."
      },
      hints: [
        { level: 1, cost: 0, text: "Conte 3 colunas a partir do flanco esquerdo e desça 4 quadrantes." },
        { level: 2, cost: 20, text: "O drop está cravado próximo aos escombros do centro-sul." },
        { level: 3, cost: 40, text: "Clique na coordenada militar [Linha 4, Coluna 3]." }
      ],
      reward: 100
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "pirates",
      type: "question",
      title: "Interrogatório do Sentinela de Trincheira",
      subtitle: "Triagem Balística & Furtividade Urbana",
      description: "O sargento da muralha apoia o fuzil no seu peito. Prove que você não é uma ameaça nem um amador barulhento antes que ele puxe o gatilho.",
      questionKey: "pirates_2",
      clue: {
        id: "clue_p2",
        type: "word",
        title: "Código Alfa",
        value: "AVANTE",
        icon: "📜",
        description: "Senha de comunicação por rádio do posto de comando."
      },
      hints: [
        { level: 1, cost: 0, text: "Armas de fogo sem silenciador ecoam por quilômetros atraindo corredores vorazes." },
        { level: 2, cost: 20, text: "O protocolo militar exige avanço agachado na penumbra e lâminas silenciosas." },
        { level: 3, cost: 40, text: "A alternativa B garante a sobrevivência do pelotão." }
      ],
      reward: 120
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "pirates",
      type: "wire_cutter",
      title: "Neutralização do Detonador IED da Delegacia",
      subtitle: "Protocolo de Desarme — Arsenal Blindado",
      description: "Um dispositivo improvisado está preso no cofre de armas. Fios entrelaçados ao detonador. Uma instrução riscada no metal diz qual fio cortar. Errar significa o fim.",
      riddle: "O fio da cor do sangue já foi derramado demais — este não. O fio do céu limpo foi o último a ser visto antes do apocalipse. Mas o fio que protege o Arsenal é da cor que os monitores de emergência usam para sinalizar SALVO: corte-o.",
      wires: ["red", "blue", "yellow", "green", "white"],
      correctWire: "green",
      clue: {
        id: "clue_p3",
        type: "symbol",
        title: "Chave Mestra SWAT",
        value: "CHAVE-SWAT",
        icon: "🗝️",
        description: "Acesso ao cofre bélico da divisão de contenção após neutralização do IED."
      },
      hints: [
        { level: 1, cost: 0, text: "Monitores de emergência usam verde para indicar SALVO / OK." },
        { level: 2, cost: 20, text: "Não é vermelho (sangue), não é azul (céu). É verde." },
        { level: 3, cost: 40, text: "Corte o fio VERDE." }
      ],
      reward: 130
    },
    {
      id: 4,
      phaseNumber: 4,
      mapId: "pirates",
      type: "path_choice",
      title: "Emboscada no Cruzamento da Morte",
      subtitle: "Manobra Evasiva sob Fogo Cruzado",
      description: "Centenas de infectados uivam avançando em massa pela via. Uma decisão errada e o comboio será destroçado em segundos.",
      paths: [
        {
          id: "path_left",
          title: "Avenida Central",
          desc: "Carros em chamas iluminam o asfalto. Dezenas de mutantes corredores já avistaram seus faróis.",
          isCorrect: false,
          failMessage: "A horda cercou a viatura e quebrou as janelas blindadas!"
        },
        {
          id: "path_center",
          title: "Túnel do Metrô Desativado",
          desc: "Trilhos de aço escuros e frios. Escuridão total, mas bloqueios físicos protegem as laterais.",
          isCorrect: true,
          successMessage: "Você avançou na penumbra subterrânea e despistou os farejadores com maestria!"
        },
        {
          id: "path_right",
          title: "Passarela Elevada dos Viadutos",
          desc: "Cabos de aço rangendo e vigas corroídas com risco iminente de colapso estrutural.",
          isCorrect: false,
          failMessage: "A estrutura de concreto cedeu com o peso do veículo forçando retirada sob sangue!"
        }
      ],
      clue: {
        id: "clue_p4",
        type: "direction",
        title: "Rumo de Fuga",
        value: "OESTE",
        icon: "🧭",
        description: "Bússola militar indicando saída direta pelo Eixo Oeste."
      },
      hints: [
        { level: 1, cost: 0, text: "A superfície iluminada por fogo é um estande de tiro para atiradores e monstros." },
        { level: 2, cost: 20, text: "O subsolo de concreto armado mascara o ruído de motor e o calor térmico." },
        { level: 3, cost: 40, text: "Selecione o Túnel do Metrô Desativado (centro)." }
      ],
      reward: 140
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "pirates",
      type: "frequency",
      title: "Interceptação do Rádio Tático do Comboio Caído",
      subtitle: "Varredura de Banda Militar sob Fogo de Artilharia",
      description: "O comunicador do sargento morto no asfalto está chiando. Sintonize a frequência militar antes que os transmissores da torre queimem e o sinal se perca para sempre.",
      startFreq: 82.0,
      targetFreq: 104.5,
      minFreq: 75.0,
      maxFreq: 120.0,
      clue: {
        id: "clue_p5",
        type: "number",
        title: "Calibre Crítico",
        value: "34",
        icon: "🔢",
        description: "Código de acesso alfa transmitido na frequência de emergência (Canal 34)."
      },
      hints: [
        { level: 1, cost: 0, text: "Aumente a frequência para a faixa acima de 100 MHz." },
        { level: 2, cost: 20, text: "O transmissor está cravado próximo a 104.5 MHz." },
        { level: 3, cost: 40, text: "Trave exatamente em 104.5 MHz para descriptografar o canal." }
      ],
      reward: 150
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "pirates",
      type: "symbol_puzzle",
      title: "Calibração dos Relés da Torre de Transmissão",
      subtitle: "Sincronização de Pulso Eletromagnético",
      description: "Alinhe os módulos defensivos na sequência exata de contenção: Capacitor EMP ⚡ -> Barreira Iônica 🛡️ -> Válvula de Purga ☢️ -> Sensor Sísmico 📡.",
      sequenceLength: 4,
      targetSequence: ["emp", "shield", "purge", "radar"],
      symbols: [
        { id: "shield", label: "Barreira Iônica", codename: "ESCUDO 02", icon: "🛡️" },
        { id: "emp", label: "Capacitor EMP", codename: "PULSO 01", icon: "⚡" },
        { id: "radar", label: "Sensor Sísmico", codename: "RADAR 04", icon: "📡" },
        { id: "purge", label: "Válvula de Purga", codename: "PURGA 03", icon: "☢️" }
      ],
      hints: [
        { level: 1, cost: 0, text: "Inicie disparando a sobrecarga de pulso EMP para atordoar a fiação." },
        { level: 2, cost: 20, text: "Sequência operacional: Pulso EMP, Barreira Iônica, Válvula de Purga e Sensor." },
        { level: 3, cost: 40, text: "Encaixe os módulos: ⚡, 🛡️, ☢️, 📡." }
      ],
      reward: 160
    },
    {
      id: 7,
      phaseNumber: 7,
      mapId: "pirates",
      type: "final_riddle",
      title: "Descompressão da Câmara de Extração Alfa",
      subtitle: "Protocolo Final de Desbloqueio do Antídoto",
      description: "O alarme de evacuação ruge nas paredes de concreto! Insira as 5 evidências da quarentena militar para abrir a câmara antes da quebra da muralha!",
      finalRequirements: {
        coord: "34° Oeste",
        word: "AVANTE",
        symbol: "trident",
        direction: "OESTE",
        code: "34"
      },
      hints: [
        { level: 1, cost: 0, text: "Consulte o radar tático e os códigos decifrados na missão." },
        { level: 2, cost: 20, text: "Direção: OESTE | Palavra: AVANTE | Símbolo: Tridente | Código: 34." },
        { level: 3, cost: 40, text: "Ajuste o vetor OESTE, selecione o Tridente, digite 34 e destranque a câmara!" }
      ],
      reward: 500
    }
  ],

  forest: [
    {
      id: 1,
      phaseNumber: 1,
      mapId: "forest",
      type: "path_choice",
      title: "Emboscada no Pântano das Carcaças",
      subtitle: "Evasão de Esporos e Farejadores Noturnos",
      description: "Névoa sulfúrica asfixiante cobre as margens lodosas. Criaturas mutantes se arrastam sob raízes podres.",
      paths: [
        {
          id: "path_left",
          title: "Trilha dos Galhos Espinhosos",
          desc: "Vegetação coberta de pus cáustico e zumbis semi-enterrados prontos para agarrar seus tornozelos.",
          isCorrect: false,
          failMessage: "Espinhos contaminados rasgaram o traje pressurizado!"
        },
        {
          id: "path_center",
          title: "Cordilheira de Pedra Britada",
          desc: "Elevação rochosa e seca com visão perimétrica de 360 graus e vento soprando o gás para longe.",
          isCorrect: true,
          successMessage: "Você cruzou a elevação com firmeza e neutralizou a aproximação dos farejadores!"
        },
        {
          id: "path_right",
          title: "Margem dos Efluentes Borbulhantes",
          desc: "Valas de descarte químico que exalam vapores corrosivos capazes de derreter o policarbonato da máscara.",
          isCorrect: false,
          failMessage: "A nuvem de cloro e necrotoxina forçou recuo sob sangramento respiratório!"
        }
      ],
      clue: {
        id: "clue_f1",
        type: "direction",
        title: "Bússola Tática",
        value: "NORTE",
        icon: "🧭",
        description: "O vento dispersa as toxinas no sentido Norte."
      },
      hints: [
        { level: 1, cost: 0, text: "Evite valas com emanação ácida e raízes lodosas." },
        { level: 2, cost: 20, text: "O terreno rochoso mais alto evita o acúmulo de gás denso e emboscadas." },
        { level: 3, cost: 40, text: "Escolha a Cordilheira de Pedra Britada (centro)." }
      ],
      reward: 110
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "forest",
      type: "memory",
      title: "Descriptografia do Buffer de Amostras Virais",
      subtitle: "Sincronização de Nódulos de Vigilância Corrompidos",
      description: "Acesse o mainframe de campo e emparelhe os 4 dumps de memória criptografados antes que o vírus sobrecarregue o reator.",
      pairs: [
        { id: "ssd", name: "Dump de Memória", subtitle: "Kernel Dump Militar", icon: "💾" },
        { id: "cctv", name: "CCTV Corrompido", subtitle: "Câmera Quarentena", icon: "📹" },
        { id: "dna", name: "Genoma Alpha-Z", subtitle: "Mutação de RNA", icon: "🧬" },
        { id: "token", name: "Chave Quântica", subtitle: "Bypass de Firewall", icon: "🔑" }
      ],
      clue: {
        id: "clue_f2",
        type: "symbol",
        title: "Emblema Bio-Segurança",
        value: "🍀 Trevo Dourado",
        icon: "🍀",
        description: "Insignia cirúrgica de neutralização biológica."
      },
      hints: [
        { level: 1, cost: 0, text: "Abra duas portas de buffer e registre os endereços de memória na mente." },
        { level: 2, cost: 20, text: "Priorize o alinhamento das câmeras CCTV e do dump de kernel." },
        { level: 3, cost: 40, text: "Combine os 4 pares de nós para forçar o bypass do sistema." }
      ],
      reward: 130
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "forest",
      type: "triage",
      title: "Protocolo de Triagem — Campo de Quarentena",
      subtitle: "Único Frasco de Antídoto · Decisão Irreversível",
      description: "Você tem UM único frasco de antídoto. Três sobreviventes no campo. O helicóptero parte em 3 minutos. Escolha quem recebe a dose com base nos dados táticos.",
      briefing: "O Capitão da extração ordena: 'Salve apenas quem pode continuar lutando. Infectado em estágio terminal consome recurso e compromete todos os demais. A missão é mais importante que sentimentalismo.'",
      survivors: [
        {
          id: "delta",
          name: "Delta-7 'Kross'",
          role: "Atirador de Elite · Ex-BOPE",
          icon: "🎯",
          infectionStatus: "clean",
          condition: "Ferimento por estilhaço na coxa. Sem infecção. Totalmente funcional após torniquete.",
          isCorrect: true,
          stats: [
            { label: "Infecção", value: "NEGATIVO" },
            { label: "Mobilidade", value: "82%" },
            { label: "Utilidade", value: "ALTA" },
            { label: "Recursos", value: "47 cartuchos" }
          ]
        },
        {
          id: "medic",
          name: "Dra. Carla Voss",
          role: "Médica · Especialista em Virologia",
          icon: "🧬",
          infectionStatus: "stage1",
          condition: "Mordida no antebraço. Estágio I. Febre inicial e tremores leves. Progressão: 40 min.",
          isCorrect: false,
          stats: [
            { label: "Infecção", value: "ESTÁGIO I" },
            { label: "Mobilidade", value: "60%" },
            { label: "Utilidade", value: "MÉDIA" },
            { label: "Progressão", value: "40 min" }
          ]
        },
        {
          id: "civvy",
          name: "Ruan Mendes",
          role: "Civil · Sem Treinamento",
          icon: "👤",
          infectionStatus: "stage2",
          condition: "Mordido duas vezes. Estágio II avançado. Alucinações. Em colapso. Antídoto ineficaz nesta fase.",
          isCorrect: false,
          stats: [
            { label: "Infecção", value: "ESTÁGIO II" },
            { label: "Mobilidade", value: "10%" },
            { label: "Utilidade", value: "NULA" },
            { label: "Progressão", value: "8 min" }
          ]
        }
      ],
      successText: "🛡️ Delta-7 recebeu a dose e retomou posição. Decisão tática correta. Recursos preservados. A missão continua.",
      failText: "💀 Você desperdiçou o antídoto num paciente sem reversão. Delta-7 foi à baixa sem cobertura. Reavalie suas prioridades. (-1 Vida)",
      clue: {
        id: "clue_f3",
        type: "number",
        title: "Código de Extração",
        value: "88",
        icon: "🔢",
        description: "Frequência de rádio do helicóptero de extração."
      },
      hints: [
        { level: 1, cost: 0, text: "Antídoto não funciona em Estágio II avançado — metabolismo celular já colapsou." },
        { level: 2, cost: 20, text: "Priorize quem está limpo ou em estágio inicial com alta utilidade operacional." },
        { level: 3, cost: 40, text: "Salve Delta-7 'Kross' — único sem infecção e com capacidade de combate." }
      ],
      reward: 140
    },

    {
      id: 4,
      phaseNumber: 4,
      mapId: "forest",
      type: "question",
      title: "Neuro-Patologia da Mutação Z-28",
      subtitle: "Diagnóstico Clínico sob Pressão Extrema",
      description: "A médica de campo aponta o bisturi para o ferimento e exige resposta imediata sobre a fisiologia viral.",
      questionKey: "forest_4",
      clue: {
        id: "clue_f4",
        type: "word",
        title: "Reagente Sintético",
        value: "RAÍZES",
        icon: "🌿",
        description: "Inibidor orgânico de coagulação mutagênica."
      },
      hints: [
        { level: 1, cost: 0, text: "A infecção viral galopa pelo córtex cerebral desencadeando tremores e febre." },
        { level: 2, cost: 20, text: "Sem imobilização e contenção química, o paciente ataca os aliados em minutos." },
        { level: 3, cost: 40, text: "A alternativa correta é a primeira: contenção com lacres táticos e torniquete." }
      ],
      reward: 150
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "forest",
      type: "find_object",
      title: "Varredura do Módulo de Cultivo Hidropônico",
      subtitle: "Localização da Cepa Alfa Estabilizada",
      description: "Vasculhe a estufa abandonada onde vidrarias quebradas misturam sangue fresco e reagentes contaminados em busca da Ampola Genética Alfa intacta.",
      targetItemName: "Ampola Genética Alfa",
      items: [
        { id: "leaf", name: "Cultura Fúngica Mutante", x: 18, y: 35, isTarget: false, icon: "🍄" },
        { id: "golden_apple", name: "Ampola Genética Alfa", x: 70, y: 55, isTarget: true, icon: "🧪" },
        { id: "butterfly", name: "Sensor Bio-Reativo", x: 45, y: 25, isTarget: false, icon: "📟" },
        { id: "squirrel", name: "Roedor Infectado", x: 82, y: 80, isTarget: false, icon: "🐀" },
        { id: "feather", name: "Seringa Descartada", x: 30, y: 72, isTarget: false, icon: "💉" }
      ],
      clue: {
        id: "clue_f5",
        type: "coord",
        title: "Cepa Alfa Estabilizada",
        value: "CEPA-ALFA",
        icon: "🧪",
        description: "Amostra genética pura sem mutações secundárias."
      },
      hints: [
        { level: 1, cost: 0, text: "A ampola de soro emite luminescência fosforescente esmeralda no suporte de vidro." },
        { level: 2, cost: 20, text: "Olhe no suporte hidropônico suspenso do quadrante direito." },
        { level: 3, cost: 40, text: "A ampola fluorescente está localizada exatamente em X: 70%, Y: 55%." }
      ],
      reward: 160
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "forest",
      type: "frequency",
      title: "Sintonização do Canal de Extração do Bosque",
      subtitle: "Intercepção da Frequência de Exfiltração Criptografada",
      description: "O rádio tático está captando interferência dos geradores queimados. O Capitão transmite na frequência exata — encontre o sinal limpo antes que o bunker colapse.",
      startFreq: 75.0,
      targetFreq: 91.5,
      minFreq: 70.0,
      maxFreq: 120.0,
      clue: {
        id: "clue_f6",
        type: "code",
        title: "Freq. de Exfiltração",
        value: "91.5 MHz",
        icon: "📡",
        description: "Canal de rádio criptografado do helicóptero de resgate."
      },
      hints: [
        { level: 1, cost: 0, text: "A frequência está acima de 90 MHz — faixa VHF-Hi de uso militar." },
        { level: 2, cost: 20, text: "Suba para a faixa de 91 MHz e ajuste fino com os botões de 0.1." },
        { level: 3, cost: 40, text: "Trave exatamente em 91.5 MHz." }
      ],
      reward: 170
    },

    {
      id: 7,
      phaseNumber: 7,
      mapId: "forest",
      type: "final_riddle",
      title: "Descompressão do Bunker Subterrâneo do Bosque",
      subtitle: "Resgate dos Anticorpos Sintéticos",
      description: "As travas pneumáticas vibram com batidas violentas de carniçais lá fora. Alinhe as evidências táticas para romper o selo blindado!",
      finalRequirements: {
        direction: "NORTE",
        symbol: "clover",
        number: "88",
        word: "RAÍZES",
        code: "36"
      },
      hints: [
        { level: 1, cost: 0, text: "Consulte o diário do laboratório no terminal de campo à esquerda." },
        { level: 2, cost: 20, text: "Direção: NORTE | Palavra: RAÍZES | Símbolo: Trevo | Código: 36." },
        { level: 3, cost: 40, text: "Ajuste o vetor NORTE, selecione o Trevo, digite 36 e execute a descompressão!" }
      ],
      reward: 500
    }
  ],

  temple: [
    {
      id: 1,
      phaseNumber: 1,
      mapId: "temple",
      type: "symbol_puzzle",
      title: "Lacre da Ala de Isolamento do Hospital",
      subtitle: "Sobrecarga de Sensores da UTI de Quarentena",
      description: "Os trincos eletrônicos exigem alinhamento na sequência exata de emergência médica: Alarme Térmico ☀️ -> Biossensor 🪲 -> Scanner Óptico 👁️ -> Trava Noturna 🌙.",
      targetSequence: ["sun", "scarab", "eye", "moon"],
      symbols: [
        { id: "eye", label: "Scanner Óptico", icon: "👁️" },
        { id: "moon", label: "Trava Noturna", icon: "🌙" },
        { id: "sun", label: "Alarme Térmico", icon: "☀️" },
        { id: "scarab", label: "Biossensor", icon: "🪲" }
      ],
      clue: {
        id: "clue_t1",
        type: "symbol",
        title: "Selo de Acesso",
        value: "👁️ Olho Sagrado",
        icon: "👁️",
        description: "Chave criptográfica do necrotério blindado."
      },
      hints: [
        { level: 1, cost: 0, text: "A sequência operacional começa com a leitura térmica da ala." },
        { level: 2, cost: 20, text: "Ordem dos cartões: ☀️, 🪲, 👁️, 🌙." },
        { level: 3, cost: 40, text: "Clique nos módulos na ordem exata: Alarme Térmico, Biossensor, Scanner e Trava." }
      ],
      reward: 130
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "temple",
      type: "coordinates",
      title: "Mapeamento Termográfico das Câmaras Mortuárias",
      subtitle: "Triangulação do Setor sem Infecção Ativa",
      description: "O monitor infravermelho revela calor corporal anômalo em quase todas as salas. Apenas uma câmara possui pressão negativa estéril: Coluna 5 (E), Linha 2.",
      targetCoord: { x: 5, y: 2 },
      gridSize: 6,
      clue: {
        id: "clue_t2",
        type: "coord",
        title: "Câmara Estéril",
        value: "Laje 5-2",
        icon: "📐",
        description: "Setor médico com vedação pneumática intacta."
      },
      hints: [
        { level: 1, cost: 0, text: "A 5ª coluna fica à direita; a 2ª linha fica perto do teto do necrotério." },
        { level: 2, cost: 20, text: "Intercepte a coluna E com a linha 2 da planta baixa." },
        { level: 3, cost: 40, text: "Clique diretamente na coordenada [Linha 2, Coluna 5]." }
      ],
      reward: 140
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "temple",
      type: "wire_cutter",
      title: "Desarme do Relé de Autodestruição da UTI",
      subtitle: "Sobrecarga nas Autoclaves Químicas de Emergência",
      description: "Um temporizador militar de quarentena foi acionado na ala cirúrgica. Fios correm para três cilindros de fósforo branco. Uma folha de protocolo manchada de sangue dá a instrução.",
      riddle: "O circuito de alarme geral é amarelo como enxofre. O cabo de monitoramento biológico é branco como gaze estéril. Mas o relé que alimenta a detonação química é o condutor tingido com a cor da necrose celular avançada: corte o fio ROXO imediatamente!",
      wires: ["red", "yellow", "purple", "white", "blue"],
      correctWire: "purple",
      clue: {
        id: "clue_t3",
        type: "direction",
        title: "Vetor da UTI",
        value: "LESTE",
        icon: "🧭",
        description: "Ala cirúrgica principal apontando na direção Leste."
      },
      hints: [
        { level: 1, cost: 0, text: "Ignore os cabos amarelo (alarme) e branco (monitores)." },
        { level: 2, cost: 20, text: "O condutor com a cor da necrose celular avançada é o roxo." },
        { level: 3, cost: 40, text: "Corte o fio ROXO para desarmar a autoclave." }
      ],
      reward: 150
    },
    {
      id: 4,
      phaseNumber: 4,
      mapId: "temple",
      type: "difference",
      title: "Triagem Forense de Amostras Genéticas",
      subtitle: "Espectrometria UV // Detecção de Necrotoxina",
      description: "Duas ampolas de soro foram resgatadas da autoclave do necrotério. Uma está pura com selo hermético de titânio (CRISPR-Z); a outra possui microfissuras e líquido turvo letal. Escolha a amostra pura.",
      options: [
        {
          id: "statue_left",
          title: "Ampola B-04 (Toxina Corrompida)",
          desc: "Líquido escuro com borbulhas, trincas na parede de vidro e lacre rompido vazando esporos.",
          isCorrect: false,
          failText: "A ampola trincada rompeu na esterilização! Toxina inalada (-1 Vida)."
        },
        {
          id: "statue_right",
          title: "Ampola CRISPR-Z (Grau Militar Puro)",
          desc: "Líquido cristalino luminescente verde, hélice de DNA intacta e lacre hermético inviolado.",
          isCorrect: true,
          successText: "Amostra pura resgatada com precisão militar!"
        }
      ],
      clue: {
        id: "clue_t4",
        type: "number",
        title: "Voltagem Letal",
        value: "57",
        icon: "🔢",
        description: "Código de acesso recolhido na ampola pura."
      },
      hints: [
        { level: 1, cost: 0, text: "Examine a integridade do vidro: a ampola pura não possui trincas nem vazamentos." },
        { level: 2, cost: 20, text: "O soro autêntico emite brilho esmeralda estável e tem lacre de titânio 100% selado." },
        { level: 3, cost: 40, text: "Selecione a Ampola CRISPR-Z à direita." }
      ],
      reward: 160
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "temple",
      type: "path_choice",
      title: "Fuga Desesperada pelas Alas Hospitalares",
      subtitle: "Evasão Rápida entre Macas Ensanguentadas",
      description: "Sirenes de código vermelho berram no teto. Portas batem e grunhidos pesados ecoam pelos corredores.",
      paths: [
        {
          id: "path_left",
          title: "Ala de Radioterapia",
          desc: "Radiação gama letal no ambiente e carniçais cegos farejando no piso molhado.",
          isCorrect: false,
          failMessage: "A exposição radioativa e os monstros forçaram recuo violento!"
        },
        {
          id: "path_center",
          title: "Corredor da Ala Pediátrica",
          desc: "Teto de gesso desabado com vergalhões expostos e curto-circuitos na fiação.",
          isCorrect: false,
          failMessage: "Cabos de alta voltagem caíram na água bloqueando a passagem com faíscas!"
        },
        {
          id: "path_right",
          title: "Comportas do Centro Cirúrgico",
          desc: "Portas duplas corta-fogo de aço inox com fecho pneumático de contenção.",
          isCorrect: true,
          successMessage: "Você trancou as comportas de aço e deixou as garras dos monstros arranhando o metal pelo lado de fora!"
        }
      ],
      clue: {
        id: "clue_t5",
        type: "word",
        title: "Fórmula de Síntese",
        value: "SOLARIS",
        icon: "☀️",
        description: "Reagente esterilizador de patógenos."
      },
      hints: [
        { level: 1, cost: 0, text: "As portas corta-fogo suportam pressão mecânica violenta." },
        { level: 2, cost: 20, text: "Evite setores com risco elétrico e contaminação por radiação." },
        { level: 3, cost: 40, text: "Escolha as Comportas do Centro Cirúrgico (à direita)." }
      ],
      reward: 170
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "temple",
      type: "question",
      title: "Guerra Bacteriológica & Bio-Segurança",
      subtitle: "Protocolos Militares de Descontaminação",
      description: "O médico-chefe da UTI barricada exige confirmação técnica antes de abrir a escotilha blindada.",
      questionKey: "temple_6",
      clue: {
        id: "clue_t6",
        type: "key",
        title: "Lacre da UTI",
        value: "SELO DE RÁ",
        icon: "🔑",
        description: "Cartão magnético do cofre de vacinas."
      },
      hints: [
        { level: 1, cost: 0, text: "Esporos virais militarizados exigem agentes oxidantes de choque celular." },
        { level: 2, cost: 20, text: "Filtros MOPP-4 e injeção de atropina femoral são a única barreira contra asfixia química." },
        { level: 3, cost: 40, text: "A alternativa B é o procedimento militar padrão." }
      ],
      reward: 180
    },
    {
      id: 7,
      phaseNumber: 7,
      mapId: "temple",
      type: "final_riddle",
      title: "Arrombamento da Câmara Criogênica do Paciente Zero",
      subtitle: "Extração do Anticorpo Matriz",
      description: "As portas externas do necrotério estão cedendo sob centenas de corpos infectados. Destranque a câmara fria imediatamente!",
      finalRequirements: {
        direction: "LESTE",
        symbol: "eye",
        number: "57",
        word: "SOLARIS",
        code: "57"
      },
      hints: [
        { level: 1, cost: 0, text: "Verifique o dossiê das amostras no monitor tático." },
        { level: 2, cost: 20, text: "Direção: LESTE | Palavra: SOLARIS | Símbolo: Olho Sagrado | Número: 57." },
        { level: 3, cost: 40, text: "Vire para LESTE, acione o Olho Sagrado, digite 57 e recupere o anticorpo!" }
      ],
      reward: 500
    }
  ],

  frozen: [
    {
      id: 1,
      phaseNumber: 1,
      mapId: "frozen",
      type: "memory",
      title: "Sincronização dos Módulos do Reator Nuclear Polar",
      subtitle: "Alinhamento de Cartões Criogênicos Militares",
      description: "Os geradores a diesel estão falhando a -30°C. Memorize e emparelhe os 4 cartões de frequência militar para reiniciar os turbogeradores.",
      pairs: [
        { id: "snowflake", name: "Chave Criogênica", icon: "❄️" },
        { id: "gem", name: "Safira Polar", icon: "💎" },
        { id: "crystal", name: "Prisma de Laser", icon: "🔮" },
        { id: "comet", name: "Sinalizador Térmico", icon: "☄️" }
      ],
      clue: {
        id: "clue_fr1",
        type: "symbol",
        title: "Emblema Criogênico",
        value: "💎 Safira Polar",
        icon: "💎",
        description: "Prisma polar de colimação do feixe do reator."
      },
      hints: [
        { level: 1, cost: 0, text: "Memorize as posições das chaves criogênicas com rapidez." },
        { level: 2, cost: 20, text: "Agrupe primeiro os prismas de laser e as chaves de gelo." },
        { level: 3, cost: 40, text: "Forme os 4 pares para rearmar os turbogeradores do bunker." }
      ],
      reward: 130
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "frozen",
      type: "symbol_puzzle",
      title: "Desarme dos Sensores Sísmicos de Perímetro",
      subtitle: "Desativação dos Alarmes Acústicos de Superfície",
      description: "Desarme os sensores acústicos na frequência militar de segurança: Sensor Azul 🔷 -> Sensor Ciano 🔹 -> Sensor Roxo 🟣 -> Sensor Branco ⚪.",
      targetSequence: ["blue", "cyan", "purple", "white"],
      symbols: [
        { id: "white", label: "Sensor Branco", icon: "⚪" },
        { id: "purple", label: "Sensor Roxo", icon: "🟣" },
        { id: "blue", label: "Sensor Azul", icon: "🔷" },
        { id: "cyan", label: "Sensor Ciano", icon: "🔹" }
      ],
      clue: {
        id: "clue_fr2",
        type: "number",
        title: "Frequência de Rádio",
        value: "42",
        icon: "🔢",
        description: "Canal criptografado do comando polar."
      },
      hints: [
        { level: 1, cost: 0, text: "A escala militar segue do espectro escuro para o espectro de luz branca." },
        { level: 2, cost: 20, text: "Ordem: Azul, Ciano, Roxo e Branco." },
        { level: 3, cost: 40, text: "Pressione os sensores na sequência: 🔷, 🔹, 🟣, ⚪." }
      ],
      reward: 140
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "frozen",
      type: "triage",
      title: "Triagem do Destacamento Ártico Congelado",
      subtitle: "Último Aquecedor Térmico · Decisão sob Nevasca Extrema",
      description: "A tempestade a -40°C congela os dedos em segundos. Três operadores do silo foram resgatados na eclusa. Resta apenas UMA cápsula de infusão térmica e suporte vital. Decida quem sobrevive.",
      briefing: "Aviso do Comando Polar: 'O reator de tório do cofre está instável. Precisamos de quem domina a engenharia do reator e tem sangue limpo de mutagênicos. Quem estiver mordido ou sem especialidade técnica condena a base inteira à explosão nuclear.'",
      survivors: [
        {
          id: "vasquez",
          name: "Tenente R. Vasquez",
          role: "Engenheira Chefe · Fissão Nuclear Polar",
          icon: "⚛️",
          infectionStatus: "clean",
          condition: "Hipotermia leve nos membros, mas sem mordidas nem perfurações no traje de chumbo. Lúcida e pronta para estabilizar o reator.",
          isCorrect: true,
          stats: [
            { label: "Infecção", value: "NEGATIVO" },
            { label: "Mobilidade", value: "75%" },
            { label: "Utilidade", value: "CRÍTICA" },
            { label: "Especialidade", value: "Reator Nuclear" }
          ]
        },
        {
          id: "hansen",
          name: "Cabo B. Hansen",
          role: "Fuzileiro de Segurança Perimétrica",
          icon: "🪖",
          infectionStatus: "stage2",
          condition: "Garras romperam o colarinho térmico. Mordida profunda na carótida. Pupilas dilatadas e saliva espumosa. Colapso em 5 min.",
          isCorrect: false,
          stats: [
            { label: "Infecção", value: "ESTÁGIO II" },
            { label: "Mobilidade", value: "20%" },
            { label: "Utilidade", value: "NULA" },
            { label: "Progressão", value: "5 min" }
          ]
        },
        {
          id: "ramos",
          name: "Recruta M. Ramos",
          role: "Operador de Rádio Auxiliar",
          icon: "📻",
          infectionStatus: "stage1",
          condition: "Arranhões no pulso através do tecido rasgado da luva. Pele pálida e tremores intensos de contaminação viral inicial.",
          isCorrect: false,
          stats: [
            { label: "Infecção", value: "ESTÁGIO I" },
            { label: "Mobilidade", value: "45%" },
            { label: "Utilidade", value: "BAIXA" },
            { label: "Progressão", value: "25 min" }
          ]
        }
      ],
      successText: "🛡️ A Tenente Vasquez recebeu a infusão e assumiu o console do reator polar. Decisão militar irretocável.",
      failText: "💀 O paciente colapsou em convulsões infecciosas na maca. Sem a engenheira, o reator entrou em sobrecarga. (-1 Vida)",
      clue: {
        id: "clue_fr3",
        type: "direction",
        title: "Direção do Silo",
        value: "SUL",
        icon: "🧭",
        description: "Silo nuclear de contenção apontando para o Sul."
      },
      hints: [
        { level: 1, cost: 0, text: "O briefing deixa claro: o reator precisa de especialista nuclear sem infecção." },
        { level: 2, cost: 20, text: "O Cabo Hansen está em Estágio II e o recruta não domina sistemas de fissão." },
        { level: 3, cost: 40, text: "Selecione a Tenente Vasquez — ficha limpa e conhecimento do reator." }
      ],
      reward: 150
    },
    {
      id: 4,
      phaseNumber: 4,
      mapId: "frozen",
      type: "question",
      title: "Crioterapia & Estabilização Termonuclear",
      subtitle: "Preservação Molecular da Vacina Cepa Alpha",
      description: "O coronel da base ártica checa suas credenciais sob mira de espingarda calibre 12.",
      questionKey: "frozen_4",
      clue: {
        id: "clue_fr4",
        type: "word",
        title: "Chave Criogênica",
        value: "AURORA",
        icon: "🌌",
        description: "Protocolo alfanumérico da câmara frigorífica."
      },
      hints: [
        { level: 1, cost: 0, text: "Temperaturas ultrabaixas a -80°C impedem a autofagia molecular das proteínas sintéticas." },
        { level: 2, cost: 20, text: "Sem nitrogênio líquido, o soro degenera em neurotoxina paralisante fatal." },
        { level: 3, cost: 40, text: "A alternativa correta é a primeira: evitar a desnaturação da cadeia polipeptídica." }
      ],
      reward: 160
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "frozen",
      type: "path_choice",
      title: "Brecha nas Galerias de Manutenção Subterrâneas",
      subtitle: "Evasão contra Mutantes de Carapaça Reforçada",
      description: "As sirenes de vazamento de hélio disparam. Três passagens de emergência se abrem nas profundezas de rocha maciça.",
      paths: [
        {
          id: "path_left",
          title: "Galeria dos Pistões Hidráulicos",
          desc: "Pistões de 10 toneladas vazando fluido pressurizado que ameaça esmagar qualquer transeunte.",
          isCorrect: false,
          failMessage: "A pressão dos pistões colapsou a galeria forçando retirada dramática!"
        },
        {
          id: "path_center",
          title: "Túnel de Concreto Antiatômico",
          desc: "Paredes de concreto armado com chumbo de 2 metros de espessura e trancas manuais de titânio.",
          isCorrect: true,
          successMessage: "Você transpôs o túnel fortificado e trancou a comporta de 5 toneladas atrás de si!"
        },
        {
          id: "path_right",
          title: "Duto de Refrigeração de Vapor",
          desc: "Vapor a 250°C rugindo pelos tubos com visibilidade nula e risco de queimaduras de 3º grau.",
          isCorrect: false,
          failMessage: "O jato de vapor superaquecido rompeu o traje de proteção forçando recuo imediato!"
        }
      ],
      clue: {
        id: "clue_fr5",
        type: "coord",
        title: "Coordenada do Silo",
        value: "Zona Ártica 9",
        icon: "📍",
        description: "Setor geodésico do cofre subterrâneo."
      },
      hints: [
        { level: 1, cost: 0, text: "Evite dutos de vapor abrasivo e galerias com risco de esmagamento hidráulico." },
        { level: 2, cost: 20, text: "O concreto antiatômico é a estrutura mais densa e impenetrável da instalação." },
        { level: 3, cost: 40, text: "Escolha o Túnel de Concreto Antiatômico (centro)." }
      ],
      reward: 170
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "frozen",
      type: "difference",
      title: "Inspeção Estrutural da Comporta do Silo Polar",
      subtitle: "Varredura Ultrassônica // Vácuo e Fadiga Mecânica",
      description: "Para avançar até a câmara criogênica final, você precisa acionar a eclusa de isolamento. Uma das comportas mantém o vácuo a 100%; a outra apresenta fadiga de material e fissuras críticas sob pressão de 40 toneladas. Selecione a comporta hermética estável.",
      options: [
        {
          id: "vitral_left",
          title: "Comporta 01 (Hermética 100%)",
          desc: "Placas de titânio alinhadas, travas hidráulicas verdes, manômetro indicando vácuo estável.",
          isCorrect: true,
          successText: "Eclusa pressurizada com perfeição! Caminho livre para a câmara criogênica."
        },
        {
          id: "vitral_right",
          title: "Comporta 02 (Alerta de Fissura)",
          desc: "Rachaduras na blindagem de aço, manômetro na faixa vermelha com jatos de vapor vazando.",
          isCorrect: false,
          failText: "A comporta trincada colapsou com o vácuo! Vapores glaciais vazando (-1 Vida)."
        }
      ],
      clue: {
        id: "clue_fr6",
        type: "code",
        title: "Tensão de Destrave",
        value: "45",
        icon: "🔢",
        description: "Tensão de quebra magnética da cúpula do reator."
      },
      hints: [
        { level: 1, cost: 0, text: "Verifique os manômetros de pressão nas duas comportas." },
        { level: 2, cost: 20, text: "A comporta da esquerda mantém o indicador verde e vácuo perfeito sem vazamento de vapor." },
        { level: 3, cost: 40, text: "Selecione a Comporta 01 (Hermética 100%) à esquerda." }
      ],
      reward: 180
    },
    {
      id: 7,
      phaseNumber: 7,
      mapId: "frozen",
      type: "final_riddle",
      title: "Descompressão Final do Cofre Criogênico da Cura",
      subtitle: "A Última Esperança da Humanidade",
      description: "O bunker estremece sob toneladas de explosivos e hordas batendo nas muralhas de titânio. Sincronize as 5 pistas finais para romper a cúpula criogênica e resgatar a cura!",
      finalRequirements: {
        direction: "SUL",
        symbol: "gem",
        number: "42",
        word: "AURORA",
        code: "45"
      },
      hints: [
        { level: 1, cost: 0, text: "Consulte o prontuário de inteligência polar no monitor à esquerda." },
        { level: 2, cost: 20, text: "Direção: SUL | Palavra: AURORA | Símbolo: Safira Polar | Código: 45." },
        { level: 3, cost: 40, text: "Ajuste o vetor SUL, escolha a Safira, insira o código 45 e libere a cura definitiva!" }
      ],
      reward: 500
    }
  ]
};
