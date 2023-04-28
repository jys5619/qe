<template>
  <q-page class="q-pa-md items-center flex-direction">
    <div class="flex-direction br">
      <div class="flex-direction br q-pa-sm">
        <q-input
          bottom-slots
          v-model="text"
          label="Search"
          maxlength="12"
          :dense="dense"
        >
          <template v-slot:append>
            <q-icon
              v-if="text !== ''"
              name="close"
              @click="text = ''"
              class="cursor-pointer"
            />
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="q-mt-sm flex-direction br">
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
            hide-bottom
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { DATA_COLUMNS, DATA_ROWS } from 'src/data';
import { ref } from 'vue';

const text = ref('');
const columns = ref(DATA_COLUMNS);
const rows = ref(DATA_ROWS);
</script>

<style lang="scss">
$bgColor: white;

div.br {
  border: 1px solid $bgColor;
}

.head-blue {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #00b4ff;
    height: 30px;
  }
}
</style>
