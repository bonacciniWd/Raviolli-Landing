<template>
  <section ref="root" class="text-clip-section">
    <div class="container">
  <img ref="logoEl" class="logo-spin" src="../assets/ravi.svg" alt="Raviolli Logo" />
      <h1 class="text">RAVIOLLI<span>PRESS</span></h1>
      <h1 class="text">SERIGRAFIA<span>ARTE</span></h1>
      <h1 class="text">CRIATIVIDADE<span>DISRUPTIVA</span></h1>
      <h1 class="text">CLASSICO<span>FUTURISTA</span></h1>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from '../plugins/gsap'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null
const logoEl = ref<HTMLImageElement | null>(null)

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    // Spin logo with section scroll progress
    if (logoEl.value) {
      gsap.fromTo(
        logoEl.value,
        { rotate: 0 },
        {
          rotate: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.8, // suaviza o scrub
          },
        }
      )
    }

    const items = gsap.utils.toArray<HTMLElement>('.text')
    items.forEach((el) => {
      gsap.to(el, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'center 80%',
          end: 'center 20%',
          scrub: true,
        },
      })
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<style scoped>
/* Fonte do exemplo */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');

.text-clip-section {
  /* Theme tokens */
  --tc-bg: #0d0d0d;
  --tc-fg: #b6b6b6;
  --tc-base-alpha: 0.26;
  --tc-border: rgba(255, 255, 255, 0.06);
  --tc-accent: #e41f11;

  background: var(--tc-bg);
  color: var(--tc-fg);
}

.container {
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.16em;
  padding: clamp(20px, 6vw, 10%);
  padding-top: clamp(72px, 12vw, 104px);
  padding-left: clamp(24px, 6vw, 120px);
  padding-right: clamp(16px, 5vw, 48px);
  padding-bottom: clamp(24px, 8vw, 96px);
  /* Safe-area for iOS */
  padding-top: calc(clamp(72px, 12vw, 104px) + env(safe-area-inset-top));
  padding-left: calc(clamp(24px, 6vw, 120px) + env(safe-area-inset-left));
  padding-right: calc(clamp(16px, 5vw, 48px) + env(safe-area-inset-right));
}

.logo-spin {
  width: clamp(80px, 12vw, 146px); /* ligeiramente maior no desktop */
  height: auto;
  margin-bottom: 2rem; /* cria respiro entre logo e textos */
  transform-origin: 50% 50%;
  will-change: transform;
  display: block; /* remove gaps inline e alinha à esquerda */
}

.text {
  font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  font-size: clamp(40px, 8.5vw, 140px);
  letter-spacing: -0.01em;
  line-height: 1;
  margin: 0;
  width: 100%;
  color: rgba(182, 182, 182, var(--tc-base-alpha));
  background: linear-gradient(to right, var(--tc-fg), var(--tc-fg)) no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  background-size: 0% 100%;
  transition: background-size cubic-bezier(.1,.5,.5,1) 0.5s;
  border-bottom: 1px solid var(--tc-border);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding-block: 0.08em;
}

.text + .text {
  /* pequeno respiro entre linhas ao invés de padding externo */
  margin-top: 0.08em;
}

.text:last-child {
  border-bottom: 0;
}

.text > span {
  position: absolute;
  inset: 0;
  background-color: var(--tc-accent);
  color: #0D0D0D;
  clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
  transform-origin: center;
  transition: all cubic-bezier(.1,.5,.5,1) 0.4s;
  display: flex;
  align-items: center;
  padding-left: 0.02em;
  will-change: clip-path;
}

.text:hover > span {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

a { color: inherit; text-decoration: none; }

@media (max-width: 640px) {
  .container {
    min-height: 95vh;
    gap: 0.12em;
    padding-left: clamp(18px, 6vw, 28px);
    padding-right: clamp(12px, 5vw, 24px);
    padding-top: clamp(8px, 4vw, 8px);
  }
  .logo-spin {
    align-self: center; /* centraliza no mobile */
    margin-bottom: clamp(74px, 10vw, 58px); /* mais respiro no mobile */
    width: clamp(96px, 28vw, 160px); /* um pouco maior no mobile */
  }
  .text {
    font-size: clamp(28px, 12vw, 56px);
    letter-spacing: -0.006em;
  }
}

@media (min-width: 1280px) {
  .container { padding-left: clamp(8%, 12vw, 16%); }
  .logo-spin { width: clamp(96px, 10vw, 188px); }
}
</style>