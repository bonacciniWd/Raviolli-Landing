<template>
  <div class="icon-container">
    <button class="icon-box about" @click="$emit('open','about')" aria-label="Sobre">
      <UserCircleIcon class="icon" />
    </button>
    <button class="icon-box projects" @click="$emit('open','projects')" aria-label="Projetos">
      <ComputerDesktopIcon class="icon" />
    </button>
    <button class="icon-box contact" @click="$emit('open','contact')" aria-label="Contato">
      <EnvelopeIcon class="icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ComputerDesktopIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
</script>

<style scoped>
.icon-container{
  position: absolute;
  bottom: clamp(12px, 3vh, 28px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 14px;
  /* Glassmorphism */
  background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%);
  border: 1px solid rgba(255,255,255,0.35);
  box-shadow: 0 18px 40px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  z-index: 3;
}
.icon-container::before{
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 40%);
  pointer-events: none;
  mix-blend-mode: soft-light;
}
.icon-box{
  display: grid;
  place-items: center;
  width: 50px; aspect-ratio: 1/1; border-radius: 12px; color: #fff;
  padding: 5px; cursor: pointer; transition: transform .25s ease, filter .25s ease;
}
.icon{ width: 25px; height: 25px; color: #fff; }
.icon-box:hover{ transform: translateY(-2px) scale(1.06); filter: saturate(120%); }
.about{ background: linear-gradient(30deg, rgba(20, 19, 26, 0.596) 0%, rgba(29, 27, 37, 0.493) 40%); }
.projects{ background:linear-gradient(30deg, rgba(20, 19, 26, 0.596) 0%, rgba(29, 27, 37, 0.685) 40%);  }
.contact{ background: linear-gradient(30deg, rgba(20, 19, 26, 0.596) 0%, rgba(29, 27, 37, 0.685) 40%);  }

@media (max-width: 640px){
  .icon-container{ 
    gap: 10px; 
    padding: 6px 10px; 
    /* Bring dock closer to the real bottom on mobile while respecting safe areas */
    bottom: calc(env(safe-area-inset-bottom, 0px) + 8px);
  }
  .icon-box{ width: 44px; border-radius: 10px; }
  .icon{ width: 24px; height: 20px; }
}
</style>
