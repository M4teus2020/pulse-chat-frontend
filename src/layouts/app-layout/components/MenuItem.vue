<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  selected?: boolean
  isSlimMenu: boolean
}>()
</script>

<template>
  <div
    v-tooltip="isSlimMenu ? title : null"
    class="flex cursor-pointer select-none items-center gap-1 text-nowrap rounded-lg px-4 py-1 text-base transition-all"
    :class="[
      {
        'w-12 justify-center py-4': isSlimMenu,
        'w-full': !isSlimMenu,
      },
      {
        'bg-transparent text-muted-color hover:bg-emphasis': !selected,
        'bg-primary text-primary-contrast hover:bg-primary-emphasis': selected,
      },
    ]"
  >
    <i :class="icon" />
    <span :class="isSlimMenu ? 'hidden' : 'font-medium leading-none'">
      <span class="leading-8"> ・ </span> {{ title }}
    </span>
  </div>
</template>
