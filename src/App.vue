<script setup>
import Table from './components/Table.vue'
import Filters from './components/Filters.vue'
import Spinner from './components/Spinner.vue'
import { useDataStore } from './stores/index'
import { onMounted, ref } from 'vue'

// Data
const table = ref()

// Stores
const dataStore = useDataStore()

// Hooks
onMounted(() => dataStore.fetchData())
</script>

<template>
  <h1>Register of goods</h1>
  <Spinner v-if="!dataStore.dataLoaded" />
  <Filters @resetTable="table.setData()" />
  <Table ref="table" />
</template>