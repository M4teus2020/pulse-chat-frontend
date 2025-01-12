<script setup lang="ts">
import PulseLogo from '@/components/icons/PulseLogo.vue'
</script>

<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-surface-0 p-4 dark:bg-surface-950"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="mb-8 flex flex-col items-center justify-center gap-2">
        <div
          class="flex size-16 items-center justify-center rounded-xl border border-primary"
        >
          <PulseLogo width="32" height="32" />
        </div>
        <!-- <h1 class="text-2xl font-bold text-primary">Pulse</h1> -->
      </div>

      <div class="rounded-2xl bg-surface-50 p-6 dark:bg-surface-900">
        <RouterView />
      </div>
    </div>
  </div>
</template>
