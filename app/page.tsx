'use client'

import { useState, useEffect } from 'react'

const messages = [
  '> coming soon is coming soon',
  '> what is time anyway, it will come before GTA 6',
  '> status: slightly better than 404',
]

// Complete words from other languages - for realistic corruption
// These are complete words that might randomly appear, like real data corruption
const foreignWords = {
  spanish: ['viene', 'pronto', 'tiempo', 'antes', 'estado', 'mejor', 'que', 'esta', 'llegar', 'cual', 'momento', 'todavia', 'puede', 'llegara', 'mejor', 'que', 'ligeramente'],
  french: ['vient', 'bientot', 'temps', 'avant', 'etat', 'mieux', 'que', 'est', 'arriver', 'quel', 'moment', 'encore', 'peut', 'arrivera', 'legerement'],
  german: ['kommt', 'bald', 'zeit', 'vor', 'status', 'besser', 'als', 'ist', 'kommen', 'was', 'moment', 'noch', 'wird', 'kommt', 'etwas'],
  italian: ['viene', 'presto', 'tempo', 'prima', 'stato', 'meglio', 'di', 'e', 'arrivare', 'cosa', 'momento', 'ancora', 'verra', 'leggermente'],
  portuguese: ['vem', 'logo', 'tempo', 'antes', 'estado', 'melhor', 'que', 'esta', 'chegar', 'qual', 'momento', 'ainda', 'vai', 'chegara', 'ligeiramente'],
}

// Get a random complete word from foreign languages
function getRandomForeignWord(): string {
  const languages = Object.keys(foreignWords) as (keyof typeof foreignWords)[]
  const randomLang = languages[Math.floor(Math.random() * languages.length)]
  const words = foreignWords[randomLang]
  return words[Math.floor(Math.random() * words.length)]
}

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

function corruptWord(word: string): string {
  const cleanWord = word.replace(/[>.,!?]/g, '')
  
  // 30% chance to keep complete word (correct OR foreign word)
  if (Math.random() < 0.3) {
    // 50% chance to keep original, 50% to use foreign word
    if (Math.random() < 0.5) {
      return word // Keep original word
    } else {
      // Replace with complete foreign word (realistic corruption)
      const foreignWord = getRandomForeignWord()
      // Preserve original case
      if (word[0] === word[0].toUpperCase()) {
        return foreignWord.charAt(0).toUpperCase() + foreignWord.slice(1)
      }
      return foreignWord
    }
  }
  
  // 70% chance to corrupt with mixed characters
  const types: (keyof typeof corruptionChars)[] = ['english', 'cyrillic', 'arabic', 'japanese', 'symbols', 'gibberish']
  const randomType = types[Math.floor(Math.random() * types.length)]
  
  // Corrupt 40-60% of characters
  return word
    .split('')
    .map((char) => {
      if (char === ' ' || char === '>' || char === '.' || char === ',' || char === '!' || char === '?') return char
      if (Math.random() < 0.5) {
        return getRandomChar(randomType)
      }
      return char
    })
    .join('')
}

function corruptText(text: string): string {
  // Split by words (preserving spaces and punctuation)
  const words = text.match(/(>|[^\s]+|\s+)/g) || []
  
  return words
    .map((word) => {
      // Skip spaces and prompt symbols
      if (word.trim() === '' || word === '>') return word
      return corruptWord(word)
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
    const typingSpeed = 20 // ms per character (faster)

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
            return corruptText(line)
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
