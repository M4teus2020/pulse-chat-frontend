<script setup lang="ts">
import PrimeLogo from '@/components/icons/PrimeLogo.vue'
</script>

<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-surface-0 p-4 dark:bg-surface-950"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="mb-8 flex justify-center">
        <div
          class="flex size-16 items-center justify-center rounded-xl border border-primary"
        >
          <PrimeLogo width="28" height="32" />
        </div>
      </div>

      <div class="rounded-2xl bg-surface-50 p-6 dark:bg-surface-900">
        <RouterView />
      </div>
    </div>
  </div>
</template>
