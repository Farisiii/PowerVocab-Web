import { IMAGES_MANIFEST } from 'next/dist/shared/lib/constants'

export const MOCK_USER = {
  name: 'Alex Morgan',
  email: 'alex.morgan@student.itb.ac.id',
  avatar: '/avatar.png', // opsional
  image: '', // opsional
  isPremium: true,
  lastOpenedDeckId: '3', // Merujuk ke Travel & Leisure
  weeklyGoal: {
    current: 750,
    target: 1000,
  },
}

export const MOCK_DECKS = [
  {
    id: '1',
    title: 'Business English',
    totalWords: 120,
    progress: 45,
    description:
      'Mastering professional communication, emails, and corporate terminology for daily business interactions.',
  },
  {
    id: '2',
    title: 'Academic Writing',
    totalWords: 85,
    progress: 100,
    description:
      'Advanced formal structures for thesis, journals, and essay writing with academic vocabulary.',
  },
  {
    id: '3',
    title: 'Travel & Leisure Essentials for Global Nomads',
    totalWords: 210,
    progress: 12,
    description:
      'Essential phrases for booking, navigating cities, and casual social interactions while traveling.',
  },
  {
    id: '4',
    title: 'Advanced Verbs',
    totalWords: 65,
    progress: 60,
    description:
      'Focusing on complex action words to make your English sound more natural and sophisticated.',
  },
  {
    id: '5',
    title: 'IELTS Band 8+ Vocabulary',
    totalWords: 350,
    progress: 25,
    description:
      'High-level synonyms and idiomatic expressions specifically curated for the IELTS Speaking and Writing sections.',
  },
  {
    id: '6',
    title: 'Medical Terminology',
    totalWords: 150,
    progress: 0,
    description:
      'Foundational medical terms, anatomy, and healthcare jargon for professionals and students.',
  },
  {
    id: '7',
    title: 'Daily Phrasal Verbs',
    totalWords: 90,
    progress: 85,
    description:
      'Common phrasal verbs used in casual conversations to help you sound like a native speaker.',
  },
  {
    id: '8',
    title: 'Technology & Startup Jargon',
    totalWords: 110,
    progress: 55,
    description:
      'Latest terms from the tech industry, software development, and the venture capital ecosystem.',
  },
]
