import english from './english';
import french from './french';
import mandarin from './mandarin';
import arabic from './arabic';
import russian from './russian';
import japanese from './japanese';
import sanskrit from './sanskrit';
import spanish from './spanish';
import turkish from './turkish';
import bangla from './bangla';

const ALL_ALPHABETS = {
  english,
  french,
  mandarin,
  arabic,
  russian,
  japanese,
  sanskrit,
  spanish,
  turkish,
  bangla,
};

export default ALL_ALPHABETS;

export const getAlphabetBySlug = (slug) => ALL_ALPHABETS[slug] || null;

export const LANGUAGE_SLUGS = Object.keys(ALL_ALPHABETS);
