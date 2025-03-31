<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

useColorMode()
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style scoped></style>
