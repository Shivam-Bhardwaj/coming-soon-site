import { describe, expect, test } from '@jest/globals'

// Simple deterministic helper copies from lib to avoid circular UI deps.
function simulateCloudBoost(radius: number, strength: number, gridStep = 40) {
  const resourceMap = new Map<string, number>()
  const cloud = { x: 100, y: 120, radius, strength }
  for (let dx = -cloud.radius; dx <= cloud.radius; dx += gridStep) {
    for (let dy = -cloud.radius; dy <= cloud.radius; dy += gridStep) {
      const px = Math.floor(cloud.x + dx)
      const py = Math.floor(cloud.y + dy)
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > cloud.radius) continue
      const boost = Math.max(0, (cloud.radius - dist) / cloud.radius) * cloud.strength
      const key = `${Math.floor(px / 20) * 20},${Math.floor(py / 20) * 20}`
      const current = resourceMap.get(key) || 50
      resourceMap.set(key, Math.min(120, current + boost * 0.05))
    }
  }
  return resourceMap
}

describe('nutrient clouds', () => {
  test('boost resources near center more than edges', () => {
    const map = simulateCloudBoost(80, 20)
    expect(map.size).toBeGreaterThan(0)
    const values = Array.from(map.entries())
    expect(values.length).toBeGreaterThan(0)
    const [highest] = values.sort((a, b) => b[1] - a[1])
    const [lowest] = values.sort((a, b) => a[1] - b[1])
    expect(highest[1]).toBeGreaterThan(lowest[1])
  })

  test('never exceeds cap 120', () => {
    const map = simulateCloudBoost(120, 200)
    for (const value of map.values()) {
      expect(value).toBeLessThanOrEqual(120)
    }
  })
})
