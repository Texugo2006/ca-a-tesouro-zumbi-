import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { characters } from '../../data/characters';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import Character from '../Character';
import { Check, Sparkles, Wand2, ArrowLeft, Shield, Palette } from 'lucide-react';

export default function CharacterEditor({ onConfirm, onBack }) {
  const { selectedCharacter, customization, setCustomization, customCharacters, setCharacterAnimation } = useGameStore();
  const [localAnim, setLocalAnim] = React.useState('idle');

  const allCharacters = [...characters, ...(customCharacters || [])];
  const hero = allCharacters.find(c => c.id === selectedCharacter) || allCharacters[0] || characters[0];

  const hairColors = [
    { label: "Castanho", color: "#2C1810" },
    { label: "Negro", color: "#0D0D1A" },
    { label: "Rubro", color: "#8B0000" },
    { label: "Dourado", color: "#F4C542" },
    { label: "Púrpura", color: "#6B2FAA" },
    { label: "Verde", color: "#1A5E35" },
    { label: "Carmesim", color: "#C63C3C" },
    { label: "Prateado", color: "#E0E0E0" }
  ];

  const outfitColors = [
    { label: "Escarlate", color: "#8B0000" },
    { label: "Sombra", color: "#1A0030" },
    { label: "Místico", color: "#4A0080" },
    { label: "Couro", color: "#8B4513" },
    { label: "Esmeralda", color: "#1E8449" },
    { label: "Zafira", color: "#1A5276" },
    { label: "Ouro Real", color: "#B8860B" },
    { label: "Petróleo", color: "#0E6655" }
  ];

  const auraOptions = [
    { id: "none", label: "Sem Aura", color: "transparent" },
    { id: "flame", label: "Fogo Ardente", color: "#C63C3C" },
    { id: "gold", label: "Ouro Solar", color: "#F4C542" },
    { id: "arcane", label: "Gelo Celeste", color: "#6DD5FA" },
    { id: "nature", label: "Esmeralda", color: "#2ECC71" },
    { id: "shadow", label: "Sombra Abissal", color: "#9B59B6" }
  ];

  // adiciona opção 67 com gradiente RGB colorido
  auraOptions.push({ id: "67", label: "67", color: "linear-gradient(90deg, rgb(255,0,0), rgb(255,165,0), rgb(255,255,0), rgb(0,128,0), rgb(0,0,255), rgb(75,0,130))" });

  const hatOptions = [
    { id: "none", label: "Nenhum" },
    { id: "bandana", label: "Bandana" },
    { id: "tricorn", label: "Chapéu Pirata" },
    { id: "witch_hat", label: "Chapéu de Maga" },
    { id: "hood", label: "Capuz Silvestre" },
    { id: "fedora", label: "Chapéu Explorador" },
    { id: "scholar_cap", label: "Boina de Erudito" }
  ];

  const handleHairChange = (color) => {
    setCustomization({ hairColor: color });
    sound.playClick();
  };

  const handleOutfitChange = (color) => {
    setCustomization({ outfitColor: color });
    sound.playClick();
  };

  const handleAuraChange = (opt) => {
    setCustomization({ aura: opt.id, auraColor: opt.color });
    sound.playSpecial();

    // Se escolher a opção 67, anima o personagem levantando e descendo a mão
    if (opt.id === '67' && typeof setCharacterAnimation === 'function') {
      setCharacterAnimation('raise_hand');
      setTimeout(() => {
        setCharacterAnimation('idle');
      }, 1200);
    }
    // also trigger local preview animation so the preview reacts immediately
    if (opt.id === '67') {
      setLocalAnim('raise_hand');
      setTimeout(() => setLocalAnim('idle'), 1200);
    }
  };

  const handleHatChange = (hatId) => {
    setCustomization({ hat: hatId });
    sound.playClick();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      <style>{`
        @keyframes rgb-anim {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .rgb-anim {
          background-size: 200% 200%;
          animation: rgb-anim 4s linear infinite;
        }
      `}</style>
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 rounded-xl text-amber-300 font-cinzel text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="text-center">
          <span className="text-[11px] font-cinzel font-bold text-amber-400 uppercase tracking-widest">
            Ateliê do Aventureiro
          </span>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-black text-amber-200">
            Personalizar Personagem
          </h2>
        </div>

        <div className="w-20" /> {/* Spacer */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {/* Left Column: Live Character Showcase Preview */}
        <div className="md:col-span-5 parchment-dark p-6 rounded-3xl border-2 border-amber-500/50 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-cinzel font-bold">
            Pré-visualização em Tempo Real
          </div>

          <div className="w-48 h-60 sm:w-56 sm:h-72 flex items-center justify-center mt-6 mb-2">
            <Character
              characterId={hero.id}
              customization={customization}
                size="xl"
                animationType={localAnim}
            />
          </div>

          <h3 className="text-xl font-cinzel font-bold text-amber-300">
            {hero.name}
          </h3>
          <span className="text-xs text-amber-400/80 font-medium">
            {hero.type} • {hero.title}
          </span>
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div className="md:col-span-7 parchment-dark p-6 rounded-3xl border-2 border-amber-500/50 shadow-2xl space-y-5">
          {/* 1. Hair Color Palette */}
          <div>
            <label className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5 mb-2.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" /> Cor do Cabelo
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {hairColors.map((hc) => {
                const isSelected = customization.hairColor === hc.color;
                return (
                  <button
                    key={hc.color}
                    onClick={() => handleHairChange(hc.color)}
                    className={`h-9 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                      isSelected ? 'border-amber-300 scale-110 shadow-lg' : 'border-slate-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: hc.color }}
                    title={hc.label}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Outfit Color Palette */}
          <div>
            <label className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5 mb-2.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Cor do Traje / Armadura
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {outfitColors.map((oc) => {
                const isSelected = customization.outfitColor === oc.color;
                return (
                  <button
                    key={oc.color}
                    onClick={() => handleOutfitChange(oc.color)}
                    className={`h-9 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                      isSelected ? 'border-amber-300 scale-110 shadow-lg' : 'border-slate-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: oc.color }}
                    title={oc.label}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Aura of Power */}
          <div>
            <label className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Aura de Poder
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {auraOptions.map((ao) => {
                const isSelected = customization.aura === ao.id;
                const isRgb = ao.id === '67';
                return (
                  <button
                    key={ao.id}
                    onClick={() => handleAuraChange(ao)}
                    className={`px-3 py-2 rounded-xl border text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-amber-500/40'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${isRgb ? 'rgb-anim' : ''}`}
                      style={isRgb ? { background: ao.color } : { backgroundColor: ao.color }}
                    />
                    <span>{ao.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Hat / Headpiece */}
          <div>
            <label className="text-xs font-cinzel font-bold text-amber-300 flex items-center gap-1.5 mb-2.5">
              <span>👑</span> Chapéu / Acessório
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {hatOptions.map((ho) => {
                const isSelected = (customization.hat || 'none') === ho.id;
                return (
                  <button
                    key={ho.id}
                    onClick={() => handleHatChange(ho.id)}
                    className={`px-2.5 py-2 rounded-xl border text-xs font-cinzel font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-amber-500/40'
                    }`}
                  >
                    {ho.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confirmation Button */}
          <div className="pt-3 border-t border-amber-500/20">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sound.playCorrect();
                if (onConfirm) onConfirm();
              }}
              className="w-full py-3.5 gold-gradient-btn rounded-xl font-cinzel font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <Check className="w-5 h-5" />
              <span>CONFIRMAR PERSONAGEM</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
