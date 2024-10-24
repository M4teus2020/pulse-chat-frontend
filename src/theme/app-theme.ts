import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{surface.50}',
      100: '{surface.100}',
      200: '{surface.200}',
      300: '{surface.300}',
      400: '{surface.400}',
      500: '{surface.500}',
      600: '{surface.600}',
      700: '{surface.700}',
      800: '{surface.800}',
      900: '{surface.900}',
      950: '{surface.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
        primary: {
          color: '{primary.950}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.700}',
        },
        highlight: {
          background: '{primary.950}',
          focusBackground: '{primary.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
        primary: {
          color: '{primary.50}',
          contrastColor: '{primary.950}',
          hoverColor: '{primary.200}',
          activeColor: '{primary.300}',
        },
        highlight: {
          background: '{primary.50}',
          focusBackground: '{primary.300}',
          color: '{primary.950}',
          focusColor: '{primary.950}',
        },
      },
    },
  },
})

export default {
  preset: Noir,
  options: {
    darkModeSelector: '.p-dark',
    cssLayer: {
      name: 'primevue',
      order: 'tailwind-base, primevue, tailwind-utilities',
    },
  },
}
