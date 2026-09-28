export const questionsBank = {
  pirates_2: {
    id: "pirates_q2",
    title: "Tradições Náuticas & Estrelas",
    scenario: "O timoneiro observa o céu noturno para calibrar o astrolábio e pergunta qual ponto cardeal guia os navegadores no hemisfério sul:",
    options: [
      { id: "A", text: "Estrela Polar (Polaris)" },
      { id: "B", text: "Constelação do Cruzeiro do Sul" },
      { id: "C", text: "Cinturão de Órion" },
      { id: "D", text: "Planeta Vênus (Estrela D'Alva)" }
    ],
    correctAnswer: "B",
    explanation: "O Cruzeiro do Sul é a principal constelação utilizada para orientação no hemisfério sul desde a época das Grandes Navegações!",
    reward: 120,
    penalty: 1,
    clueGiven: {
      id: "clue_pirates_2",
      type: "word",
      label: "Palavra de Comando",
      value: "AVANTE",
      icon: "📜"
    }
  },

  forest_4: {
    id: "forest_q4",
    title: "O Mistério da Seiva Dourada",
    scenario: "A fada guardiã pousa sobre um cogumelo e testa seu conhecimento ecológico sobre os pulmões da Terra:",
    options: [
      { id: "A", text: "A maior parte do oxigênio do planeta é gerada pelas microalgas nos oceanos (fitoplâncton)" },
      { id: "B", text: "As árvores produzem oxigênio somente durante a noite fria" },
      { id: "C", text: "As plantas não respiram oxigênio em nenhuma circunstância" },
      { id: "D", text: "Apenas plantas carnívoras realizam a fotossíntese" }
    ],
    correctAnswer: "A",
    explanation: "Mais de 50% do oxigênio atmosférico que respiramos provém do fitoplâncton nos oceanos através da fotossíntese aquática!",
    reward: 140,
    penalty: 1,
    clueGiven: {
      id: "clue_forest_4",
      type: "word",
      label: "Frase Silvestre",
      value: "RAÍZES",
      icon: "🌿"
    }
  },

  temple_6: {
    id: "temple_q6",
    title: "O Enigma dos Monumentos Antigos",
    scenario: "A esfinge de arenito acende os olhos e lança sua pergunta clássica de lógica e história:",
    options: [
      { id: "A", text: "Qual das Maravilhas do Mundo Antigo ainda permanece de pé?" },
      { id: "B", text: "Os Jardins Suspensos da Babilônia" },
      { id: "C", text: "A Grande Pirâmide de Gizé" },
      { id: "D", text: "O Colosso de Rodes" }
    ],
    // The question is structured so options A is the question prompt continuation or choices
    questionText: "Qual das lendárias Sete Maravilhas do Mundo Antigo é a única que ainda permanece de pé até os dias de hoje?",
    choices: [
      { id: "A", text: "Farol de Alexandria" },
      { id: "B", text: "Jardins Suspensos da Babilônia" },
      { id: "C", text: "Grande Pirâmide de Gizé" },
      { id: "D", text: "Colosso de Rodes" }
    ],
    correctAnswer: "C",
    explanation: "A Grande Pirâmide de Gizé, construída há mais de 4.500 anos no Egito, é a única das sete maravilhas clássicas que sobreviveu ao tempo!",
    reward: 160,
    penalty: 1,
    clueGiven: {
      id: "clue_temple_6",
      type: "word",
      label: "Glifo Sagrado",
      value: "SOLARIS",
      icon: "☀️"
    }
  },

  frozen_4: {
    id: "frozen_q4",
    title: "O Segredo da Aurora Boreal",
    scenario: "O astrônomo do castelo de gelo pergunta qual fenômeno cósmico dá origem às cores mágicas da aurora nos céus polares:",
    choices: [
      { id: "A", text: "Reflexo da luz solar nas montanhas de gelo puro" },
      { id: "B", text: "Partículas solares carregadas colidindo com os gases da atmosfera terrestre" },
      { id: "C", text: "Gases vulcânicos congelados em altitudes elevadas" },
      { id: "D", text: "Incêndios florestais refletidos na camada de ozônio" }
    ],
    correctAnswer: "B",
    explanation: "A aurora boreal ocorre quando ventos solares cheios de elétrons e prótons colidem com átomos de oxigênio e nitrogênio na alta atmosfera!",
    reward: 150,
    penalty: 1,
    clueGiven: {
      id: "clue_frozen_4",
      type: "word",
      label: "Palavra Polar",
      value: "AURORA",
      icon: "🌌"
    }
  }
};
