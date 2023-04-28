<template>
  <div class="q-pa-sm">
    <q-table
      class="head-blue"
      flat
      bordered
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      :loading="isLoad"
      no-data-label="no data"
      :rows-per-page-options="[0]"
      hide-bottom
    />
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { IDataRows } from 'src/data';
import { ref } from 'vue';

export interface Props {
  columns: QTableColumn[];
  rows: IDataRows[];
  loading: boolean;
}

const props = defineProps<Props>();

const columns = ref(props.columns);
const rows = ref(props.rows);
const isLoad = ref<boolean>(props.loading);

console.log(props);
console.log(columns);
console.log(rows);
</script>

<style lang="scss">
$bgHeaderColor: #b9c7ee;

.head-blue {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: $bgHeaderColor;
    height: 30px;
  }
}
</style>
