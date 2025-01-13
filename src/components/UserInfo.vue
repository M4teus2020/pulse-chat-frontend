<script setup lang="ts">
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
</script>

<template>
  <div>
    <Divider />

    <!-- User Info -->
    <div class="flex items-center gap-3">
      <UserAvatar
        :image="auth.user?.image"
        :cap-name="auth.user?.cap_name"
        status="online"
        size="large"
      />

      <div>
        <div class="text-base font-medium leading-5 text-color">
          {{ auth.user?.name }}
        </div>
        <div class="mt-1 text-sm text-muted-color">
          {{ auth.user?.email }}
        </div>
      </div>
    </div>
  </div>
</template>
