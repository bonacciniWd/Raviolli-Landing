import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { gsap } from '../plugins/gsap'
import { ScrollTrigger } from '../plugins/gsap'

export interface UseHeroAnimationOptions {
  getTriggerEl?: () => HTMLElement | null
}

export function useHeroAnimation(containerRef: Ref<HTMLElement | null>, options?: UseHeroAnimationOptions) {
  let tweens: gsap.core.Tween[] = []
  let trigger: ScrollTrigger | null = null
  let ro: ResizeObserver | null = null

  const waitForImages = async (root: HTMLElement) => {
    const imgs = Array.from(root.querySelectorAll('img')) as HTMLImageElement[]
    if (!imgs.length) return
    await Promise.all(
      imgs.map((img) =>
        img.complete && img.naturalHeight !== 0
          ? Promise.resolve()
          : new Promise<void>((res) => {
              const onDone = () => {
                img.removeEventListener('load', onDone)
                img.removeEventListener('error', onDone)
                res()
              }
              img.addEventListener('load', onDone, { once: true })
              img.addEventListener('error', onDone, { once: true })
            })
      )
    )
  }

  const teardown = () => {
    tweens.forEach((t) => t.kill())
    tweens = []
    trigger?.kill()
    trigger = null
  }

  const setup = () => {
    const container = containerRef.value
    if (!container) return
    teardown()

    const additionalY = { val: 0 }
    let additionalYAnim: gsap.core.Tween | undefined
    let offset = 0

  const cols = Array.from(container.querySelectorAll('.col')) as HTMLElement[]

    cols.forEach((col, i) => {
      // Only duplicate once; mark the column to avoid unlimited clones on rebuilds
      if (!col.dataset.loopSetup) {
        const originals = Array.from(col.children) as HTMLElement[]
        originals.forEach((image) => {
          const clone = image.cloneNode(true) as HTMLElement
          ;(clone as HTMLElement).dataset.clone = 'true'
          col.appendChild(clone)
        })
        col.dataset.loopSetup = '1'
      }

      const allItems = Array.from(col.children) as HTMLElement[]

      allItems.forEach((item) => {
        const columnHeight = (item.parentElement as HTMLElement).clientHeight
        const directionPlus = i % 2 !== 0 // odd columns go downwards
        const direction = directionPlus ? '+=' : '-='

        const tween = gsap.to(item, {
          y: (direction + String(columnHeight / 2)) as any,
          duration: 20,
          repeat: -1,
          ease: 'none',
          modifiers: {
            y: gsap.utils.unitize((y: string) => {
              const yNum = parseFloat(y)
              offset += additionalY.val
              if (directionPlus) {
                return ((yNum - offset) % (columnHeight * 0.5)).toString()
              } else {
                return ((yNum + offset) % -Number(columnHeight * 0.5)).toString()
              }
            }),
          },
        })

        tweens.push(tween)
      })
    })

    const getTrigger = () => options?.getTriggerEl?.() ?? container.closest('section') ?? container

    trigger = ScrollTrigger.create({
      trigger: getTrigger(),
      start: 'top top',
      end: 'bottom top',
      onUpdate(self) {
        const velocity = self.getVelocity()
        // Normalize and clamp velocity to avoid spikes on mobile
        const maxV = 1500 // px/s cap
        const v = gsap.utils.clamp(-maxV, maxV, velocity)
        const scale = 9000 // higher scale = slower reaction
        const target = -v / scale
        additionalYAnim?.kill()
        additionalY.val = target
        additionalYAnim = gsap.to(additionalY, { val: 0, duration: 0.6, ease: 'power2.out' })
      },
    })
  }

  onMounted(async () => {
    const container = containerRef.value
    if (!container) return
    // wait images to layout heights correctly, then build
    await waitForImages(container)
    setup()
    // rebuild on resize for responsive correctness
    ro = new ResizeObserver(() => {
      // debounce microtask
      queueMicrotask(() => setup())
    })
    ro.observe(container)
  })

  onBeforeUnmount(() => {
    ro?.disconnect()
    teardown()
  })

  return {}
}
