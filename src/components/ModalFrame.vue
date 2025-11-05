<template>
  <Teleport to="body">
    <transition name="popup-fade">
      <div v-if="modelValue" class="popup" @click.self="close">
        <div ref="container" class="popup-container" :class="{ maximized }">
          <div class="popup-header">
            <div class="button-container">
              <button class="close-btn circle-btn red" @click="close" aria-label="Fechar"></button>
              <button class="close-btn circle-btn yellow" @click="minimize" aria-label="Minimizar"></button>
              <button class="maximize-btn circle-btn green" @click="toggleMax" aria-label="Maximizar"></button>
            </div>
          </div>
          <div class="popup-body"><slot /></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const maximized = ref(false)
const container = ref<HTMLElement | null>(null)

function close(){ emit('update:modelValue', false); maximized.value = false }
function minimize(){ emit('update:modelValue', false); maximized.value = false }
function toggleMax(){ maximized.value = !maximized.value }

watch(() => props.modelValue, (open) => {
  document.body.classList.toggle('prevent-background-scroll', !!open)
})

onMounted(() => {})

onBeforeUnmount(()=>{ document.body.classList.remove('prevent-background-scroll') })
</script>

<style scoped>
.popup{ position: fixed; inset:0; background: rgba(0,0,0,.5); z-index: 60; }
.popup-container{
  position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%);
  width: min(900px, 90%);
  background: rgba(133,133,133,.2);
  box-shadow: rgba(100,100,111,.2) 0 7px 29px 0;
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,.6);
  border-radius: 12px; color: #fff; transition: all .4s ease;
}
.popup-header{ display:flex; gap:8px; padding: 15px 20px 10px; }
.button-container{ display:flex; gap:8px; }
.circle-btn{ width: 16px; aspect-ratio: 1/1; border-radius: 50%; border:0; }
.red{ background:#ff605c; }
.yellow{ background:#ffbd44; }
.green{ background:#00ca4e; }
.popup-body{ height: 64dvh; overflow: auto; padding: 24px 28px; }
.maximized .popup-body{ height: calc(100dvh - 140px); }
@media (max-width: 640px){
  .popup-body{ height: 58dvh; }
  .maximized .popup-body{ height: calc(100dvh - 160px); }
}
.popup-fade-enter-from, .popup-fade-leave-to{ opacity: 0 }
.popup-fade-enter-active, .popup-fade-leave-active{ transition: opacity .2s ease }
</style>
