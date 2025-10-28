import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue)
  nuxtApp.vueApp.component('Menubar', Menubar)
})
