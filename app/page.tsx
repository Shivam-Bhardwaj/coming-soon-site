'use client'

import { useState, useEffect, useRef } from 'react'

const messages = [
  '> coming soon is coming soon',
  '> what is time anyway, it will come before GTA 6',
  '> status: slightly better than 404',
  '> ask him -> x.com/LazyShivam',
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
const englishWords = ['coming', 'soon', 'time', 'status', 'better', 'will', 'before', 'anyway', 'what', 'slightly', 'than', 'is', 'ERROR', 'FATAL', 'WARNING', 'SYSTEM']

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

// ASCII art patterns for chaos
const asciiArtPatterns = [
  '╔══╗', '║▓▓║', '╚══╝',
  '<<<>>>', '[][][]', '{•••}',
  '▲▼◄►', '◢◣◤◥', '♠♣♥♦',
  '░░░░', '▒▒▒▒', '▓▓▓▓', '████',
  '///\\\\\\', '~~~', '---', '===',
  '╭─╮', '│☺│', '╰─╯',
  '◆◇◆◇', '★☆★☆', '♪♫♪♫',
]

// Full screen art patterns
const fullScreenPatterns = [
  `
    ╔════════╗
    ║ ERROR  ║
    ╚════════╝
  `,
  `
    ▓▓▓▓▓▓▓▓
    ▓      ▓
    ▓▓▓▓▓▓▓▓
  `,
  `
     /\\_/\\
    ( o.o )
     > ^ <
  `,
  `
    ◢◣◢◣◢◣
    ◥◤◥◤◥◤
  `,
  `
    ┌─┐
    │♥│
    └─┘
  `,
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

function generateRandomArt(width: number, height: number): string[] {
  const chars = '░▒▓█╔╗╚╝║═╠╣╦╩╬▲▼◄►◢◣◤◥'
  const art = []
  for (let i = 0; i < height; i++) {
    let line = ''
    for (let j = 0; j < width; j++) {
      line += chars[Math.floor(Math.random() * chars.length)]
    }
    art.push(line)
  }
  return art
}

// Phase 1: Controlled corruption (maintains structure)
function controlledCorruption(text: string, preserveLast: boolean): string {
  if (preserveLast) return text // Never corrupt X link
  
  const words = text.match(/(>|[^\s]+|\s+)/g) || []
  let hasEnglish = false
  let hasForeign = false
  
  const corrupted = words.map((word) => {
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
  
  return corrupted.join('')
}

// Phase 2: Chaos corruption (breaks all rules)
function chaosCorruption(text: string, intensity: number, preserveLast: boolean): string {
  if (preserveLast) return text // Never corrupt X link
  
  let result = text
  
  // Space manipulation gets more intense
  if (Math.random() < intensity) {
    result = result.replace(/\s+/g, () => {
      const rand = Math.random()
      if (rand < 0.3) return ''  // Remove space
      if (rand < 0.6) return Array(Math.floor(Math.random() * 5) + 1).fill(' ').join('')  // Multiple spaces
      if (rand < 0.8) return getRandomExtendedChar() // Replace with random char
      return ' '
    })
  }
  
  // Add ASCII art randomly with increasing frequency
  if (Math.random() < intensity * 0.7) {
    const insertPos = Math.floor(Math.random() * result.length)
    const art = getRandomAsciiArt()
    result = result.slice(0, insertPos) + art + result.slice(insertPos)
  }
  
  // Overflow effect - add random characters with increasing length
  if (Math.random() < intensity * 0.8) {
    const overflow = Array(Math.floor(Math.random() * (20 * intensity)))
      .fill(0)
      .map(() => getRandomExtendedChar())
      .join('')
    result += overflow
  }
  
  // Mix everything with increasing chaos
  const words = result.match(/(>|[^\s]+|\s+)/g) || []
  return words.map(word => {
    if (word === '>') return Math.random() < intensity ? getRandomAsciiArt() : word
    const rand = Math.random()
    if (rand < 0.15 * intensity) return getRandomEnglishWord()
    if (rand < 0.3 * intensity) return getRandomForeignWord()
    if (rand < 0.5 * intensity) return getRandomAsciiArt()
    if (rand < 0.8 * intensity) {
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
  const [corruptionPhase, setCorruptionPhase] = useState<'controlled' | 'chaos' | 'art'>('controlled')
  const [backgroundArt, setBackgroundArt] = useState<string[]>([])
  const [corruptionSpeed, setCorruptionSpeed] = useState(200)
  const containerRef = useRef<HTMLDivElement>(null)

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
        setCorruptionSpeed(100) // Speed up
      }, 5000)
      
      // Switch to art phase after 10 seconds
      setTimeout(() => {
        setCorruptionPhase('art')
        setCorruptionSpeed(50) // Maximum speed
      }, 10000)
      
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
        const isLastLineXLink = (line: string) => line.includes('x.com/LazyShivam')
        
        // Phase-based corruption
        if (corruptionPhase === 'controlled') {
          return prev.map((line) => {
            if (Math.random() < 0.3) {
              return controlledCorruption(line, isLastLineXLink(line))
            }
            return line
          })
        } else if (corruptionPhase === 'chaos') {
          // Chaos phase
          const intensity = Math.min((Date.now() % 10000) / 10000, 1) // Increasing intensity
          
          // Randomly add new lines with increasing frequency
          if (Math.random() < 0.2 * intensity) {
            const newLine = Array(Math.floor(Math.random() * 30))
              .fill(0)
              .map(() => Math.random() < 0.2 ? getRandomEnglishWord() : getRandomExtendedChar())
              .join(Math.random() < 0.3 ? ' ' : '')
            prev.push(newLine)
          }
          
          return prev.map((line) => {
            if (Math.random() < 0.6) {
              return chaosCorruption(line, intensity, isLastLineXLink(line))
            }
            return line
          }).slice(-15) // Keep only last 15 lines to prevent overflow
        } else {
          // Art phase - generate full screen patterns
          const intensity = 1
          
          // Generate background art
          if (Math.random() < 0.8) {
            const art = generateRandomArt(20, 3)
            setBackgroundArt(art)
          }
          
          // Add full screen patterns
          if (Math.random() < 0.5) {
            const pattern = fullScreenPatterns[Math.floor(Math.random() * fullScreenPatterns.length)]
            prev.push(...pattern.split('\n').filter(l => l.trim()))
          }
          
          // Maximum chaos on existing lines
          return prev.map((line) => {
            if (Math.random() < 0.9) {
              return chaosCorruption(line, intensity, isLastLineXLink(line))
            }
            return line
          }).slice(-20) // Keep more lines in art phase
        }
      })
    }, corruptionSpeed)

    return () => clearInterval(interval)
  }, [showCorruption, corruptionPhase, corruptionSpeed])

  return (
    <main 
      className="container" 
      ref={containerRef}
      style={{ 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background art layer */}
      {corruptionPhase === 'art' && backgroundArt.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
          pointerEvents: 'none',
          fontFamily: 'Courier New, monospace',
          fontSize: '10px',
          lineHeight: '10px',
          color: '#ff8c00',
          whiteSpace: 'pre',
          overflow: 'hidden'
        }}>
          {backgroundArt.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
      
      <div className="terminal" style={{
        position: 'relative',
        zIndex: 1
      }}>
        {(showCorruption ? corruptedLines : displayedLines).map((line, index) => {
          const isXLink = line.includes('x.com/LazyShivam')
          return (
            <div 
              key={index} 
              className="line" 
              style={{
                transform: corruptionPhase !== 'controlled' && !isXLink && Math.random() < 0.2 
                  ? `translateX(${Math.random() * 20 - 10}px) rotate(${Math.random() * 4 - 2}deg)` 
                  : 'none',
                fontSize: corruptionPhase === 'art' && !isXLink && Math.random() < 0.3 
                  ? `${14 + Math.random() * 10}px` 
                  : '14px',
                opacity: isXLink ? 1 : (corruptionPhase === 'art' ? 0.7 + Math.random() * 0.3 : 1)
              }}
            >
              <span className="text" style={{
                textDecoration: isXLink ? 'underline' : 'none',
                cursor: isXLink ? 'pointer' : 'default'
              }}>
                {isXLink ? (
                  <a href="https://x.com/LazyShivam" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    {line}
                  </a>
                ) : line}
              </span>
            </div>
          )
        })}
        {isTyping && (
          <div className="line">
            <span className="text">{currentText}</span>
            <span className="cursor">_</span>
          </div>
        )}
      </div>
    </main>
  )
}