<template>
  <ion-page v-if="!isLoggedIn">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Prijava odbornika</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding login-bg">
      <div class="login-card">
        <ion-avatar class="login-avatar">
          <ion-icon :icon="personCircleOutline" size="large"></ion-icon>
        </ion-avatar>
        <h2>Dobrodošli!</h2>
        <p class="subtitle">Unesite vaše ime, prezime i lozinku za ulaz.</p>

        <form @submit.prevent="login">
          <ion-item lines="none" class="input-item">
            <ion-icon slot="start" :icon="personOutline"></ion-icon>
            <ion-input v-model="ime" placeholder="Ime" required autocomplete="username" />
          </ion-item>

          <ion-item lines="none" class="input-item">
            <ion-icon slot="start" :icon="personOutline"></ion-icon>
            <ion-input v-model="prezime" placeholder="Prezime" required autocomplete="family-name" />
          </ion-item>

          <ion-item lines="none" class="input-item">
            <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
            <ion-input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Lozinka"
              required
              autocomplete="current-password"
            />
            <ion-icon
              slot="end"
              :icon="showPassword ? eyeOutline : eyeOffOutline"
              @click="showPassword = !showPassword"
              style="cursor:pointer;"
            ></ion-icon>
          </ion-item>

          <ion-button expand="block" type="submit" :disabled="loading">
            <ion-spinner v-if="loading" name="crescent" style="margin-right:8px;"></ion-spinner>
            Prijavi se
          </ion-button>

          <ion-text color="danger" v-if="error">
            <p style="text-align:center; margin-top:10px;">{{ error }}</p>
          </ion-text>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn } from '@/stores/authStore'
import axios from 'axios'
import {
  personOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  personCircleOutline
} from 'ionicons/icons'

const ime = ref('')
const prezime = ref('')
const password = ref('')
const error = ref('')
const showPassword = ref(false)
const loading = ref(false)
const router = useRouter()

// Redirectuj na home ako je već ulogovan
watchEffect(() => {
  if (isLoggedIn.value) {
    router.push('/home')
  }
})

const login = async () => {
  error.value = ''
  loading.value = true
  try {
    const response = await axios.post('http://localhost:8000/api/login-odbornik', {
      ime: ime.value,
      prezime: prezime.value,
      password: password.value
    })
    if (response.data.success) {
      localStorage.setItem('odbornik_token', response.data.token)
      // OVO DODAJ!
      localStorage.setItem('odbornik_info', JSON.stringify(response.data.odbornik))
      isLoggedIn.value = true
    } else {
      error.value = response.data.message || 'Pogrešno ime ili lozinka'
    }
  } catch (e) {
    error.value = 'Greška pri povezivanju sa serverom'
  }
  loading.value = false
}
</script>
<style scoped>
.login-bg {
  --background: linear-gradient(135deg, #3987e3 0%, #a3cfff 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.2);
  padding: 32px 24px;
  max-width: 340px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-avatar {
  margin-bottom: 12px;
  background: #e5f0ff;
  width: 76px;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.subtitle {
  color: #555;
  font-size: 0.95em;
  margin-bottom: 18px;
  text-align: center;
}
.input-item {
  border-radius: 12px;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px 0 rgba(100,150,255,0.05);
  background: #f7faff;
}
ion-button {
  margin-top: 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1em;
  letter-spacing: 0.5px;
}
</style>
