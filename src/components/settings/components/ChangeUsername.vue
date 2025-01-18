<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { onMounted, ref, type Ref } from 'vue'
import { inject } from 'vue'

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')
const authStore = useAuthStore()

const form = ref({
  username: authStore.user!.username,
  password: '',
})

function close() {
  dialogRef?.value.close()
}

function save() {
  close()
}

onMounted(() => {
  if (dialogRef) {
    dialogRef.value.options.props = {
      header: 'Change Username',
      modal: true,
    }
  }
})
</script>

<template>
  <form @submit.prevent="save" class="space-y-4">
    <span class="block text-surface-500 dark:text-surface-400">
      Enter a new username and your existing password.
    </span>

    <div class="space-y-2">
      <div class="flex flex-col gap-2">
        <label for="username" class="text-sm font-medium"> Username </label>
        <InputText
          id="username"
          v-model="form.username"
          placeholder="Enter your username"
          type="username"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label for="password" class="text-sm font-medium">
          Current Password
        </label>
        <Password
          id="password"
          v-model="form.password"
          toggleMask
          fluid
          :feedback="false"
        />
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button variant="text" @click="close" size="small">Cancel</Button>
      <Button type="submit" @click="save" size="small">Done</Button>
    </div>
  </form>
</template>
