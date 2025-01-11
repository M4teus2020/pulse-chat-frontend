<script setup lang="ts">
import SidebarNav from '@/components/sidebar/SidebarNav.vue'
</script>

<template>
  <div
    class="flex h-screen w-full gap-6 bg-surface-0 p-4 dark:border-white/20 dark:bg-surface-950"
  >
    <SidebarNav />

    <div
      class="flex h-full flex-1 overflow-hidden overflow-y-auto overflow-x-clip rounded-2xl border border-surface"
    >
      <div
        class="flex w-4/12 min-w-40 flex-col gap-6 overflow-auto xl:w-3/12"
      ></div>
      <div class="flex w-8/12 flex-col border-l border-surface xl:w-9/12"></div>
    </div>
  </div>
</template>
