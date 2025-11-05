<template>
  <header ref="headerEl" :class="['floating-navbar', { 'is-scrolled': isScrolled }]">
    <nav class="inner">
      <div class="brand">
        <slot name="logo">
          <a class="logo" href="/" aria-label="Raviolli Home">
            <img class="logo-img logo-orb" src="../assets/ravi.png" alt="Raviolli" />
          </a>
        </slot>
      </div>

      <ul class="links">
        <li v-for="item in items" :key="item.href">
          <template v-if="item.href.startsWith('/')">
            <RouterLink :to="item.href" class="nav-link">{{ item.label }}</RouterLink>
          </template>
          <template v-else>
            <a :href="item.href" class="nav-link">{{ item.label }}</a>
          </template>
        </li>
      </ul>

      <div class="actions">
        <slot name="actions"></slot>
        <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-controls="mobile-menu" aria-label="Abrir menu">
          <component :is="menuOpen ? XMarkIcon : Bars3Icon" class="icon" />
        </button>
      </div>
    </nav>
    <transition name="dropdown">
      <div v-if="menuOpen" id="mobile-menu" class="mobile-menu">
        <ul>
          <li v-for="item in items" :key="'m-'+item.href">
            <template v-if="item.href.startsWith('/')">
              <RouterLink :to="item.href" class="mobile-link" @click="menuOpen = false">{{ item.label }}</RouterLink>
            </template>
            <template v-else>
              <a :href="item.href" class="mobile-link" @click="menuOpen = false">{{ item.label }}</a>
            </template>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

export interface NavItem {
  label: string
  href: string
}

const props = defineProps<{ items?: NavItem[] }>()
const items = ref<NavItem[]>(props.items ?? [
  { label: 'Início', href: '/' },
])

const isScrolled = ref(false)
const headerEl = ref<HTMLElement | null>(null)
const menuOpen = ref(false)

const onScroll = () => {
  isScrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.floating-navbar {
  position: fixed;
  top: 0;
  inset-inline: 0;
  height: 64px;
  display: flex;
  align-items: center;
  z-index: 50;
  transition: background-color 200ms ease, opacity 200ms ease, transform 200ms ease, border-color 200ms ease;
  /* Header branco sempre */
  background: #ffffff00;
  backdrop-filter: saturate(140%) blur(8px);
  -webkit-backdrop-filter: saturate(140%) blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.floating-navbar.is-scrolled {
  opacity: 1;
  background: #ffffff00;
  border-bottom-color: rgba(0, 0, 0, 0.10);
}

.inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: 16px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
}

.brand {
  justify-self: start;
}

.logo { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; position: relative;  background-color: tomato;
        padding-bottom: 8px;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        z-index: 70; }
.logo-img { display: block; border-radius: 999px; object-fit: contain; margin-top: 80px !important; }
/* Floating orb look over the header */
.logo-orb {
  /* Desktop: 80x80 */
  width: 100px;
  height: 100px;
  margin-block: -8px; /* sobrepõe o topo e base do header */
  background: transparent; /* sem fundo */
  border: none; /* sem borda */
  filter: drop-shadow(0 10px 18px rgba(0,0,0,0.22)) drop-shadow(0 2px 6px rgba(0,0,0,0.12));
  z-index: 60; /* acima do header */
}

/* brilho sutil opcional */
.logo-orb::after { content: ''; position: absolute; inset: 0; border-radius: 999px; pointer-events: none; background: radial-gradient(120% 120% at 30% 25%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0) 60%); }

.links {
  list-style: none;
  display: flex;
  gap: 16px;
  padding: 0;
  margin: 0;
  justify-content: center;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 8px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.06);
}

.actions {
  justify-self: end;
  display: flex;
  gap: 8px;
}

.hamburger {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.08);
  background: rgba(0,0,0,0.28);
  backdrop-filter: saturate(140%) blur(8px);
  -webkit-backdrop-filter: saturate(140%) blur(8px);
  align-items: center;
  justify-content: center;
}
.hamburger .icon { width: 22px; height: 22px; color: #fff; }

.mobile-menu {
  position: fixed;
  text-align: right;
  top: 64px;
  left: 0;
  right: 0;
  z-index: 45;
  background: #fff;
  backdrop-filter: saturate(140%) blur(8px);
  -webkit-backdrop-filter: saturate(140%) blur(8px);
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.mobile-menu ul {
  list-style: none;
  margin: 0;
  padding: 10px 16px 16px;
  display: grid;
  gap: 8px;
}
.mobile-link {
  display: block;
  padding: 12px 10px;
  border-radius: 10px;
  color: #111111;
  text-decoration: none;
}
.mobile-link:hover { background: rgba(255, 255, 255, 0.1); }

.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px); }
.dropdown-enter-active, .dropdown-leave-active { transition: all 160ms ease; }

@media (max-width: 640px) {
  .inner {
    grid-template-columns: 1fr auto;
  }
  .links {
    display: none;
  }
  .hamburger { display: inline-flex; }
  /* Mobile: logo 50x50 */
  .logo-orb { width: 80px; height: 80px; margin-block: -6px;
  margin-top: 30px; box-shadow: #111111 0 8px 16px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12);
}

    .logo {
        background-color: tomato;
        padding-bottom: 8px;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        z-index: 70;
    }
}
</style>
