<script setup lang="ts">
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
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
    class="flex cursor-pointer items-center gap-3 rounded-lg p-2"
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
      :background="isActive ? 'bg-primary' : undefined"
      size="normal"
    />

    <div class="flex flex-col">
      <span>{{ name }}</span>
    </div>
  </RouterLink>
</template>
