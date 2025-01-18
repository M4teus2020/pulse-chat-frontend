<script setup lang="ts">
import SettingsCard from '../components/SettingsCard.vue'
import { useColorMode } from '@vueuse/core'
import { Button, InputNumber, Slider, ToggleSwitch } from 'primevue'
import { ref } from 'vue'

const colorMode = useColorMode({ emitAuto: true })

const colorModes = [
  {
    label: 'Light',
    value: 'light',
    icon: 'pi pi-sun',
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: 'pi pi-moon',
  },
  {
    label: 'Auto',
    value: 'auto',
    icon: `pi pi-sync`,
  },
] as const

const fontScale = ref(100)
const fontScales = [
  {
    label: 'Small',
    value: 75,
    icon: 'pi pi-minus',
  },
  {
    label: 'Normal',
    value: 100,
    icon: 'pi pi-circle',
  },
  {
    label: 'Large',
    value: 150,
    icon: 'pi pi-plus',
  },
] as const

const messageStyle = ref<'compact' | 'cozy' | 'comfortable'>('cozy')
const messageStyles = [
  {
    label: 'Compact',
    value: 'compact',
    icon: 'pi pi-align-justify',
  },
  {
    label: 'Cozy',
    value: 'cozy',
    icon: 'pi pi-th-large',
  },
  {
    label: 'Comfortable',
    value: 'comfortable',
    icon: 'pi pi-table',
  },
] as const

const timeFormat = ref<'12h' | '24h'>('12h')
const showSecondsToggle = ref(false)

const timeFormats = [
  {
    label: '12 hours',
    value: '12h',
    icon: 'pi pi-clock',
  },
  {
    label: '24 hours',
    value: '24h',
    icon: 'pi pi-clock',
  },
] as const
</script>

<template>
  <div class="flex flex-col gap-4">
    <SettingsCard title="Theme">
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="themeColor of colorModes"
          :key="themeColor.value"
          :icon="themeColor.icon"
          :label="themeColor.label"
          :severity="colorMode === themeColor.value ? 'primary' : 'secondary'"
          :variant="colorMode === themeColor.value ? undefined : 'outlined'"
          class="flex-1"
          rounded
          @click="colorMode = themeColor.value"
        />
      </div>
    </SettingsCard>

    <SettingsCard title="Message Style">
      <div class="flex gap-2">
        <Button
          v-for="style of messageStyles"
          :key="style.value"
          :icon="style.icon"
          :label="style.label"
          :severity="messageStyle === style.value ? 'primary' : 'secondary'"
          :variant="messageStyle === style.value ? undefined : 'outlined'"
          class="flex-1"
          rounded
          @click="messageStyle = style.value"
        />
      </div>
    </SettingsCard>

    <SettingsCard title="Font Scaling">
      <div class="flex gap-2">
        <Button
          v-for="preset of fontScales"
          :key="preset.value"
          :icon="preset.icon"
          :label="preset.label"
          :severity="fontScale === preset.value ? 'primary' : 'secondary'"
          :variant="fontScale === preset.value ? undefined : 'outlined'"
          class="flex-1"
          rounded
          @click="fontScale = preset.value"
        />
      </div>

      <div class="!mt-4 flex items-center justify-between">
        <label class="text-color">Custom</label>

        <div class="flex items-center gap-2">
          <InputNumber
            v-model="fontScale"
            :min="50"
            :max="200"
            suffix="%"
            size="small"
          />
        </div>
      </div>

      <Slider v-model="fontScale" :min="50" :max="200" class="!mb-1 !mt-3" />
    </SettingsCard>

    <SettingsCard title="Time Format">
      <div class="flex gap-2">
        <Button
          v-for="format of timeFormats"
          :key="format.value"
          :icon="format.icon"
          :label="format.label"
          :severity="timeFormat === format.value ? 'primary' : 'secondary'"
          :variant="timeFormat === format.value ? undefined : 'outlined'"
          class="flex-1"
          rounded
          @click="timeFormat = format.value"
        />
      </div>

      <div class="mt-4 flex items-center justify-between">
        <label class="text-color">Show seconds</label>
        <ToggleSwitch v-model="showSecondsToggle" />
      </div>
    </SettingsCard>
  </div>
</template>
