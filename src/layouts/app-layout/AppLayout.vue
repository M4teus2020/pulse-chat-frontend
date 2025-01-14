<script setup lang="ts">
import SidebarNav from '@/components/sidebar/SidebarNav.vue'
</script>

<template>
  <div
    class="flex h-screen w-full overflow-hidden gap-4 bg-surface-0 p-4 dark:border-white/20 dark:bg-surface-950"
  >
    <SidebarNav />

    <div class="flex h-full w-full gap-4">
      <RouterView />
    </div>
  </div>
</template>
