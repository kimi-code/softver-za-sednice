<template>
  <div class="prijava-prozor-outer">
    <div class="prijava-prozor-card">
      <h2 class="prijava-naslov">Prijava za reč</h2>

      <!-- Izbor tipa reči i prijava -->
      <div v-if="!prijavljen && !odobreno" class="form-section">
        <label for="tipRec" class="input-label">Izaberite osnov:</label>
        <select v-model="tipRec" id="tipRec" class="prijava-select">
          <option value="poslovnik">Reč po poslovniku</option>
          <option value="replika">Replika na izlaganje</option>
          <option value="tacka">Reč po tački dnevnog reda</option>
          <option value="amandman">Reč po amandmanu</option>
        </select>
        <button class="prijavi-btn" @click="posaljiPrijavu">
          Prijavi se za reč
        </button>
      </div>

      <!-- Čekanje odobrenja -->
      <div v-if="prijavljen && !odobreno" class="form-section">
        <div class="info-msg">
          <b>Vaš zahtev je poslat.</b><br>
          Čeka se odobrenje predsedavajućeg...
        </div>
        <button class="povuci-btn" @click="povuciPrijavu">
          Povuci zahtev
        </button>
      </div>

      <!-- Odobreno, teče vreme -->
      <div v-if="odobreno" class="form-section">
        <div class="success-msg">
          <b>Vaša reč je odobrena!</b><br>
          Tip: <b>{{ prikazTipa }}</b><br>
          Preostalo vreme: <span>{{ vreme }}</span> sekundi
        </div>
        <button class="povuci-btn" @click="zavrsiIzlaganje">
          Završite izlaganje
        </button>
      </div>

      <!-- Vreme isteklo -->
      <div v-if="istekloVreme" class="form-section">
        <div class="error-msg">
          <b>Vaše vreme za izlaganje je isteklo.</b>
        </div>
        <button class="reset-btn" @click="resetujSve">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, computed } from 'vue'
import axios from 'axios'

const tipRec = ref('poslovnik')
const prijavljen = ref(false)
const odobreno = ref(false)
const vreme = ref(120)
const istekloVreme = ref(false)

const info = JSON.parse(localStorage.getItem('odbornik_info') || '{}')
const punoIme = computed(() => (info.ime && info.prezime) ? `${info.ime} ${info.prezime}` : '')

function prikazTipa() {
  if (tipRec.value === 'poslovnik') return 'Reč po poslovniku'
  if (tipRec.value === 'replika') return 'Replika na izlaganje'
  if (tipRec.value === 'tacka') return 'Reč po tački dnevnog reda'
  if (tipRec.value === 'amandman') return 'Reč po amandmanu'
  return ''
}

async function posaljiPrijavu() {
  prijavljen.value = true
  istekloVreme.value = false
  try {
    await axios.post('http://localhost:8000/api/prijavi-se', {
      tip: tipRec.value,
      ime: punoIme.value
    })
  } catch (e) { }
}

async function povuciPrijavu() {
  prijavljen.value = false
  odobreno.value = false
  vreme.value = 120
  try {
    await axios.post('http://localhost:8000/api/povuci-prijavu', {
      tip: tipRec.value,
      ime: punoIme.value
    })
  } catch (e) { }
}

function zavrsiIzlaganje() {
  povuciPrijavu()
}

function resetujSve() {
  odobreno.value = false
  prijavljen.value = false
  vreme.value = 120
  istekloVreme.value = false
}

// Ostalo: timer i ostale funkcije ostaju kao kod tebe...
let interval = null
watch(prijavljen, (val) => {
  if (val) {
    setTimeout(() => {
      if (prijavljen.value) {
        odobreno.value = true
        startTimer()
      }
    }, 2000)
  } else {
    odobreno.value = false
    vreme.value = 120
    clearInterval(interval)
  }
})

function startTimer() {
  if (tipRec.value === 'poslovnik') vreme.value = 120
  else if (tipRec.value === 'replika') vreme.value = 60
  else if (tipRec.value === 'tacka') vreme.value = 180
  else if (tipRec.value === 'amandman') vreme.value = 90
  else vreme.value = 120

  clearInterval(interval)
  interval = setInterval(() => {
    vreme.value--
    if (vreme.value <= 0) {
      clearInterval(interval)
      odobreno.value = false
      prijavljen.value = false
      istekloVreme.value = true
      povuciPrijavu()
    }
  }, 1000)
}

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.prijava-prozor-outer {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 390px;
  background: none;
}

.prijava-prozor-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 32px #23386b22, 0 1.5px 4px #23386b18;
  max-width: 380px;
  width: 100%;
  margin-top: 32px;
  padding: 30px 24px 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prijava-naslov {
  font-size: 1.44em;
  color: #23386b;
  margin-bottom: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.form-section {
  width: 100%;
  margin-top: 10px;
}

.input-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #1c2a42;
  font-size: 1em;
  letter-spacing: 0.2px;
}

.prijava-select {
  width: 100%;
  padding: 9px 13px;
  border-radius: 7px;
  border: 1px solid #c2c6d1;
  margin-bottom: 14px;
  font-size: 1em;
  background: #f6f8fa;
  outline: none;
  color: #23386b;
}

.prijavi-btn, .povuci-btn, .reset-btn {
  width: 100%;
  padding: 11px 0;
  border-radius: 9px;
  font-size: 1.09em;
  border: none;
  margin: 12px 0 0 0;
  cursor: pointer;
  transition: background 0.15s;
  font-weight: 600;
  letter-spacing: 0.4px;
}
.prijavi-btn { background:#3376f6; color:#fff; }
.povuci-btn { background:#f6333a; color:#fff; }
.reset-btn { background: #666; color: #fff; margin-top: 8px;}

.success-msg {
  background: #eaf5ee;
  color: #24ad34;
  border-radius: 7px;
  padding: 14px;
  margin: 20px 0 7px 0;
  font-size: 1.10em;
  font-weight: 500;
  letter-spacing: 0.25px;
}
.info-msg {
  background: #e9ecf4;
  color: #2d2f4a;
  border-radius: 7px;
  padding: 14px;
  margin: 20px 0 7px 0;
  font-size: 1.07em;
  font-weight: 500;
}
.error-msg {
  background: #f8d3d6;
  color: #c82a3b;
  border-radius: 7px;
  padding: 14px;
  margin: 18px 0 7px 0;
  font-size: 1.10em;
  font-weight: 600;
  letter-spacing: 0.23px;
}
</style>
