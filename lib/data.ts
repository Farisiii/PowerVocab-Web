export const MOCK_USER = {
  name: 'Alex Morgan',
  email: 'alex.morgan@student.itb.ac.id',
  avatar: '/avatar.png', // opsional
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
    progress: 88,
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
]
