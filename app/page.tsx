'use client'

import { useState, useEffect } from 'react'

const messages = [
  '> coming soon is coming soon',
  '> what is time anyway, it will come before GTA 6',
  '> status: slightly better than 404',
  '> ask him -> my X link below',
]

// Complete words from other languages
const foreignWords = {
  spanish: ['viene', 'pronto', 'tiempo', 'antes', 'estado', 'mejor', 'nunca', 'ahora', 'llegar', 'cual', 'momento', 'todavia'],
  french: ['vient', 'bientot', 'temps', 'avant', 'jamais', 'mieux', 'maintenant', 'arriver', 'quel', 'moment'],
  german: ['kommt', 'bald', 'zeit', 'niemals', 'status', 'besser', 'jetzt', 'kommen', 'was', 'moment'],
  italian: ['viene', 'presto', 'tempo', 'prima', 'stato', 'meglio', 'adesso', 'arrivare', 'cosa', 'momento'],
  portuguese: ['vem', 'logo', 'tempo', 'antes', 'estado', 'melhor', 'agora', 'chegar', 'qual', 'momento'],
  russian: ['скоро', 'время', 'статус', 'лучше', 'придет', 'когда', 'сейчас'],
  chinese: ['很快', '时间', '状态', '更好', '来了', '现在'],
}

// Common English words to preserve
const englishWords = ['coming', 'soon', 'time', 'status', 'better', 'will', 'before', 'anyway', 'what', 'slightly', 'than', 'is']

// Extended ASCII characters (32-255)
const extendedASCII = {
  boxDrawing: '─│┌┐└┘├┤┬┴┼╔╗╚╝║═╠╣╦╩╬',
  blocks: '░▒▓█▄▀▌▐■□▪▫',
  math: '±×÷≈≠≤≥∞∫√∑∏µ∂∆',
  currency: '¢£¤¥§€₹₽¥₩',
  accented: 'àáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ',
  special: '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿',
  arrows: '←↑→↓↔↕⇐⇑⇒⇓⇔⇕',
  dots: '•○●◐◑◒◓◔◕◊◈◉',
}

// ASCII art patterns
const asciiArtPatterns = [
  '╔══╗', '║▓▓║', '╚══╝',
  '<<<>>>', '[][][]', '{•••}',
  '▲▼◄►', '◢◣◤◥', '♠♣♥♦',
  '░░░░', '▒▒▒▒', '▓▓▓▓',
  '///\\\\\\', '~~~', '---',
  '╭─╮', '│☺│', '╰─╯',
]

function getRandomExtendedChar(): string {
  const allChars = Object.values(extendedASCII).join('')
  return allChars[Math.floor(Math.random() * allChars.length)]
}

function getRandomForeignWord(): string {
  const languages = Object.keys(foreignWords) as (keyof typeof foreignWords)[]
  const randomLang = languages[Math.floor(Math.random() * languages.length)]
  const words = foreignWords[randomLang]
  return words[Math.floor(Math.random() * words.length)]
}

function getRandomEnglishWord(): string {
  return englishWords[Math.floor(Math.random() * englishWords.length)]
}

function getRandomAsciiArt(): string {
  return asciiArtPatterns[Math.floor(Math.random() * asciiArtPatterns.length)]
}

// Phase 1: Controlled corruption (maintains structure)
function controlledCorruption(text: string): string {
  const words = text.match(/(>|[^\s]+|\s+)/g) || []
  let hasEnglish = false
  let hasForeign = false
  
  const corrupted = words.map((word, index) => {
    if (word.trim() === '' || word === '>') return word
    
    // Ensure at least one English word
    if (!hasEnglish && Math.random() < 0.3) {
      hasEnglish = true
      return getRandomEnglishWord()
    }
    
    // Ensure at least one foreign word
    if (!hasForeign && Math.random() < 0.3) {
      hasForeign = true
      return getRandomForeignWord()
    }
    
    // Random corruption
    const rand = Math.random()
    if (rand < 0.2) return getRandomEnglishWord()
    if (rand < 0.4) return getRandomForeignWord()
    if (rand < 0.6) {
      // Partial corruption
      return word.split('').map(char => 
        Math.random() < 0.5 ? getRandomExtendedChar() : char
      ).join('')
    }
    
    return word
  })
  
  // Force at least one of each if not present
  if (!hasEnglish && corrupted.length > 2) {
    corrupted[1] = getRandomEnglishWord()
  }
  if (!hasForeign && corrupted.length > 3) {
    corrupted[2] = getRandomForeignWord()
  }
  
  return corrupted.join('')
}

