<script setup lang="ts">
import { cn } from '@/utils'
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  icon: string
  title: string
  to: RouteLocationRaw
}>()
</script>

<template>
  <RouterLink :to="to" v-slot="{ isActive }">
    <div
      :class="
        cn(
          'flex cursor-pointer select-none items-center gap-1 rounded-lg px-4 py-1 text-base transition-all',
          {
            'bg-transparent text-muted-color hover:bg-emphasis': !isActive,
            'bg-primary text-primary-contrast hover:bg-primary-emphasis':
              isActive,
          },
        )
      "
    >
      <i :class="icon"></i>
      <span class="font-medium leading-8">・</span>
      <span class="font-medium leading-none">{{ title }}</span>
    </div>
  </RouterLink>
</template>
