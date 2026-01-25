'use client'
import { useEffect } from 'react'

export function useScrollbarGutterStable() {
  useEffect(() => {
    document.documentElement.style.scrollbarGutter = 'stable'

    return () => {
      document.documentElement.style.scrollbarGutter = ''
    }
  }, [])
}