// Phase 2: Chaos corruption (breaks all rules)
function chaosCorruption(text: string, intensity: number): string {
  let result = text
  
  // Space manipulation
  if (Math.random() < intensity) {
    result = result.replace(/\s+/g, () => {
      const rand = Math.random()
      if (rand < 0.3) return ''  // Remove space
      if (rand < 0.6) return '   '  // Multiple spaces
      return ' '
    })
  }
  
  // Add ASCII art randomly
  if (Math.random() < intensity * 0.5) {
    const insertPos = Math.floor(Math.random() * result.length)
    result = result.slice(0, insertPos) + getRandomAsciiArt() + result.slice(insertPos)
  }
  
  // Overflow effect - add random characters
  if (Math.random() < intensity * 0.7) {
    const overflow = Array(Math.floor(Math.random() * 10))
      .fill(0)
      .map(() => getRandomExtendedChar())
      .join('')
    result += overflow
  }
  
  // Mix everything
  const words = result.match(/(>|[^\s]+|\s+)/g) || []
  return words.map(word => {
    if (word === '>') return word
    const rand = Math.random()
    if (rand < 0.2) return getRandomEnglishWord()
    if (rand < 0.4) return getRandomForeignWord()
    if (rand < 0.6) return getRandomAsciiArt()
    if (rand < 0.8) {
      return word.split('').map(() => getRandomExtendedChar()).join('')
    }
    return word
  }).join('')
}

export default function Home() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [corruptedLines, setCorruptedLines] = useState<string[]>([])
  const [showCorruption, setShowCorruption] = useState(false)
  const [corruptionPhase, setCorruptionPhase] = useState<'controlled' | 'chaos'>('controlled')
  const [linkCorrupted, setLinkCorrupted] = useState(false)
  const [linkText, setLinkText] = useState('x.com/LazyShivam')

  useEffect(() => {
    if (currentLineIndex >= messages.length) {
      setIsTyping(false)
      // Start corruption effect after a short delay
      setTimeout(() => {
        setShowCorruption(true)
        setCorruptedLines([...displayedLines])
      }, 1000)
      
      // Switch to chaos phase after 5 seconds
      setTimeout(() => {
        setCorruptionPhase('chaos')
      }, 5000)
      
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
      setCorruptedLines((prev) => {
        // Phase-based corruption
        if (corruptionPhase === 'controlled') {
          return prev.map((line) => {
            if (Math.random() < 0.3) {
              return controlledCorruption(line)
            }
            return line
          })
        } else {
          // Chaos phase
          const intensity = Math.min((Date.now() % 10000) / 10000, 1) // Increasing intensity
          
          // Randomly add new lines
          if (Math.random() < 0.1) {
            const newLine = '> ' + Array(Math.floor(Math.random() * 20))
              .fill(0)
              .map(() => Math.random() < 0.3 ? getRandomEnglishWord() : getRandomExtendedChar())
              .join(Math.random() < 0.5 ? ' ' : '')
            prev.push(newLine)
          }
          
          return prev.map((line) => {
            if (Math.random() < 0.5) {
              return chaosCorruption(line, intensity)
            }
            return line
          }).slice(-10) // Keep only last 10 lines to prevent overflow
        }
      })
      
      // Corrupt the link in chaos phase
      if (corruptionPhase === 'chaos' && !linkCorrupted) {
        if (Math.random() < 0.3) {
          setLinkCorrupted(true)
          setLinkText((prev) => {
            const corrupted = chaosCorruption(prev, 0.5)
            // Keep it somewhat readable
            if (corrupted.includes('Lazy') || corrupted.includes('Shivam')) {
              return corrupted
            }
            return 'x.com/' + getRandomAsciiArt() + 'LazyShivam'
          })
        }
      }
    }, 200)

    return () => clearInterval(interval)
  }, [showCorruption, corruptionPhase, linkCorrupted])

  return (
    <main className="container" style={{ overflow: corruptionPhase === 'chaos' ? 'hidden' : 'visible' }}>
      <div className="terminal">
        {(showCorruption ? corruptedLines : displayedLines).map((line, index) => (
          <div key={index} className="line" style={{
            transform: corruptionPhase === 'chaos' && Math.random() < 0.1 ? `translateX(${Math.random() * 10 - 5}px)` : 'none'
          }}>
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
          <div className="link" style={{
            transform: corruptionPhase === 'chaos' ? `skewX(${Math.sin(Date.now() / 1000) * 5}deg)` : 'none'
          }}>
            <a href="https://x.com/LazyShivam" target="_blank" rel="noopener noreferrer">
              <span className="link-prompt">&gt;</span> {linkText}
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
