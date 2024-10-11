import { defineStore } from 'pinia'

interface VehicleModel {
  code: string
  year: number
  name: string
  stylesTrims: StyleTrim[]
}

interface StyleTrim {
  code: string
  name: string
  type: 'style' | 'trim'
  features: string[]
}

export const useVehicleStore = defineStore('vehicle', {
  state: () => ({
    models: [] as VehicleModel[],
    selectedModelCode: '' as string
  }),
  getters: {
    selectedModel: (state) => state.models.find(m => m.code === state.selectedModelCode),
    getModelByCode: (state) => (code: string) => state.models.find(m => m.code === code)
  },
  actions: {
    addModel(model: Omit<VehicleModel, 'stylesTrims'>) {
      this.models.push({ ...model, stylesTrims: [] })
      this.selectedModelCode = model.code
      this.saveToLocalStorage()
    },
    addStyleTrim(modelCode: string, styleTrim: StyleTrim) {
      const model = this.models.find(m => m.code === modelCode)
      if (model) {
        model.stylesTrims.push(styleTrim)
        this.saveToLocalStorage()
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('vehicleData', JSON.stringify(this.models))
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('vehicleData')
      if (data) {
        this.models = JSON.parse(data)
      }
    }
  }
})