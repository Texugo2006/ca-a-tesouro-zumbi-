// Web Audio API procedural sound engine - 100% self-contained, no external audio files needed
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.musicEnabled = true;
    this.ambientOscillators = [];
    this.ambientGain = null;
    this.currentTheme = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setSoundEnabled(enabled) {
    this.soundEnabled = enabled;
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopAmbient();
    } else if (this.currentTheme) {
      this.playAmbient(this.currentTheme);
    }
  }

  playClick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  playCoin() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    osc1.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(987.77 * 2, now);
    osc2.frequency.setValueAtTime(1318.51 * 2, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  }

  playCorrect() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  playError() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.28);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playClue() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.4);
    });
  }

  playSpecial() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.5);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  playChestOpen() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Deep creak rumble
    const rumble = this.ctx.createOscillator();
    const rumbleGain = this.ctx.createGain();
    rumble.type = 'triangle';
    rumble.frequency.setValueAtTime(80, now);
    rumble.frequency.linearRampToValueAtTime(140, now + 0.8);
    rumbleGain.gain.setValueAtTime(0.3, now);
    rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
    rumble.connect(rumbleGain);
    rumbleGain.connect(this.ctx.destination);
    rumble.start(now);
    rumble.stop(now + 1.2);

    // Magical chime burst
    const chimes = [587.33, 739.99, 880, 1174.66, 1479.98, 1760];
    chimes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + 0.4 + i * 0.08);
      g.gain.setValueAtTime(0.2, now + 0.4 + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + i * 0.08 + 0.8);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(now + 0.4 + i * 0.08);
      osc.stop(now + 0.4 + i * 0.08 + 0.8);
    });
  }

  playVictory() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Fanfare melody: G4, C5, E5, G5, then held G5 & C6
    const fanfare = [
      { f: 392.00, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.16 },
      { f: 659.25, d: 0.15, t: 0.32 },
      { f: 783.99, d: 0.4,  t: 0.48 },
      { f: 659.25, d: 0.15, t: 0.92 },
      { f: 783.99, d: 0.15, t: 1.08 },
      { f: 1046.50, d: 0.8, t: 1.25 },
    ];

    fanfare.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0.25, now + item.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + item.t);
      osc.stop(now + item.t + item.d);
    });
  }

  playAmbient(theme = 'pirates') {
    this.currentTheme = theme;
    if (!this.musicEnabled) return;
    this.init();
    if (!this.ctx) return;

    this.stopAmbient();

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      const themeFrequencies = {
        pirates: [110, 164.81, 220, 329.63], // A minor nautical chords
        forest: [130.81, 196.00, 261.63, 392.00], // C major mystical open fifths
        temple: [92.50, 138.59, 185.00, 277.18], // F# phrygian mystic ancient drone
        frozen: [146.83, 220.00, 293.66, 440.00], // D crystalline celestial
        default: [110, 164.81, 220, 329.63]
      };

      const freqs = themeFrequencies[theme] || themeFrequencies.default;

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // LFO for gentle breathing effect
        lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);

        oscGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.ambientGain);

        osc.start();
        lfo.start();

        this.ambientOscillators.push(osc, lfo);
      });
    } catch (e) {
      console.warn("Ambient sound init error:", e);
    }
  }

  stopAmbient() {
    if (this.ambientOscillators.length > 0) {
      this.ambientOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      this.ambientOscillators = [];
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch (e) {}
      this.ambientGain = null;
    }
  }
}

export const sound = new SoundEngine();
