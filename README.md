# CAÇA-TESOURO ZUMBI — Desafio SeaWeb SENAI

> Jogo educativo de caça ao tesouro com temática zumbi pós-apocalíptica, desenvolvido como projeto somativo da disciplina de Desenvolvimento Web do SENAI.

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Como Funciona](#como-funciona)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Créditos](#créditos)

---

## Sobre o Projeto

**Caça-Tesouro Zumbi** é um Progressive Web App (PWA) desenvolvido em React que simula uma missão de sobrevivência em um mundo pós-apocalíptico dominado por zumbis. O jogador escolhe seu personagem, seleciona uma zona de missão e enfrenta uma série de desafios (fases) para encontrar o tesouro escondido.

O projeto foi desenvolvido para o **Desafio SeaWeb** do SENAI, atendendo a todos os requisitos técnicos da atividade somativa **5.01-FR-97 v.4**.

**Professor responsável:** @marianyMorais  
**Prazo de entrega:** 06/12/2026

---

## Como Funciona

### Fluxo do Jogo

```
Tela Inicial (Home)
     ↓
Seleção de Personagem
     ↓
Seleção de Zona (Mapa)
     ↓
Fases do Mapa (1 a N fases por zona)
     ↓
Tesouro Encontrado!
```

### As 4 Zonas de Missão

| Zona | Dificuldade | Ambiente |
|------|-------------|----------|
| Terminal Urbano Infectado | Iniciante | Distrito Central · Ruas Sob Quarentena |
| Bosque Contaminado | Intermediário | Mata Fechada · Pântano & Carcaças |
| Hospital de Quarentena | Avançado | Alas Isoladas · Necrotério & Subsolo |
| Bunker Militar Selado | Expert | Complexo Secreto · Laboratório Viral |

### Tipos de Fases

Cada zona contém fases de tipos variados:

| Tipo | Descrição |
|------|-----------|
| `question` | Perguntas de múltipla escolha com personagem narrador |
| `code` | Decifrando códigos secretos |
| `memory` | Jogo da memória com símbolos |
| `symbol_puzzle` | Quebra-cabeça de símbolos |
| `path_choice` | Escolha de rota de fuga |
| `wire_cutter` | Desarmamento de armadilha |
| `coordinates` | Navegação por coordenadas |
| `find_object` | Encontre o objeto escondido |
| `difference` | Encontre as diferenças |
| `final_riddle` | Charada final do tesouro |
| `botanical_choice` | Identificação de plantas/recursos |
| `triage` | Triagem médica de sobreviventes |
| `frequency` | Decodificação de frequência de rádio |

### Sistema de Pontuação

- Resposta correta: +pontos base (varia por fase)
- Bônus de velocidade: +pontos extras por responder rápido
- Dica usada: -50% dos pontos da fase
- Vida perdida: ataque zumbi animado

### Sistema de Vidas

- O jogador começa com **3 vidas**
- Erros e ataques zumbi custam vidas
- Modo **Vidas Infinitas** disponível (toggle no HUD)
- **Game Over** ao perder todas as vidas

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 18.x | Framework principal |
| **Vite** | 8.3.0 | Build tool e dev server |
| **Tailwind CSS** | 3.x | Estilização utilitária |
| **Framer Motion** | 11.x | Animações e transições |
| **Zustand** | 5.x | Gerenciamento de estado global |
| **Lucide React** | latest | Ícones vetoriais |
| **Service Worker** | — | Suporte offline (PWA) |

---

## Como Rodar o Projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- **Node.js** v18 ou superior → [nodejs.org](https://nodejs.org)
- **npm** v9 ou superior (já vem com o Node.js)
- **Git** → [git-scm.com](https://git-scm.com)

### Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/Texugo2006/ca-a-tesouro-zumbi-.git
cd ca-a-tesouro-zumbi-
```

#### 2. Instale as dependências

```bash
npm install
```

#### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

#### 4. Abra no navegador

Acesse: **[http://localhost:5173](http://localhost:5173)**

---

### Scripts Disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot-reload |
| `npm run build` | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Visualiza o build de produção localmente |

---

## Estrutura do Projeto

```
caca-tesouro/
├── public/
│   ├── manifest.json         # Manifesto PWA
│   ├── sw.js                 # Service Worker (offline)
│   └── assets/               # Imagens e recursos estáticos
├── src/
│   ├── animations/
│   │   ├── particles.jsx     # Animação de partículas de fundo
│   │   └── variants.js       # Variantes Framer Motion
│   ├── components/
│   │   ├── Character/        # Avatar SVG do personagem
│   │   ├── CharacterCreator/ # Criador de personagem customizado
│   │   ├── CharacterEditor/  # Editor de personagem
│   │   ├── CharacterSelector/# Seletor de personagem na Home
│   │   ├── Common/
│   │   │   ├── GeolocationRadar.jsx  # Widget GPS
│   │   │   ├── NetworkStatus.jsx     # Badge online/offline
│   │   │   └── TacticalIcon.jsx      # Adaptador de ícones
│   │   ├── DifficultySelector.jsx    # Seletor de dificuldade
│   │   ├── GameHUD/          # HUD durante as fases (vidas, score, etc.)
│   │   ├── GrandPrizeModal.jsx       # Modal do prêmio final
│   │   ├── HintSystem/       # Sistema de dicas
│   │   ├── Inventory/
│   │   │   └── InventoryModal.jsx    # Inventário com drag & drop
│   │   ├── LeaderboardModal.jsx      # Placar de líderes
│   │   ├── Modals/           # Modais gerais
│   │   ├── Phase/            # Componentes de cada tipo de fase
│   │   │   ├── BotanicalChoicePhase.jsx
│   │   │   ├── CodePhase.jsx
│   │   │   ├── CoordinatesPhase.jsx
│   │   │   ├── DifferencePhase.jsx
│   │   │   ├── FinalRiddlePhase.jsx
│   │   │   ├── FindObjectPhase.jsx
│   │   │   ├── FrequencyPhase.jsx
│   │   │   ├── MemoryPhase.jsx
│   │   │   ├── PathChoicePhase.jsx
│   │   │   ├── QuestionPhase.jsx
│   │   │   ├── SymbolPuzzlePhase.jsx
│   │   │   ├── TriagePhase.jsx
│   │   │   └── WireCutterPhase.jsx
│   │   ├── PhaseScoreModal.jsx       # Modal de pontuação pós-fase
│   │   ├── TreasureChest/    # Animação do baú do tesouro
│   │   ├── TreasureMap/      # Tela do mapa da zona
│   │   ├── ZombieAttackModal.jsx     # Modal de ataque zumbi
│   │   └── ZombieHorde/
│   │       └── ZombieEncounter.jsx  # Mini-game de encontro com zumbi
│   ├── data/
│   │   ├── characters.js     # Dados dos personagens jogáveis
│   │   ├── maps.js           # Dados das 4 zonas/mapas
│   │   ├── operators.js      # Operadores matemáticos (CodePhase)
│   │   ├── phases.js         # Definição de todas as fases
│   │   └── questions.js      # Banco de perguntas de quiz
│   ├── hooks/                # Custom React hooks
│   ├── pages/
│   │   ├── Home.jsx          # Tela inicial (seleção de zona/personagem)
│   │   └── GamePhasePage.jsx # Tela de jogo em fase
│   ├── services/
│   │   └── soundEngine.js    # Motor de efeitos sonoros
│   ├── store/
│   │   └── useGameStore.js   # Store Zustand (estado global + persistência)
│   ├── utils/
│   │   └── difficultyAdapter.js # Adaptador de dificuldade por fase
│   ├── App.jsx               # Componente raiz + roteamento de telas
│   ├── index.css             # Estilos globais e Tailwind
│   └── main.jsx              # Entry point React
├── index.html                # HTML raiz (com registro do SW)
├── package.json              # Dependências e scripts
├── vite.config.js            # Configuração do Vite
└── README.md                 # Este arquivo
```

---

## Funcionalidades

### Gameplay
- 4 zonas com dificuldades progressivas
- 13 tipos de fases diferentes (quiz, memória, puzzle, etc.)
- Sistema de vidas com eventos dramáticos de ataque zumbi
- Pontuação com bônus de velocidade
- Inventário de pistas com drag & drop para reordenar
- Sistema de dicas com penalidade de pontos
- Modo Vidas Infinitas para treino

### Progressão
- Salvamento automático no localStorage (persiste ao fechar o browser)
- Continuar de onde parou ao voltar ao jogo
- Novo Jogo reseta todo o progresso
- Reset por Zona reseta apenas a zona selecionada
- Placar de Líderes com ranking local
- Prêmio Final ao completar todas as 4 zonas

### Personagem
- 5 personagens pré-definidos com lore próprio
- Editor de personagem com customizações visuais
- Criador de personagem do zero

### PWA / Mobile
- Progressive Web App — pode ser instalado como app
- Suporte offline via Service Worker
- Responsivo — funciona em mobile, tablet e desktop
- Badge de status de rede (Online/Offline em tempo real)
- Radar de Geolocalização via GPS do dispositivo

---

## Créditos

| Papel | Responsável |
|-------|-------------|
| Desenvolvimento | Kaique Daniel |
| Orientação / Avaliação | @marianyMorais |
| Instituição | SENAI — Serviço Nacional de Aprendizagem Industrial |
| Disciplina | Desenvolvimento Web — Projeto Somativo |
| Entrega | 06/12/2026 |
