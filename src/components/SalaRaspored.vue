<template>
  <div class="sala-raspored-wrap">
    <svg :width="svgWidth" :height="svgHeight">
      <g v-for="(red, redIdx) in raspored" :key="redIdx">
        <rect
          v-for="(odbornik, i) in red"
          :key="odbornik.id"
          :x="xPozicija(red.length, i)"
          :y="yPozicija(redIdx)"
          :width="velicina"
          :height="velicina"
          :fill="bojaStatusa(odbornik.status, odbornik.predsedavajuci)"
          rx="11"
          :style="{ filter: odbornik.predsedavajuci ? 'drop-shadow(0 0 6px #fa7e0a66)' : '' }"
        >
          <title>{{ odbornik.ime || 'Odbornik ' + odbornik.id }}</title>
        </rect>
        <text
          v-for="(odbornik, i) in red"
          :key="'txt' + odbornik.id"
          :x="xPozicija(red.length, i) + velicina/2"
          :y="yPozicija(redIdx) + velicina/2 + 6"
          text-anchor="middle"
          font-size="15"
          font-family="Segoe UI, Arial, sans-serif"
          fill="#fff"
        >{{ odbornik.broj || odbornik.id }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
const velicina = 40
const razmak = 13
const vrhMargina = 28
const izmedjuRedova = 25   // malo veći razmak za “prozračnost”
const svgWidth = 440
const svgHeight = 420      // povećano!

const raspored = [
  [ { id: 23 }, { id: 22 }, { id: 21 }, { id: 20 } ],
  [ { id: 19 }, { id: 18 }, { id: 17 } ],
  [ { id: 16 }, { id: 15 }, { id: 14 }, { id: 13 }, { id: 12 } ],
  [ { id: 11 }, { id: 10 }, { id: 9 }, { id: 8 } ],
  [ { id: 7 }, { id: 6 }, { id: 5 }, { id: 4 }, { id: 3 } ],
  [ { id: 2, predsedavajuci: true }, { id: 1, predsedavajuci: true } ]
]

function bojaStatusa(status, predsedavajuci) {
  if (predsedavajuci) return '#f28b3b'
  if (status === 'prisutno') return '#3498f7'
  if (status === 'za') return '#29bb29'
  if (status === 'protiv') return '#e04345'
  if (status === 'uzdržan') return '#bbbbbb'
  if (status === 'odsutno') return '#ffe066'
  return '#cccccc'
}

function xPozicija(redLength, idx) {
  const redWidth = redLength * velicina + (redLength - 1) * razmak
  const startX = (svgWidth - redWidth) / 2
  return Math.round(startX + idx * (velicina + razmak))
}
function yPozicija(redIdx) {
  // Ako je poslednji red (predsedavajuci), odvoji ga još više dole:
  if (redIdx === raspored.length - 1) {
    return Math.round(vrhMargina + redIdx * (velicina + izmedjuRedova) + 35)
  }
  return Math.round(vrhMargina + redIdx * (velicina + izmedjuRedova))
}
</script>

<style scoped>
.sala-raspored-wrap {
  background: #f7fafb;
  border-radius: 18px;
  box-shadow: 0 6px 32px #23386b15, 0 1.5px 4px #23386b09;
  max-width: 500px;
  width: 100%;
  margin: 0 auto 30px auto;
  padding: 14px 0;
  text-align: center;
  border: 1.5px solid #e9eefa;
}
</style>
