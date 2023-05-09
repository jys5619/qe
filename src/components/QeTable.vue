<template>
  <div>
    <q-table
      class="head-blue"
      flat
      bordered
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      no-data-label="no data"
      :rows-per-page-options="[0]"
      hide-bottom
    />
  </div>
</template>

<script setup lang="ts" generic="T">
import { QTableColumn } from 'quasar';
import { ref } from 'vue';

export interface IQeTableProps<T> {
  columns: QTableColumn[];
  rows: T[];
}

const props = defineProps<IQeTableProps<T>>();

const columns = ref(props.columns);
const rows = ref(props.rows);
</script>

<style lang="scss">
$bgHeaderColor: #4287f5;

.head-blue {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: $bgHeaderColor;
    color: white;
    height: 30px;
  }
}
</style>
