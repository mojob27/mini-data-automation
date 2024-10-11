<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Vehicle Data Entry</h1>
    <form @submit.prevent="addVehicleModel" class="mb-8">
      <div class="mb-4">
        <label for="modelCode" class="block mb-2">Model Code:</label>
        <input v-model="newModel.code" id="modelCode" required class="border p-2 w-full">
      </div>
      <div class="mb-4">
        <label for="modelYear" class="block mb-2">Model Year:</label>
        <input v-model="newModel.year" id="modelYear" type="number" required class="border p-2 w-full">
      </div>
      <div class="mb-4">
        <label for="modelName" class="block mb-2">Model Name:</label>
        <input v-model="newModel.name" id="modelName" required class="border p-2 w-full">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Model</button>
    </form>

    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">Select Existing Model</h2>
      <select v-model="selectedModelCode" class="border p-2 w-full">
        <option value="">Select a model</option>
        <option v-for="model in models" :key="model.code" :value="model.code">
          {{ model.name }} ({{ model.year }})
        </option>
      </select>
    </div>

    <div v-if="selectedModel">
      <h2 class="text-xl font-bold mb-4">Add Style/Trim for {{ selectedModel.name }}</h2>
      <form @submit.prevent="addStyleTrim" class="mb-8">
        <div class="mb-4">
          <label for="styleTrimCode" class="block mb-2">Style/Trim Code:</label>
          <input v-model="newStyleTrim.code" id="styleTrimCode" required class="border p-2 w-full">
        </div>
        <div class="mb-4">
          <label for="styleTrimName" class="block mb-2">Style/Trim Name:</label>
          <input v-model="newStyleTrim.name" id="styleTrimName" required class="border p-2 w-full">
        </div>
        <div class="mb-4">
          <label for="styleTrimType" class="block mb-2">Type:</label>
          <select v-model="newStyleTrim.type" id="styleTrimType" required class="border p-2 w-full">
            <option value="style">Style</option>
            <option value="trim">Trim</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="features" class="block mb-2">Features (comma or new line separated):</label>
          <textarea v-model="featuresInput" id="features" rows="4" class="border p-2 w-full"></textarea>
        </div>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Style/Trim</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVehicleStore } from '../stores/vehicleStore'

const vehicleStore = useVehicleStore()

const newModel = ref({ code: '', year: 0, name: '' })
const newStyleTrim = ref({ code: '', name: '', type: 'style', features: [] })
const featuresInput = ref('')
const selectedModelCode = ref('')

const models = computed(() => vehicleStore.models)
const selectedModel = computed(() => vehicleStore.getModelByCode(selectedModelCode.value))

function addVehicleModel() {
  vehicleStore.addModel(newModel.value)
  newModel.value = { code: '', year: 0, name: '' }
  selectedModelCode.value = ''
}

function addStyleTrim() {
  newStyleTrim.value.features = featuresInput.value
    .split(/[,\n]/)
    .map(f => f.trim())
    .filter(f => f !== '')
  vehicleStore.addStyleTrim(selectedModelCode.value, newStyleTrim.value)
  newStyleTrim.value = { code: '', name: '', type: 'style', features: [] }
  featuresInput.value = ''
}
</script>