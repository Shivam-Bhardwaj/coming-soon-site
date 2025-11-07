// Shared simulation helpers for tests and UI

// Complete words from other languages
export const foreignWords = {
  spanish: ['viene', 'pronto', 'tiempo', 'antes', 'estado', 'mejor', 'nunca', 'ahora', 'llegar', 'cual', 'momento', 'todavia'],
  french: ['vient', 'bientot', 'temps', 'avant', 'jamais', 'mieux', 'maintenant', 'arriver', 'quel', 'moment'],
  german: ['kommt', 'bald', 'zeit', 'niemals', 'status', 'besser', 'jetzt', 'kommen', 'was', 'moment'],
  italian: ['viene', 'presto', 'tempo', 'prima', 'stato', 'meglio', 'adesso', 'arrivare', 'cosa', 'momento'],
  portuguese: ['vem', 'logo', 'tempo', 'antes', 'estado', 'melhor', 'agora', 'chegar', 'qual', 'momento'],
  russian: ['скоро', 'время', 'статус', 'лучше', 'придет', 'когда', 'сейчас'],
  chinese: ['很快', '时间', '状态', '更好', '来了', '现在'],
}

// Common English words to preserve
export const englishWords = ['coming', 'soon', 'time', 'status', 'better', 'will', 'before', 'anyway', 'what', 'slightly', 'than', 'is', 'ERROR', 'FATAL', 'WARNING', 'SYSTEM']

// Extended ASCII characters (32-255)
export const extendedASCII = {
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
export const asciiArtPatterns = [
  '╔══╗', '║▓▓║', '╚══╝',
  '<<<>>>', '[][][]', '{•••}',
  '▲▼◄►', '◢◣◤◥', '♠♣♥♦',
  '░░░░', '▒▒▒▒', '▓▓▓▓', '████',
  '///\\\\\\', '~~~', '---', '===',
  '╭─╮', '│☺│', '╰─╯',
  '◆◇◆◇', '★☆★☆', '♪♫♪♫',
]

export function generateBeautifulPattern(): string[] {
  const patterns = [
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
    () => [
      '░░▒▒▓▓████▓▓▒▒░░',
      '▒▒▓▓████████▓▓▒▒',
      '▓▓████████████▓▓',
      '████████████████',
      '▓▓████████████▓▓',
      '▒▒▓▓████████▓▓▒▒',
      '░░▒▒▓▓████▓▓▒▒░░',
    ],
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
    () => Array(10).fill(0).map(() => 
      Array(20).fill(0).map(() => 
        Math.random() < 0.4 ? ['0','1','░','▒','▓','█'][Math.floor(Math.random() * 6)] : ' '
      ).join('')
    ),
  ]
  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)]
  return selectedPattern()
}

export type GrowthType = 'fungus' | 'slime' | 'mold' | 'mycelium' | 'algae';

export interface GrowthColony {
  type: GrowthType;
  cells: [number, number][];
  age: number;
  spreadRate: number;
}

