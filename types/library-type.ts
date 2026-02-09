export interface WordPair {
  id: string
  english: string
  indonesian: string
}

export interface DeckSidebarProps {
  isEditMode: boolean
  deckName: string
  setDeckName: (v: string) => void
  description: string
  setDescription: (v: string) => void
  deckNameError: string
  validateDeckName: (v: string) => boolean
  isGenerating: boolean
  isLoadingData: boolean
  onAiGenerate: () => void
}

export interface WordPairsSectionProps {
  pairs: WordPair[]
  filledPairsCount: number
  onChange: (id: string, field: 'english' | 'indonesian', value: string) => void
  onRemove: (id: string) => void
  onClearAll: () => void
  onCancel: () => void
  onSubmit: () => void
  isFormValid: boolean
  isEditMode: boolean
  isLoadingData: boolean
  listRef: React.RefObject<HTMLDivElement | null>
}

export interface WordPairRowProps {
  pair: WordPair
  onChange: (id: string, field: 'english' | 'indonesian', value: string) => void
  onRemove: (id: string) => void
}

export interface DeckCardProps {
  title: string
  words: number
  progress: number
  description: string
  onEdit?: () => void
  onDelete?: () => void
  onPlay?: () => void
}

export interface DeleteDeckModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
  deckTitle: string
}
