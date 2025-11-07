import { calculateGrowthMetrics } from '../lib/metrics'

describe('calculateGrowthMetrics', () => {
  test('handles empty inputs', () => {
    const summary = calculateGrowthMetrics([], 1000, 0)
    expect(summary.coverage).toBe(0)
    expect(summary.avgIntensity).toBe(0)
    expect(summary.entropy).toBe(0)
  })

  test('computes coverage and averages', () => {
    const intensities = [10, 50, 200, 255]
    const summary = calculateGrowthMetrics(intensities, 1000, 200)
    expect(summary.coverage).toBeCloseTo(0.2)
    expect(summary.avgIntensity).toBeCloseTo((10 + 50 + 200 + 255) / 4)
    expect(summary.entropy).toBeGreaterThan(0)
    expect(summary.entropy).toBeLessThanOrEqual(1)
  })

  test('entropy is zero when all bins equal', () => {
    const summary = calculateGrowthMetrics(Array(50).fill(100), 500, 100)
    expect(summary.entropy).toBeCloseTo(0)
  })
})

