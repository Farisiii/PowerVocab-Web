export const MOCK_USER = {
  name: 'Alex Morgan',
  email: 'alex.morgan@student.itb.ac.id',
  avatar: '/avatar.png',
  image: '',
  isPremium: true,
  lastOpenedDeckId: '3',
  weeklyGoal: {
    current: 750,
    target: 1000,
  },
}

export const DECK_DETAILS = [
  {
    id: '1',
    wordPairs: [
      { id: '1-1', english: 'Revenue', indonesian: 'Pendapatan' },
      { id: '1-2', english: 'Invoice', indonesian: 'Faktur' },
      { id: '1-3', english: 'Profit', indonesian: 'Keuntungan' },
      { id: '1-4', english: 'Expense', indonesian: 'Pengeluaran' },
      { id: '1-5', english: 'Investment', indonesian: 'Investasi' },
    ],
  },
  {
    id: '2',
    wordPairs: [
      { id: '2-1', english: 'Thesis', indonesian: 'Tesis' },
      { id: '2-2', english: 'Cohesion', indonesian: 'Keterpaduan' },
      { id: '2-3', english: 'Abstract', indonesian: 'Abstrak' },
      { id: '2-4', english: 'Citation', indonesian: 'Kutipan' },
      { id: '2-5', english: 'Methodology', indonesian: 'Metodologi' },
    ],
  },
  {
    id: '3',
    wordPairs: [
      { id: '3-1', english: 'Reservation', indonesian: 'Reservasi' },
      { id: '3-2', english: 'Itinerary', indonesian: 'Rencana perjalanan' },
      { id: '3-3', english: 'Destination', indonesian: 'Tujuan' },
      { id: '3-4', english: 'Accommodation', indonesian: 'Akomodasi' },
      { id: '3-5', english: 'Departure', indonesian: 'Keberangkatan' },
      { id: '4-5', english: 'Maintain', indonesian: 'Memelihara' },
    ],
  },
  {
    id: '4',
    wordPairs: [
      { id: '4-1', english: 'Analyze', indonesian: 'Menganalisis' },
      { id: '4-2', english: 'Implement', indonesian: 'Menerapkan' },
      { id: '4-3', english: 'Optimize', indonesian: 'Mengoptimalkan' },
      { id: '4-4', english: 'Execute', indonesian: 'Melaksanakan' },
      { id: '4-5', english: 'Maintain', indonesian: 'Memelihara' },
    ],
  },
  {
    id: '5',
    wordPairs: [
      { id: '5-1', english: 'Fluency', indonesian: 'Kelancaran' },
      { id: '5-2', english: 'Pronunciation', indonesian: 'Pengucapan' },
      { id: '5-3', english: 'Vocabulary', indonesian: 'Kosakata' },
      { id: '5-4', english: 'Grammar', indonesian: 'Tata bahasa' },
      { id: '5-5', english: 'Comprehension', indonesian: 'Pemahaman' },
    ],
  },
]

