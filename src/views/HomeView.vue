<template>
  <section ref="sectionRef" class="hero-section">
    <h1 class="hero-title">Serigrafia é só o começo — o resto é sentimento.</h1>
    <h2 class="credit">
      <a href="https://thisisadvantage.com" target="_blank">2025 © Raviolli Press</a>
    </h2>
    <HeroGallery :columns="columns" :get-trigger-el="getTriggerEl" />
  </section>

  <TextClipSection />

   <section class="next-section">
  <NoiseCanvas />
  <div class="container">
    <!-- Interactive dock + popups UI lives in this section, dock is anchored to bottom-center of the section -->

        <ModalFrame v-model="open.about">
          <div class="about-container">
            <div class="hero-content">
              <p>
                A Raviolli Press é muito mais do que apenas um estúdio de serigrafia artesanal.
                Sua jornada começou durante a pandemia de COVID-19, quando a oportunidade de tornar um sonho em realidade se tornou uma inspiração clara.
                Nossa paixão pela moda, arte e design é o que nos impulsiona a cada dia.
              </p>
              <p>
                Nesse contexto desafiador, descobrimos a magia que a mistura de tintas, texturas, tecidos e técnicas de impressão pode oferecer.
                Isso nos permitiu explorar um universo aparentemente infinito de possibilidades criativas.
                Na Raviolli Press, transformamos essa inspiração em realidade por meio da criação de peças únicas e limitadas.
              </p>
              <p>
                Assim, nossa história é uma fusão de paixão e resiliência, nascida durante um momento crítico em que a oportunidade se apresentou e nós a agarramos com determinação.
              </p>
            </div>
            <div class="img-frame">
              <img src="../assets/modal.webp" alt="Raviolli Press" />
            </div>
          </div>
  </ModalFrame>

        <ModalFrame v-model="open.projects">
          <div class="store-frame">
            <div class="store-bar">
              <h2>Loja Raviolli Press</h2>
              <a class="open-store" href="https://raviollipress.com.br" target="_blank" rel="noopener">Abrir -></a>
            </div>
            <picture class="store-picture">
              <source srcset="../assets/loja-mobile.png" media="(max-width: 640px)" />
              <img src="../assets/loja-desktop.png" alt="Prévia da loja Raviolli Press" class="store-image" loading="lazy" />
            </picture>
          </div>
        </ModalFrame>

        

        <ModalFrame v-model="open.contact">
          <div class="contact-container">
            <h2 class="contact-title">Fale com a gente</h2>
            <p class="contact-sub">Responderemos por e‑mail o mais rápido possível.</p>

            <form class="contact-form" @submit.prevent>
              <div class="form-field">
                <label class="label" for="name">Nome</label>
                <input class="input" type="text" id="name" placeholder="Seu nome" required />
              </div>

              <div class="form-field">
                <label class="label" for="email">Email</label>
                <input class="input" type="email" id="email" placeholder="Seu email" required />
              </div>

              <div class="form-field">
                <label class="label" for="subject">Mensagem</label>
                <textarea class="textarea" id="subject" placeholder="Escreva sua mensagem..." rows="7" required></textarea>
              </div>

              <div class="form-actions">
                <a class="icon-btn instagram" href="https://instagram.com/raviollipress" target="_blank" rel="noopener" aria-label="Instagram">
                  <!-- Instagram icon (inline SVG) -->
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.428.403a4.92 4.92 0 0 1 1.774 1.153 4.92 4.92 0 0 1 1.153 1.774c.163.459.347 1.258.403 2.428.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.428a4.92 4.92 0 0 1-1.153 1.774 4.92 4.92 0 0 1-1.774 1.153c-.459.163-1.258.347-2.428.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.428-.403a4.92 4.92 0 0 1-1.774-1.153 4.92 4.92 0 0 1-1.153-1.774c-.163-.459-.347-1.258-.403-2.428C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.428A4.92 4.92 0 0 1 3.789 2.948 4.92 4.92 0 0 1 5.563 1.795c.459-.163 1.258-.347 2.428-.403C9.257 1.334 9.637 1.322 12 1.322m0 1.841c-3.15 0-3.517.012-4.748.069-1.02.047-1.572.216-1.938.359-.488.19-.837.416-1.204.783-.367.367-.593.716-.783 1.204-.143.366-.312.918-.359 1.938-.057 1.231-.069 1.598-.069 4.748s.012 3.517.069 4.748c.047 1.02.216 1.572.359 1.938.19.488.416.837.783 1.204.367.367.716.593 1.204.783.366.143.918.312 1.938.359 1.231.057 1.598.069 4.748.069s3.517-.012 4.748-.069c1.02-.047 1.572-.216 1.938-.359.488-.19.837-.416 1.204-.783.367-.367.593-.716.783-1.204.143-.366.312-.918.359-1.938.057-1.231.069-1.598.069-4.748s-.012-3.517-.069-4.748c-.047-1.02-.216-1.572-.359-1.938a3.078 3.078 0 0 0-.783-1.204 3.078 3.078 0 0 0-1.204-.783c-.366-.143-.918-.312-1.938-.359-1.231-.057-1.598-.069-4.748-.069zm0 3.534a4.463 4.463 0 1 1 0 8.926 4.463 4.463 0 0 1 0-8.926zm0 1.841a2.622 2.622 0 1 0 0 5.244 2.622 2.622 0 0 0 0-5.244zm5.708-2.907a1.044 1.044 0 1 1 0 2.088 1.044 1.044 0 0 1 0-2.088z"/>
                  </svg>
                  <span>@raviollipress</span>
                </a>
                <button class="btn-primary" type="submit">Enviar</button>
              </div>
            </form>
          </div>
        </ModalFrame>
    </div>
    <!-- Place the dock as a direct child of the section so absolute bottom centers within the section, not the centered container -->
    <LoopingWords v-if="showIdle" />
    <IconDock @open="openModal" />
  </section>

  
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroGallery from '../components/HeroGallery.vue'
import NoiseCanvas from '../components/NoiseCanvas.vue'
import TextClipSection from '../components/TextClipSection.vue'
import IconDock from '../components/IconDock.vue'
import ModalFrame from '../components/ModalFrame.vue'
import LoopingWords from '../components/LoopingWords.vue'

