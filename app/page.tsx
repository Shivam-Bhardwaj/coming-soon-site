'use client'

import { useState, useEffect, useRef } from 'react'

const messages = [
  '> coming soon is coming soon',
  '> what is time anyway, it will come before GTA 6',
  '> status: slightly better than 404',
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

// Full screen art patterns - beautiful patterns
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
    ╱◥◣◢◤╲
    ◥◣╱╲◢◤
    ◢◤╲╱◥◣
    ╲◢◤◥◣╱
  `,
  `
    ░░▒▒▓▓██▓▓▒▒░░
    ░▒▓█████████▓▒░
    ▒▓███████████▓▒
    ▓█████████████▓
    ▒▓███████████▓▒
    ░▒▓█████████▓▒░
    ░░▒▒▓▓██▓▓▒▒░░
  `,
  `
    ⋆｡‧˚ʚ♡ɞ˚‧｡⋆
    ✧･ﾟ: *✧･ﾟ:*
    ˚ ༘♡ ⋆｡˚ ❀
  `,
  `
    ╭──────╮
    │ ◯ ◯ │
    │  ▽  │
    ╰──────╯
  `,
  `
    ∴∵∴∵∴∵∴
    ∵∴∵∴∵∴∵
    ∴∵∴∵∴∵∴
  `,
]

// Beautiful geometric patterns
const geometricPatterns = [
  '◆◇◆◇◆◇◆◇',
  '▲▼▲▼▲▼▲▼',
  '■□■□■□■□',
  '●○●○●○●○',
  '★☆★☆★☆★☆',
  '▪▫▪▫▪▫▪▫',
  '◢◣◥◤◢◣◥◤',
  '╱╲╱╲╱╲╱╲',
]

function generateBeautifulPattern(): string[] {
  const patterns = [
    // Yin-Yang pattern
    () => [
      '      ⣾⣿⣷      ',
      '    ⣾⣿⣿⣿⣷    ',
      '   ⣾⣿⣿⣿⣿⣿⣷   ',
      '  ⣾⣿⣿⣿⣿⣿⣿⣷  ',
      '  ⢿⣿⣿⣿⣿⣿⣿⡿  ',
      '   ⢿⣿⣿⣿⣿⡿   ',
      '    ⢿⣿⣿⡿    ',
      '      ⢿⡿      ',
    ],
    // Diamond pattern
    () => [
      '       ◆       ',
      '      ◆◆◆      ',
      '     ◆◆◆◆◆     ',
      '    ◆◆◆◆◆◆◆    ',
      '   ◆◆◆◆◆◆◆◆◆   ',
      '    ◆◆◆◆◆◆◆    ',
      '     ◆◆◆◆◆     ',
      '      ◆◆◆      ',
      '       ◆       ',
    ],
    // Wave pattern with gradient
    () => [
      '░░▒▒▓▓████▓▓▒▒░░',
      '▒▒▓▓████████▓▓▒▒',
      '▓▓████████████▓▓',
      '████████████████',
      '▓▓████████████▓▓',
      '▒▒▓▓████████▓▓▒▒',
      '░░▒▒▓▓████▓▓▒▒░░',
    ],
    // Mandala pattern
    () => [
      '    ✦･ﾟ✧*:･ﾟ✧    ',
      '  ✧･ﾟ: *✧･ﾟ:*  ',
      ' *:･ﾟ✧*:･ﾟ✧* ',
      '✧･ﾟ: ORDER :･ﾟ✧',
      '✧･ﾟ: CHAOS :･ﾟ✧',
      ' *:･ﾟ✧*:･ﾟ✧* ',
      '  ✧･ﾟ: *✧･ﾟ:*  ',
      '    ✦･ﾟ✧*:･ﾟ✧    ',
    ],
    // ASCII Art explosion
    () => [
      '     ╱|╲     ',
      '    ╱ | ╲    ',
      '   ╱  |  ╲   ',
      '  ╱   |   ╲  ',
      ' ╱    |    ╲ ',
      '━━━━━━━━━━━━━',
      ' ╲    |    ╱ ',
      '  ╲   |   ╱  ',
      '   ╲  |  ╱   ',
      '    ╲ | ╱    ',
      '     ╲|╱     ',
    ],
    // Matrix rain
    () => Array(10).fill(0).map(() => 
      Array(20).fill(0).map(() => 
        Math.random() < 0.4 ? ['0','1','░','▒','▓','█'][Math.floor(Math.random() * 6)] : ' '
      ).join('')
    ),
  ]
  
  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
  return selectedPattern()
}

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
  const [showXLink, setShowXLink] = useState(false) // New state for the link
  const [phaseIntensity, setPhaseIntensity] = useState(0) // 0 to 1 for smooth transitions
  const [backgroundArt, setBackgroundArt] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentLineIndex >= messages.length) {
      setIsTyping(false)
      // Show the static X link after typing is done
      setTimeout(() => {
        setShowXLink(true)
      }, 600)

      // Start the corruption cycle after the link appears
      setTimeout(() => {
        setShowCorruption(true)
        setCorruptedLines([...messages])
      }, 1200)
      
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

  // Smooth Corruption Cycle Effect
  useEffect(() => {
    if (!showCorruption) return

    const startTime = Date.now()
    let corruptionPhase: 'controlled' | 'chaos' | 'art' = 'controlled';


    const interval = setInterval(() => {
      // Use a sine wave for a smooth 0 -> 1 -> 0 oscillation over ~12 seconds
      const elapsed = Date.now() - startTime
      const intensity = (Math.sin(elapsed / 4000) + 1) / 2 // Smooth wave
      setPhaseIntensity(intensity)

      // Determine phase based on intensity
      if (intensity > 0.8) {
        corruptionPhase = 'art';
      } else if (intensity > 0.4) {
        corruptionPhase = 'chaos';
      } else {
        corruptionPhase = 'controlled';
      }
      
      setCorruptedLines((prev) => {
        let linesToCorrupt = [...messages] // Start from original messages for stability

        if (corruptionPhase === 'controlled') {
          return linesToCorrupt.map((line) => {
            // Fade out corruption as intensity drops
            if (Math.random() < intensity * 0.3) {
              return controlledCorruption(line, false)
            }
            return line
          })
        } else if (corruptionPhase === 'chaos') {
          if (Math.random() < intensity * 0.2) {
            const newLine = Array(Math.floor(Math.random() * 30)).fill(0)
              .map(() => getRandomExtendedChar()).join('')
            linesToCorrupt.push(newLine)
          }
          
          return linesToCorrupt.map((line) => {
            if (Math.random() < intensity * 0.7) {
              return chaosCorruption(line, intensity, false)
            }
            return line
          }).slice(-15)
        } else { // Art phase
          if (Math.random() < intensity) {
            setBackgroundArt(generateBeautifulPattern())
          }
          if (Math.random() < intensity * 0.6) {
            linesToCorrupt.push(...fullScreenPatterns[Math.floor(Math.random() * fullScreenPatterns.length)].split('\n'))
          }
          
          return linesToCorrupt.map((line) => {
            if (Math.random() < intensity) {
              return chaosCorruption(line, intensity, false)
            }
            return line
          }).slice(-25)
        }
      })
    }, 100) // Faster interval for smoother visual updates

    return () => clearInterval(interval)
  }, [showCorruption])

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
      {corruptedLines.length > 0 && corruptedLines[0].includes('x.com/LazyShivam') && (
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
          {corruptedLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      )}
      
      <div className="terminal" style={{
        position: 'relative',
        zIndex: 1
      }}>
        {(!showCorruption ? displayedLines : corruptedLines).map((line, index) => (
          <div 
            key={index} 
            className="line"
            style={{
              // All chaotic styles are applied here now
              transform: showCorruption && Math.random() < phaseIntensity * 0.5 
                ? `translateX(${(Math.random() * 40 - 20) * phaseIntensity}px) rotate(${(Math.random() * 10 - 5) * phaseIntensity}deg)` 
                : 'none',
              fontSize: showCorruption && phaseIntensity > 0.8 && Math.random() < phaseIntensity
                ? `${10 + Math.random() * 20}px` 
                : '14px',
              opacity: showCorruption && phaseIntensity > 0.8 ? 0.4 + Math.random() * 0.6 : 1,
              filter: showCorruption && phaseIntensity > 0.8 && Math.random() < phaseIntensity * 0.4 ? 'blur(1.5px)' : 'none'
            }}
          >
            <span className="text">{line}</span>
          </div>
        ))}
        {isTyping && (
          <div className="line">
            <span className="text">{currentText}</span>
            <span className="cursor">_</span>
          </div>
        )}
        
        {/* The X link is now completely separate and static */}
        {showXLink && (
          <div className="line" style={{ transform: 'none', marginTop: '4px' }}>
            <a href="https://x.com/LazyShivam" target="_blank" rel="noopener noreferrer" style={{ 
              color: '#79b8ff', 
              textDecoration: 'underline',
              fontSize: '14px'
            }}>
              > ask him -> x.com/LazyShivam
            </a>
          </div>
        )}
      </div>
    </main>
  )
}