import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 6

  const items = Array.from({ length: limit }, (_, i) => ({
    id: `deck-${page}-${i}-${Math.random()}`,
    title: `Advanced Vocab Vol. ${page}.${i + 1}`,
    words: Math.floor(Math.random() * 50) + 10,
    progress: Math.floor(Math.random() * 100),
    description:
      'Koleksi kata tingkat tinggi untuk persiapan ujian internasional.',
  }))

  const nextPage = page < 5 ? page + 1 : null

  return NextResponse.json({ items, nextPage })
}
