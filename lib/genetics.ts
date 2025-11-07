export type Genus = 'fungi' | 'arthropod' | 'ooze' | 'annelid' | 'predator'

export interface GeneSignature {
  hue: number // 0-360
  saturation: number // 0-1
  shape: number // 0-1 influences morphology
}

const genusHue: Record<Genus, number> = {
  fungi: 120,
  arthropod: 25,
  ooze: 170,
  annelid: 5,
  predator: 48,
}

const genusSaturation: Record<Genus, number> = {
  fungi: 0.75,
  arthropod: 0.8,
  ooze: 0.65,
  annelid: 0.7,
  predator: 0.9,
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const wrapHue = (value: number) => {
  const mod = value % 360
  return mod < 0 ? mod + 360 : mod
}

const randRange = (amount: number) => (Math.random() * 2 - 1) * amount

export function createBaseGene(genus: Genus): GeneSignature {
  return {
    hue: wrapHue(genusHue[genus] + randRange(18)),
    saturation: clamp(genusSaturation[genus] + randRange(0.05)),
    shape: clamp(Math.random()),
  }
}

export function mutateGene(parent: GeneSignature, intensity = 1): { gene: GeneSignature; hueDelta: number; shapeDelta: number } {
  const hueDelta = randRange(12 * intensity)
  const shapeDelta = randRange(0.12 * intensity)
  const satDelta = randRange(0.04 * intensity)
  const gene: GeneSignature = {
    hue: wrapHue(parent.hue + hueDelta),
    saturation: clamp(parent.saturation + satDelta),
    shape: clamp(parent.shape + shapeDelta),
  }
  return { gene, hueDelta: Math.abs(hueDelta), shapeDelta: Math.abs(shapeDelta) }
}

export function geneToColor(gene: GeneSignature, lightness = 0.55): string {
  const { hue, saturation } = gene
  const c = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - c / 2
  let r = 0, g = 0, b = 0
  if (hue >= 0 && hue < 60) { r = c; g = x }
  else if (hue < 120) { r = x; g = c }
  else if (hue < 180) { g = c; b = x }
  else if (hue < 240) { g = x; b = c }
  else if (hue < 300) { r = x; b = c }
  else { r = c; b = x }
  const toHex = (value: number) => {
    const hex = Math.round((value + m) * 255).toString(16).padStart(2, '0')
    return hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
