import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useAuthStore } from './stores/authStore'

import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import AppTheme from './theme/app-theme'

import DialogService from 'primevue/dialogservice';

const app = createApp(App)

app.use(createPinia())

useAuthStore()

app.use(router)
app.use(PrimeVue, {
  theme: AppTheme,
})

app.use(DialogService)

app.mount('#app')
