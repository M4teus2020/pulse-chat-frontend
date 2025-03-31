<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import SidebarItem, { type SidebarItemProps } from './SidebarItem.vue'

interface Props extends SidebarItemProps {
  to: RouteLocationRaw
}

const props = defineProps<Props>()
</script>

<template>
  <RouterLink :to="to" v-slot="{ isActive }">
    <SidebarItem v-bind="props" :selected="isActive">
      <slot :is-active="isActive" />
    </SidebarItem>
  </RouterLink>
</template>
