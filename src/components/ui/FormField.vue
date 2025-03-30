<script lang="ts" setup generic="FormType extends Record<string, unknown>">
import type { Form } from 'laravel-precognition-vue/dist/types'
import { InputText, Password } from 'primevue'
import type { Component } from 'vue'

export interface Props<FormType extends Record<string, unknown>> {
  form: Form<FormType>
  name: keyof FormType
  label: string
  type?: 'text' | 'password'
  component?: Component
  props?: Record<string, unknown>
}

const model = defineModel<Form<FormType>>('form', { required: true })
const props = withDefaults(defineProps<Props<FormType>>(), {
  props: () => ({}),
  component: (props: Props<FormType>) => {
    if (props.type === 'password') {
      return Password
    }

    return InputText
  },
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      :id="String(name)"
      class="text-sm font-medium"
      :class="form.invalid(name) && 'text-red-500'"
    >
      {{ label }}
    </label>

    <slot
      :id="String(name)"
      :model="model[name as keyof typeof model]"
      :disabled="form.processing"
      :invalid="form.invalid(name)"
      @update:modelValue="form.forgetError(name)"
    >
      <component
        :is="component"
        :id="String(name)"
        v-model="model[name as keyof typeof model]"
        :disabled="form.processing"
        :invalid="form.invalid(name)"
        @update:modelValue="form.forgetError(name)"
        v-bind="props.props"
      />
    </slot>

    <small v-if="form.invalid(name)" class="text-red-500">
      {{ form.errors[name] }}
    </small>
  </div>
</template>
