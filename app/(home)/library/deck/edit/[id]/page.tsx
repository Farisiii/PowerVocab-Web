'use client'

import { useParams } from 'next/navigation'
import DeckFormPage from '../../deckFormPage'

export default function EditPage() {
  const params = useParams()
  const deckId = params?.id as string

  return <DeckFormPage mode="edit" deckId={deckId} />
}
