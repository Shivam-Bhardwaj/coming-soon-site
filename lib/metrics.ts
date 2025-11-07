export interface GrowthMetricSummary {
  coverage: number // 0-1
  avgIntensity: number
  entropy: number // 0-1 normalized
}

export function calculateGrowthMetrics(intensities: number[], totalCells: number, activeCells: number): GrowthMetricSummary {
  if (totalCells <= 0) {
    return { coverage: 0, avgIntensity: 0, entropy: 0 }
  }
  const coverage = Math.min(1, Math.max(0, activeCells / totalCells))
  if (intensities.length === 0) {
    return { coverage, avgIntensity: 0, entropy: 0 }
  }
  const avgIntensity = intensities.reduce((sum, value) => sum + value, 0) / intensities.length
  const bins = 8
  const counts = new Array(bins).fill(0)
  intensities.forEach(value => {
    const normalized = Math.max(0, Math.min(0.999, value / 255))
    const index = Math.floor(normalized * bins)
    counts[index] += 1
  })
  const total = intensities.length
  const entropy = counts.reduce((acc, count) => {
    if (count === 0) return acc
    const p = count / total
    return acc - p * Math.log2(p)
  }, 0)
  const maxEntropy = Math.log2(bins)
  return {
    coverage,
    avgIntensity,
    entropy: maxEntropy > 0 ? entropy / maxEntropy : 0,
  }
}
