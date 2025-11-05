<template>
  <section class="looping-host">
    <div class="looping-words">
      <div ref="containerRef" class="looping-words__containers">
        <ul ref="listRef" data-looping-words-list class="looping-words__list">
          <li class="looping-words__item"><p class="looping-words__p">RAVIOLLI PRESS</p></li>
          <li class="looping-words__item"><p class="looping-words__p"></p>SOMOS</li>
          <li class="looping-words__item"><p class="looping-words__p"></p>ARTE</li>
          <li class="looping-words__item"><p class="looping-words__p"></p>DESIGN</li>
          <li class="looping-words__item"><p class="looping-words__p"></p>atitude</li>
          <li class="looping-words__item"><p class="looping-words__p"></p>IDENTIDADE</li>
          <li class="looping-words__item"><p class="looping-words__p"></p>SOMOS</li>
        </ul>
      </div>
      <div class="looping-words__fade"></div>
      <div ref="edgeRef" data-looping-words-selector class="looping-words__selector">
        <div class="looping-words__edge"></div>
        <div class="looping-words__edge is--2"></div>
        <div class="looping-words__edge is--3"></div>
        <div class="looping-words__edge is--4"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from '../plugins/gsap'

const listRef = ref<HTMLUListElement|null>(null)
const edgeRef = ref<HTMLElement|null>(null)
const containerRef = ref<HTMLElement|null>(null)

let tl: gsap.core.Timeline | null = null
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const list = listRef.value!
  const edge = edgeRef.value!
  const container = containerRef.value!
  const words = Array.from(list.children) as HTMLElement[]
  const total = words.length
  let currentIndex = 0
  let itemHeight = 0
  let isAnimating = false

  function measure(){
    const sample = words[0]
    itemHeight = sample?.getBoundingClientRect().height || 0
  }

  function syncHeights(){
    measure()
    if(itemHeight){
      container.style.height = `${itemHeight}px`
      edge.style.height = `${itemHeight}px`
    }
  }

  function updateEdgeWidth(){
    const centerWord = words[currentIndex] || words[0]
    if(!centerWord){ return }
    const centerWordWidth = centerWord.getBoundingClientRect().width
    const listWidth = list.getBoundingClientRect().width
    const pct = listWidth ? (centerWordWidth / listWidth) * 100 : 0
    gsap.to(edge, { width: `${pct}%`, duration: 0.4, ease: 'expo.out' })
  }

  function realign(){
    const y = -itemHeight * currentIndex
    gsap.set(list, { y })
  }

  function move(){
    if(isAnimating) return
    currentIndex++
    const y = -itemHeight * currentIndex
    isAnimating = true
    gsap.to(list, {
      y,
      duration: 0.9,
      ease: 'power3.out',
      onStart: () => { syncHeights(); updateEdgeWidth() },
      onComplete(){
        isAnimating = false
        if(currentIndex >= total - 1){
          list.appendChild(list.children[0]!)
          currentIndex--
          realign()
          words.push(words.shift()!)
        }
      }
    })
  }

  syncHeights()
  updateEdgeWidth()
  realign()
  tl = gsap.timeline({ repeat: -1, delay: 1 })
    .call(move)
    .to({}, { duration: 2 })

  // keep sizes and alignment in sync
  resizeObserver = new ResizeObserver(() => {
    syncHeights()
    realign()
    updateEdgeWidth()
  })
  resizeObserver.observe(list)
  resizeObserver.observe(container)
})

onBeforeUnmount(() => {
  tl?.kill()
  resizeObserver?.disconnect()
})
</script>

<style scoped>
/* Host centers content; no background styling */
.looping-host{ display:grid; place-items:center; min-height: 80vh; width: 100%; }

.looping-words{ position: relative; }

/* big, responsive type */
.looping-words__list{
  text-align:center; text-transform:uppercase; white-space:nowrap;
  flex-flow:column; align-items:center; margin:0; padding:0; list-style:none; display:flex; position:relative;
  font-weight:800; font-size: clamp(35px, 7.5vw, 88px); line-height:1; color:#fff;
}
.looping-words__item{ margin:0; padding:0; }
.looping-words__p{ margin:0; }

.looping-words__containers{ width:100%; height:100%; position:relative; overflow:hidden; }

/* fade is minimal/transparent to avoid overriding NoiseCanvas */
.looping-words__fade{ position:absolute; inset:0; pointer-events:none; background:linear-gradient(180deg, transparent 10%, transparent 90%); }

.looping-words__selector{ pointer-events:none; width:100%; position:absolute; top:50%; left:50%; transform: translate(-50%,-50%); }
.looping-words__edge{ border-top:.195em solid hsl(0, 94%, 38%); border-left:.195em solid hsl(0, 94%, 38%); width:.455em; height:.455em; position:absolute; top:0; left:0; }
.looping-words__edge.is--2{ left:auto; right:0; transform:rotate(90deg); }
.looping-words__edge.is--3{ inset:auto 0 0 auto; transform:rotate(180deg); }
.looping-words__edge.is--4{ top:auto; bottom:0; transform:rotate(270deg); }

@media (max-width: 640px){
  .looping-words__list{ font-size: clamp(38px, 8vw, 56px); }
  .looping-words__edge{ border-top:.095em solid hsl(0, 94%, 38%); border-left:.095em solid hsl(0, 94%, 38%); width:.255em; height:.255em; position:absolute; top:0; left:0; }
}
</style>
