import { createBaseGene, mutateGene, geneToColor, type GeneSignature, type Genus } from '../lib/genetics'

describe('genetics helpers', () => {
  test('createBaseGene produces different hues per genus', () => {
    const fungi = createBaseGene('fungi')
    const predator = createBaseGene('predator')
    expect(fungi.hue).not.toBeNaN()
    expect(predator.hue).not.toBeNaN()
    expect(Math.abs(fungi.hue - predator.hue)).toBeGreaterThan(10)
  })

  test('mutateGene clamps shape and saturation', () => {
    const parent: GeneSignature = { hue: 10, saturation: 0.95, shape: 0.95 }
    const { gene, hueDelta, shapeDelta } = mutateGene(parent, 1)
    expect(gene.saturation).toBeLessThanOrEqual(1)
    expect(gene.saturation).toBeGreaterThanOrEqual(0)
    expect(gene.shape).toBeLessThanOrEqual(1)
    expect(gene.shape).toBeGreaterThanOrEqual(0)
    expect(hueDelta).toBeGreaterThanOrEqual(0)
    expect(shapeDelta).toBeGreaterThanOrEqual(0)
  })

  test('geneToColor returns hex string', () => {
    const gene: GeneSignature = { hue: 200, saturation: 0.5, shape: 0.2 }
    const color = geneToColor(gene)
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
  })
})
