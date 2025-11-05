import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin once at app startup (import this module somewhere early)
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
