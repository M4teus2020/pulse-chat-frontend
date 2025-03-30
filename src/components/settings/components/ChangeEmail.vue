<script setup lang="ts">
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions'
import { ref, watch, type Ref } from 'vue'
import { inject } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { authRequests } from '@/services/requests/auth'
import { useForm } from 'laravel-precognition-vue'
import FormField from '@/components/ui/FormField.vue'
import { Password, useToast } from 'primevue'

const toast = useToast()
const auth = useAuthStore()
const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef')

type Step = 'verify' | 'code' | 'submit' | 'confirm'
const step = ref<Step>(auth.user!.email_verified ? 'verify' : 'submit')

const stepTitle: Record<Step, string> = {
  verify: 'Verify email address',
  code: 'Enter code',
  submit: 'Enter an email address',
  confirm: 'Verify new email address',
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
const loading = ref(false)
async function sendVerificationCode() {
  try {
    loading.value = true
    await authRequests.requestChangeCode()
    step.value = 'code'
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error sending verification email',
      life: 2000,
    })

    throw error
  } finally {
    loading.value = false
  }
}

const form = useForm('post', '/email/change', {
  verification_code: '',
  email: '',
  password: '',
})

async function verifyCode() {
  try {
    form.validate('verification_code', {
      onSuccess() {
        step.value = 'submit'
      },
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid verification code',
      life: 2000,
    })

    throw error
  }
}

async function submit() {
  try {
    await form.submit()

    step.value = 'confirm'
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid email or password',
      life: 2000,
    })

    throw error
  }
}
</script>

<template>
  <div class="max-w-96">
    <!-- Step 1: Verification Notice -->
    <form
      @submit.prevent="sendVerificationCode"
      v-if="step === 'verify'"
      class="space-y-4"
    >
      <p class="text-surface-500 dark:text-surface-400">
        We'll need to verify your old email address,
        <span class="font-bold"> {{ auth.user!.email }} </span>, in order to
        change it.
      </p>

      <p class="text-surface-500 dark:text-surface-400">
        Lost access to your email? Please contact yout email provider to regain
        access
      </p>

      <div class="flex justify-end gap-2">
        <Button variant="text" @click="close" size="small">Cancel</Button>
        <Button type="submit" size="small" :loading="loading">
          Send Verification Code
        </Button>
      </div>
    </form>

    <!-- Step 2: Verification Code -->
    <form @submit.prevent="verifyCode" v-if="step === 'code'" class="space-y-4">
      <span class="block text-surface-500 dark:text-surface-400">
        Check your email: we sent you a verification code. Enter it here to
        verify you're really you.
      </span>

      <FormField
        :form="form"
        name="verification_code"
        label="Verification Code"
      />

      <div class="flex justify-end gap-2">
        <Button variant="text" @click="close" size="small">Cancel</Button>
        <Button type="submit" size="small" :loading="form.processing">
          Verify Code
        </Button>
      </div>
    </form>

    <!-- Step 3: Submit New Email -->
    <form @submit.prevent="submit" v-if="step === 'submit'" class="space-y-4">
      <span class="block text-surface-500 dark:text-surface-400">
        Enter a new email addres and your existing password.
      </span>

      <div class="space-y-2">
        <FormField
          :form="form"
          name="email"
          label="New Email"
          :pt="{ placeholder: 'Enter your email' }"
        />

        <FormField
          :form="form"
          :component="Password"
          name="password"
          label="Current Password"
          :props="{
            placeholder: 'Enter your password',
            feedback: false,
            toggleMask: true,
            fluid: true,
          }"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="text" @click="close" size="small">Cancel</Button>
        <Button type="submit" size="small" :loading="form.processing">
          Confirm Change
        </Button>
      </div>
    </form>

    <!-- Step 4: Email Verification Notice -->
    <div v-if="step === 'confirm'" class="space-y-4">
      <span class="block text-surface-500 dark:text-surface-400">
        To finish, we sent a verification email to:
        <span class="font-bold"> {{ form.email }} </span>
      </span>

      <div class="flex justify-end gap-2">
        <Button size="small" @click="close"> Okay </Button>
      </div>
    </div>
  </div>
</template>
