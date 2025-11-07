'use client'

import { useState, useEffect } from 'react'

const messages = [
  '> coming soon is coming soon',
  '> what is time anyway, it will come before GTA 6',
  '> status: slightly better than 404',
]

// Corruption variants - mix of languages and gibberish
const corruptionChars = {
  english: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  cyrillic: 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя',
  arabic: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
  japanese: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
  gibberish: '█▓▒░▄▀▌▐■□▪▫●○◊◈',
}

function getRandomChar(type: keyof typeof corruptionChars): string {
  const chars = corruptionChars[type]
  return chars[Math.floor(Math.random() * chars.length)]
}

function corruptText(text: string, intensity: number): string {
  return text
    .split('')
    .map((char) => {
      if (char === ' ' || char === '>') return char
      if (Math.random() < intensity) {
        const types: (keyof typeof corruptionChars)[] = ['english', 'cyrillic', 'arabic', 'japanese', 'symbols', 'gibberish']
        const randomType = types[Math.floor(Math.random() * types.length)]
        return getRandomChar(randomType)
      }
      return char
    })
    .join('')
}

export default function Home() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [corruptedLines, setCorruptedLines] = useState<string[]>([])
  const [showCorruption, setShowCorruption] = useState(false)

  useEffect(() => {
    if (currentLineIndex >= messages.length) {
      setIsTyping(false)
      // Start corruption effect after a short delay
      setTimeout(() => {
        setShowCorruption(true)
        setCorruptedLines([...displayedLines])
      }, 1000)
      return
    }

    const currentMessage = messages[currentLineIndex]
    const typingSpeed = 35 // ms per character

    if (currentText.length < currentMessage.length) {
      const timer = setTimeout(() => {
        setCurrentText(currentMessage.slice(0, currentText.length + 1))
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else {
      // Move to next line after a pause
      const timer = setTimeout(() => {
        setDisplayedLines([...displayedLines, currentText])
        setCurrentText('')
        setCurrentLineIndex(currentLineIndex + 1)
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [currentText, currentLineIndex, displayedLines])

  // Corruption effect
  useEffect(() => {
    if (!showCorruption) return

    const interval = setInterval(() => {
      setCorruptedLines((prev) =>
        prev.map((line) => {
          // Randomly decide if this line should corrupt (30% chance per cycle)
          if (Math.random() < 0.3) {
            return corruptText(line, 0.3)
          }
          return line
        })
      )
    }, 200)

    return () => clearInterval(interval)
  }, [showCorruption])

  return (
    <main className="container">
      <div className="terminal">
        {(showCorruption ? corruptedLines : displayedLines).map((line, index) => (
          <div key={index} className="line">
            <span className="text">{line}</span>
          </div>
        ))}
        {isTyping && (
          <div className="line">
            <span className="text">{currentText}</span>
            <span className="cursor">_</span>
          </div>
        )}
        {!isTyping && (
          <div className="link">
            <a href="https://x.com/LazyShivam" target="_blank" rel="noopener noreferrer">
              <span className="link-prompt">&gt;</span> x.com/LazyShivam
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
