<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const props =defineProps<{
  id: string
  image?: string | null
  name: string
  capName: string
  status: string
  unreadMessageCount: number
}>()

const path = `/direct/${props.id}`
const route = useRoute()

const isActive = computed(() => route.path === path)
</script>

<template>
  <RouterLink
    :to="path"
    class="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2"
    :class="[
      {
        'bg-transparent text-muted-color hover:bg-emphasis': !isActive,
        'bg-primary text-primary-contrast hover:bg-primary-emphasis': isActive,
      },
    ]"
  >
    <UserAvatar
      :image="image"
      :status="status"
      :cap-name="capName"
      size="normal"
    />

    <div class="flex flex-col">
      <span>{{ name }}</span>
    </div>
  </RouterLink>
</template>
