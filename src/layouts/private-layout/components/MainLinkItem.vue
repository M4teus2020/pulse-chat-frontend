<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  icon: string
  title: string
  path: string
}>()

const route = useRoute()

const isActive = computed(() => route.path === props.path)
</script>

<template>
  <RouterLink
    :to="path"
    class="flex cursor-pointer select-none items-center gap-1 rounded-lg px-4 py-1 text-base transition-all"
    :class="[
      {
        'bg-transparent text-muted-color hover:bg-emphasis': !isActive,
        'bg-primary text-primary-contrast hover:bg-primary-emphasis': isActive,
      },
    ]"
  >
    <i :class="icon"></i>
    <span class="font-medium leading-8">・</span>
    <span class="font-medium leading-none">{{ title }}</span>
  </RouterLink>
</template>
