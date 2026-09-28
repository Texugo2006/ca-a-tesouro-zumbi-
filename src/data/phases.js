export const phasesData = {
  pirates: [
    {
      id: 1,
      phaseNumber: 1,
      mapId: "pirates",
      type: "coordinates",
      title: "As Coordenadas do Recife Oculto",
      subtitle: "Trace a rota pela carta náutica",
      description: "Interprete as anotações do diário de bordo e posicione a luneta na coordenada correta no quadrante náutico.",
      instructions: "Clique no ponto do mapa marítimo que corresponde à coordenada: Latitude 3, Longitude 4 (Quadrante C-4).",
      targetCoord: { x: 3, y: 4 },
      gridSize: 6,
      clue: {
        id: "clue_p1",
        type: "coord",
        title: "Coordenada Secreta",
        value: "34° Oeste",
        icon: "🧭",
        description: "Coordenada de aproximação das falésias misteriosas."
      },
      hints: [
        { level: 1, cost: 0, text: "Conte 3 colunas a partir da esquerda e 4 linhas a partir do topo." },
        { level: 2, cost: 20, text: "A coordenada está na metade inferior direita da grade marítima." },
        { level: 3, cost: 40, text: "Clique exatamente na quarta linha da terceira coluna (linha 4, coluna 3)." }
      ],
      reward: 100
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "pirates",
      type: "question",
      title: "O Código dos Sete Mares",
      subtitle: "Perguntas dos corsários veteranos",
      description: "Prove seu conhecimento dos oceanos para convencer os marinheiros fantasmas a lhe darem a segunda chave.",
      questionKey: "pirates_2",
      clue: {
        id: "clue_p2",
        type: "word",
        title: "Palavra de Passe",
        value: "AVANTE",
        icon: "📜",
        description: "A palavra de ordem entalhada no mastro do capitão."
      },
      hints: [
        { level: 1, cost: 0, text: "Pense na constelação mais famosa visível à noite no céu do Brasil e hemisfério sul." },
        { level: 2, cost: 20, text: "Não é uma estrela isolada como a Polar, e sim um grupo de estrelas em formato de cruz." },
        { level: 3, cost: 40, text: "A resposta correta é a Constelação do Cruzeiro do Sul." }
      ],
      reward: 120
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "pirates",
      type: "find_object",
      title: "O Tridente Dourado",
      subtitle: "Busca de relíquia na praia dos naufrágios",
      description: "Procure entre os rochedos e mastros quebrados pelo símbolo do Tridente Sagrado de Netuno.",
      targetItemName: "Tridente de Ouro",
      items: [
        { id: "shell", name: "Concha Mágica", x: 22, y: 68, isTarget: false, icon: "🐚" },
        { id: "bottle", name: "Mensagem na Garrafa", x: 78, y: 75, isTarget: false, icon: "🍾" },
        { id: "anchor", name: "Âncora Antiga", x: 35, y: 35, isTarget: false, icon: "⚓" },
        { id: "trident", name: "Tridente de Ouro", x: 62, y: 42, isTarget: true, icon: "🔱" },
        { id: "crab", name: "Caranguejo Guardião", x: 85, y: 45, isTarget: false, icon: "🦀" }
      ],
      clue: {
        id: "clue_p3",
        type: "symbol",
        title: "Símbolo Sagrado",
        value: "🔱 Tridente",
        icon: "🔱",
        description: "Emblema gravado na fechadura de ouro."
      },
      hints: [
        { level: 1, cost: 0, text: "O tridente está fincado em uma elevação rochosa ao fundo." },
        { level: 2, cost: 20, text: "Procure do lado direito da cena, entre a praia e o horizonte." },
        { level: 3, cost: 40, text: "O tridente está próximo ao centro-direito, emanando um brilho sutil!" }
      ],
      reward: 130
    },
    {
      id: 4,
      phaseNumber: 4,
      mapId: "pirates",
      type: "path_choice",
      title: "As Correntes dos Naufrágios",
      subtitle: "Escolha o canal de navegação seguro",
      description: "Três estreitos surgem à frente do barco. As lendas contam que apenas um não possui rochedos submersos assassinos.",
      paths: [
        {
          id: "path_left",
          title: "Passagem das Sirenes",
          desc: "Névoa espessa e sussurros ecoando dos corais pontiagudos.",
          isCorrect: false,
          failMessage: "A correnteza atraiu a embarcação para os corais rasos!"
        },
        {
          id: "path_center",
          title: "Estreito da Caveira",
          desc: "Águas calmas com reflexo de fósforo sob o olhar da rocha do crânio.",
          isCorrect: true,
          successMessage: "Você manobrou com maestria pelas águas profundas e encontrou o caminho seguro!"
        },
        {
          id: "path_right",
          title: "Canal do Turbilhão",
          desc: "Redemoinhos visíveis e espuma violenta em torno de um vulcão adormecido.",
          isCorrect: false,
          failMessage: "O redemoinho girou o barco descontroladamente!"
        }
      ],
      clue: {
        id: "clue_p4",
        type: "direction",
        title: "Rumo da Bússola",
        value: "OESTE",
        icon: "🧭",
        description: "A agulha estabiliza em direção ao sol poente."
      },
      hints: [
        { level: 1, cost: 0, text: "Observe onde a água é mais escura e calma: calmaria indica profundidade." },
        { level: 2, cost: 20, text: "Evite tanto os corais rasos das sirenes quanto os redemoinhos turbulentos." },
        { level: 3, cost: 40, text: "O caminho do meio (Estreito da Caveira) é a passagem correta." }
      ],
      reward: 140
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "pirates",
      type: "code",
      title: "A Cifra do Bucaneiro",
      subtitle: "Decodifique o código numérico do cofre",
      description: "Resolva a charada numérica deixada no pergaminho: 'Multiplique as velas do mastro (3) pelas pontas da bússola (8) e adicione o número da sorte (10)'.",
      calculation: "3 * 8 + 10 = 34",
      targetCode: "34",
      clue: {
        id: "clue_p5",
        type: "number",
        title: "Número Místico",
        value: "34",
        icon: "🔢",
        description: "A rotação da combinação no mecanismo do baú."
      },
      hints: [
        { level: 1, cost: 0, text: "Calcule primeiro a multiplicação: 3 x 8." },
        { level: 2, cost: 20, text: "3 x 8 = 24. Agora adicione 10 a esse resultado." },
        { level: 3, cost: 40, text: "O código é 34." }
      ],
      reward: 150
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "pirates",
      type: "symbol_puzzle",
      title: "O Mosaico do Leme Ancestral",
      subtitle: "Organize a sequência dos 4 selos de navegação",
      description: "Gire os discos rúnicos de bronze na sequência correta dos elementos de navegação: Bússola 🧭 -> Âncora ⚓ -> Leme ☸️ -> Luneta 🔭.",
      sequenceLength: 4,
      targetSequence: ["compass", "anchor", "helm", "spyglass"],
      symbols: [
        { id: "anchor", label: "Âncora", icon: "⚓" },
        { id: "compass", label: "Bússola", icon: "🧭" },
        { id: "spyglass", label: "Luneta", icon: "🔭" },
        { id: "helm", label: "Leme", icon: "☸️" }
      ],
      hints: [
        { level: 1, cost: 0, text: "Comece orientando a bússola, depois lance a âncora." },
        { level: 2, cost: 20, text: "A sequência é: Bússola, Âncora, Leme e Luneta." },
        { level: 3, cost: 40, text: "Clique nos botões na ordem exata: 🧭, ⚓, ☸️, 🔭." }
      ],
      reward: 160
    },
    {
      id: 7,
      phaseNumber: 7,
      mapId: "pirates",
      type: "final_riddle",
      title: "O Grande Baú da Ilha da Caveira",
      subtitle: "Combine as 5 pistas para romper o lacre do tesouro",
      description: "Você alcançou a câmara dourada! Agora alinhe os mecanismos com as evidências coletadas nas fases anteriores para abrir o baú lendário.",
      finalRequirements: {
        coord: "34° Oeste",
        word: "AVANTE",
        symbol: "trident",
        direction: "OESTE",
        code: "34"
      },
      hints: [
        { level: 1, cost: 0, text: "Consulte as pistas no Pergaminho de Evidências à esquerda." },
        { level: 2, cost: 20, text: "Direção: OESTE | Palavra: AVANTE | Número: 34 | Símbolo: Tridente." },
        { level: 3, cost: 40, text: "Coloque a Bússola no OESTE, digite 34, selecione o Tridente e clique em DESTRANCAR!" }
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
      title: "A Encruzilhada dos Salgueiros",
      subtitle: "Escolha a trilha guiada pelos espíritos",
      description: "A floresta se desdobra em três caminhos envoltos por musgos cintilantes.",
      paths: [
        {
          id: "path_left",
          title: "Trilha dos Espinhos Escuros",
          desc: "Galhos entrelaçados e névoa densa com aroma acre.",
          isCorrect: false,
          failMessage: "Os espinhos se fecharam impedindo a passagem!"
        },
        {
          id: "path_center",
          title: "Clareira dos Vaga-lumes",
          desc: "Luzes esmeraldas dançam indicando uma vereda suave de pedras musgosas.",
          isCorrect: true,
          successMessage: "Os vaga-lumes abriram caminho e revelaram o selo secreto da floresta!"
        },
        {
          id: "path_right",
          title: "Caminho dos Cogumelos Roxos",
          desc: "Esporos tóxicos flutuam adormecendo quem respira o ar.",
          isCorrect: false,
          failMessage: "O pó de esporos causou tontura forçando o recuo!"
        }
      ],
      clue: {
        id: "clue_f1",
        type: "direction",
        title: "Direção do Bosque",
        value: "NORTE",
        icon: "🧭",
        description: "A brisa sopra em direção à estrela do norte."
      },
      hints: [
        { level: 1, cost: 0, text: "Siga as criaturas de luz que acolhem os viajantes gentis." },
        { level: 2, cost: 20, text: "Espinhos e esporos roxos oferecem perigo evidente." },
        { level: 3, cost: 40, text: "O caminho correto é a Clareira dos Vaga-lumes (meio)." }
      ],
      reward: 110
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "forest",
      type: "memory",
      title: "As Runas Botânicas",
      subtitle: "Encontre os pares das plantas místicas",
      description: "Memorize e revele os 4 pares de flores sagradas para despertar a fonte mágica.",
      pairs: [
        { id: "lotus", name: "Lótus Estelar", icon: "🪷" },
        { id: "mushroom", name: "Cogumelo Astral", icon: "🍄" },
        { id: "herb", name: "Trevo de Quatro Folhas", icon: "🍀" },
        { id: "flower", name: "Orquídea Solar", icon: "🌸" }
      ],
      clue: {
        id: "clue_f2",
        type: "symbol",
        title: "Símbolo Botânico",
        value: "🍀 Trevo Dourado",
        icon: "🍀",
        description: "A insígnia floral gravada na casca da Mãe Árvore."
      },
      hints: [
        { level: 1, cost: 0, text: "Vire duas cartas por vez com calma para lembrar a posição." },
        { level: 2, cost: 20, text: "Concentre-se nos cantos superiores primeiro." },
        { level: 3, cost: 40, text: "Revele todas as 4 combinações para obter a pista." }
      ],
      reward: 130
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "forest",
      type: "symbol_puzzle",
      title: "O Círculo dos Menires Élficos",
      subtitle: "Ative as pedras antigas na ordem correta",
      description: "Toque os monumentos megalíticos respeitando o ciclo da vida: Broto 🌱 -> Flor 🌸 -> Fruto 🍎 -> Semente 🌰.",
      targetSequence: ["seedling", "flower", "fruit", "seed"],
      symbols: [
        { id: "fruit", label: "Fruto", icon: "🍎" },
        { id: "seedling", label: "Broto", icon: "🌱" },
        { id: "seed", label: "Semente", icon: "🌰" },
        { id: "flower", label: "Flor", icon: "🌸" }
      ],
      clue: {
        id: "clue_f3",
        type: "number",
        title: "Número Sagrado",
        value: "88",
        icon: "🔢",
        description: "A idade de anéis do tronco ancião."
      },
      hints: [
        { level: 1, cost: 0, text: "O ciclo biológico: germinação, florescimento, maturação, renovação." },
        { level: 2, cost: 20, text: "Ordem: Broto, Flor, Fruto e Semente." },
        { level: 3, cost: 40, text: "Clique nos botões na ordem: 🌱, 🌸, 🍎, 🌰." }
      ],
      reward: 140
    },
    {
      id: 4,
      phaseNumber: 4,
      mapId: "forest",
      type: "question",
      title: "O Sussurro da Mãe Árvore",
      subtitle: "Desafio de sabedoria ecológica",
      description: "A dríade milenar surge no tronco gigante e pede que você responda à pergunta do equilíbrio vital.",
      questionKey: "forest_4",
      clue: {
        id: "clue_f4",
        type: "word",
        title: "Palavra de Passe",
        value: "RAÍZES",
        icon: "🌿",
        description: "O segredo oculto sob a terra fértil."
      },
      hints: [
        { level: 1, cost: 0, text: "Pense na imensidão dos oceanos e seres fotossintetizantes invisíveis." },
        { level: 2, cost: 20, text: "O fitoplâncton oceânico gera a maior fração do ar que respiramos." },
        { level: 3, cost: 40, text: "A resposta correta é a alternativa sobre o fitoplâncton nos oceanos." }
      ],
      reward: 150
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "forest",
      type: "find_object",
      title: "A Fruta da Imortalidade",
      subtitle: "Busca na copa da floresta mágica",
      description: "Encontre a rara Maçã Dourada escondida entre a folhagem iluminada pelas fadas.",
      targetItemName: "Maçã Dourada",
      items: [
        { id: "leaf", name: "Folha Estelar", x: 18, y: 35, isTarget: false, icon: "🍃" },
        { id: "golden_apple", name: "Maçã Dourada", x: 70, y: 55, isTarget: true, icon: "🍏" },
        { id: "butterfly", name: "Borboleta de Luz", x: 45, y: 25, isTarget: false, icon: "🦋" },
        { id: "squirrel", name: "Esquilo Mensageiro", x: 82, y: 80, isTarget: false, icon: "🐿️" },
        { id: "feather", name: "Pena de Fênix", x: 30, y: 72, isTarget: false, icon: "🪶" }
      ],
      clue: {
        id: "clue_f5",
        type: "coord",
        title: "Coordenada Florestal",
        value: "Eixo 5-2",
        icon: "📍",
        description: "A raiz mestra no cuadrante 5-2 da clareira."
      },
      hints: [
        { level: 1, cost: 0, text: "A fruta brilha com reflexo esmeralda e dourado no lado direito." },
        { level: 2, cost: 20, text: "Procure acima da altura média, pendurada num ramo." },
        { level: 3, cost: 40, text: "Clique na maçã esmeralda brilhante no ponto 70% X, 55% Y!" }
      ],
      reward: 160
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "forest",
      type: "code",
      title: "O Código do Vento Verde",
      subtitle: "Decifre o cálculo dos anéis de crescimento",
      description: "O monólito silvestre diz: 'Some as 4 estações aos 8 ventos e multiplique pelas 3 fadas guardiãs'.",
      calculation: "(4 + 8) * 3 = 36",
      targetCode: "36",
      clue: {
        id: "clue_f6",
        type: "code",
        title: "Chave Final",
        value: "36",
        icon: "🗝️",
        description: "A ressonância necessária para deslacrar o altar."
      },
      hints: [
        { level: 1, cost: 0, text: "Primeiro some 4 + 8 = 12." },
        { level: 2, cost: 20, text: "Multiplique 12 por 3." },
        { level: 3, cost: 40, text: "O código é 36." }
      ],
      reward: 170
    },
    {
      id: 7,
      phaseNumber: 7,
      mapId: "forest",
      type: "final_riddle",
      title: "O Altar do Guardião Verde",
      subtitle: "Desperte o baú coberto por raízes ancestrais",
      description: "O baú de mogno e esmeralda repousa sob a copa da Mãe Árvore. Sincronize os elementos da floresta para abrir o tesouro!",
      finalRequirements: {
        direction: "NORTE",
        symbol: "clover",
        number: "88",
        word: "RAÍZES",
        code: "36"
      },
      hints: [
        { level: 1, cost: 0, text: "Use as anotações do pergaminho mágico à esquerda." },
        { level: 2, cost: 20, text: "Direção: NORTE | Palavra: RAÍZES | Símbolo: Trevo | Código: 36." },
        { level: 3, cost: 40, text: "Ajuste a bússola para o NORTE, selecione o Trevo, digite 36 e destranque o baú!" }
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
      title: "Os Hieróglifos de Rá",
      subtitle: "Decifre a inscrição celestial no portal",
      description: "Organize os símbolos sagrados do amanhecer ao anoitecer: Sol ☀️ -> Escaravelho 🪲 -> Olho de Hórus 👁️ -> Lua 🌙.",
      targetSequence: ["sun", "scarab", "eye", "moon"],
      symbols: [
        { id: "eye", label: "Olho de Hórus", icon: "👁️" },
        { id: "moon", label: "Lua Cheia", icon: "🌙" },
        { id: "sun", label: "Sol Alado", icon: "☀️" },
        { id: "scarab", label: "Escaravelho", icon: "🪲" }
      ],
      clue: {
        id: "clue_t1",
        type: "symbol",
        title: "Símbolo Sagrado",
        value: "👁️ Olho de Hórus",
        icon: "👁️",
        description: "O olho protetor que afasta maldições."
      },
      hints: [
        { level: 1, cost: 0, text: "O sol nasce primeiro, o escaravelho rola o dia, o olho observa e a lua repousa." },
        { level: 2, cost: 20, text: "Sequência: Sol, Escaravelho, Olho e Lua." },
        { level: 3, cost: 40, text: "Toque nos símbolos: ☀️, 🪲, 👁️, 🌙." }
      ],
      reward: 130
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "temple",
      type: "coordinates",
      title: "O Pátio das Lajes Armadilhadas",
      subtitle: "Calcule a laje segura sem ativar os dardos",
      description: "Pise na laje sagrada indicada pelo papiro do arquiteto real: Coluna 5, Linha 2 (Quadrante E-2).",
      targetCoord: { x: 5, y: 2 },
      gridSize: 6,
      clue: {
        id: "clue_t2",
        type: "coord",
        title: "Câmara de Ouro",
        value: "Laje 5-2",
        icon: "📐",
        description: "A placa sem contrapesos mortais."
      },
      hints: [
        { level: 1, cost: 0, text: "Coluna 5 fica quase na extrema direita; Linha 2 fica perto do topo." },
        { level: 2, cost: 20, text: "Procure o cruzamento da 5ª coluna com a 2ª linha." },
        { level: 3, cost: 40, text: "Clique exatamente na célula [Linha 2, Coluna 5]." }
      ],
      reward: 140
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "temple",
      type: "difference",
      title: "Os Dois Guardiões de Arenito",
      subtitle: "Encontre a estátua que guarda o anel de pedra",
      description: "Observe as estátuas gêmeas de Anúbis. Apenas uma possui o amuleto entalhado no cetro sagrado!",
      options: [
        { id: "statue_left", title: "Guardião da Esquerda", desc: "Cetro liso com pátina de areia cinzenta.", isCorrect: false },
        { id: "statue_right", title: "Guardião da Direita", desc: "Cetro adornado com anel de lápis-lazúli e ouro cintilante.", isCorrect: true }
      ],
      clue: {
        id: "clue_t3",
        type: "direction",
        title: "Direção do Santuário",
        value: "LESTE",
        icon: "🧭",
        description: "Onde o sol surge no horizonte das dunas."
      },
      hints: [
        { level: 1, cost: 0, text: "A estátua correta tem um detalhe azul de lápis-lazúli." },
        { level: 2, cost: 20, text: "Olhe para a mão direita da estátua à direita." },
        { level: 3, cost: 40, text: "Escolha o Guardião da Direita!" }
      ],
      reward: 150
    },
    {
      id: 4,
      phaseNumber: 4,
      mapId: "temple",
      type: "code",
      title: "A Cripta dos Números Sagrados",
      subtitle: "Resolva a equação geométrica da pirâmide",
      description: "Os sacerdotes escreveram na parede: '4 lados da base vezes 10 mandamentos mais 17 degraus'.",
      calculation: "4 * 10 + 17 = 57",
      targetCode: "57",
      clue: {
        id: "clue_t4",
        type: "number",
        title: "Código de Gizé",
        value: "57",
        icon: "🔢",
        description: "Os giros do cilindro no sarcófago."
      },
      hints: [
        { level: 1, cost: 0, text: "Calcule 4 x 10 = 40." },
        { level: 2, cost: 20, text: "Some 40 + 17." },
        { level: 3, cost: 40, text: "O código é 57." }
      ],
      reward: 160
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "temple",
      type: "path_choice",
      title: "O Salão dos Três Portais",
      subtitle: "Evite o abismo das serpentes",
      description: "Três passagens se abrem sob tochas crepitantes.",
      paths: [
        {
          id: "path_left",
          title: "Portal do Chacal",
          desc: "Ecos de correntes e piso falso com estacas.",
          isCorrect: false,
          failMessage: "O piso desabou revelando um fosso de areia movediça!"
        },
        {
          id: "path_center",
          title: "Portal da Serpente",
          desc: "Silvo contínuo ecoando nas frestas das paredes.",
          isCorrect: false,
          failMessage: "Nuvens de poeira ancestral bloquearam a entrada!"
        },
        {
          id: "path_right",
          title: "Portal do Falcão Dourado",
          desc: "Luz solar reflete nos espelhos polidos de bronze até a câmara interior.",
          isCorrect: true,
          successMessage: "A luz guiou seus passos com segurança através do corredor majestoso!"
        }
      ],
      clue: {
        id: "clue_t5",
        type: "word",
        title: "Glifo Sagrado",
        value: "SOLARIS",
        icon: "☀️",
        description: "A essência da luz triunfante sobre as sombras."
      },
      hints: [
        { level: 1, cost: 0, text: "A luz solar indica o caminho ventilado e seguro." },
        { level: 2, cost: 20, text: "O portal do falcão dourado reflete espelhos de bronze." },
        { level: 3, cost: 40, text: "Escolha o Portal do Falcão Dourado (à direita)." }
      ],
      reward: 170
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "temple",
      type: "question",
      title: "O Enigma da Esfinge Imortal",
      subtitle: "Conhecimento das maravilhas antigas",
      description: "A esfinge de arenito bloqueia a entrada do tesouro com uma última pergunta sobre o legado da humanidade.",
      questionKey: "temple_6",
      clue: {
        id: "clue_t6",
        type: "key",
        title: "Chave do Sarcófago",
        value: "SELO DE RÁ",
        icon: "🔑",
        description: "O lacre dourado que protege o baú milenar."
      },
      hints: [
        { level: 1, cost: 0, text: "Pense na única maravilha antiga que resistiu aos milênios e ainda pode ser visitada no Egito." },
        { level: 2, cost: 20, text: "Fica perto do Cairo, com seus blocos colossais de pedra calcária." },
        { level: 3, cost: 40, text: "A resposta é a Grande Pirâmide de Gizé." }
      ],
      reward: 180
    },
    {
      id: 7,
      phaseNumber: 7,
      mapId: "temple",
      type: "final_riddle",
      title: "O Sarcófago de Ouro Maciço",
      subtitle: "Abra o maior tesouro do faraó perdido",
      description: "As tochas se inflamam e revelam o cofre de lápis-lazúli e ouro puro. Insira os dados milenares para libertar a riqueza acumulada!",
      finalRequirements: {
        direction: "LESTE",
        symbol: "eye",
        number: "57",
        word: "SOLARIS",
        code: "57"
      },
      hints: [
        { level: 1, cost: 0, text: "Verifique suas 5 pistas no papiro sagrado à esquerda." },
        { level: 2, cost: 20, text: "Direção: LESTE | Palavra: SOLARIS | Símbolo: Olho de Hórus | Número: 57." },
        { level: 3, cost: 40, text: "Aponte a bússola para o LESTE, escolha o Olho de Hórus, insira 57 e desfrute do tesouro!" }
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
      title: "Os Glifos do Gelo Eterno",
      subtitle: "Encontre os pares dos prismas polares",
      description: "Desvire as placas congeladas e encontre os pares de cristais árticos.",
      pairs: [
        { id: "snowflake", name: "Estrela de Neve", icon: "❄️" },
        { id: "gem", name: "Safira do Ártico", icon: "💎" },
        { id: "crystal", name: "Cristal Prismático", icon: "🔮" },
        { id: "comet", name: "Cometa Polar", icon: "☄️" }
      ],
      clue: {
        id: "clue_fr1",
        type: "symbol",
        title: "Símbolo de Gelo",
        value: "💎 Safira Polar",
        icon: "💎",
        description: "O núcleo lapidado no coração da geleira."
      },
      hints: [
        { level: 1, cost: 0, text: "Memorize a posição dos símbolos ao desvirar." },
        { level: 2, cost: 20, text: "Forme pares com calma sem pressa." },
        { level: 3, cost: 40, text: "Complete todos os 4 pares para receber a pista." }
      ],
      reward: 130
    },
    {
      id: 2,
      phaseNumber: 2,
      mapId: "frozen",
      type: "symbol_puzzle",
      title: "Os Cristais Cantantes da Caverna",
      subtitle: "Reproduza a harmonia dos 4 cristais",
      description: "Toque os cristais na ordem da sinfonia das geadas: Azul 🔷 -> Ciano 🔹 -> Roxo 🟣 -> Branco ⚪.",
      targetSequence: ["blue", "cyan", "purple", "white"],
      symbols: [
        { id: "white", label: "Branco Estelar", icon: "⚪" },
        { id: "purple", label: "Ametista Polar", icon: "🟣" },
        { id: "blue", label: "Safira Profunda", icon: "🔷" },
        { id: "cyan", label: "Gelo Fino", icon: "🔹" }
      ],
      clue: {
        id: "clue_fr2",
        type: "number",
        title: "Temperatura Sagrada",
        value: "42",
        icon: "🔢",
        description: "O grau exato de refração do feixe de luz."
      },
      hints: [
        { level: 1, cost: 0, text: "Dos tons mais profundos aos mais claros." },
        { level: 2, cost: 20, text: "Ordem: Azul Profundo, Ciano, Roxo e Branco Estelar." },
        { level: 3, cost: 40, text: "Toque nos botões: 🔷, 🔹, 🟣, ⚪." }
      ],
      reward: 140
    },
    {
      id: 3,
      phaseNumber: 3,
      mapId: "frozen",
      type: "difference",
      title: "A Tapeçaria do Trono de Gelo",
      subtitle: "Identifique o vitral com o prisma autêntico",
      description: "Compare os dois vitrais reais esculpidos em gelo cristalino.",
      options: [
        { id: "vitral_left", title: "Vitral da Rainha do Inverno", desc: "Reflete as luzes da aurora boreal com um cristal lapidado de 8 pontas.", isCorrect: true },
        { id: "vitral_right", title: "Vitral do Lobo das Neves", desc: "Gelo opaco com rachaduras causadas pelas tempestades do sul.", isCorrect: false }
      ],
      clue: {
        id: "clue_fr3",
        type: "direction",
        title: "Rumo da Aurora",
        value: "SUL",
        icon: "🧭",
        description: "Em direção às cavernas térmicas protegidas."
      },
      hints: [
        { level: 1, cost: 0, text: "Procure o vitral que emite as cores completas da aurora." },
        { level: 2, cost: 20, text: "O vitral da esquerda tem a lapidação de 8 pontas perfeita." },
        { level: 3, cost: 40, text: "Selecione o Vitral da Rainha do Inverno (esquerda)." }
      ],
      reward: 150
    },
    {
      id: 4,
      phaseNumber: 4,
      mapId: "frozen",
      type: "question",
      title: "O Fenômeno dos Céus Polares",
      subtitle: "Ciência e mistérios do firmamento",
      description: "O guardião do gelo testa sua compreensão sobre os céus multicoloridos que iluminam o reino.",
      questionKey: "frozen_4",
      clue: {
        id: "clue_fr4",
        type: "word",
        title: "Palavra Secreta",
        value: "AURORA",
        icon: "🌌",
        description: "O espetáculo de luzes celestes do norte."
      },
      hints: [
        { level: 1, cost: 0, text: "A aurora não é mero reflexo do gelo na terra." },
        { level: 2, cost: 20, text: "Ela surge da interação do vento solar com os gases da atmosfera terrestre." },
        { level: 3, cost: 40, text: "A resposta correta menciona partículas solares carregadas colidindo na atmosfera." }
      ],
      reward: 160
    },
    {
      id: 5,
      phaseNumber: 5,
      mapId: "frozen",
      type: "path_choice",
      title: "A Travessia da Ponte dos Ventos",
      subtitle: "Caminhe com cuidado sobre os blocos de gelo",
      description: "Três passagens cortam o desfiladeiro abissal de gelo azul.",
      paths: [
        {
          id: "path_left",
          title: "Ponte de Gelo Transparente",
          desc: "Camada fina que estala com o menor peso corporal.",
          isCorrect: false,
          failMessage: "O gelo fino trincou sob seus pés forçando um retorno rápido!"
        },
        {
          id: "path_center",
          title: "Passagem das Estalactites",
          desc: "Blocos de granito cobertos por permafrost sólido e firme há séculos.",
          isCorrect: true,
          successMessage: "A rocha resistiu firme permitindo uma travessia gloriosa!"
        },
        {
          id: "path_right",
          title: "Trilha da Cornija de Neve",
          desc: "Neve fofa com risco iminente de avalanche ao menor ruído.",
          isCorrect: false,
          failMessage: "Um deslizamento de neve bloqueou a trilha!"
        }
      ],
      clue: {
        id: "clue_fr5",
        type: "coord",
        title: "Coordenada Polar",
        value: "Zona Ártica 9",
        icon: "📍",
        description: "A câmara oculta no pico mais alto da montanha."
      },
      hints: [
        { level: 1, cost: 0, text: "Evite superfícies finas que estalam e neves propensas a avalanche." },
        { level: 2, cost: 20, text: "O permafrost sólido com base de pedra é a rota mais segura." },
        { level: 3, cost: 40, text: "Escolha a Passagem das Estalactites (meio)." }
      ],
      reward: 170
    },
    {
      id: 6,
      phaseNumber: 6,
      mapId: "frozen",
      type: "code",
      title: "O Código do Zero Absoluto",
      subtitle: "Calcule a fusão dos cristais",
      description: "A placa diz: '7 cristais vezes 6 facetas mais o número das 3 luas polares'.",
      calculation: "7 * 6 + 3 = 45",
      targetCode: "45",
      clue: {
        id: "clue_fr6",
        type: "code",
        title: "Chave do Gelo",
        value: "45",
        icon: "🔢",
        description: "A combinação do anel externo do baú polar."
      },
      hints: [
        { level: 1, cost: 0, text: "7 x 6 = 42." },
        { level: 2, cost: 20, text: "42 + 3 = 45." },
        { level: 3, cost: 40, text: "O código é 45." }
      ],
      reward: 180
    },
    {
      id: 7,
      phaseNumber: 7,
      mapId: "frozen",
      type: "final_riddle",
      title: "O Baú do Coração de Diamante",
      subtitle: "Quebre o selo de gelo eterno",
      description: "Sob o brilho mágico da aurora boreal, o baú de diamante e platina aguarda a convergência das 5 pistas lendárias!",
      finalRequirements: {
        direction: "SUL",
        symbol: "gem",
        number: "42",
        word: "AURORA",
        code: "45"
      },
      hints: [
        { level: 1, cost: 0, text: "Consulte o pergaminho de evidências polares à esquerda." },
        { level: 2, cost: 20, text: "Direção: SUL | Palavra: AURORA | Símbolo: Safira | Código: 45." },
        { level: 3, cost: 40, text: "Gire a bússola para o SUL, selecione a Safira, digite 45 e liberte o tesouro congelado!" }
      ],
      reward: 500
    }
  ]
};
