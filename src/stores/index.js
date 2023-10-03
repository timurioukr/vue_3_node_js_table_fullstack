import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('tableData', {
  state: () => ({ 
    tableData: [],
    dataLoaded: false
  }),
  actions: {
    async fetchData(params) {
      try {
        this.dataLoaded = false
        const response = await axios.get(`https://api-staging.entriwise.com/mock/test-task-table${ params?.setNumber || 1 }?${ params?.query || '' }`)
        this.tableData = response.data
        this.dataLoaded = true
      } catch (error) {
        console.error('Error fetching data:', error)
        this.dataLoaded = true
      }
    }
  }
})
