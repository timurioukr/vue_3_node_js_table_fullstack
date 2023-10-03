<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/index'

//Store
const dataStore = useDataStore()

//Data
const selectedValue = ref(1)
const dataSetVariants = ref([{ name: 'Set 1', value: 1 }, { name: 'Set 2', value: 2 }])
const selectedFiltersValue = ref([])
const queryParams = ref({})

// Computed
const uniqueValues = computed(() => {
  return dataStore?.tableData?.tableStructure.filter(item => item.isFilterable).reduce((acc, item) => {
  Object.keys(item).forEach(key => {
    if (!acc[key]) acc[key] = [item[key]]
    else acc[key].push(item[key])
  })
    return acc
  }, {})
})

//Methods
const handleChange = () => useDataStore().fetchData({ setNumber: selectedValue.value })

const handleChangeFilters = () => {
  const [key, value] = selectedFiltersValue.value.split(':')
  queryParams.value[key] = value

  const queryString = Object.keys(queryParams.value)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams.value[key])}`)
    .join('&')

  useDataStore().fetchData({ query: queryString })
}
</script>

<template>
  <div v-if="dataStore?.tableData?.rows?.length" class="filters-wrapper">
    <div>
      <button @click="$emit('resetTable')">Reset table columns</button>
    </div>
    <div class="filters-wrapper_select">
      <select v-model="selectedValue" @change="handleChange">
        <option v-for="setNumber in dataSetVariants" :key="setNumber.value" :value="setNumber.value">{{ setNumber.name }}</option>
      </select>
    </div>
    <div class="filters-wrapper_select" v-for="filter in Object.keys(uniqueValues)" :key="filter">
      <select v-model="selectedFiltersValue" @change="handleChangeFilters">
        <option value="" disabled selected>{{ filter }}</option>
        <option v-for="value in uniqueValues[filter]" :key="value" :value="`${filter}:${value}`">{{ value }}</option>
      </select>
    </div>
  </div>
</template>