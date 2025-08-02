<template>
  <div class="panel-sednice">
    <!-- Tabs -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="{active: selectedTab === tab.value}"
        @click="selectedTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab content - koristi dinamičku komponentu -->
    <div class="tab-content">
      <component :is="currentTabComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DnevniRed from './DnevniRed.vue'
import PrijavaZaRec from './PrijavaZaRec.vue'
import ListaPrijavljenih from './ListaPrijavljenih.vue'

// Definiši tabove i njihove komponente
const tabs = [
  { label: 'Dnevni red', value: 'dnevniRed', component: DnevniRed },
  { label: 'Prijava za reč', value: 'prijavaZaRec', component: PrijavaZaRec },
  { label: 'Lista prijavljenih', value: 'listaPrijavljenih', component: ListaPrijavljenih }
]
const selectedTab = ref('dnevniRed')

// Dinamički prikaz izabrane komponente
const currentTabComponent = computed(() => {
  return tabs.find(tab => tab.value === selectedTab.value)?.component || DnevniRed
})
</script>

<style scoped>
.panel-sednice {
  max-width: 650px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  background: #f4f6fc;
  padding: 8px;
  border-radius: 8px;
}
.tabs button {
  flex: 1;
  padding: 10px 0;
  border: none;
  background: #e2e4ef;
  color: #23386b;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
}
.tabs .active,
.tabs button.active {
  background: #23386b;
  color: #fff;
}
.tab-content {
  padding: 20px 0;
  min-height: 120px;
}
</style>


<style scoped>
.panel-sednice {
  max-width: 650px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  background: #f4f6fc;
  padding: 8px;
  border-radius: 8px;
}
.tabs button {
  flex: 1;
  padding: 10px 0;
  border: none;
  background: #e2e4ef;
  color: #23386b;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
}
.tabs .active,
.tabs button.active {
  background: #23386b;
  color: #fff;
}
.tab-content {
  padding: 20px 0;
  min-height: 120px;
}
.prijavi-btn {
  padding: 10px 26px;
  background: #3376f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.18s;
}
.prijavi-btn:disabled {
  background: #93b8e5;
  cursor: not-allowed;
}
.success-msg {
  margin-top: 15px;
  color: #24ad34;
  font-weight: 500;
  font-size: 1.1em;
}
</style>
