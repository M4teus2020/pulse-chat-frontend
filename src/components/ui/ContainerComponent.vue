<script setup lang="ts">
import { cn } from '@/utils';
import type { ClassValue } from 'clsx';

const props = defineProps<{
  class?: ClassValue
  headerClass?: ClassValue
}>()
</script>

<template>
  <div
    :class="cn('flex flex-col rounded-2xl bg-surface-50 p-5 dark:bg-surface-900', props.class)"
  >
    <slot>
      <div :class="cn('h-10', props.headerClass)">
        <slot name="header" />
      </div>

      <Divider />

      <slot name="body" />
    </slot>
  </div>
</template>
