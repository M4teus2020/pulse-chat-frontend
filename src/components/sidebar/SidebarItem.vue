<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  selected?: boolean
}>()
</script>

<template>
  <div
    v-tooltip="title"
    class="flex w-12 cursor-pointer select-none items-center justify-center gap-1 text-nowrap rounded-lg px-4 py-4 text-base transition-all"
    :class="[
      {
        'bg-transparent text-muted-color hover:bg-emphasis': !selected,
        'bg-primary text-primary-contrast hover:bg-primary-emphasis': selected,
      },
    ]"
  >
    <i :class="icon" />
  </div>
</template>
