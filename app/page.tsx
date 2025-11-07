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

// --- NEW: Biological Sprites & Patterns ---
const antSprites = ['_@_v', '_@_>', '<_@_'];
const spiderSprites = ['/\\oo/\\', 'oo'];
const plantSprites = ['{*}','[*]','{*}'];

// Fungus now uses only dots - defined in growFungus function

// Sprite types with behaviors
type SpriteType = 'ant' | 'spider' | 'plant';

interface Sprite {
  type: SpriteType;
  art: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number; // For reproduction/cannibalism
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

export function generateBeautifulPattern(): string[] {
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

// --- Biological Growth Types ---
export type GrowthType = 'fungus' | 'slime' | 'mold' | 'mycelium' | 'algae';

export interface GrowthColony {
  type: GrowthType;
  cells: [number, number][];
  age: number;
  spreadRate: number;
}

const growthPatterns: Record<GrowthType, string[]> = {
  fungus: ['·', '•', '◦', '◉', '◯', '○', '●', '◐', '◑', '◒', '◓'],
  slime: ['~', '≈', '≋', '∿', '∼', '∽', '≁', '≃'],
  mold: ['░', '▒', '▓', '█', '▄', '▀', '▌', '▐'],
  mycelium: ['─', '━', '═', '╌', '╍', '╎', '╏', '│', '┃', '║'],
  algae: ['*', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋']
};

// Color mapping for each growth type
const growthColors: Record<GrowthType, string> = {
  fungus: '#ffb84d', // Bright orange
  slime: '#39ff14', // Neon green
  mold: '#ff1493', // Bright pink/magenta
  mycelium: '#00ffff', // Cyan
  algae: '#ffff00' // Bright yellow
};

// --- Multi-Colony Biological Takeover System ---
export function growBiologicalColonies(
  grid: string[][], 
  intensity: number, 
  colonies: GrowthColony[],
  colorMap: Map<string, GrowthType>
): { grid: string[][], colonies: GrowthColony[], colorMap: Map<string, GrowthType> } {
  const newGrid = grid.map(row => [...row]);
  const rows = newGrid.length;
  const cols = newGrid[0].length;
  const newColorMap = new Map(colorMap);
  
  let activeColonies = [...colonies];
  
  // Initialize colonies if none exist - strategic placement
  if (activeColonies.length === 0) {
    const colonyTypes: GrowthType[] = ['fungus', 'slime', 'mold', 'mycelium', 'algae'];
    const seedCount = Math.min(5, Math.floor(intensity * 8) + 3);
    
    for (let i = 0; i < seedCount; i++) {
      const type = colonyTypes[i % colonyTypes.length];
      // Strategic placement: corners and edges
      let r, c;
      if (i === 0) { r = 0; c = 0; } // Top-left
      else if (i === 1) { r = 0; c = cols - 1; } // Top-right
      else if (i === 2) { r = rows - 1; c = 0; } // Bottom-left
      else if (i === 3) { r = rows - 1; c = cols - 1; } // Bottom-right
      else { r = Math.floor(Math.random() * rows); c = Math.floor(Math.random() * cols); }
      
      const patterns = growthPatterns[type];
      newGrid[r][c] = patterns[0];
      newColorMap.set(`${r},${c}`, type);
      activeColonies.push({
        type,
        cells: [[r, c]],
        age: 0,
        spreadRate: 0.3 + Math.random() * 0.4
      });
    }
  }
  
  // Grow each colony aggressively
  activeColonies = activeColonies.map(colony => {
    const patterns = growthPatterns[colony.type];
    const newCells: [number, number][] = [];
    
    // Each cell in colony spreads
    colony.cells.forEach(([r, c]) => {
      // 8-directional spread for organic growth
      const neighbors = [
        [r-1, c-1], [r-1, c], [r-1, c+1],
        [r, c-1],             [r, c+1],
        [r+1, c-1], [r+1, c], [r+1, c+1]
      ];
      
      neighbors.forEach(([nr, nc]) => {
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          const cellValue = newGrid[nr][nc];
          const isEmpty = cellValue === ' ';
          const isSameType = cellValue !== ' ' && patterns.includes(cellValue);
          
          // Aggressive spread rate based on intensity and colony age
          const effectiveSpreadRate = colony.spreadRate * (1 + intensity * 0.5) * (1 + colony.age * 0.01);
          
          if (isEmpty && Math.random() < effectiveSpreadRate) {
            // New growth
            newGrid[nr][nc] = patterns[Math.floor(Math.random() * patterns.length)];
            newColorMap.set(`${nr},${nc}`, colony.type);
            newCells.push([nr, nc]);
          } else if (isSameType && Math.random() < effectiveSpreadRate * 0.4) {
            // Densify existing growth
            const currentIndex = patterns.indexOf(cellValue);
            if (currentIndex < patterns.length - 1) {
              newGrid[nr][nc] = patterns[currentIndex + 1];
            }
            // Ensure color is set
            if (!newColorMap.has(`${nr},${nc}`)) {
              newColorMap.set(`${nr},${nc}`, colony.type);
            }
          }
        }
      });
    });
    
    return {
      ...colony,
      cells: [...colony.cells, ...newCells],
      age: colony.age + 1
    };
  });
  
  return { grid: newGrid, colonies: activeColonies, colorMap: newColorMap };
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
export function controlledCorruption(text: string): string {
  if (text.trim() === '' || text === '>') return text // Never corrupt X link
  
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
export function chaosCorruption(text: string, intensity: number): string {
  if (text.trim() === '' || text === '>') return text // Never corrupt X link
  
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
  const [showXLink, setShowXLink] = useState(false)
  const [phaseIntensity, setPhaseIntensity] = useState(0)
  const [backgroundArt, setBackgroundArt] = useState<string[]>([])
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const [fungusGrid, setFungusGrid] = useState<string[][]>([]);
  const [biologicalColonies, setBiologicalColonies] = useState<GrowthColony[]>([]);
  const [biologicalColorMap, setBiologicalColorMap] = useState<Map<string, GrowthType>>(new Map());
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);

  // Adaptive performance refs
  const renderBudgetRef = useRef(1.0) // 0.4–1.5 scales work per frame
  const frameTimeAvgRef = useRef(16)  // ms, smoothed

  // Refs to avoid stale state in interval-driven biology updates
  const fungusGridRef = useRef<string[][]>([]);
  const biologicalColoniesRef = useRef<GrowthColony[]>([]);
  const biologicalColorMapRef = useRef<Map<string, GrowthType>>(new Map());

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
      // Initialize high-density biological grid (finer for better utilization)
      const cols = Math.floor(window.innerWidth / 6); // Finer grid
      const rows = Math.floor(window.innerHeight / 12); // Finer grid
        const initialGrid = Array(rows).fill(null).map(() => Array(cols).fill(' '));
        setFungusGrid(initialGrid);
        fungusGridRef.current = initialGrid;
        setBiologicalColonies([]); // Start with no colonies - biology takes over gradually
        biologicalColoniesRef.current = [];
        const initialColorMap = new Map<string, GrowthType>();
        setBiologicalColorMap(initialColorMap); // Reset color map
        biologicalColorMapRef.current = initialColorMap;
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
    const showcaseEndTime = 30000 // 30 seconds showcase period

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const isShowcase = elapsed < showcaseEndTime
      
      // Precise 10-second sine wave cycle (0 -> 1 -> 0)
      // In showcase mode, make cycles slightly faster to show all phases
      const cycleSpeed = isShowcase ? 8000 : 10000 // 8s cycles in showcase, 10s after
      const intensity = (Math.sin(elapsed / (cycleSpeed / (2 * Math.PI))) + 1) / 2
      setPhaseIntensity(intensity)

      let currentPhase: 'controlled' | 'chaos' | 'art' = 'controlled'
      if (intensity > 0.3) currentPhase = 'chaos'
      if (intensity > 0.75) currentPhase = 'art'
      
      // Boost intensity in showcase mode to ensure all features are visible
      const effectiveIntensity = isShowcase ? Math.min(1, intensity * 1.2) : intensity
      
      setCorruptedLines((prev) => {
        let linesToCorrupt = [...messages] // Start from original messages for stability
  
        if (currentPhase === 'controlled') {
          return linesToCorrupt.map((line) => {
            // Fade out corruption as intensity drops
            if (Math.random() < effectiveIntensity * 0.3) {
              return controlledCorruption(line)
            }
            return line
          })
        } else if (currentPhase === 'chaos') {
          // Biology starts taking over in chaos phase
          if (Math.random() < effectiveIntensity * 0.6) {
            // Use refs to avoid stale closures in interval
            const result = growBiologicalColonies(
              fungusGridRef.current,
              effectiveIntensity * 0.8,
              biologicalColoniesRef.current,
              biologicalColorMapRef.current
            );
            setFungusGrid(result.grid);
            fungusGridRef.current = result.grid;
            setBiologicalColonies(result.colonies);
            biologicalColoniesRef.current = result.colonies;
            setBiologicalColorMap(result.colorMap);
            biologicalColorMapRef.current = result.colorMap;
          }
          
          // More aggressive in showcase mode
          const spawnRate = isShowcase ? effectiveIntensity * 0.3 : effectiveIntensity * 0.2
          if (Math.random() < spawnRate) {
            const newLine = Array(Math.floor(Math.random() * 30)).fill(0)
              .map(() => getRandomExtendedChar()).join('')
            linesToCorrupt.push(newLine)
          }
          
          return linesToCorrupt.map((line) => {
            if (Math.random() < effectiveIntensity * 0.7) {
              return chaosCorruption(line, effectiveIntensity)
            }
            return line
          }).slice(-15)
        } else { // Art phase - Biology fully takes over
          // Aggressive biological takeover - always grow in art phase
          const result = growBiologicalColonies(
            fungusGridRef.current,
            effectiveIntensity,
            biologicalColoniesRef.current,
            biologicalColorMapRef.current
          );
          setFungusGrid(result.grid);
          fungusGridRef.current = result.grid;
          setBiologicalColonies(result.colonies);
          biologicalColoniesRef.current = result.colonies;
          setBiologicalColorMap(result.colorMap);
          biologicalColorMapRef.current = result.colorMap;
          
          // Ensure art patterns are visible in showcase
          if (Math.random() < effectiveIntensity || (isShowcase && Math.random() < 0.3)) {
            setBackgroundArt(generateBeautifulPattern())
          }
          if (Math.random() < effectiveIntensity * 0.6 || (isShowcase && Math.random() < 0.2)) {
            linesToCorrupt.push(...fullScreenPatterns[Math.floor(Math.random() * fullScreenPatterns.length)].split('\n'))
          }
          
          return linesToCorrupt.map((line) => {
            if (Math.random() < effectiveIntensity) {
              return chaosCorruption(line, effectiveIntensity)
            }
            return line
          }).slice(-25)
        }
      })

      // Update sprite positions
      setSprites(prev => prev.map(sprite => {
        let newX = sprite.x + sprite.vx
        let newY = sprite.y + sprite.vy

        // Boundary bounce
        if (newX < 0 || newX > 100) sprite.vx = -sprite.vx
        if (newY < 0 || newY > 100) sprite.vy = -sprite.vy

        newX = Math.max(0, Math.min(100, newX))
        newY = Math.max(0, Math.min(100, newY))

        return {...sprite, x: newX, y: newY}
      }))

      // Sprite Behaviors
      setSprites(prev => {
        let newSprites = [...prev]
        const isShowcase = elapsed < showcaseEndTime
        const effectiveIntensity = isShowcase ? Math.min(1, intensity * 1.2) : intensity
        const budget = Math.min(1, renderBudgetRef.current)

        // In showcase mode, ensure sprites are active early
        // Also increase sprite count for better space utilization
        const baseMin = isShowcase ? 25 : 12
        const minSprites = Math.max(6, Math.floor(baseMin * (0.6 + 0.4 * budget)))
        if (newSprites.length < minSprites && Math.random() < 0.4 * budget) {
          // Force spawn diverse sprites
          const types: SpriteType[] = ['ant', 'spider', 'plant']
          const spawnType = types[Math.floor(Math.random() * types.length)]
          newSprites.push({
            type: spawnType,
            art: spawnType === 'ant' ? antSprites[Math.floor(Math.random() * antSprites.length)] 
                : spawnType === 'spider' ? spiderSprites[Math.floor(Math.random() * spiderSprites.length)] 
                : plantSprites[Math.floor(Math.random() * plantSprites.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            age: 0
          })
        }

        // Reproduction (ants near plants)
        newSprites.forEach((sprite, i) => {
          if (sprite.type === 'ant' && sprite.age > 5 && Math.random() < effectiveIntensity * 0.05) {
            newSprites.push({
              type: 'ant',
              art: antSprites[Math.floor(Math.random() * antSprites.length)],
              x: sprite.x + (Math.random() - 0.5) * 5,
              y: sprite.y + (Math.random() - 0.5) * 5,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
              age: 0
            })
          }

          // Preying (spiders eat ants)
          if (sprite.type === 'spider') {
            newSprites.forEach((other, j) => {
              if (other.type === 'ant' && i !== j) {
                const dx = other.x - sprite.x
                const dy = other.y - sprite.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const catchChance = isShowcase ? effectiveIntensity * 0.15 : effectiveIntensity * 0.1
                if (dist < 5 && Math.random() < catchChance) {
                  // "Eat" the ant
                  newSprites.splice(j, 1)
                  // Spider "grows" - change art or speed
                  sprite.vx *= 1.1
                  sprite.vy *= 1.1
                } else if (dist < 20) {
                  // Chase - more aggressive in showcase
                  const chaseSpeed = isShowcase ? 0.3 : 0.2
                  sprite.vx += (dx / dist) * chaseSpeed
                  sprite.vy += (dy / dist) * chaseSpeed
                }
              }
            })
          }

          // Cannibalizing (ants eat plants)
          if (sprite.type === 'ant') {
            newSprites.forEach((other, j) => {
              if (other.type === 'plant' && i !== j) {
                const dx = other.x - sprite.x
                const dy = other.y - sprite.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                const eatChance = isShowcase ? effectiveIntensity * 0.15 : effectiveIntensity * 0.1
                if (dist < 5 && Math.random() < eatChance) {
                  // "Eat" the plant and reproduce
                  newSprites.splice(j, 1)
                  newSprites.push({
                    type: 'ant',
                    art: antSprites[Math.floor(Math.random() * antSprites.length)],
                    x: sprite.x + (Math.random() - 0.5) * 5,
                    y: sprite.y + (Math.random() - 0.5) * 5,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    age: 0
                  })
                } else if (dist < 20) {
                  // Move towards plant
                  sprite.vx += (dx / dist) * 0.1
                  sprite.vy += (dy / dist) * 0.1
                }
              }
            })
          }

          // Age all sprites
          sprite.age += 1

          // Small chance of death for balance
          if (Math.random() < 0.01) {
            newSprites.splice(i, 1)
          }
        })

        // Spawn new sprites based on intensity
        // Higher spawn rate for better space utilization
        const spawnRate = (isShowcase ? effectiveIntensity * 0.2 : effectiveIntensity * 0.12) * budget
        if (Math.random() < spawnRate) {
          const newSpriteType: SpriteType = ['ant', 'spider', 'plant'][Math.floor(Math.random() * 3)] as SpriteType
          const newSprite = {
            type: newSpriteType,
            art: newSpriteType === 'ant' ? antSprites[Math.floor(Math.random() * antSprites.length)] 
                : newSpriteType === 'spider' ? spiderSprites[Math.floor(Math.random() * spiderSprites.length)] 
                : plantSprites[Math.floor(Math.random() * plantSprites.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            age: 0
          }
          newSprites.push(newSprite)
        }

        // After 30 seconds, introduce variations for patient viewers
        if (!isShowcase && elapsed > showcaseEndTime) {
          // Occasional "mutations" - rare sprite behaviors
          if (Math.random() < 0.001) {
            // Rare: Giant sprite
            newSprites.push({
              type: 'ant',
              art: '█ANT█',
              x: Math.random() * 100,
              y: Math.random() * 100,
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.3,
              age: 0
            })
          }
        }

        return newSprites.slice(-120) // Increased limit for better space utilization
      })
    }, 100)

    return () => clearInterval(interval)
  }, [showCorruption])

  // --- Pixel-Based Creepy Biological Background ---
  useEffect(() => {
    if (!showCorruption || !backgroundCanvasRef.current) return

    const canvas = backgroundCanvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Pixel-based biological entities with competitive ecosystem
    interface PixelOrganism {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      type: 'spore' | 'mycelium' | 'insect' | 'slime' | 'beetle' | 'mite' | 'worm' | 'fly'
      age: number
      color: string
      trail: { x: number; y: number; opacity: number }[]
      energy: number
      population: number // Track population of this type
      territory: number // Territory size
    }
    
    // Resource map - pixels as resources
    const resourceMap = new Map<string, number>() // Track resource availability per pixel

    const organisms: PixelOrganism[] = []
    let growthMap = new Map<string, number | string>() // Track growth intensity and colors per pixel

    // Creepy color palette
    const colors = {
      spore: ['#39ff14', '#00ff00', '#32cd32'], // Neon green
      mycelium: ['#ff1493', '#ff00ff', '#ff69b4'], // Pink/magenta
      insect: ['#ffb84d', '#ff8c00', '#ffa500'], // Orange
      slime: ['#00ffff', '#00ced1', '#48d1cc'], // Cyan
      beetle: ['#8b0000', '#a52a2a', '#dc143c'], // Dark red
      mite: ['#9370db', '#ba55d3', '#da70d6'], // Purple
      worm: ['#ff6347', '#ff4500', '#ff7f50'], // Red-orange
      fly: ['#00ff7f', '#7fff00', '#adff2f'], // Yellow-green
      decay: ['#4b0082', '#8b008b', '#9400d3'] // Purple decay
    }

    // Cache population counts - O(n) instead of O(n²)
    const updatePopulationCounts = () => {
      const counts = new Map<PixelOrganism['type'], number>()
      organisms.forEach(org => {
        counts.set(org.type, (counts.get(org.type) || 0) + 1)
      })
      organisms.forEach(org => {
        org.population = counts.get(org.type) || 0
      })
    }
    
    // Initialize organisms - optimized (population set after spawn)
    const spawnOrganism = (type: PixelOrganism['type'], x?: number, y?: number) => {
      const baseSpeed = type === 'fly' ? 1.6 : type === 'beetle' ? 1.0 : type === 'worm' ? 0.5 : 0.8
      const resourceNeeds: Record<string, number> = {
        spore: 5, mycelium: 8, insect: 10, slime: 12,
        beetle: 15, mite: 3, worm: 7, fly: 6
      }
      
      organisms.push({
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * baseSpeed,
        vy: (Math.random() - 0.5) * baseSpeed,
        size: type === 'beetle' ? 2 + Math.random() * 2 : type === 'mite' ? 0.5 + Math.random() : 1 + Math.random() * 2,
        type,
        age: 0,
        color: colors[type][Math.floor(Math.random() * colors[type].length)],
        trail: [],
        energy: 50 + Math.random() * 50,
        population: 0, // Will be set by updatePopulationCounts
        territory: resourceNeeds[type] || 5
      })
    }

    // Initialize resource map - sparse grid to prevent memory issues
    const resourceGridSize = 20 // Larger grid to reduce memory
    for (let x = 0; x < canvas.width; x += resourceGridSize) {
      for (let y = 0; y < canvas.height; y += resourceGridSize) {
        resourceMap.set(`${x},${y}`, 50 + Math.random() * 50) // Initial resources
      }
    }
    
    // Spawn initial organisms at edges - diverse ecosystem, Game of Life start
    const initialTypes: PixelOrganism['type'][] = ['spore', 'mycelium', 'insect', 'slime', 'beetle', 'mite', 'worm', 'fly']
    for (let i = 0; i < 80; i++) {
      const side = Math.floor(Math.random() * 4)
      let x = 0, y = 0
      if (side === 0) { x = 0; y = Math.random() * canvas.height } // Left
      else if (side === 1) { x = canvas.width; y = Math.random() * canvas.height } // Right
      else if (side === 2) { x = Math.random() * canvas.width; y = 0 } // Top
      else { x = Math.random() * canvas.width; y = canvas.height } // Bottom
      
      spawnOrganism(initialTypes[Math.floor(Math.random() * initialTypes.length)], x, y)
    }

    // Get resource at location (with bounds checking and sparse lookup)
    const getResource = (x: number, y: number): number => {
      const gridX = Math.floor(x / 20) * 20
      const gridY = Math.floor(y / 20) * 20
      return resourceMap.get(`${gridX},${gridY}`) || 100
    }
    
    const setResource = (x: number, y: number, value: number) => {
      const gridX = Math.floor(x / 20) * 20
      const gridY = Math.floor(y / 20) * 20
      resourceMap.set(`${gridX},${gridY}`, Math.max(0, Math.min(100, value)))
    }
    
    // Organic growth function - pixel-based with resource competition
    const growPixel = (x: number, y: number, intensity: number, color: string, organism?: PixelOrganism) => {
      const px = Math.floor(x)
      const py = Math.floor(y)
      // Strict bounds checking
      if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) return

      const key = `${px},${py}`
      const currentIntensity = (growthMap.get(key) as number) || 0
      
      // Check resource availability - competition for space
      const resourceAvailable = getResource(px, py)
      if (resourceAvailable < 10 && currentIntensity > 50) {
        return
      }
      
      // Limit growth map size to prevent memory issues
      if (growthMap.size > 50000) {
        // Clean up old entries
        const entries = Array.from(growthMap.entries())
        entries.slice(0, 25000).forEach(([k]) => {
          if (!k.includes('_color')) growthMap.delete(k)
        })
      }
      
      const newIntensity = Math.min(255, currentIntensity + intensity * 30)
      growthMap.set(key, newIntensity)
      
      // Consume resources
      if (organism) {
        const resourceCost = intensity * 2
        const currentResource = getResource(px, py)
        setResource(px, py, currentResource - resourceCost)
      }
      
      // Store color info with intensity
      const colorKey = key + '_color'
      if (!growthMap.has(colorKey)) {
        growthMap.set(colorKey, color)
      } else if (Math.random() < 0.3) {
        growthMap.set(colorKey, color)
      }
    }
    
    // Regenerate resources slowly - limit iterations
    const regenerateResources = () => {
      let count = 0
      resourceMap.forEach((resource, key) => {
        if (count++ > 1000) return // Limit iterations
        if (resource < 100) {
          resourceMap.set(key, Math.min(100, resource + 0.5))
        }
      })
    }

    // Spread growth - OPTIMIZED: Only process strong growth, limit iterations, 4-neighbors only
    const spreadGrowth = () => {
      if (growthMap.size > 5000) return // Skip if too large
      
      const newGrowthMap = new Map(growthMap)
      let processed = 0
      const maxProcess = Math.max(200, Math.floor(700 * renderBudgetRef.current)) // Adaptive budget
      
      growthMap.forEach((value, key) => {
        if (processed++ > maxProcess) return
        if (key.includes('_color')) return
        
        const intensity = typeof value === 'number' ? value : 0
        if (intensity > 20) { // Only spread from strong growth
          const [x, y] = key.split(',').map(Number)
          // Only 4 neighbors (not 8) for 2x performance
          const neighbors = [[x-1, y], [x+1, y], [x, y-1], [x, y+1]]
          
          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height && Math.random() < 0.3) {
              const nKey = `${nx},${ny}`
              const neighborValue = newGrowthMap.get(nKey)
              const neighborIntensity = typeof neighborValue === 'number' ? neighborValue : 0
              if (neighborIntensity < intensity * 0.7) {
                newGrowthMap.set(nKey, intensity * 0.8)
                const colorKey = key + '_color'
                const neighborColorKey = nKey + '_color'
                if (growthMap.has(colorKey) && !newGrowthMap.has(neighborColorKey)) {
                  newGrowthMap.set(neighborColorKey, growthMap.get(colorKey)!)
                }
              }
            }
          }
        }
      })
      growthMap = newGrowthMap
    }

    let animationFrame: number
    let lastTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = Math.min(100, currentTime - lastTime)
      lastTime = currentTime

      // Smooth frame time and adapt budget
      frameTimeAvgRef.current = frameTimeAvgRef.current * 0.9 + deltaTime * 0.1
      const avg = frameTimeAvgRef.current
      if (avg > 22) {
        renderBudgetRef.current = Math.max(0.4, renderBudgetRef.current * 0.9)
      } else if (avg < 16) {
        renderBudgetRef.current = Math.min(1.5, renderBudgetRef.current * 1.05)
      }

      // Clear with dark background
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Decay old growth - OPTIMIZED: Batch deletions, limit iterations
      const toDelete: string[] = []
      let decayCount = 0
      const maxDecay = 1500
      
      growthMap.forEach((value, key) => {
        if (decayCount++ > maxDecay) return
        if (key.includes('_color')) return
        const intensity = typeof value === 'number' ? value : 0
        if (intensity > 5) {
          growthMap.set(key, intensity * 0.999)
        } else {
          toDelete.push(key)
          toDelete.push(key + '_color')
        }
      })
      toDelete.forEach(k => growthMap.delete(k))
      
      // Aggressive cleanup if map too large
      if (growthMap.size > 10000) {
        const cleanup: string[] = []
        let cleanupCount = 0
        growthMap.forEach((value, key) => {
          if (cleanupCount++ > 5000) return
          if (key.includes('_color')) return
          const intensity = typeof value === 'number' ? value : 0
          if (intensity < 30) {
            cleanup.push(key)
            cleanup.push(key + '_color')
          }
        })
        cleanup.forEach(k => growthMap.delete(k))
      }

      // Regenerate resources
      regenerateResources()
      
      // Update population counts once - O(n) instead of O(n²)
      updatePopulationCounts()
      
      // Spatial partitioning for organism interactions - O(n) instead of O(n²)
      const gridSize = 40
      const spatialGrid = new Map<string, number[]>() // grid key -> array of organism indices
      
      // Build spatial grid - O(n)
      organisms.forEach((org, idx) => {
        const gridX = Math.floor(org.x / gridSize)
        const gridY = Math.floor(org.y / gridSize)
        const gridKey = `${gridX},${gridY}`
        if (!spatialGrid.has(gridKey)) {
          spatialGrid.set(gridKey, [])
        }
        spatialGrid.get(gridKey)!.push(idx)
      })
      
      const organismsToRemove: number[] = []
      const competitionStrength: Record<string, number> = {
        beetle: 2, fly: 0.5, mite: 0.3, worm: 1,
        insect: 1.2, slime: 1.5, spore: 0.8, mycelium: 1.3
      }
      
      for (let idx = 0; idx < organisms.length; idx++) {
        const org = organisms[idx]
        if (!org) continue
        
        // Movement - optimized
        org.age++
        org.energy -= 0.12
        
        const moveParams: Record<string, [number, number]> = {
          fly: [0.5, 0.94],
          worm: [0.08, 0.985],
          beetle: [0.12, 0.965],
          mite: [0.3, 0.95],
          default: [0.15, 0.97]
        }
        const [moveStrength, friction] = moveParams[org.type] || moveParams.default
        org.vx += (Math.random() - 0.5) * moveStrength
        org.vy += (Math.random() - 0.5) * moveStrength
        org.vx *= friction
        org.vy *= friction

        // Boundary behavior
        if (org.x < 0 || org.x > canvas.width) org.vx *= -1
        if (org.y < 0 || org.y > canvas.height) org.vy *= -1
        org.x = Math.max(0, Math.min(canvas.width, org.x + org.vx))
        org.y = Math.max(0, Math.min(canvas.height, org.y + org.vy))
        
        // Check nearby competitors using spatial grid - O(1) per organism instead of O(n)
        const gridX = Math.floor(org.x / gridSize)
        const gridY = Math.floor(org.y / gridSize)
        
        // Check 3x3 grid cells (current + 8 neighbors)
        for (let gx = gridX - 1; gx <= gridX + 1; gx++) {
          for (let gy = gridY - 1; gy <= gridY + 1; gy++) {
            const gridKey = `${gx},${gy}`
            const cellIndices = spatialGrid.get(gridKey) || []
            
            for (const otherIdx of cellIndices) {
              if (otherIdx === idx) continue
              const other = organisms[otherIdx]
              if (!other) continue
              
              const dx = other.x - org.x
              const dy = other.y - org.y
              const distSq = dx * dx + dy * dy // Use squared distance to avoid sqrt
              
              if (distSq < 400) { // 20^2 = 400
                const dist = Math.sqrt(distSq)
                
                // Same type - cooperation
                if (org.type === other.type && org.population < 50) {
                  org.energy += 0.05
                } else if (org.type !== other.type) {
                  // Competition
                  const orgStrength = competitionStrength[org.type] || 1
                  const otherStrength = competitionStrength[other.type] || 1
                  
                  if (orgStrength < otherStrength) {
                    org.energy -= 0.2
                  } else if (orgStrength > otherStrength) {
                    org.energy += 0.1
                  }
                  
                  // Predation
                  if (org.type === 'beetle' && (other.type === 'mite' || other.type === 'insect')) {
                    if (dist < 5 && Math.random() < 0.1 && !organismsToRemove.includes(otherIdx)) {
                      org.energy = Math.min(100, org.energy + 20)
                      organismsToRemove.push(otherIdx)
                    }
                  }
                  if (org.type === 'insect' && other.type === 'mite') {
                    if (dist < 3 && Math.random() < 0.15 && !organismsToRemove.includes(otherIdx)) {
                      org.energy = Math.min(100, org.energy + 10)
                      organismsToRemove.push(otherIdx)
                    }
                  }
                }
              }
            }
          }
        }
        
        // Check resource availability at current location
        const localResource = getResource(org.x, org.y)
        
        // Consume resources for survival
        if (localResource > 0) {
          const consumption = 0.5
          setResource(org.x, org.y, localResource - consumption)
          org.energy = Math.min(100, org.energy + consumption * 0.2)
        } else {
          org.energy -= 0.3
        }
        
        // Leave growth trail - more aggressive and creepy (only if has energy)
        if (org.energy > 20) {
          if (org.type === 'spore' || org.type === 'mycelium') {
            growPixel(org.x, org.y, 1.5, org.color, org) // Pass organism for resource tracking
            // Spread from organism in organic patterns - more aggressive
            for (let i = 0; i < 8; i++) {
              const angle = Math.random() * Math.PI * 2
              const dist = Math.random() * 6
              growPixel(
                org.x + Math.cos(angle) * dist,
                org.y + Math.sin(angle) * dist,
                0.6,
                org.color,
                org
              )
            }
            // Tendril-like growth - more frequent
            if (Math.random() < 0.5) {
              const tendrilAngle = Math.atan2(org.vy, org.vx)
              for (let i = 0; i < 5; i++) {
                growPixel(
                  org.x + Math.cos(tendrilAngle + (i - 2) * 0.2) * (3 + i),
                  org.y + Math.sin(tendrilAngle + (i - 2) * 0.2) * (3 + i),
                  0.5,
                  org.color,
                  org
                )
              }
            }
          }
          
          // Worms leave thick trails
          if (org.type === 'worm') {
            growPixel(org.x, org.y, 1.2, org.color, org)
            for (let i = 0; i < 6; i++) {
              const angle = Math.random() * Math.PI * 2
              const dist = Math.random() * 3
              growPixel(
                org.x + Math.cos(angle) * dist,
                org.y + Math.sin(angle) * dist,
                0.5,
                org.color,
                org
              )
            }
          }
          
          // Beetles leave strong growth patterns
          if (org.type === 'beetle') {
            growPixel(org.x, org.y, 1.0, org.color, org)
            for (let i = 0; i < 4; i++) {
              const angle = (Math.PI * 2 / 4) * i
              growPixel(
                org.x + Math.cos(angle) * 2,
                org.y + Math.sin(angle) * 2,
                0.4,
                org.color,
                org
              )
            }
          }
          
          // Mites leave tiny but numerous trails
          if (org.type === 'mite') {
            for (let i = 0; i < 3; i++) {
              growPixel(
                org.x + (Math.random() - 0.5) * 2,
                org.y + (Math.random() - 0.5) * 2,
                0.3,
                org.color,
                org
              )
            }
          }

          // Insects leave different trails
          if (org.type === 'insect') {
            org.trail.push({ x: org.x, y: org.y, opacity: 1 })
            if (org.trail.length > 15) org.trail.shift()
            org.trail.forEach((point, i) => {
              const opacity = (i / org.trail.length) * 0.5
              growPixel(point.x, point.y, opacity, org.color, org)
            })
          }
          
          // Flies leave erratic trails
          if (org.type === 'fly') {
            org.trail.push({ x: org.x, y: org.y, opacity: 1 })
            if (org.trail.length > 8) org.trail.shift()
            org.trail.forEach((point, i) => {
              const opacity = (i / org.trail.length) * 0.4
              growPixel(point.x, point.y, opacity, org.color, org)
            })
            // Flies spread growth randomly
            if (Math.random() < 0.3) {
              growPixel(
                org.x + (Math.random() - 0.5) * 10,
                org.y + (Math.random() - 0.5) * 10,
                0.3,
                org.color,
                org
              )
            }
          }

          // Slime spreads more aggressively
          if (org.type === 'slime') {
            for (let i = 0; i < 8; i++) {
              const angle = Math.random() * Math.PI * 2
              const dist = Math.random() * 7
              growPixel(
                org.x + Math.cos(angle) * dist,
                org.y + Math.sin(angle) * dist,
                0.6,
                org.color,
                org
              )
            }
          }
        }


        // Reproduce based on resources and population - Game of Life style
        const population = org.population
        const maxPopulation = {
          spore: 100,
          mycelium: 80,
          insect: 60,
          slime: 70,
          beetle: 40,
          mite: 150,
          worm: 50,
          fly: 90
        }
        
        const canReproduce = 
          org.age > 50 && 
          org.energy > 60 && 
          population < (maxPopulation[org.type] || 50) &&
          localResource > 30
        
        // Reproduction rates vary by type and conditions
        let reproductionRate = 0
        if (org.type === 'mite') reproductionRate = canReproduce ? 0.04 : 0
        else if (org.type === 'fly') reproductionRate = canReproduce ? 0.03 : 0
        else if (org.type === 'beetle') reproductionRate = canReproduce && population < 20 ? 0.02 : 0
        else reproductionRate = canReproduce ? 0.015 : 0
        
        // Overpopulation penalty
        if (population > (maxPopulation[org.type] || 50) * 0.8) {
          org.energy -= 0.5 // Stress from overcrowding
        }
        
        if (Math.random() < reproductionRate) {
          spawnOrganism(org.type, org.x + (Math.random() - 0.5) * 50, org.y + (Math.random() - 0.5) * 50)
          org.energy -= 40
          setResource(org.x, org.y, localResource - 20)
        }

        // Mark for death
        const shouldDie = 
          org.energy <= 0 || 
          org.age > 2000 ||
          (org.age > 1000 && org.energy < 20) ||
          (population > (maxPopulation[org.type] || 50) && org.energy < 30)
        
        if (shouldDie && Math.random() < 0.01 && !organismsToRemove.includes(idx)) {
          organismsToRemove.push(idx)
          setResource(org.x, org.y, localResource + 10)
        }
      }
      
      // Remove organisms in reverse order to maintain indices
      organismsToRemove.sort((a, b) => b - a).forEach(idx => {
        if (idx >= 0 && idx < organisms.length) {
          organisms.splice(idx, 1)
        }
      })

      // Spread growth organically
      spreadGrowth()

      // Render pixel data - OPTIMIZED: Single pass, limit iterations, batch operations
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      let renderCount = 0
      const baseMaxRender = 7000
      const maxRender = Math.max(1500, Math.floor(baseMaxRender * renderBudgetRef.current))
      const time = Date.now() / 1000
      
      growthMap.forEach((value, key) => {
        if (renderCount++ > maxRender) return
        if (key.includes('_color')) return
        
        const intensity = typeof value === 'number' ? value : 0
        if (intensity <= 5) return
        
        const [x, y] = key.split(',').map(Number)
        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return
        
        const idx = (y * canvas.width + x) * 4
        if (idx < 0 || idx + 3 >= imageData.data.length) return
        
        // Get color in same pass
        const colorKey = key + '_color'
        const color = (growthMap.get(colorKey) as string) || '#39ff14'
        const hex = color.replace('#', '')
        if (hex.length !== 6) return
        
        const r = parseInt(hex.substr(0, 2), 16) || 0
        const g = parseInt(hex.substr(2, 2), 16) || 0
        const b = parseInt(hex.substr(4, 2), 16) || 0
        
        const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.1 + 0.9
        const alpha = Math.min(255, intensity * pulse)
        
        imageData.data[idx] = Math.min(255, r * alpha / 255)
        imageData.data[idx + 1] = Math.min(255, g * alpha / 255)
        imageData.data[idx + 2] = Math.min(255, b * alpha / 255)
        imageData.data[idx + 3] = Math.min(255, alpha)
      })
      ctx.putImageData(imageData, 0, 0)
      
      // Render organisms - ensure they're visible
      organisms.forEach((org) => {
        if (!org) return
        const px = Math.floor(org.x)
        const py = Math.floor(org.y)
        if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) return
        
        ctx.fillStyle = org.color
        ctx.globalAlpha = 0.9
        ctx.shadowBlur = 2
        ctx.shadowColor = org.color
        ctx.fillRect(px, py, Math.max(1, org.size), Math.max(1, org.size))
        
        // Add details
        if (org.type === 'insect' && org.size > 1.5) {
          ctx.fillStyle = '#000000'
          ctx.globalAlpha = 0.5
          ctx.fillRect(px + 0.5, py + 0.5, 0.5, 0.5)
        } else if (org.type === 'beetle') {
          ctx.fillStyle = '#000000'
          ctx.globalAlpha = 0.3
          ctx.fillRect(px, py, org.size, org.size)
        } else if (org.type === 'fly') {
          ctx.fillStyle = org.color
          ctx.globalAlpha = 0.4
          ctx.fillRect(px - 1, py, 0.5, org.size)
          ctx.fillRect(px + org.size, py, 0.5, org.size)
        } else if (org.type === 'mite') {
          ctx.fillStyle = org.color
          ctx.globalAlpha = 0.8
          ctx.fillRect(px, py, 0.5, 0.5)
        } else if (org.type === 'worm') {
          ctx.fillStyle = org.color
          ctx.globalAlpha = 0.7
          for (let i = 0; i < Math.floor(org.size); i++) {
            ctx.fillRect(px + i, py, 0.8, 0.8)
          }
        }
        
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })

      // Spawn new organisms - OPTIMIZED: Use cached population counts
      if (Math.random() < 0.04 * Math.min(1, renderBudgetRef.current) && organisms.length < Math.floor(300 * renderBudgetRef.current)) {
        const types: PixelOrganism['type'][] = ['spore', 'mycelium', 'insect', 'slime', 'beetle', 'mite', 'worm', 'fly']
        const type = types[Math.floor(Math.random() * types.length)]
        const maxPop: Record<string, number> = {
          spore: 100, mycelium: 80, insect: 60, slime: 70,
          beetle: 40, mite: 150, worm: 50, fly: 90
        }
        // Use cached population from org.population
        const sampleOrg = organisms.find(o => o.type === type)
        if (!sampleOrg || sampleOrg.population < (maxPop[type] || 50)) {
          spawnOrganism(type)
        }
      }
      
      // Ecosystem balance
      if (organisms.length < Math.floor(40 * (0.6 + 0.4 * Math.min(1, renderBudgetRef.current)))) {
        const types: PixelOrganism['type'][] = ['spore', 'mycelium', 'insect', 'slime', 'beetle', 'mite', 'worm', 'fly']
        for (let i = 0; i < 3; i++) {
          const type = types[Math.floor(Math.random() * types.length)]
          const sampleOrg = organisms.find(o => o.type === type)
          if (!sampleOrg || sampleOrg.population < 30) {
            spawnOrganism(type)
          }
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
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
      {/* Pixel-Based Creepy Biological Background Canvas */}
      {showCorruption && (
        <canvas
          ref={backgroundCanvasRef}
          className="biological-canvas"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.65
          }}
        />
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
              transform: showCorruption && Math.random() < phaseIntensity * 0.5 
                ? `translateX(${(Math.random() * 40 - 20) * phaseIntensity}px) rotate(${(Math.random() * 10 - 5) * phaseIntensity}deg)` 
                : 'none',
              fontSize: showCorruption && phaseIntensity > 0.8 && Math.random() < phaseIntensity
                ? `${10 + Math.random() * 20}px` 
                : '14px',
              opacity: showCorruption && phaseIntensity > 0.8 ? 0.5 + Math.random() * 0.5 : 1,
              filter: showCorruption && phaseIntensity > 0.8 && Math.random() < phaseIntensity * 0.4 ? 'blur(1.2px)' : 'none'
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
              color: '#4da6ff', 
              textDecoration: 'underline',
              fontSize: '14px'
            }}>
              {'> ask him -> x.com/LazyShivam'}
            </a>
          </div>
        )}
      </div>
    </main>
  )
}
