import translate from 'google-translate-api-x';
import { transliterate as tr } from 'transliteration';

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

const NON_LATIN = new Set(['zh-CN', 'ar', 'ru', 'ja', 'sa', 'bn']);

function getEnglishPronunciation(text, langCode, googlePronunciation) {
  if (googlePronunciation) return googlePronunciation;
  if (!NON_LATIN.has(langCode)) return '';
  try {
    return tr(text);
  } catch {
    return '';
  }
}

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { text, from = 'en' } = JSON.parse(event.body || '{}');
    if (!text) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Text is required' }) };
    }

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
    return { statusCode: 200, headers, body: JSON.stringify(results) };
  } catch (error) {
    console.error('Translation Error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to translate text' }) };
  }
};
