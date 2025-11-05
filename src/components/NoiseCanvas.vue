<template>
  <div class="noise-wrap">
    <canvas ref="canvasEl" class="noise-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { Noise } from 'noisejs'

const canvasEl = ref<HTMLCanvasElement | null>(null)

// Props
const props = withDefaults(defineProps<{ showGui?: boolean }>(), { showGui: false })

// State controlled via dat.gui (se habilitado)
let noiseSpeed = 0.010
let noiseScale = 220
let dotSize = 8
let gap = 2
let hueBase = 280
let hueRange = 90
let shape = 0

// Render state
let rafId = 0
let nt = 0
let ctx: CanvasRenderingContext2D | null = null
let noise: Noise | null = null
let gui: any | null = null

function resize() {
  if (!canvasEl.value) return
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
  const cssW = canvasEl.value.clientWidth || window.innerWidth
  const cssH = canvasEl.value.clientHeight || window.innerHeight
  canvasEl.value.width = Math.floor(cssW * dpr)
  canvasEl.value.height = Math.floor(cssH * dpr)
  const context = canvasEl.value.getContext('2d')
  if (!context) return
  ctx = context
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function lerp(x1: number, x2: number, n: number) {
  return (1 - n) * x1 + n * x2
}

function clear() {
  if (!ctx) return
  ctx.fillStyle = 'rgba(0,0,0,1)'
  ctx.fillRect(0, 0, canvasEl.value!.clientWidth, canvasEl.value!.clientHeight)
}

function draw() {
  if (!ctx || !noise || !canvasEl.value) return
  const w = canvasEl.value.clientWidth
  const h = canvasEl.value.clientHeight
  nt += noiseSpeed

  for (let x = 0; x < w; x += dotSize + gap) {
    for (let y = 0; y < h; y += dotSize + gap) {
      const yn = noise.perlin3(y / noiseScale, x / noiseScale, nt) * 20
      const cn = lerp(hueRange, yn * hueRange, 0.2)

      ctx.beginPath()
      ctx.fillStyle = `hsla(${hueBase + cn}, 50%, 50%, ${yn})`
      if (shape === 0) {
        ctx.fillRect(x, y, dotSize, dotSize)
      } else if (shape === 1) {
        ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2)
        ctx.fill()
      } else if (shape === 2) {
        ctx.moveTo(x + dotSize / 2, y + dotSize)
        ctx.lineTo(x, y)
        ctx.lineTo(x + dotSize, y)
        ctx.fill()
      } else if (shape === 3) {
        if (y % ((gap + dotSize) * 2) === gap + dotSize) {
          ctx.moveTo(x + dotSize / 2, y)
          ctx.lineTo(x + dotSize, y + dotSize)
          ctx.lineTo(x, y + dotSize)
        } else {
          ctx.moveTo(x + dotSize / 2, y + dotSize)
          ctx.lineTo(x, y)
          ctx.lineTo(x + dotSize, y)
        }
        ctx.fill()
      }
      ctx.closePath()
    }
  }
}

function render() {
  clear()
  draw()
  rafId = requestAnimationFrame(render)
}

onMounted(() => {
  noise = new Noise(Math.random())
  resize()
  window.addEventListener('resize', resize)

  if (props.showGui) setupGui()

  render()
})

async function setupGui() {
  const dat = await import('dat.gui')
  gui = new dat.GUI({ width: 300 })
  const f: any = gui
  f.add({ get noiseSpeed() { return noiseSpeed }, set noiseSpeed(v: number) { noiseSpeed = v } }, 'noiseSpeed', 0.0, 0.02)
  f.add({ get noiseScale() { return noiseScale }, set noiseScale(v: number) { noiseScale = v } }, 'noiseScale', 50, 300)
  f.add({ get dotSize() { return dotSize }, set dotSize(v: number) { dotSize = Math.round(v) } }, 'dotSize', 1, 15).step(1)
  f.add({ get gap() { return gap }, set gap(v: number) { gap = Math.round(v) } }, 'gap', 0, 10).step(1)
  f.add({ get hueBase() { return hueBase }, set hueBase(v: number) { hueBase = Math.round(v) } }, 'hueBase', 0, 360).step(1)
  f.add({ get hueRange() { return hueRange }, set hueRange(v: number) { hueRange = Math.round(v) } }, 'hueRange', 0, 200).step(1)
  f.add({ get shape() { return shape }, set shape(v: number) { shape = Math.round(v) } }, 'shape', 0, 3).step(1)
}

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
  gui?.destroy()
})
</script>

<style scoped>
.noise-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none; /* canvas só como background */
}

.noise-canvas {
  width: 100%;
  height: 100vh;
  display: block;
}

</style>
