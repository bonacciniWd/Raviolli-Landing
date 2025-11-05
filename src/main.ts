import { createApp } from 'vue'
import router from './router'
import './plugins/gsap'
import './styles/global.css'
import './style.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
