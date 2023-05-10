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
      @row-dblclick="handleRowDblClick"
    />
  </div>
</template>

<script setup lang="ts" generic="T">
import { QTableColumn } from 'quasar';
import { ref, watch } from 'vue';

export interface IQeTableProps {
  columns: QTableColumn[];
  rows: any[];
}

const props = defineProps<IQeTableProps>();
const columns = ref(props.columns);
const rows = ref(props.rows);

const emit = defineEmits(['qe:row-dblclick']);

const handleRowDblClick = (event: Event, row: any, index: number) => {
  emit('qe:row-dblclick', event, row, index);
};

watch(
  () => props.rows,
  () => {
    rows.value = props.rows;
  }
);
props.rows;
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