export const MOCK_DECKS = [
  {
    id: '1',
    title: 'Business English',
    totalWords: 20,
    progress: 45,
    description:
      'Mastering professional communication, emails, and corporate terminology for daily business interactions.',
  },
  {
    id: '2',
    title: 'Academic Writing',
    totalWords: 20,
    progress: 100,
    description:
      'Advanced formal structures for thesis, journals, and essay writing with academic vocabulary.',
  },
  {
    id: '3',
    title: 'Travel & Leisure Essentials for Global Nomads',
    totalWords: 20,
    progress: 12,
    description:
      'Essential phrases for booking, navigating cities, and casual social interactions while traveling.',
  },
  {
    id: '4',
    title: 'Advanced Verbs',
    totalWords: 20,
    progress: 60,
    description:
      'Focusing on complex action words to make your English sound more natural and sophisticated.',
  },
  {
    id: '5',
    title: 'IELTS Band 8+ Vocabulary',
    totalWords: 20,
    progress: 25,
    description:
      'High-level synonyms and idiomatic expressions specifically curated for the IELTS Speaking and Writing sections.',
  },
  {
    id: '6',
    title: 'Medical Terminology',
    totalWords: 15,
    progress: 0,
    description:
      'Foundational medical terms, anatomy, and healthcare jargon for professionals and students.',
  },
  {
    id: '7',
    title: 'Daily Phrasal Verbs',
    totalWords: 15,
    progress: 85,
    description:
      'Common phrasal verbs used in casual conversations to help you sound like a native speaker.',
  },
  {
    id: '8',
    title: 'Technology & Startup Jargon',
    totalWords: 15,
    progress: 55,
    description:
      'Latest terms from the tech industry, software development, and the venture capital ecosystem.',
  },
  {
    id: '9',
    title: 'Legal English Basics',
    totalWords: 15,
    progress: 0,
    description:
      'Essential legal vocabulary and formal expressions used in contracts and court documents.',
  },
  {
    id: '10',
    title: 'Interview Preparation',
    totalWords: 15,
    progress: 40,
    description:
      'Common interview questions, professional answers, and confidence-building phrases.',
  },
  {
    id: '11',
    title: 'Everyday Small Talk',
    totalWords: 15,
    progress: 90,
    description:
      'Light conversation starters and casual responses for daily social interactions.',
  },
  {
    id: '12',
    title: 'Finance & Banking Terms',
    totalWords: 10,
    progress: 0,
    description:
      'Key vocabulary for personal finance, investments, loans, and banking services.',
  },
  {
    id: '13',
    title: 'Customer Service English',
    totalWords: 10,
    progress: 70,
    description:
      'Polite and effective expressions for handling customers, complaints, and support calls.',
  },
  {
    id: '14',
    title: 'Presentation Skills',
    totalWords: 10,
    progress: 35,
    description:
      'Phrases and structures to deliver clear and persuasive presentations in English.',
  },
  {
    id: '15',
    title: 'Engineering Vocabulary',
    totalWords: 10,
    progress: 0,
    description:
      'Technical terms commonly used in mechanical, electrical, and software engineering.',
  },
  {
    id: '16',
    title: 'Hospitality & Hotel English',
    totalWords: 10,
    progress: 65,
    description:
      'Useful expressions for front desk staff, reservations, and guest services.',
  },
  {
    id: '17',
    title: 'Negotiation & Persuasion',
    totalWords: 20,
    progress: 30,
    description:
      'Strategic language for bargaining, persuading, and reaching professional agreements.',
  },
  {
    id: '18',
    title: 'Slang & Informal English',
    totalWords: 20,
    progress: 0,
    description:
      'Modern slang and informal expressions used by native speakers in daily life.',
  },
]

export const MOCK_CHART_DATA = [
  { day: 1, words: 42 },
  { day: 2, words: 42 },
  { day: 3, words: 55 },
  { day: 4, words: 63 },
  { day: 5, words: 63 },
  { day: 6, words: 72 },
  { day: 7, words: 80 },
  { day: 8, words: 80 },
  { day: 9, words: 80 },
  { day: 10, words: 102 },
  { day: 11, words: 110 },
  { day: 12, words: 112 },
  { day: 13, words: 120 },
  { day: 14, words: 120 },
  { day: 15, words: 135 },
  { day: 16, words: 142 },
  { day: 17, words: 150 },
  { day: 18, words: 158 },
  { day: 19, words: 158 },
  { day: 20, words: 168 },
  { day: 21, words: 175 },
  { day: 22, words: 182 },
  { day: 23, words: 190 },
  { day: 24, words: 190 },
]

export const mockAiResponse = {
  data: [
    {
      id: 'ai-1',
      english: 'Serendipity',
      indonesian: 'Kebetulan Indah',
    },
    {
      id: 'ai-2',
      english: 'Petrichor',
      indonesian: 'Wangi Hujan',
    },
    { id: 'ai-3', english: 'Ephemeral', indonesian: 'Sementara' },
    { id: 'ai-4', english: 'Resilience', indonesian: 'Ketangguhan' },
    { id: 'ai-5', english: 'Luminous', indonesian: 'Bercahaya' },
    { id: 'ai-6', english: 'Euphoria', indonesian: 'Sangat Bahagia' },
    { id: 'ai-7', english: 'Solitude', indonesian: 'Menyendiri' },
    { id: 'ai-8', english: 'Gratitude', indonesian: 'Bersyukur' },
    { id: 'ai-9', english: 'Tranquil', indonesian: 'Damai' },
    { id: 'ai-10', english: 'Inevitable', indonesian: 'Pasti Terjadi' },
    { id: 'ai-11', english: 'Radiant', indonesian: 'Berseri' },
    { id: 'ai-12', english: 'Melancholy', indonesian: 'Sendu' },
    { id: 'ai-13', english: 'Ambitious', indonesian: 'Ambisius' },
    { id: 'ai-14', english: 'Compassion', indonesian: 'Belas Kasih' },
    { id: 'ai-15', english: 'Harmony', indonesian: 'Selaras' },
    { id: 'ai-16', english: 'Infinite', indonesian: 'Tak Terbatas' },
    { id: 'ai-17', english: 'Courage', indonesian: 'Keberanian' },
    { id: 'ai-18', english: 'Whimsical', indonesian: 'Jenaka' },
    { id: 'ai-19', english: 'Authentic', indonesian: 'Otentik' },
    { id: 'ai-20', english: 'Serenity', indonesian: 'Ketenangan' },
  ],
}
