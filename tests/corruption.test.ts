import { controlledCorruption, chaosCorruption } from '../app/page'

describe('corruption functions', () => {
  test('controlledCorruption preserves empty and ">"', () => {
    expect(controlledCorruption('')).toBe('')
    expect(controlledCorruption('   ')).toBe('   ')
    expect(controlledCorruption('>')).toBe('>')
  })

  test('chaosCorruption preserves empty and ">"', () => {
    expect(chaosCorruption('', 1)).toBe('')
    expect(chaosCorruption('   ', 1)).toBe('   ')
    expect(chaosCorruption('>', 1)).toBe('>')
  })

  test('controlledCorruption returns a string and tends to keep structure', () => {
    const input = '> coming soon is coming soon'
    const out = controlledCorruption(input)
    expect(typeof out).toBe('string')
    expect(out.length).toBeGreaterThan(0)
  })

  test('chaosCorruption returns a string and may change length', () => {
    const input = '> status: slightly better than 404'
    const out = chaosCorruption(input, 0.9)
    expect(typeof out).toBe('string')
    expect(out.length).toBeGreaterThan(0)
  })
})