const sectionRef = ref<HTMLElement | null>(null)
const getTriggerEl = () => sectionRef.value

// Importa imagens webp reais de /src/assets/1.webp ... 9.webp e distribui em 3 colunas
const modules = import.meta.glob('../assets/{1,2,3,4,5,6,7,8,9}.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const ordered = Object.entries(modules)
  .map(([path, url]) => ({
    url,
    n: Number((path.match(/([0-9]+)\.(?:webp|jpg|jpeg|png)$/i) || [])[1] || 0),
  }))
  .sort((a, b) => a.n - b.n)
  .map((x) => x.url)

function chunkInto<T>(arr: T[], parts: number): T[][] {
  const out: T[][] = Array.from({ length: parts }, () => [])
  arr.forEach((item, idx) => {
    out[idx % parts]!.push(item)
  })
  return out
}

const columns = chunkInto(ordered, 3)

// Interactive UI state
const open = ref({ about: false, projects: false, contact: false })
function openModal(which: 'about'|'projects'|'contact'){
  open.value[which] = true
}

// grid substituída por um iframe da loja

const showIdle = computed(() => !open.value.about && !open.value.projects && !open.value.contact)


</script>

<style scoped>
.hero-section {
  position: relative;
  padding: 10vw;
  height: 100vh; /* limita ao tamanho da tela */
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden; /* recorta o hero dentro da sessão */
  background: #eee;
}

.credit {
  text-align: center;
  z-index: 2;
  font-size: 0.8rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.credit a { color: #fff; }

.hero-title {
  font-weight: 800;
  margin: 2rem auto;
  font-size: clamp(3vw, 2rem, 4rem);
  text-align: center;
  z-index: 2;
  max-width: 800px;
  mix-blend-mode: difference;
  pointer-events: none;
  color: white;
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

@media (max-width: 640px) {
  .hero-title {
    /* Menor no mobile, mantendo leitura e impacto */
    font-size: clamp(5.5vw, 1.25rem, 1.75rem);
    padding-inline: clamp(12px, 4vw, 24px);
  }
}

.next-section {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 4rem 1rem;
  background: #fff;
  overflow: hidden;
}

.next-section .container {
  max-width: 960px;
  position: relative;
  z-index: 1;
}

/* Interactive UI section (background holder + dock centered) */
.interactive-ui { position: relative; min-height: 100vh; display: grid; place-items: center; overflow: hidden; background: url('https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat; }
.interactive-ui .ui-bg { position:absolute; inset:0; background: rgba(0,0,0,.25); }

/* Popup content tweaks reused */
.about-container{ display:grid; grid-template-columns: 1.2fr 0.8fr; gap: clamp(16px, 3vw, 32px); align-items:start; }
.about-container .hero-content{ max-width: 64ch; line-height: 1.55; }
.about-container .hero-content p{ margin: 0 0 12px 0; }
.about-container .img-frame{ overflow:hidden; width: clamp(220px, 32vw, 360px); border-radius:12px; box-shadow: none; border: 1px solid rgba(255,255,255,0.2); }
.about-container .img-frame img{ display:block; width:100%; height:auto; aspect-ratio:6/7; object-fit:cover; }
.contact-container{ max-width: 720px; margin: 0 auto; }
.contact-title{ margin: 0 0 4px; font-size: 1.25rem; font-weight: 700; }
.contact-sub{ margin: 0 0 16px; color: #cfcfcf; font-size: .95rem; }
.contact-form{ display:grid; gap: 14px; }
.form-field{ display:grid; gap: 6px; }
.label{ color:#d7d7d7; font-size: .9rem; }
.input,.textarea{
  color:#fff; background:#0e0e0f; border:1px solid #2a2a2f; border-radius: 10px;
  padding: 10px 12px; font: inherit; transition: border-color .15s ease, box-shadow .15s ease;
}
.input::placeholder,.textarea::placeholder{ color:#7a7a80; }
.input:focus,.textarea:focus{ outline:none; border-color:#5b8cff; box-shadow: 0 0 0 3px #5b8cff33; }
.textarea{ resize: vertical; min-height: 140px; }
.form-actions{ display:flex; align-items:center; justify-content:space-between; gap: 12px; margin-top: 6px; }
.btn-primary{
  background: linear-gradient(180deg, #e44e7a 0%, #c20707 100%);
  border: 1px solid #ffffff33; border-radius: 10px; padding: 10px 14px; color:#fff; font-weight: 600;
}
.btn-primary:hover{ filter: saturate(1.08) brightness(1.04); }
.icon-btn{
  display:inline-flex; align-items:center; gap:8px; padding:8px 10px; color:#fff; text-decoration:none;
  border:1px solid #ffffff33; border-radius:10px; background:#121214;
}
.icon-btn:hover{ background:#17171a; }
.store-frame{ display:flex; flex-direction:column; gap:10px; height: 100%; }
.store-bar{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.store-bar h2{ font-size: 1rem; margin: 0; font-weight: 600; }
.open-store{ color:#fff; border:1px solid #ffffff66; border-radius:8px; padding:6px 10px; text-decoration:none; }
.store-picture{ display:block; width:100%; height: calc(100% - 36px); }
.store-image{ width:100%; height:100%; object-fit: contain; border: 1px solid #ffffff22; border-radius: 10px; background:#111; }

@media (max-width: 900px){
  .about-container{ grid-template-columns: 1fr; gap: 16px; }
  .about-container .img-frame{ width: clamp(220px, 70vw, 360px); margin-top: 12px; justify-self: center; }
  .about-container .hero-content{ max-width: 100%; }
}

</style>
