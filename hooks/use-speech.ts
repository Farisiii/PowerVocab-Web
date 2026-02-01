'use client'

import { useState, useEffect } from 'react'

export function useSpeech(text: string, playbackRate: number) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [text])

  useEffect(() => {
    if (isPlaying && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      speak(text, playbackRate)
    }
  }, [playbackRate])

  const speak = (text: string, rate: number) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)
    window.speechSynthesis.speak(utterance)
  }

  const togglePlay = () => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()

    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    speak(text, playbackRate)
  }

  return { isPlaying, togglePlay }
}
