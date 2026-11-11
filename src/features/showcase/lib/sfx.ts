// Tiny synthesised sound effects (Web Audio, no audio files).
// Browsers only allow sound after a click, tap or key press, so the context is created on the first one.
export type Sfx = "shing" | "whoosh" | "slash" | "boom";

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let enabled = true;

const unlock = () => {
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
};
if (typeof window !== "undefined") {
  ["pointerdown", "keydown", "touchstart"].forEach((type) => window.addEventListener(type, unlock, { passive: true }));
}

export const setSfxEnabled = (on: boolean) => {
  enabled = on;
};

const noiseSource = (audio: AudioContext) => {
  if (!noise) {
    noise = audio.createBuffer(1, audio.sampleRate, audio.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const source = audio.createBufferSource();
  source.buffer = noise;
  return source;
};

// A blade cutting air: filtered noise whose pitch and loudness swell as the blade passes, then fall away.
// Pure noise, no tones, so nothing rings or bloops.
const swish = (audio: AudioContext, low: number, peak: number, duration: number, volume: number) => {
  const now = audio.currentTime;
  const mid = now + duration * 0.45;
  const end = now + duration;
  const source = noiseSource(audio);
  const band = audio.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.9;
  band.frequency.setValueAtTime(low, now);
  band.frequency.exponentialRampToValueAtTime(peak, mid);
  band.frequency.exponentialRampToValueAtTime(low * 1.3, end);
  const highpass = audio.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 350;
  const gain = audio.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, mid);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  source.connect(band).connect(highpass).connect(gain).connect(audio.destination);
  source.start(now);
  source.stop(end);
};

// Every cue is an air-cutting swish. No tones, so nothing rings like a bell.
export const playSfx = (name: Sfx) => {
  if (!enabled || !ctx || ctx.state !== "running") return;
  if (name === "shing") {
    swish(ctx, 900, 5200, 0.5, 0.7);
  } else if (name === "whoosh") {
    swish(ctx, 700, 2600, 0.28, 0.75);
  } else if (name === "slash") {
    swish(ctx, 800, 4200, 0.24, 1.2);
    swish(ctx, 2500, 8000, 0.32, 0.5);
  } else {
    swish(ctx, 450, 3000, 0.7, 1.3);
    swish(ctx, 1500, 6500, 0.9, 0.5);
  }
};
