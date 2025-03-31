<script setup lang="ts">
import { cn } from '@/utils'

export interface SidebarItemProps {
  title?: string
  icon?: string
  selected?: boolean
  class?: string
  activeClass?: string
}

const props = defineProps<SidebarItemProps>()
</script>

<template>
  <div
    v-tooltip="title"
    :class="
      cn(
        'flex size-12 cursor-pointer select-none items-center justify-center rounded-lg text-base transition-all text-muted-color hover:bg-emphasis',
        selected &&
          'bg-primary text-primary-contrast hover:bg-primary-emphasis',
        props.class,
        selected && activeClass,
      )
    "
  >
    <slot>
      <i :class="icon" />
    </slot>
  </div>
</template>
