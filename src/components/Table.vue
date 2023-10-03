<script setup>
import { useDataStore } from '../stores/index'
import { ref, computed, watch } from 'vue'

//Data
const selectedColumns = ref([])
const currentDropdownIndex = ref('')

//Store
const dataStore = useDataStore()

//Computed
const categoryList = computed(() => {
  const categoryCounts = (selectedColumns.value || []).reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})
  return { 
    category: [...new Set(selectedColumns.value?.map(({ category }) => category))],
    count: categoryCounts
  }
})

//Methods
const toggleDropdownColumnsSelect = (index) => {
  if (currentDropdownIndex.value === index) currentDropdownIndex.value = ''
  else currentDropdownIndex.value = index
}

const setData = () => {
  selectedColumns.value = [...dataStore?.tableData?.tableStructure]
}

//Watchers
watch(() => dataStore?.tableData?.tableStructure, () => setData())

// Expose
defineExpose({ setData })
</script>

<template>
  <div v-if="dataStore?.tableData?.rows?.length" class="dynamic-table">
    <table>
      <thead>
        <tr>
          <th 
            v-for="(category, index) in categoryList.category" 
            :colspan="categoryList.count[category]" 
            :key="index">{{ category }} <span class="dropdown-btn" @click="toggleDropdownColumnsSelect(index)">Select</span>
            <div class="dropdown-container">
              <div v-if="index === currentDropdownIndex" class="dropdown">
                <label v-for="option in dataStore?.tableData?.tableStructure.filter(object => object.category === category)" :key="option">
                  <input type="checkbox" v-model="selectedColumns" :value="option" :disabled="option.isPrimary"/>{{ option.title }}
                </label>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th
            v-for="(column, index) in selectedColumns" 
            :key="index"
            :data-label="column.title">{{ column.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in dataStore.tableData.rows" :key="index">
          <td
            v-for="(column, index) in selectedColumns" 
            :key="index"
            :data-label="column.title">{{ row[column.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.dropdown-btn {
  border: 1px solid #ccc;
  padding: 2px;
  cursor: pointer;
  border-radius: 3px;
}
.dropdown-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}
.dropdown-toggle {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 5px 10px;
}
.dropdown {
  margin-top: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 1000;
  position: absolute;
  width: 100%;
  top: 100%;
  border-radius: 12px;
  padding: 5px;
}
.dropdown label {
  display: block;
  padding: 5px 10px;
  text-align: start;
  cursor: pointer;
}
.dynamic-table {
  background: #eaeaea;
  border-radius: 12px;
  padding: 5px;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  width: 100%;
}

table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  background: #eaeaea;
  border-bottom: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: 0.8em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

@media screen and (max-width: 1400px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }
  
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  
  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  table td:last-child {
    border-bottom: 0;
  }
}
</style>