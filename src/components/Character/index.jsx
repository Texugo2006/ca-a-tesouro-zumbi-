import { motion } from 'framer-motion';
import { characterAnimations } from '../../animations/variants';
import { useGameStore } from '../../store/useGameStore';

// small animated hand element reused across avatars
const Hand = ({ animationType, color, offsetX = 72, offsetY = 60, scale = 1 }) => {
  const raise = animationType === 'raise_hand';
  const transformAttr = `translate(${offsetX}, ${offsetY}) scale(${scale})`;
  return (
    <motion.g
      transform={transformAttr}
      initial={{ y: 0 }}
      animate={raise ? { y: [-2, -22, -8, 0], rotate: [0, -12, 10, 0] } : { y: 0 }}
      transition={{ duration: 1.0 }}
    >
      {/* simple arm */}
      <path d="M-6,6 Q0,0 6,-6" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      {/* palm */}
      <circle cx="10" cy="-8" r="4.2" fill={color} opacity="0.95" />
      {/* fingers */}
      <path d="M8,-11 Q10,-13 13,-12" stroke="#fff" strokeWidth="1" fill="none" opacity="0.25" strokeLinecap="round" />
    </motion.g>
  );
};

const Hat = ({ hatId = 'none', color = '#F4C542', offsetX = 50, offsetY = 12, scale = 1 }) => {
  if (!hatId || hatId === 'none') return null;
  const transformAttr = `translate(${offsetX}, ${offsetY}) scale(${scale})`;
  switch (hatId) {
    case 'bandana':
      return (
        <g transform={transformAttr}>
          <rect x="-22" y="-6" width="44" height="10" rx="5" fill={color} opacity="0.95" />
          <path d="M18,-2 Q26,0 20,6" fill={color} opacity="0.9" />
        </g>
      );
    case 'tricorn':
      return (
        <g transform={transformAttr}>
          <path d="M-28,0 Q0,-28 28,0 Q0,-8 -28,0Z" fill={color} opacity="0.95" />
          <rect x="-20" y="0" width="40" height="6" rx="3" fill={color} opacity="0.9" />
        </g>
      );
    case 'witch_hat':
      return (
        <g transform={transformAttr}>
          <path d="M-20,0 Q0,-36 20,0 Z" fill={color} opacity="0.95" />
          <ellipse cx="0" cy="2" rx="26" ry="6" fill={color} opacity="0.9" />
        </g>
      );
    case 'hood':
      return (
        <g transform={transformAttr}>
          <path d="M-30,0 Q-20,-18 0,-24 Q20,-18 30,0 Q0,6 -30,0Z" fill={color} opacity="0.85" />
        </g>
      );
    case 'fedora':
      return (
        <g transform={transformAttr}>
          <ellipse cx="0" cy="4" rx="30" ry="6" fill={color} opacity="0.95" />
          <rect x="-12" y="-18" width="24" height="18" rx="6" fill={color} opacity="0.95" />
        </g>
      );
    case 'scholar_cap':
      return (
        <g transform={transformAttr}>
          <rect x="-20" y="-18" width="40" height="8" rx="2" fill={color} opacity="0.95" />
          <rect x="-10" y="-10" width="20" height="8" fill={color} opacity="0.95" />
        </g>
      );
    default:
      return null;
  }
};

