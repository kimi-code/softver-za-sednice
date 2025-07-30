<template>
  <div class="widget-card welcome-big-card">
    <img src="/Babusnica-grb.png" alt="Grb opštine" class="welcome-logo" />
    <div class="welcome-title">{{ pozdrav }}, {{ imeKorisnika }}!</div>
    <div class="welcome-subtitle">SKUPŠTINA OPŠTINE BABUŠNICA</div>
    <div class="welcome-date">{{ datum }}</div>
    <div class="welcome-time">{{ vreme }}</div>
    <div class="welcome-msg">Izaberite opciju sa menija levo za nastavak rada...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const imeKorisnika = "Marko Marković"
const datum = new Date().toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })
const vreme = ref(new Date().toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
setInterval(() => {
  vreme.value = new Date().toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}, 1000)
function getPozdrav() {
  const sat = new Date().getHours()
  if (sat >= 6 && sat < 12) return 'Dobro jutro'
  if (sat >= 12 && sat < 18) return 'Dobar dan'
  return 'Dobro veče'
}
const pozdrav = getPozdrav()
</script>

<style scoped>
.welcome-big-card {
  width: 100%;
  min-height: 320px;
  background: #fff;
  border-radius: 13px;
  box-shadow: 0 4px 24px #23285111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px 38px 32px;
  margin-bottom: 0;
}
.welcome-logo {
  height: 60px;
  margin-bottom: 18px;
}
.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #23395d;
  margin-bottom: 4px;
  text-align: center;
}
.welcome-subtitle {
  font-size: 1.18rem;
  color: #7b88b8;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: 1px;
}
.welcome-date {
  font-size: 1rem;
  color: #b6bedb;
  margin-bottom: 2px;
}
.welcome-time {
  font-size: 1.4rem;
  color: #3762c2;
  font-weight: 600;
  margin-bottom: 16px;
}
.welcome-msg {
  margin-top: 12px;
  color: #7a7d8a;
  font-size: 1.04em;
  text-align: center;
}
</style>
