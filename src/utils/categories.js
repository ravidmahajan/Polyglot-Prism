/** Pre-built vocabulary categories for guided learning */
export const CATEGORIES = [
  {
    name: 'Greetings',
    emoji: '👋',
    color: 'from-blue-500 to-cyan-400',
    words: ['Hello', 'Good morning', 'Good night', 'How are you?', 'Thank you', 'Please', 'Goodbye', 'Welcome'],
  },
  {
    name: 'Food',
    emoji: '🍎',
    color: 'from-red-500 to-orange-400',
    words: ['Water', 'Bread', 'Rice', 'Milk', 'Fruit', 'Meat', 'Vegetable', 'Tea'],
  },
  {
    name: 'Nature',
    emoji: '🌿',
    color: 'from-green-500 to-emerald-400',
    words: ['Sun', 'Moon', 'Star', 'Ocean', 'Mountain', 'River', 'Fire', 'Rain'],
  },
  {
    name: 'Emotions',
    emoji: '❤️',
    color: 'from-pink-500 to-rose-400',
    words: ['Love', 'Happiness', 'Sadness', 'Anger', 'Fear', 'Peace', 'Hope', 'Joy'],
  },
  {
    name: 'Numbers',
    emoji: '🔢',
    color: 'from-indigo-500 to-purple-400',
    words: ['One', 'Two', 'Three', 'Five', 'Ten', 'Hundred', 'Thousand', 'Zero'],
  },
  {
    name: 'Family',
    emoji: '👨‍👩‍👧',
    color: 'from-amber-500 to-yellow-400',
    words: ['Mother', 'Father', 'Sister', 'Brother', 'Child', 'Friend', 'Teacher', 'Family'],
  },
  {
    name: 'Travel',
    emoji: '✈️',
    color: 'from-sky-500 to-blue-400',
    words: ['Where is...?', 'Airport', 'Hotel', 'Street', 'City', 'Map', 'Bus', 'Train'],
  },
  {
    name: 'Colors',
    emoji: '🎨',
    color: 'from-violet-500 to-fuchsia-400',
    words: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Orange'],
  },
];

export const LEVELS = [
  { id: 'basic',        label: 'Basic',        description: 'Single words & essentials',     icon: '🌱' },
  { id: 'intermediate', label: 'Intermediate',  description: 'Common phrases & expressions',  icon: '🌿' },
  { id: 'advanced',     label: 'Advanced',      description: 'Full sentences & grammar',       icon: '🌳' },
];

export const LEVEL_EXAMPLES = {
  basic: [
    'Hello', 'Water', 'Sun', 'Love', 'Friend', 'Food', 'Home', 'Book',
    'Fire', 'Moon', 'Tree', 'Peace', 'Light', 'Earth', 'Time',
  ],
  intermediate: [
    'How are you?', 'I am hungry', 'Where is the train station?',
    'What is your name?', 'I love learning languages',
    'The weather is beautiful today', 'Can you help me?',
    'I would like some water please',
  ],
  advanced: [
    'The beauty of language lies in its ability to connect cultures',
    'Knowledge is the light that illuminates the path of wisdom',
    'Every journey of a thousand miles begins with a single step',
    'The river does not drink its own water, the tree does not eat its own fruit',
    'In the middle of difficulty lies opportunity',
  ],
};
