<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useMetadata } from './composables/useMetadata.js'

useMetadata()
</script>

<template>
  <div class="app-wrapper grain">
    <!-- Ambient atmosphere — sky and sunlight drifting behind every page -->
    <div class="ambient" aria-hidden="true">
      <span class="ambient-blob ambient-sky"></span>
      <span class="ambient-blob ambient-sun"></span>
      <span class="ambient-blob ambient-mint"></span>
    </div>

    <Navbar />

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* The sand canvas — #F5F5E5, flat. Each page adds depth only with
     soft, localized radial flares (see the views), never a wash. */
  background: var(--paper);
  color: var(--ink);
  overflow-x: hidden;
  position: relative;
}

/* Fixed atmosphere: three soft color fields drifting very slowly.
   They sit under everything and keep any "plain white" from surviving. */
.ambient {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.ambient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  will-change: transform;
}

.ambient-sky {
  width: 56vw; height: 56vw;
  top: -18vw; inset-inline-end: -14vw;
  background: radial-gradient(circle, rgba(255, 146, 92, 0.14) 0%, rgba(255, 146, 92, 0) 70%);
  animation: drift 26s ease-in-out infinite;
}

.ambient-sun {
  width: 48vw; height: 48vw;
  top: 22vh; inset-inline-start: -16vw;
  background: radial-gradient(circle, rgba(255, 146, 92, 0.12) 0%, rgba(255, 146, 92, 0) 70%);
  animation: drift 32s ease-in-out infinite reverse;
}

/* The green nuance — soft green #2E5B2E as a quiet undertone */
.ambient-mint {
  width: 44vw; height: 44vw;
  bottom: -14vw; inset-inline-end: 8vw;
  background: radial-gradient(circle, rgba(46, 91, 46, 0.14) 0%, rgba(46, 91, 46, 0) 70%);
  animation: drift 38s ease-in-out infinite;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.main-content > :deep(.view) {
  flex: 1;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-fade-enter-from { opacity: 0; transform: translateY(12px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
