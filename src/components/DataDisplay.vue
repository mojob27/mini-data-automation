<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Vehicle Data Display</h1>
    <div class="mb-4">
      <label for="modelSelect" class="block mb-2">Select a Model:</label>
      <select v-model="selectedModelCode" id="modelSelect" class="border p-2 w-full">
        <option v-for="model in models" :key="model.code" :value="model.code">
          {{ model.name }} ({{ model.year }})
        </option>
      </select>
    </div>
    <div v-if="selectedModel" class="mt-4">
      <h2 class="text-xl font-bold mb-2">{{ selectedModel.name }} ({{ selectedModel.year }})</h2>
      <div v-for="styleTrim in selectedModel.stylesTrims" :key="styleTrim.code" class="mb-4">
        <h3 class="font-bold">
          {{ styleTrim.type === 'trim' ? 'Trim' : 'Style' }} - {{ styleTrim.name }} ({{ styleTrim.code }})
        </h3>
        <p>{{ styleTrim.features.join(' | ') }}</p>
      </div>
      <button @click="copyToClipboard" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Copy Formatted Data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVehicleStore } from '../stores/vehicleStore'

const vehicleStore = useVehicleStore()
const selectedModelCode = ref('')

const models = computed(() => vehicleStore.models)
const selectedModel = computed(() => vehicleStore.getModelByCode(selectedModelCode.value))

function copyToClipboard() {
  if (!selectedModel.value) return

  const formattedData = selectedModel.value.stylesTrims.map(st => {
    return `-- "${st.type === 'trim' ? 'Trim' : 'Style'} - ${st.name} (${st.code})"\n--- ${st.features.join('|')}`
  }).join('\n')

  navigator.clipboard.writeText(formattedData)
    .then(() => alert('Formatted data copied to clipboard!'))
    .catch(err => console.error('Failed to copy: ', err))
}
</script>