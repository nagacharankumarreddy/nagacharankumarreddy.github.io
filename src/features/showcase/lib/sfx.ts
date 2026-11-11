// Tiny synthesised sound effects (Web Audio, no audio files).
// Browsers only allow sound after a click, tap or key press, so the context is created on the first one.
export type Sfx = "shing" | "whoosh" | "slash" | "boom" | "pencil";

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let enabled = true;

const unlock = () => {
  ctx ??= new AudioContext();
  return ctx.state === "suspended" ? ctx.resume() : Promise.resolve();
};
if (typeof window !== "undefined") {
  ["pointerdown", "pointerup", "click", "touchend", "keydown"].forEach((type) =>
    window.addEventListener(type, () => void unlock(), { passive: true })
  );
}

// Ask for sound as soon as the page loads. Browsers that allow it start straight away;
// the rest stay silent until the first click, tap or key press.
export const primeSfx = () => {
  try {
    void unlock().catch(() => undefined);
  } catch {
    // No Web Audio: the site simply stays silent.
  }
};

export const PENCIL_SECONDS = 2.2;

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

// Pencil on paper: scratchy mid-high noise whose loudness flickers with the grain of the paper.
const scribble = (audio: AudioContext, duration: number, volume: number) => {
  const now = audio.currentTime;
  const source = noiseSource(audio);
  source.loop = true;
  const band = audio.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 2300;
  band.Q.value = 0.7;
  const highpass = audio.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 900;
  const steps = Math.round(duration * 28); // slow, unhurried strokes
  const curve = new Float32Array(steps);
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const pressure = Math.sin(Math.PI * t) ** 0.6; // soft start and finish, like one continuous stroke
    curve[i] = volume * pressure * (0.45 + Math.random() * 0.55);
  }
  curve[0] = 0;
  curve[steps - 1] = 0;
  const gain = audio.createGain();
  gain.gain.setValueCurveAtTime(curve, now, duration);
  source.connect(band).connect(highpass).connect(gain).connect(audio.destination);
  source.start(now);
  source.stop(now + duration + 0.05);
};

// Every cue is an air-cutting swish. No tones, so nothing rings like a bell.
export const playSfx = (name: Sfx) => {
  if (!enabled || !ctx || ctx.state !== "running") return;
  if (name === "pencil") {
    scribble(ctx, PENCIL_SECONDS, 0.5);
  } else if (name === "shing") {
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
