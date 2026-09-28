import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Check, X } from 'lucide-react';
import { characters } from '../../data/characters';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function CharacterCreator({ onClose }) {
  const addCustomCharacter = useGameStore(state => state.addCustomCharacter);
  const setSelectedCharacter = useGameStore(state => state.setSelectedCharacter);

  const [name, setName] = useState('Novo Herói');
  const initialType = characters && characters.length ? characters[0].type : 'Aventureiro';
  const [type, setType] = useState(initialType);
  const [description, setDescription] = useState('Um herói criado pelo jogador.');
  const [hairColor, setHairColor] = useState('#2C1810');
  const [outfitColor, setOutfitColor] = useState('#8B0000');

  const handleCreate = () => {
    const idBase = slugify(name) || `hero-${Date.now()}`;
    const id = `${idBase}-${Date.now().toString().slice(-4)}`;

    const newChar = {
      id,
      name,
      type,
      title: 'Criado pelo Jogador',
      color: outfitColor,
      accentColor: hairColor,
      description,
      ability: 'Habilidade Única',
      abilityDesc: 'Habilidade criada pelo jogador',
      quote: 'Forjado pela curiosidade.',
      stats: { agilidade: 6, sabedoria: 6, coragem: 6 },
      defaultCustomization: {
        hairColor,
        outfitColor,
        aura: 'none',
        auraColor: 'transparent',
        accessory: 'none',
        hat: 'none',
        weapon: 'none'
      }
    };

    addCustomCharacter(newChar);
    setSelectedCharacter(newChar.id);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl parchment-dark p-6 rounded-3xl border-2 border-amber-500/40 shadow-2xl z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-cinzel font-black text-amber-200">Criar Novo Personagem</h3>
            <span className="text-xs text-amber-300/80">Adicione um herói personalizado ao seu jogo</span>
          </div>
          <button onClick={onClose} className="text-amber-300/80 hover:text-amber-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs text-amber-300 font-bold">Nome</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-100" />
          </div>
          <div>
            <label className="text-xs text-amber-300 font-bold">Tipo</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-100">
              {Array.from(new Set(characters.map(c => c.type))).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
              <option value="Outro">Outro...</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-amber-300 font-bold">Descrição</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-100" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs text-amber-300 font-bold">Cor do Cabelo</label>
            <input type="color" value={hairColor} onChange={e => setHairColor(e.target.value)} className="w-full h-10 mt-1 p-0 rounded-lg" />
          </div>
          <div>
            <label className="text-xs text-amber-300 font-bold">Cor do Traje</label>
            <input type="color" value={outfitColor} onChange={e => setOutfitColor(e.target.value)} className="w-full h-10 mt-1 p-0 rounded-lg" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.02 }} onClick={handleCreate} className="py-2.5 px-4 gold-gradient-btn rounded-xl font-cinzel font-black text-sm flex items-center gap-2">
            <Check className="w-4 h-4" /> Criar
          </motion.button>
          <button onClick={onClose} className="py-2.5 px-4 bg-slate-900 rounded-xl border border-slate-700 text-amber-300 text-sm">Cancelar</button>
        </div>
      </motion.div>
    </div>
  );
}
