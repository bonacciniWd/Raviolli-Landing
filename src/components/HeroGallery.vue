<template>
  <div class="gallery" ref="galleryRef">
    <div class="col" v-for="(col, i) in columns" :key="i">
      <div class="image" v-for="(src, j) in col" :key="j">
        <img :src="src" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHeroAnimation } from '../composables/heroAnimation'

const props = defineProps<{
  columns: string[][]
  getTriggerEl?: () => HTMLElement | null
}>()

const galleryRef = ref<HTMLElement | null>(null)

// Setup animation: composable runs onMounted internally
useHeroAnimation(galleryRef, { getTriggerEl: props.getTriggerEl })
</script>

<style scoped>
.gallery {
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  /* ocupar toda a largura do canvas sem deslocamento extra */
  transform: none;
  overflow: visible;
}

@media (max-width: 768px) {
  .gallery { width: 100%; }
  .image { padding: 0; }
  .col { flex: 0 0 33.333%; }
  .image img {
    /* Imagens mais altas e menos largas em mobile */
    aspect-ratio: 3 / 4;
    object-fit: cover;
    width: 100%;
    display: block;
    box-shadow: none;
  }
}

.col {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-self: flex-start;
  justify-self: flex-start;
}

.col:nth-child(2) {
  align-self: flex-end;
  justify-self: flex-end;
}

.image {
  width: 100%;
  filter: saturate(0);
  padding: 0;
}

.image:hover {
  z-index: 999999 !important;
  filter: saturate(1);
}

img {
  display: block;
  transition: 0.3s ease-out;
  overflow: hidden;
  will-change: transform;
  backface-visibility: hidden;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  width: 100%;
}
</style>
