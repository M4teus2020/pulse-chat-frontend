<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="space-y-2 rounded-xl p-3 bg-emphasis">
    <h3 class="font-medium text-color">{{ title }}</h3>

    <slot />
  </div>
</template>
