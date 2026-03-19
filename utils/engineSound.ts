type EngineHandle = {
  stop: (fadeDuration?: number) => void;
};

export function playEngineSound(volume = 0.18): EngineHandle {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const now = ctx.currentTime;
  const REV_START = 120;
  const REV_PEAK = 380;
  const REV_TIME = 4.5;

  function createTone(
    type: OscillatorType,
    freqMultiplier: number,
    gainValue: number
  ): OscillatorNode {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(REV_START * freqMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(
      REV_PEAK * freqMultiplier,
      now + REV_TIME
    );
    gain.gain.value = gainValue;
    osc.connect(gain).connect(master);
    osc.start(now);
    return osc;
  }

  const oscillators = [
    createTone("sawtooth", 1, 0.35),
    createTone("sawtooth", 2, 0.18),
    createTone("sawtooth", 3, 0.08),
    createTone("square", 0.5, 0.12),
  ];

  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(800, now);
  bandpass.frequency.exponentialRampToValueAtTime(2400, now + REV_TIME);
  bandpass.Q.value = 1.5;

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.06;

  noise.connect(bandpass).connect(noiseGain).connect(master);
  noise.start(now);

  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(volume, now + 0.6);

  let stopped = false;

  return {
    stop(fadeDuration = 1.2) {
      if (stopped) return;
      stopped = true;

      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + fadeDuration);

      setTimeout(() => {
        oscillators.forEach((o) => {
          try { o.stop(); } catch { /* already stopped */ }
        });
        try { noise.stop(); } catch { /* already stopped */ }
        ctx.close();
      }, fadeDuration * 1000 + 100);
    },
  };
}
