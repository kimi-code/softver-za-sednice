import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { IonicVue, IonApp, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'

// Core CSS required for Ionic components to work properly
import '@ionic/vue/css/core.css'

// Basic CSS for apps built with Ionic
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

// Optional CSS utils that can be commented out
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

import '@ionic/vue/css/palettes/dark.system.css'

import './theme/variables.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router)

// >>> OVDE REGISTRUJEMO SVE IONIC KOMPONENTE GLOBALNO <<<
app.component('IonApp', IonApp)
app.component('IonPage', IonPage)
app.component('IonHeader', IonHeader)
app.component('IonToolbar', IonToolbar)
app.component('IonTitle', IonTitle)
app.component('IonContent', IonContent)
// <<< KRAJ REGISTRACIJE >>>

router.isReady().then(() => {
  app.mount('#app')
})