// SVG avatar components for each character
const avatars = {
  kael: ({ color, customization, animationType }) => {
    const hairColor = customization?.hairColor || '#2C1810';
    const outfitColor = customization?.outfitColor || '#8B0000';
    const auraColor = customization?.auraColor || color || '#F4C542';

    return (
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="kaelBlade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0E6ED" />
            <stop offset="45%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#B0BCCE" />
            <stop offset="100%" stopColor="#7B8B9E" />
          </linearGradient>
          <linearGradient id="kaelGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="60%" stopColor="#F4C542" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="kaelCape" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={outfitColor} />
            <stop offset="100%" stopColor="#4A0000" />
          </linearGradient>
          <linearGradient id="kaelSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE1D2" />
            <stop offset="100%" stopColor="#F5C0A8" />
          </linearGradient>
        </defs>

        {/* Dynamic Cape with Shading Folds */}
        <path d="M22,58 L10,114 Q30,118 50,114 Q70,118 90,114 L78,58 Z" fill="url(#kaelCape)" />
        <path d="M22,58 L12,113 L28,115 L32,60 Z" fill="#3D0000" opacity="0.4" />
        <path d="M78,58 L88,113 L72,115 L68,60 Z" fill="#3D0000" opacity="0.4" />
        <path d="M46,62 L48,114 L52,114 L54,62 Z" fill="#2A0000" opacity="0.3" />

        {/* Torso / Tunic & Armor Cuirass */}
        <path d="M28,58 L32,106 L68,106 L72,58 Z" fill={outfitColor} />
        {/* Armor Plate */}
        <path d="M33,60 L35,88 L50,96 L65,88 L67,60 Z" fill="#1C1A24" stroke="url(#kaelGold)" strokeWidth="1.5" />
        <path d="M40,64 L42,82 L50,88 L58,82 L60,64 Z" fill="#282634" />
        <line x1="50" y1="64" x2="50" y2="87" stroke="url(#kaelGold)" strokeWidth="1" opacity="0.7" />

        {/* Belt & Gold Buckle */}
        <rect x="30" y="94" width="40" height="7" rx="2" fill="#3E2723" />
        <rect x="45" y="92.5" width="10" height="10" rx="2" fill="url(#kaelGold)" />
        <rect x="47" y="94.5" width="6" height="6" rx="1" fill="#3E2723" />

        {/* Neck */}
        <rect x="44" y="48" width="12" height="12" rx="3" fill="#E8B098" />
        {/* Scarf / Collar */}
        <path d="M36,54 Q50,62 64,54 Q50,58 36,54 Z" fill="url(#kaelGold)" />

        {/* Head Base */}
        <path d="M32,32 C32,50 38,58 50,60 C62,58 68,50 68,32 C68,18 32,18 32,32 Z" fill="url(#kaelSkin)" />

        {/* Face Blush / Shadow */}
        <ellipse cx="38" cy="46" rx="4" ry="2" fill="#E28F79" opacity="0.4" />
        <ellipse cx="62" cy="46" rx="4" ry="2" fill="#E28F79" opacity="0.4" />

        {/* Confident Eyebrows */}
        <path d="M36,33 Q43,30 46,34" stroke="#1A0D08" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M64,33 Q57,30 54,34" stroke="#1A0D08" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Expressive Anime/RPG Eyes */}
        <g>
          {/* Sclera & outline */}
          <path d="M36,37 Q42,34 46,39 Q41,43 36,37 Z" fill="#FFFFFF" />
          <path d="M64,37 Q58,34 54,39 Q59,43 64,37 Z" fill="#FFFFFF" />
          <path d="M35,36 Q42,33 47,38" stroke="#1A0D08" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M65,36 Q58,33 53,38" stroke="#1A0D08" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Crimson Iris */}
          <ellipse cx="42" cy="38.5" rx="3.2" ry="3.5" fill="#8B0000" />
          <ellipse cx="58" cy="38.5" rx="3.2" ry="3.5" fill="#8B0000" />
          <ellipse cx="42" cy="38.5" rx="2" ry="2.2" fill="#C62828" />
          <ellipse cx="58" cy="38.5" rx="2" ry="2.2" fill="#C62828" />
          <circle cx="42" cy="38.5" r="1.2" fill="#1A0000" />
          <circle cx="58" cy="38.5" r="1.2" fill="#1A0000" />
          {/* Eye Shine Highlights */}
          <circle cx="41" cy="37" r="1" fill="#FFFFFF" />
          <circle cx="57" cy="37" r="1" fill="#FFFFFF" />
          <circle cx="43.5" cy="40" r="0.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="59.5" cy="40" r="0.5" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* Nose & Smile */}
        <path d="M49,43 L51,45 L49,46" stroke="#D38C75" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M45,50 Q50,54 55,50" stroke="#9E4E38" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* Hero Scar */}
        <line x1="60" y1="36" x2="64" y2="44" stroke="#D32F2F" strokeWidth="1.3" opacity="0.75" />

        {/* Stylish Layered Hair */}
        <g fill={hairColor}>
          {/* Back hair spikes */}
          <path d="M26,30 L20,38 L28,40 Z" />
          <path d="M74,30 L80,38 L72,40 Z" />
          {/* Top volume */}
          <path d="M30,28 C28,14 44,8 50,9 C58,8 72,14 70,28 C66,16 56,14 50,14 C44,14 34,17 30,28 Z" />
          {/* Front bangs and locks */}
          <path d="M30,26 Q40,16 48,27 Q42,22 36,32 Z" />
          <path d="M70,26 Q60,16 52,27 Q58,22 64,32 Z" />
          <path d="M46,16 Q50,28 53,24 Q48,22 46,16 Z" />
          {/* Hair shine */}
          <path d="M38,18 Q48,13 60,18" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35" />
        </g>

        {/* Shoulder Pauldrons */}
        <path d="M22,58 Q16,66 22,72 L32,64 Z" fill="url(#kaelGold)" stroke="#664600" strokeWidth="0.8" />
        <path d="M78,58 Q84,66 78,72 L68,64 Z" fill="url(#kaelGold)" stroke="#664600" strokeWidth="0.8" />

        {/* Legendary Runic Sword */}
        <g>
          {/* Blade */}
          <path d="M76,24 L79,20 L82,24 L82,68 L76,68 Z" fill="url(#kaelBlade)" />
          {/* Fuller & Rune line */}
          <line x1="79" y1="24" x2="79" y2="64" stroke="#5D6D7E" strokeWidth="0.8" />
          <line x1="79" y1="32" x2="79" y2="52" stroke={auraColor} strokeWidth="1.2" opacity="0.9" />
          {/* Crossguard with Wings */}
          <path d="M71,68 Q79,64 87,68 L85,73 Q79,70 73,73 Z" fill="url(#kaelGold)" stroke="#78350F" strokeWidth="0.6" />
          <circle cx="79" cy="70" r="1.8" fill={auraColor} />
          {/* Grip */}
          <rect x="77.5" y="73" width="3" height="12" rx="1" fill="#2E1B0E" />
          <line x1="77.5" y1="76" x2="80.5" y2="76" stroke="url(#kaelGold)" strokeWidth="0.6" />
          <line x1="77.5" y1="80" x2="80.5" y2="80" stroke="url(#kaelGold)" strokeWidth="0.6" />
          {/* Pommel */}
          <circle cx="79" cy="87" r="3.2" fill="url(#kaelGold)" />
          <circle cx="79" cy="87" r="1.6" fill="#C62828" />
        </g>

        <Hand animationType={animationType} color={auraColor} offsetX={72} offsetY={45} scale={1} />
        <Hat hatId={customization?.hat} color={auraColor} offsetX={50} offsetY={14} scale={0.95} />
      </svg>
    );
  },

  shadow: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Dark aura */}
      <ellipse cx="50" cy="100" rx="35" ry="8" fill={color} opacity="0.3" />
      {/* Body/robe */}
      <path d="M20,60 L30,110 L70,110 L80,60 Q65,70 50,68 Q35,70 20,60Z" fill={customization?.outfitColor || '#1A0030'} />
      {/* Head */}
      <circle cx="50" cy="42" r="20" fill="#FDBCB4" />
      {/* Mask lower half */}
      <rect x="32" y="48" width="36" height="18" rx="4" fill="#1A0030" opacity="0.9" />
      {/* Hair/hood */}
      <path d="M30,38 Q50,18 70,38 L68,28 Q50,16 32,28Z" fill={customization?.hairColor || '#0d0d1a'} />
      {/* Glowing eyes */}
      <ellipse cx="43" cy="42" rx="4" ry="3" fill={color} />
      <ellipse cx="57" cy="42" rx="4" ry="3" fill={color} />
      <ellipse cx="43" cy="42" rx="2" ry="1.5" fill="white" opacity="0.8" />
      <ellipse cx="57" cy="42" rx="2" ry="1.5" fill="white" opacity="0.8" />
      {/* Throwing stars */}
      <polygon points="88,30 90,24 92,30 98,28 93,33 95,39 90,35 85,39 87,33 82,28" fill="#888" />
      <polygon points="12,50 14,44 16,50 22,48 17,53 19,59 14,55 9,59 11,53 6,48" fill="#888" opacity="0.7" />
      {/* Scarf */}
      <path d="M32,54 Q50,62 68,54 Q68,60 50,66 Q32,60 32,54Z" fill={color} opacity="0.6" />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={72} offsetY={45} scale={1} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={14} scale={0.95} />
    </svg>
  ),

  lyra: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Magic circle on ground */}
      <ellipse cx="50" cy="108" rx="30" ry="6" fill={color} opacity="0.3" />
      <ellipse cx="50" cy="108" rx="22" ry="4" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Robe */}
      <path d="M25,62 L20,110 L80,110 L75,62 Q60,72 50,70 Q40,72 25,62Z" fill={customization?.outfitColor || '#4A0080'} />
      {/* Star decorations on robe */}
      <text x="38" y="90" fontSize="8" fill={color} opacity="0.8">✦</text>
      <text x="54" y="85" fontSize="6" fill={color} opacity="0.6">✧</text>
      {/* Head */}
      <circle cx="50" cy="42" r="21" fill="#FFE4D6" />
      {/* Long hair */}
      <path d="M29,42 L22,80 Q26,85 30,80 L32,55Z" fill={customization?.hairColor || '#6B2FAA'} />
      <path d="M71,42 L78,80 Q74,85 70,80 L68,55Z" fill={customization?.hairColor || '#6B2FAA'} />
      <path d="M29,38 Q50,16 71,38 Q71,26 50,20 Q29,26 29,38Z" fill={customization?.hairColor || '#6B2FAA'} />
      {/* Eyes */}
      <ellipse cx="43" cy="43" rx="4" ry="4.5" fill="#6B2FAA" />
      <ellipse cx="57" cy="43" rx="4" ry="4.5" fill="#6B2FAA" />
      <circle cx="44" cy="42" r="1.5" fill="white" />
      <circle cx="58" cy="42" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M44,53 Q50,58 56,53" stroke="#c0756b" strokeWidth="1.5" fill="none" />
      {/* Staff */}
      <rect x="76" y="20" width="3" height="80" rx="1.5" fill="#6B2FAA" />
      <circle cx="77" cy="18" r="7" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="77" cy="18" r="4" fill={color} opacity="0.8" />
      {/* Hat */}
      <path d="M30,36 Q50,6 70,36Z" fill={customization?.hairColor || '#6B2FAA'} />
      <rect x="25" y="35" width="50" height="5" rx="2" fill={customization?.hairColor || '#5a2088'} />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={72} offsetY={70} scale={0.95} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={14} scale={1.05} />
    </svg>
  ),

  redd: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Body */}
      <rect x="28" y="60" width="44" height="48" rx="4" fill={customization?.outfitColor || '#8B4513'} />
      {/* Coat */}
      <path d="M24,62 L18,110 L38,110 L38,65Z" fill={color} opacity="0.85" />
      <path d="M76,62 L82,110 L62,110 L62,65Z" fill={color} opacity="0.85" />
      {/* Vest stripes */}
      <rect x="44" y="62" width="12" height="46" fill="#F4C542" opacity="0.3" />
      {/* Head */}
      <circle cx="50" cy="43" r="22" fill="#DEB887" />
      {/* Hat */}
      <rect x="24" y="26" width="52" height="6" rx="3" fill="#2C1810" />
      <rect x="30" y="14" width="40" height="16" rx="4" fill={customization?.hat !== 'none' ? color : '#2C1810'} />
      <rect x="32" y="24" width="36" height="4" fill="#F4C542" opacity="0.7" />
      {/* Hair under hat */}
      <path d="M30,32 L26,42 Q28,44 30,42 L31,34Z" fill={customization?.hairColor || '#8B4513'} />
      <path d="M70,32 L74,42 Q72,44 70,42 L69,34Z" fill={customization?.hairColor || '#8B4513'} />
      {/* Eyes */}
      <circle cx="43" cy="45" r="3.5" fill="#2C1810" />
      <circle cx="57" cy="45" r="3.5" fill="#2C1810" />
      <circle cx="44" cy="44" r="1" fill="white" />
      <circle cx="58" cy="44" r="1" fill="white" />
      {/* Beard */}
      <path d="M38,54 Q50,65 62,54 Q60,62 50,66 Q40,62 38,54Z" fill={customization?.hairColor || '#6B3A2A'} />
      {/* Sword */}
      <rect x="12" y="60" width="3" height="45" rx="1" fill="#888" />
      <rect x="6" y="72" width="15" height="3" rx="1" fill="#F4C542" />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={20} offsetY={70} scale={0.95} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={10} scale={0.95} />
    </svg>
  ),

  hana: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Kimono/Hakama */}
      <path d="M22,62 L18,110 L82,110 L78,62 Q60,74 50,72 Q40,74 22,62Z" fill={customization?.outfitColor || '#641E16'} />
      {/* Obi belt */}
      <rect x="28" y="76" width="44" height="8" rx="2" fill="#F4C542" opacity="0.9" />
      <circle cx="50" cy="80" r="5" fill={color} />
      {/* Head */}
      <circle cx="50" cy="42" r="20" fill="#FFF0E8" />
      {/* Hair bun */}
      <circle cx="50" cy="22" r="10" fill={customization?.hairColor || '#1a0a00'} />
      <path d="M35,36 Q50,18 65,36 Q65,24 50,20 Q35,24 35,36Z" fill={customization?.hairColor || '#1a0a00'} />
      {/* Kanzashi (hair ornament) */}
      <line x1="42" y1="18" x2="38" y2="10" stroke={color} strokeWidth="1.5" />
      <circle cx="38" cy="9" r="3" fill={color} />
      <line x1="50" y1="14" x2="50" y2="6" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="5" r="3" fill="#F4C542" />
      {/* Eyes */}
      <path d="M38,44 Q43,40 48,44" stroke="#1a0a00" strokeWidth="2" fill="none" />
      <path d="M52,44 Q57,40 62,44" stroke="#1a0a00" strokeWidth="2" fill="none" />
      <circle cx="43" cy="45" r="2.5" fill="#1a0a00" />
      <circle cx="57" cy="45" r="2.5" fill="#1a0a00" />
      {/* Gentle smile */}
      <path d="M44,54 Q50,57 56,54" stroke="#c0756b" strokeWidth="1.5" fill="none" />
      {/* Katana */}
      <rect x="70" y="18" width="3" height="70" rx="1" fill="#CCC" />
      <rect x="62" y="42" width="18" height="4" rx="2" fill="#F4C542" />
      <rect x="70" y="14" width="3" height="8" rx="1" fill="#8B4513" />
      {/* Cherry blossom */}
      <circle cx="20" cy="50" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <text x="14" y="56" fontSize="14" opacity="0.6">🌸</text>
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={70} offsetY={66} scale={0.85} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={12} scale={0.88} />
    </svg>
  ),

  zira: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Forest spirits around */}
      <text x="5" y="45" fontSize="10" opacity="0.5">✦</text>
      <text x="82" y="60" fontSize="8" opacity="0.4">✧</text>
      {/* Body/tunic */}
      <path d="M28,62 L24,110 L76,110 L72,62 Q60,70 50,68 Q40,70 28,62Z" fill={customization?.outfitColor || '#1A5E35'} />
      {/* Leaf decorations */}
      <text x="30" y="80" fontSize="10" opacity="0.7">🍃</text>
      <text x="58" y="90" fontSize="8" opacity="0.6">🍃</text>
      {/* Head */}
      <circle cx="50" cy="42" r="21" fill="#DEB887" />
      {/* Pointed ear (elf) */}
      <path d="M28,40 L22,33 L27,38Z" fill="#DEB887" />
      <path d="M72,40 L78,33 L73,38Z" fill="#DEB887" />
      {/* Hair */}
      <path d="M29,38 Q50,18 71,38 Q70,24 50,18 Q30,24 29,38Z" fill={customization?.hairColor || '#1A5E35'} />
      {/* Hair ponytail */}
      <path d="M65,38 L78,65 Q80,70 76,65 L72,45Z" fill={customization?.hairColor || '#1A5E35'} />
      {/* Leaf headband */}
      <rect x="28" y="37" width="44" height="5" rx="2" fill={color} opacity="0.7" />
      {/* Eyes */}
      <ellipse cx="43" cy="44" rx="3.5" ry="4" fill={color} />
      <ellipse cx="57" cy="44" rx="3.5" ry="4" fill={color} />
      <circle cx="44" cy="43" r="1.5" fill="white" />
      <circle cx="58" cy="43" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M44,53 Q50,57 56,53" stroke="#8B5E3C" strokeWidth="1.5" fill="none" />
      {/* Bow */}
      <path d="M78,20 Q82,35 78,50" stroke="#8B4513" strokeWidth="3" fill="none" />
      <line x1="78" y1="20" x2="78" y2="50" stroke="#ccc" strokeWidth="0.5" />
      <line x1="75" y1="34" x2="90" y2="30" stroke="#F4C542" strokeWidth="1.5" />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={76} offsetY={60} scale={0.95} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={12} scale={0.95} />
    </svg>
  ),

  nova: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Body */}
      <rect x="28" y="62" width="44" height="46" rx="5" fill={customization?.outfitColor || '#784212'} />
      {/* Explorer vest */}
      <rect x="38" y="62" width="24" height="46" fill={color} opacity="0.4" />
      {/* Pockets */}
      <rect x="30" y="72" width="8" height="8" rx="1" fill={color} opacity="0.6" />
      <rect x="62" y="72" width="8" height="8" rx="1" fill={color} opacity="0.6" />
      {/* Head */}
      <circle cx="50" cy="44" r="21" fill="#DEB887" />
      {/* Explorer hat */}
      <ellipse cx="50" cy="27" rx="28" ry="5" fill={customization?.hat !== 'none' ? color : '#5D4037'} />
      <rect x="28" y="20" width="44" height="10" rx="4" fill={customization?.hat !== 'none' ? color : '#6D4C41'} />
      {/* Hair */}
      <path d="M30,32 L26,44 Q28,46 30,44 L32,34Z" fill={customization?.hairColor || '#5D4037'} />
      <path d="M70,32 L74,44 Q72,46 70,44 L68,34Z" fill={customization?.hairColor || '#5D4037'} />
      {/* Eyes */}
      <circle cx="43" cy="46" r="3.5" fill="#4A2C0A" />
      <circle cx="57" cy="46" r="3.5" fill="#4A2C0A" />
      <circle cx="44" cy="45" r="1.2" fill="white" />
      <circle cx="58" cy="45" r="1.2" fill="white" />
      {/* Freckles */}
      <circle cx="40" cy="50" r="1" fill="#B8860B" opacity="0.6" />
      <circle cx="45" cy="51" r="0.8" fill="#B8860B" opacity="0.6" />
      <circle cx="55" cy="51" r="0.8" fill="#B8860B" opacity="0.6" />
      <circle cx="60" cy="50" r="1" fill="#B8860B" opacity="0.6" />
      {/* Smile */}
      <path d="M43,55 Q50,60 57,55" stroke="#8B5E3C" strokeWidth="1.5" fill="none" />
      {/* Map/compass */}
      <circle cx="20" cy="75" r="10" fill="#F2E3C6" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="65" x2="20" y2="85" stroke="#888" strokeWidth="1" />
      <line x1="10" y1="75" x2="30" y2="75" stroke="#888" strokeWidth="1" />
      <circle cx="20" cy="75" r="2" fill="#C63C3C" />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={72} offsetY={70} scale={1} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={12} scale={1.0} />
    </svg>
  ),

  brak: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Earth aura */}
      <ellipse cx="50" cy="110" rx="38" ry="7" fill={color} opacity="0.25" />
      {/* Body - large/muscular */}
      <rect x="20" y="58" width="60" height="50" rx="6" fill={customization?.outfitColor || '#1A5276'} />
      {/* Armor plates */}
      <rect x="20" y="58" width="20" height="22" rx="3" fill={color} opacity="0.5" />
      <rect x="60" y="58" width="20" height="22" rx="3" fill={color} opacity="0.5" />
      <rect x="34" y="58" width="32" height="8" rx="2" fill="#F4C542" opacity="0.6" />
      {/* Head - bigger */}
      <circle cx="50" cy="42" r="24" fill="#C68642" />
      {/* Hair */}
      <path d="M26,38 Q50,14 74,38 Q74,22 50,16 Q26,22 26,38Z" fill={customization?.hairColor || '#1a0a00'} />
      {/* Beard */}
      <path d="M34,54 Q50,70 66,54 Q64,64 50,68 Q36,64 34,54Z" fill={customization?.hairColor || '#2C1810'} />
      {/* Eyes */}
      <circle cx="42" cy="44" r="4" fill="#1a0a00" />
      <circle cx="58" cy="44" r="4" fill="#1a0a00" />
      <circle cx="43" cy="43" r="1.5" fill="white" />
      <circle cx="59" cy="43" r="1.5" fill="white" />
      {/* Eyebrows */}
      <path d="M38,38 Q42,36 46,38" stroke="#1a0a00" strokeWidth="2" fill="none" />
      <path d="M54,38 Q58,36 62,38" stroke="#1a0a00" strokeWidth="2" fill="none" />
      {/* Hammer weapon */}
      <rect x="74" y="55" width="5" height="50" rx="2" fill="#888" />
      <rect x="68" y="50" width="17" height="22" rx="3" fill={color} />
      <rect x="69" y="54" width="15" height="4" fill="#F4C542" opacity="0.6" />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={78} offsetY={66} scale={1.15} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={12} scale={1.05} />
    </svg>
  ),

  teo: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Body */}
      <rect x="28" y="62" width="44" height="46" rx="4" fill={customization?.outfitColor || '#784212'} />
      {/* Scholar coat */}
      <path d="M28,62 L22,110 L38,110 L38,65Z" fill="#2C1810" opacity="0.7" />
      <path d="M72,62 L78,110 L62,110 L62,65Z" fill="#2C1810" opacity="0.7" />
      {/* Book */}
      <rect x="10" y="70" width="16" height="22" rx="2" fill={color} />
      <rect x="11" y="71" width="14" height="20" rx="1" fill="#F2E3C6" />
      <line x1="18" y1="71" x2="18" y2="91" stroke={color} strokeWidth="2" />
      {/* Head */}
      <circle cx="50" cy="42" r="20" fill="#DEB887" />
      {/* Glasses */}
      <circle cx="43" cy="43" r="7" fill="none" stroke="#888" strokeWidth="1.5" />
      <circle cx="57" cy="43" r="7" fill="none" stroke="#888" strokeWidth="1.5" />
      <line x1="50" y1="43" x2="50" y2="43" stroke="#888" strokeWidth="1.5" />
      <line x1="36" y1="43" x2="32" y2="41" stroke="#888" strokeWidth="1.5" />
      <line x1="64" y1="43" x2="68" y2="41" stroke="#888" strokeWidth="1.5" />
      {/* Eyes behind glasses */}
      <circle cx="43" cy="43" r="3" fill="#4A2C0A" />
      <circle cx="57" cy="43" r="3" fill="#4A2C0A" />
      <circle cx="44" cy="42" r="1" fill="white" />
      <circle cx="58" cy="42" r="1" fill="white" />
      {/* Hair */}
      <path d="M30,36 Q50,16 70,36 Q70,24 50,18 Q30,24 30,36Z" fill={customization?.hairColor || '#5D4037'} />
      {/* Side hair */}
      <path d="M30,36 L26,50 Q28,52 30,50 L32,38Z" fill={customization?.hairColor || '#5D4037'} />
      {/* Smile */}
      <path d="M44,53 Q50,57 56,53" stroke="#8B5E3C" strokeWidth="1.5" fill="none" />
      {/* Telescope */}
      <rect x="68" y="50" width="20" height="6" rx="3" fill="#888" />
      <rect x="80" y="48" width="8" height="10" rx="2" fill={color} />
      <circle cx="68" cy="53" r="4" fill="#6DD5FA" opacity="0.7" />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={74} offsetY={70} scale={0.9} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={12} scale={0.95} />
    </svg>
  ),

  vesper: ({ color, customization, animationType }) => (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      {/* Shadow clone */}
      <ellipse cx="38" cy="108" rx="14" ry="5" fill={color} opacity="0.2" />
      {/* Body */}
      <rect x="28" y="62" width="44" height="46" rx="4" fill={customization?.outfitColor || '#0E6655'} />
      {/* Thief jacket */}
      <path d="M36,62 L30,75 L40,75 L40,110 L34,110 L28,62Z" fill={color} opacity="0.5" />
      {/* Belt with tools */}
      <rect x="28" y="82" width="44" height="5" rx="2" fill="#888" />
      <circle cx="40" cy="84" r="3" fill="#F4C542" />
      <circle cx="60" cy="84" r="3" fill="#F4C542" />
      {/* Head */}
      <circle cx="50" cy="42" r="20" fill="#6DBEAA" />
      {/* Bandit mask */}
      <rect x="30" y="40" width="40" height="10" rx="3" fill="#0E6655" />
      {/* Sly eyes */}
      <path d="M34,43 Q40,38 46,43" stroke="white" strokeWidth="1" fill="none" />
      <path d="M54,43 Q60,38 66,43" stroke="white" strokeWidth="1" fill="none" />
      <circle cx="40" cy="44" r="3" fill="white" />
      <circle cx="60" cy="44" r="3" fill="white" />
      <circle cx="40" cy="44" r="1.5" fill="#0E6655" />
      <circle cx="60" cy="44" r="1.5" fill="#0E6655" />
      {/* Hair */}
      <path d="M30,38 Q50,18 70,38 Q70,24 50,18 Q30,24 30,38Z" fill={customization?.hairColor || '#1a0a00'} />
      {/* Smirk */}
      <path d="M44,56 Q52,60 60,55" stroke="#2C7A6A" strokeWidth="1.5" fill="none" />
      {/* Daggers */}
      <line x1="80" y1="55" x2="80" y2="75" stroke="#CCC" strokeWidth="3" />
      <polygon points="80,50 77,56 83,56" fill="#CCC" />
      <rect x="77" y="68" width="6" height="4" rx="1" fill={color} />
      <Hand animationType={animationType} color={customization?.auraColor || color} offsetX={80} offsetY={60} scale={0.9} />
      <Hat hatId={customization?.hat} color={customization?.auraColor || '#F4C542'} offsetX={50} offsetY={12} scale={0.9} />
    </svg>
  ),
};

