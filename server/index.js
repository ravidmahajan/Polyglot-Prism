import express from 'express';
import cors from 'cors';
import translate from 'google-translate-api-x';
import { transliterate as tr } from 'transliteration';

const app = express();
app.use(cors());
app.use(express.json());

const LANGUAGES = {
  English: 'en',
  French: 'fr',
  Mandarin: 'zh-CN',
  Arabic: 'ar',
  Russian: 'ru',
  Japanese: 'ja',
  Sanskrit: 'sa',
  Spanish: 'es',
  Turkish: 'tr',
  Bangla: 'bn',
};

// Languages that use non-Latin scripts and need romanized pronunciation
const NON_LATIN = new Set(['zh-CN', 'ar', 'ru', 'ja', 'sa', 'bn']);

/**
 * Get a reliable English/Latin pronunciation for translated text.
 * Uses Google Translate's pronunciation first, falls back to the
 * `transliteration` library for non-Latin scripts.
 */
function getEnglishPronunciation(text, langCode, googlePronunciation) {
  if (googlePronunciation) return googlePronunciation;
  if (!NON_LATIN.has(langCode)) return '';
  try {
    return tr(text);
  } catch {
    return '';
  }
}

// Translate text to all target languages
app.post('/api/translate', async (req, res) => {
  const { text, from = 'en' } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const results = {};
    const promises = Object.entries(LANGUAGES).map(async ([name, code]) => {
      if (code === from) {
        results[name] = { text, transliteration: '' };
        return;
      }
      try {
        const result = await translate(text, { from, to: code });
        results[name] = {
          text: result.text,
          transliteration: getEnglishPronunciation(
            result.text,
            code,
            result?.pronunciation || ''
          ),
        };
      } catch (err) {
        console.error(`Failed to translate to ${name}:`, err.message);
        results[name] = { text: '—', transliteration: '' };
      }
    });

    await Promise.all(promises);
    res.json(results);
  } catch (error) {
    console.error('Translation Error:', error);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

// Text-to-Speech proxy using Google Translate's TTS
app.get('/api/tts', async (req, res) => {
  const { text, lang } = req.query;
  if (!text || !lang) return res.status(400).json({ error: 'text and lang are required' });

  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(lang)}&q=${encodeURIComponent(text)}`;
    const response = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://translate.google.com/',
      },
    });

    if (!response.ok) throw new Error(`Google TTS responded ${response.status}`);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400',
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (error) {
    console.error('TTS Error:', error.message);
    res.status(500).json({ error: 'Failed to generate audio' });
  }
});

// Detect language of input text
app.post('/api/detect', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const result = await translate(text, { to: 'en' });
    res.json({
      detectedLanguage: result.from.language.iso,
      translated: result.text,
    });
  } catch (error) {
    console.error('Detection Error:', error);
    res.status(500).json({ error: 'Failed to detect language' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌍 Polyglot Prism Backend running on http://localhost:${PORT}`);
});