export const growthPatterns: Record<GrowthType, string[]> = {
  fungus: ['·', '•', '◦', '◉', '◯', '○', '●', '◐', '◑', '◒', '◓'],
  slime: ['~', '≈', '≋', '∿', '∼', '∽', '≁', '≃'],
  mold: ['░', '▒', '▓', '█', '▄', '▀', '▌', '▐'],
  mycelium: ['─', '━', '═', '╌', '╍', '╎', '╏', '│', '┃', '║'],
  algae: ['*', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋']
};

export const growthColors: Record<GrowthType, string> = {
  fungus: '#ffb84d',
  slime: '#39ff14',
  mold: '#ff1493',
  mycelium: '#00ffff',
  algae: '#ffff00'
};

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
  
  if (activeColonies.length === 0) {
    const colonyTypes: GrowthType[] = ['fungus', 'slime', 'mold', 'mycelium', 'algae'];
    const seedCount = Math.min(5, Math.floor(intensity * 8) + 3);
    for (let i = 0; i < seedCount; i++) {
      const type = colonyTypes[i % colonyTypes.length];
      let r, c;
      if (i === 0) { r = 0; c = 0; }
      else if (i === 1) { r = 0; c = cols - 1; }
      else if (i === 2) { r = rows - 1; c = 0; }
      else if (i === 3) { r = rows - 1; c = cols - 1; }
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
  
  activeColonies = activeColonies.map(colony => {
    const patterns = growthPatterns[colony.type];
    const newCells: [number, number][] = [];
    colony.cells.forEach(([r, c]) => {
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
          const effectiveSpreadRate = colony.spreadRate * (1 + intensity * 0.5) * (1 + colony.age * 0.01);
          if (isEmpty && Math.random() < effectiveSpreadRate) {
            newGrid[nr][nc] = patterns[Math.floor(Math.random() * patterns.length)];
            newColorMap.set(`${nr},${nc}`, colony.type);
            newCells.push([nr, nc]);
          } else if (isSameType && Math.random() < effectiveSpreadRate * 0.4) {
            const currentIndex = patterns.indexOf(cellValue);
            if (currentIndex < patterns.length - 1) {
              newGrid[nr][nc] = patterns[currentIndex + 1];
            }
            if (!newColorMap.has(`${nr},${nc}`)) {
              newColorMap.set(`${nr},${nc}`, colony.type);
            }
          }
        }
      });
    });
    return { ...colony, cells: [...colony.cells, ...newCells], age: colony.age + 1 };
  });
  return { grid: newGrid, colonies: activeColonies, colorMap: newColorMap };
}

export function getRandomExtendedChar(): string {
  const allChars = Object.values(extendedASCII).join('')
  return allChars[Math.floor(Math.random() * allChars.length)]
}

export function getRandomForeignWord(): string {
  const languages = Object.keys(foreignWords) as (keyof typeof foreignWords)[]
  const randomLang = languages[Math.floor(Math.random() * languages.length)]
  const words = foreignWords[randomLang]
  return words[Math.floor(Math.random() * words.length)]
}

export function getRandomEnglishWord(): string {
  return englishWords[Math.floor(Math.random() * englishWords.length)]
}

export function getRandomAsciiArt(): string {
  return asciiArtPatterns[Math.floor(Math.random() * asciiArtPatterns.length)]
}

export function controlledCorruption(text: string): string {
  if (text.trim() === '' || text === '>') return text
  const words = text.match(/(>|[^\s]+|\s+)/g) || []
  let hasEnglish = false
  let hasForeign = false
  const corrupted = words.map((word) => {
    if (word.trim() === '' || word === '>') return word
    if (!hasEnglish && Math.random() < 0.3) { hasEnglish = true; return getRandomEnglishWord() }
    if (!hasForeign && Math.random() < 0.3) { hasForeign = true; return getRandomForeignWord() }
    const rand = Math.random()
    if (rand < 0.2) return getRandomEnglishWord()
    if (rand < 0.4) return getRandomForeignWord()
    if (rand < 0.6) {
      return word.split('').map(char => Math.random() < 0.5 ? getRandomExtendedChar() : char).join('')
    }
    return word
  })
  return corrupted.join('')
}

export function chaosCorruption(text: string, intensity: number): string {
  if (text.trim() === '' || text === '>') return text
  let result = text
  if (Math.random() < intensity) {
    result = result.replace(/\s+/g, () => {
      const rand = Math.random()
      if (rand < 0.3) return ''
      if (rand < 0.6) return Array(Math.floor(Math.random() * 5) + 1).fill(' ').join('')
      if (rand < 0.8) return getRandomExtendedChar()
      return ' '
    })
  }
  if (Math.random() < intensity * 0.7) {
    const insertPos = Math.floor(Math.random() * result.length)
    const art = getRandomAsciiArt()
    result = result.slice(0, insertPos) + art + result.slice(insertPos)
  }
  if (Math.random() < intensity * 0.8) {
    const overflow = Array(Math.floor(Math.random() * (20 * intensity))).fill(0).map(() => getRandomExtendedChar()).join('')
    result += overflow
  }
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

