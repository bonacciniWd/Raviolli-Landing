declare module 'noisejs' {
  export class Noise {
    constructor(seed?: number)
    perlin2(x: number, y: number): number
    perlin3(x: number, y: number, z: number): number
    simplex2(x: number, y: number): number
    simplex3(x: number, y: number, z: number): number
  }
}

declare module 'dat.gui' {
  export class GUI {
    constructor(params?: { autoPlace?: boolean; width?: number; hideable?: boolean })
    add(obj: any, prop: string, min?: number, max?: number): GUIController
    addColor(obj: any, prop: string): GUIController
    addFolder(name: string): GUI
    removeFolder(folder: GUI): void
    destroy(): void
    domElement: HTMLElement
  }
  export interface GUIController {
    step(v: number): GUIController
    onChange(fn: (v: any) => void): GUIController
    min(v: number): GUIController
    max(v: number): GUIController
    name(name: string): GUIController
  }
}

// Allow CSS side-effect imports under strict TS settings
declare module 'swiper/css'
