import { generateBeautifulPattern } from '../app/page'

describe('generateBeautifulPattern', () => {
  test('returns a non-empty array of strings', () => {
    const pattern = generateBeautifulPattern()
    expect(Array.isArray(pattern)).toBe(true)
    expect(pattern.length).toBeGreaterThan(0)
    pattern.forEach(line => expect(typeof line).toBe('string'))
  })
})

