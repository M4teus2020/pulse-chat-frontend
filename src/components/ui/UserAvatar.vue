<script setup lang="ts">
interface Props {
  image?: string | null
  status?: string
  capName?: string
  size?: 'normal' | 'large' | 'xlarge'
  background?: string
}
withDefaults(defineProps<Props>(), {
  background: 'bg-surface-50 dark:bg-surface-900',
  size: 'normal',
})
</script>

<template>
  <div class="relative flex items-end justify-end">
    <div v-if="status" class="absolute">
      <div class="rounded-full p-[2px]" :class="[background]">
        <div
          class="rounded-full"
          :class="[
            {
              'bg-green-500': status === 'online',
              'bg-gray-400': status === 'offline',
              'bg-yellow-500': status === 'idle',
              'bg-red-500': status === 'not_disturb',
            },
            {
              'size-2': size === 'normal',
              'size-2.5': size === 'large',
              'size-3': size === 'xlarge',
            },
          ]"
        />
      </div>
    </div>

    <Avatar
      v-bind="image ? { image: image } : { label: capName }"
      :class="{
        '!bg-primary-100 !text-primary-950': !image,
      }"
      :size="size"
      shape="circle"
    />
  </div>
</template>
