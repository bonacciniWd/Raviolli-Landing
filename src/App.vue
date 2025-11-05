<script setup lang="ts">
import { RouterView } from 'vue-router'
import FloatingNavbar from './components/FloatingNavbar.vue'

const navItems = [
  { label: 'Loja', href: 'https://raviollipress.com.br' },
]
</script>

<template>
  <FloatingNavbar :items="navItems">
    
    <template #actions>
      <RouterLink class="action" to="/lookbook">Lookbook</RouterLink>
    </template>
  </FloatingNavbar>

  <RouterView />
</template>

<style scoped>
.logo {
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #111;
  text-decoration: none;
}
.action {
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(0,0,0,0.28);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
</style>
