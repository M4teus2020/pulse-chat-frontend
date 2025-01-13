import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useAuthStore } from './stores/authStore'

import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import AppTheme from './theme/app-theme'

const app = createApp(App)

app.use(createPinia())

useAuthStore()

app.use(router)
app.use(PrimeVue, {
  theme: AppTheme,
})

app.mount('#app')
