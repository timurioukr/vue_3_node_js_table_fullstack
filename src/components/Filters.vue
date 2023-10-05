<script setup>
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/index'

//Store
const dataStore = useDataStore()

//Data
const selectedValue = ref(1)
const dataSetVariants = ref([{ name: 'Set 1', value: 1 }, { name: 'Set 2', value: 2 }])

//Methods
const handleChange = () => useDataStore().fetchData({ setNumber: selectedValue.value })

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
  </div>
</template>