export default function Character({
  characterId = 'kael',
  customization = {},
  size = 'md',
  animationType = 'idle',
  className = '',
}) {
  const sizeClasses = {
    xs: 'w-12 h-14',
    sm: 'w-20 h-24',
    md: 'w-32 h-38',
    lg: 'w-48 h-56',
    xl: 'w-64 h-72',
  };

  const AvatarComponent = avatars[characterId] || avatars.kael;
  const animations = characterAnimations[characterId] || characterAnimations.kael;
  const charColor = customization.auraColor || '#F4C542';

  // get global animation state from the store and active selectedCharacter
  const { characterAnimation, selectedCharacter } = useGameStore();

  const effectiveAnimationType = (characterId === selectedCharacter && characterAnimation) ? characterAnimation : animationType;

  const getAnimation = () => {
    if (effectiveAnimationType === 'idle') return animations.idle;
    if (effectiveAnimationType === 'success') return { animate: animations.success };
    if (effectiveAnimationType === 'error') return { animate: animations.error };
    if (effectiveAnimationType === 'special') return { animate: animations.special };
    if (effectiveAnimationType === 'raise_hand') {
      if (animations.raise_hand) return { animate: animations.raise_hand };
      return { animate: { y: [0, -14, -6, 0], rotate: [0, -8, 8, 0], transition: { duration: 1.0 } } };
    }
    return animations.idle;
  };

  const anim = getAnimation();
  // debug: log when raise_hand is active for this character
  try {
    if (effectiveAnimationType === 'raise_hand') {
      // eslint-disable-next-line no-console
      console.log(`[Character] ${characterId} effectiveAnimation=raise_hand (selected: ${selectedCharacter})`);
    }
  } catch (e) {}

  return (
    <motion.div
      animate={anim}
      className={`${sizeClasses[size] || sizeClasses.md} relative ${className}`}
    >
      {/* Aura effect */}
      {customization.aura !== 'none' && (
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full blur-lg"
          style={{ background: customization.auraColor || charColor, opacity: 0.3 }}
        />
      )}
      <AvatarComponent
            color={charColor}
            customization={customization}
            animationType={animationType}
          />
    </motion.div>
  );
}
