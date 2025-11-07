import { growBiologicalColonies, type GrowthColony, type GrowthType } from '../app/page'

// Helper to stub Math.random deterministically
function withMockedRandom(sequence: number[], fn: () => void) {
  const original = Math.random
  let i = 0
  // Cycle through sequence
  ;(Math as any).random = () => {
    const v = sequence[i % sequence.length]
    i++
    return v
  }
  try { fn() } finally { (Math as any).random = original }
}

describe('growBiologicalColonies', () => {
  test('seeds colonies on empty grid and returns same dimensions', () => {
    const rows = 10
    const cols = 20
    const grid = Array.from({ length: rows }, () => Array(cols).fill(' '))
    const colonies: GrowthColony[] = []
    const colorMap = new Map<string, GrowthType>()

    withMockedRandom([0.5], () => {
      const result = growBiologicalColonies(grid, 1.0, colonies, colorMap)
      expect(result.grid.length).toBe(rows)
      expect(result.grid[0].length).toBe(cols)
      // With intensity 1, seeds = min(5, floor(8)+3)=5
      expect(result.colonies.length).toBe(5)
      // At least 5 non-space cells should exist
      const nonSpace = result.grid.flat().filter(c => c !== ' ').length
      expect(nonSpace).toBeGreaterThanOrEqual(5)
      // Color map should contain at least seedCount entries
      expect(result.colorMap.size).toBeGreaterThanOrEqual(5)
    })
  })

  test('grows from existing colonies without changing dimensions', () => {
    const rows = 8
    const cols = 12
    const grid = Array.from({ length: rows }, () => Array(cols).fill(' '))
    const colorMap = new Map<string, GrowthType>()
    let colonies: GrowthColony[] = []

    withMockedRandom([0.5], () => {
      // Seed
      const seeded = growBiologicalColonies(grid, 1.0, colonies, colorMap)
      colonies = seeded.colonies
      // Grow again
      const grown = growBiologicalColonies(seeded.grid, 0.8, colonies, seeded.colorMap)
      expect(grown.grid.length).toBe(rows)
      expect(grown.grid[0].length).toBe(cols)
      expect(grown.colonies.length).toBe(colonies.length)
      // Should not reduce number of colored cells
      const before = seeded.grid.flat().filter(c => c !== ' ').length
      const after = grown.grid.flat().filter(c => c !== ' ').length
      expect(after).toBeGreaterThanOrEqual(before)
    })
  })
})

