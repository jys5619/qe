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
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit
              v-model="props.row.calories"
              title="Update calories"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
            <q-popup-edit v-model="props.row.fat" v-slot="scope">
              <q-input type="textarea" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="carbs" :props="props">
            {{ props.row.carbs }}
            <q-popup-edit
              v-model="props.row.carbs"
              title="Update carbs"
              buttons
              persistent
              v-slot="scope"
            >
              <q-input
                type="number"
                v-model="scope.value"
                dense
                autofocus
                hint="Use buttons to close"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts" generic="T">
import { QTableColumn } from 'quasar';
import { ref, watch } from 'vue';

export interface IQeTableProps {
  columns: QTableColumn[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[];
}

const props = defineProps<IQeTableProps>();
const columns = ref(props.columns);
const rows = ref(props.rows);

const emit = defineEmits(['qe:row-dblclick']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
