<script setup lang="ts">
interface Props {
  width?: number | string
  height?: number | string
  color?: string
}

withDefaults(defineProps<Props>(), {
  width: 20,
  height: 24,
  color: 'var(--p-primary-color)',
})
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="pulse-animation"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
</template>

<style scoped>
.pulse-animation {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95);
  }
}
</style>
