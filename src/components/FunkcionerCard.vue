<template>
  <div class="funkcioner-card">
    <div class="card-title">{{ naslov }}</div>
    <div class="card-fields">
      <input v-model="podatak.ime" class="form-control" placeholder="Ime i prezime" />
      <input v-model="podatak.maticni" class="form-control" placeholder="Matični broj" />
      <input v-model="podatak.adresa" class="form-control" placeholder="Adresa" />
      <input v-model="podatak.telefon" class="form-control" placeholder="Telefon" />
      <input v-model="podatak.email" class="form-control" placeholder="Email" />
      <input type="file" class="form-control file-field" @change="onSlikaUpload" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['naslov', 'podatak'])
function onSlikaUpload(e) {
  props.podatak.slika = e.target.files[0]
}
</script>

<style scoped>
.funkcioner-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 18px #23285115;
  padding: 22px 28px 18px 28px;
  margin-bottom: 28px;
  width: 100%;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
}
.card-title {
  font-size: 1.16em;
  font-weight: 700;
  color: #232851;
  margin-bottom: 15px;
  letter-spacing: 1px;
  text-align: left;
}
.card-fields {
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.file-field {
  padding: 6px 0 2px 2px;
}
</style>
