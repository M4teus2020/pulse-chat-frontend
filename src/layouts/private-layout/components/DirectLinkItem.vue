<script setup lang="ts">
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { cn } from '@/utils'

defineProps<{
  id: string
  image?: string | null
  name: string
  capName: string
  status: string
  unreadMessageCount: number
}>()
</script>

<template>
  <RouterLink :to="{ name: 'direct', params: { id } }" v-slot="{ isActive }">
    <div
      :class="
        cn('flex cursor-pointer items-center gap-3 rounded-lg p-2', {
          'bg-transparent text-muted-color hover:bg-emphasis': !isActive,
          'bg-primary text-primary-contrast hover:bg-primary-emphasis':
            isActive,
        })
      "
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
    </div>
  </RouterLink>
</template>
