<script setup lang="ts">
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { ref, watch, type Ref } from 'vue'
import { inject } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

type Step = 'verification-notice' | 'verification-code' | 'confirm-password'
const step = ref<Step>('verification-notice')

const stepTitle: Record<Step, string> = {
  'verification-notice': 'Verify email address',
  'verification-code': 'Enter code',
  'confirm-password': 'Enter an email address',
}

watch(step, updateDialogHeader, { immediate: true })
function updateDialogHeader() {
  if (dialogRef) {
    dialogRef.value.options = {
      props: {
        modal: true,
        header: stepTitle[step.value],
      },
    }
  }
}

function close() {
  dialogRef?.value.close()
}

async function sendVerificationCode() {
  step.value = 'verification-code'
}

async function verifyCode() {
  step.value = 'confirm-password'
}

async function confirmChange() {
  close()
}
</script>

<template>
  <div class="max-w-96">
    <!-- Step 1: Verification Notice -->
    <form
      @submit.prevent="sendVerificationCode"
      v-if="step === 'verification-notice'"
      class="space-y-4"
    >
      <p class="text-surface-500 dark:text-surface-400">
        We'll need to verify your old email address,
        <span class="font-bold"> {{ authStore.user!.email }} </span>, in
        order to change it.
      </p>

      <p class="text-surface-500 dark:text-surface-400">
        Lost access to your email? Please contact yout email provider to regain
        access
      </p>

      <div class="flex justify-end gap-2">
        <Button variant="text" @click="close" size="small">Cancel</Button>
        <Button type="submit" size="small"> Send Verification Code </Button>
      </div>
    </form>

    <!-- Step 2: Verification Code -->
    <form
      @submit.prevent="verifyCode"
      v-if="step === 'verification-code'"
      class="space-y-4"
    >
      <span class="block text-surface-500 dark:text-surface-400">
        Check your email: we sent you a verification code. Enter it here to
        verify you're really you.
      </span>

      <div class="flex flex-col gap-2">
        <label for="verification-code" class="text-sm font-medium">
          Verification Code
        </label>
        <InputText id="verification-code" fluid />
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="text" @click="close" size="small">Cancel</Button>
        <Button type="submit" size="small"> Verify Code </Button>
      </div>
    </form>

    <!-- Step 3: Confirm with Password -->
    <form
      @submit.prevent="confirmChange"
      v-if="step === 'confirm-password'"
      class="space-y-4"
    >
      <span class="block text-surface-500 dark:text-surface-400">
        Enter a new email addres and your existing password.
      </span>

      <div class="space-y-2">
        <div class="flex flex-col gap-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <InputText
            id="email"
            placeholder="Enter your email"
            type="email"
            fluid
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="password" class="text-sm font-medium"
            >Current Password</label
          >
          <Password
            id="password"
            placeholder="Enter your password"
            toggleMask
            fluid
            :feedback="false"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="text" @click="close" size="small">Cancel</Button>
        <Button type="submit" size="small">Confirm Change</Button>
      </div>
    </form>
  </div>
</template>
