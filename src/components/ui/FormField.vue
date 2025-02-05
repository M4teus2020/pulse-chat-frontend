<script
  lang="ts"
  setup
  generic="FormType extends Record<string, unknown>, Comp extends Component"
>
import type { Form } from 'laravel-precognition-vue/dist/types'
import { InputText } from 'primevue'
import type { Component } from 'vue'

export interface Props<
  FormType extends Record<string, unknown>,
  Comp extends Component,
> {
  form: Form<FormType>
  name: keyof FormType
  label: string
  component?: Comp
  props?: Record<string, unknown>
}

const model = defineModel<Form<FormType>>('form', { required: true })
const props = defineProps<Props<FormType, Comp>>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      :id="String(name)"
      class="text-sm font-medium"
      :class="form.invalid('current_password') && 'text-red-500'"
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
        :is="component || InputText"
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
