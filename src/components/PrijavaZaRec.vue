<template>
  <div class="prijava-prozor">
    <h2>Prijava za reč</h2>

    <!-- Izbor tipa reči i prijava -->
    <div v-if="!prijavljen && !odobreno">
      <label for="tipRec">Izaberite osnov:</label>
      <select v-model="tipRec" id="tipRec">
        <option value="poslovnik">Reč po poslovniku</option>
        <option value="replika">Replika na izlaganje</option>
        <option value="tacka">Reč po tački dnevnog reda</option>
      </select>
      <button class="prijavi-btn" @click="posaljiPrijavu">
        Prijavi se za reč
      </button>
    </div>

    <!-- Čekanje odobrenja -->
    <div v-if="prijavljen && !odobreno">
      <div class="info-msg">
        <b>Vaš zahtev je poslat.</b><br>
        Čeka se odobrenje predsedavajućeg...
      </div>
      <button class="povuci-btn" @click="povuciPrijavu">
        Povuci zahtev
      </button>
    </div>

    <!-- Odobreno, teče vreme -->
    <div v-if="odobreno">
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
    <div v-if="istekloVreme" class="error-msg">
      <b>Vaše vreme za izlaganje je isteklo.</b>
      <button class="reset-btn" @click="resetujSve">OK</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const tipRec = ref('poslovnik')
const prijavljen = ref(false)
const odobreno = ref(false)
const vreme = ref(120)
const istekloVreme = ref(false)

function prikazTipa() {
  if (tipRec.value === 'poslovnik') return 'Reč po poslovniku'
  if (tipRec.value === 'replika') return 'Replika na izlaganje'
  if (tipRec.value === 'tacka') return 'Reč po tački dnevnog reda'
  return ''
}

function posaljiPrijavu() {
  prijavljen.value = true
  istekloVreme.value = false
}

function povuciPrijavu() {
  prijavljen.value = false
  odobreno.value = false
  vreme.value = 120
}

function zavrsiIzlaganje() {
  odobreno.value = false
  prijavljen.value = false
  vreme.value = 120
}

function resetujSve() {
  odobreno.value = false
  prijavljen.value = false
  vreme.value = 120
  istekloVreme.value = false
}

// --- Simulacija odobrenja predsedavajućeg i timer ---
let interval = null
watch(prijavljen, (val) => {
  if (val) {
    // Simuliraj da predsedavajući odobri posle 2 sekunde
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
  // Različito vreme za različit tip reči
  if (tipRec.value === 'poslovnik') vreme.value = 120
  else if (tipRec.value === 'replika') vreme.value = 60
  else if (tipRec.value === 'tacka') vreme.value = 180
  else vreme.value = 120

  clearInterval(interval)
  interval = setInterval(() => {
    vreme.value--
    if (vreme.value <= 0) {
      clearInterval(interval)
      odobreno.value = false
      prijavljen.value = false
      istekloVreme.value = true
    }
  }, 1000)
}

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.prijava-prozor { text-align:center; padding: 30px 0 10px 0; }
.prijavi-btn, .povuci-btn, .reset-btn {
  padding: 10px 26px;
  border-radius: 8px;
  font-size: 1.1em;
  border:none;
  margin: 14px 4px 0 4px;
  cursor: pointer;
  transition: background 0.15s;
}
.prijavi-btn { background:#3376f6; color:#fff; }
.povuci-btn { background:#f6333a; color:#fff; }
.reset-btn { background: #666; color: #fff; }
.success-msg { color: #24ad34; margin: 22px 0 12px 0; font-size:1.13em;}
.info-msg { color: #333; margin: 22px 0 12px 0; font-size:1.05em;}
.error-msg { color: #c82a3b; margin: 25px 0 12px 0; font-size:1.15em;}
select { margin: 0 10px 0 0; padding: 7px 13px; border-radius: 6px; font-size: 1em;}
</style>
