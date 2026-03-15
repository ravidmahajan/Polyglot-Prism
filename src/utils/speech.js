// Keeps track of the currently playing audio element so we can stop it
let currentAudio = null;

/**
 * Speak text aloud.
 * 1. Tries the browser's built-in SpeechSynthesis (instant, no network).
 * 2. Falls back to Google Translate TTS via our backend proxy (works for every language).
 */
export function speak(text, speechCode) {
  if (!text) return;
  stop(); // stop anything currently playing

  const langPrefix = speechCode.split('-')[0];

  // Check if browser has a voice for this language
  const voices = window.speechSynthesis?.getVoices() || [];
  const voice =
    voices.find((v) => v.lang === speechCode) ||
    voices.find((v) => v.lang.startsWith(langPrefix + '-')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix));

  if (voice) {
    speakWithBrowser(text, speechCode, voice);
  } else {
    speakWithBackend(text, langPrefix);
  }
}

/** Stop any ongoing speech */
export function stop() {
  window.speechSynthesis?.cancel();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

/** Browser SpeechSynthesis path */
function speakWithBrowser(text, speechCode, voice) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = 0.85;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);

  // Chrome bug workaround: poke synthesiser to prevent it pausing forever
  const keepAlive = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(keepAlive);
    } else {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 10000);
  utterance.onend = () => clearInterval(keepAlive);
  utterance.onerror = () => clearInterval(keepAlive);
}

/** Backend Google-Translate TTS path (works for every language) */
function speakWithBackend(text, langCode) {
  const url = `/api/tts?lang=${encodeURIComponent(langCode)}&text=${encodeURIComponent(text)}`;
  const audio = new Audio(url);
  audio.playbackRate = 0.9;
  currentAudio = audio;
  audio.play().catch((err) => console.warn('TTS playback failed:', err));
  audio.onended = () => { currentAudio = null; };
}

/** Pre-load voices (needed on some browsers) */
export function preloadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis?.getVoices() || [];
    if (voices.length) return resolve(voices);
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    } else {
      resolve([]);
    }
  });
}
