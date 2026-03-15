export const LANGUAGES = [
  { name: 'English',  code: 'en',    speechCode: 'en-US', flag: '🇬🇧', color: '#3B82F6', script: 'Latin' },
  { name: 'French',   code: 'fr',    speechCode: 'fr-FR', flag: '🇫🇷', color: '#EF4444', script: 'Latin' },
  { name: 'Mandarin', code: 'zh-CN', speechCode: 'zh-CN', flag: '🇨🇳', color: '#F59E0B', script: 'Hanzi' },
  { name: 'Arabic',   code: 'ar',    speechCode: 'ar',    flag: '🇸🇦', color: '#10B981', script: 'Arabic' },
  { name: 'Russian',  code: 'ru',    speechCode: 'ru-RU', flag: '🇷🇺', color: '#6366F1', script: 'Cyrillic' },
  { name: 'Japanese', code: 'ja',    speechCode: 'ja-JP', flag: '🇯🇵', color: '#EC4899', script: 'Kanji/Kana' },
  { name: 'Sanskrit', code: 'sa',    speechCode: 'hi-IN', flag: '🇮🇳', color: '#F97316', script: 'Devanagari' },
  { name: 'Spanish',  code: 'es',    speechCode: 'es-ES', flag: '🇪🇸', color: '#DC2626', script: 'Latin' },
  { name: 'Turkish',  code: 'tr',    speechCode: 'tr-TR', flag: '🇹🇷', color: '#E11D48', script: 'Latin' },
  { name: 'Bangla',   code: 'bn',    speechCode: 'bn',    flag: '🇧🇩', color: '#059669', script: 'Bengali' },
];

export const getLangByName = (name) => LANGUAGES.find((l) => l.name === name);

/** ISO alpha-2 country codes for CountryPedia links */
export const COUNTRY_CODES = {
  english:  'gb',
  french:   'fr',
  mandarin: 'cn',
  arabic:   'sa',
  russian:  'ru',
  japanese: 'jp',
  sanskrit: 'in',
  spanish:  'es',
  turkish:  'tr',
  bangla:   'bd',
};
