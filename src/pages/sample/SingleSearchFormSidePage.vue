<template>
  <q-page class="q-pa-md items-center flex-direction">
    <div class="q-pa-sm">
      <QeSearchInput @search="handleSearch" />
    </div>
    <div>
      <QeTable :columns="columns" :rows="rows" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QeTable, QeSearchInput } from 'src/components';
import { DATA_COLUMNS, DATA_ROWS } from 'src/data';
import { ref } from 'vue';

const columns = ref(DATA_COLUMNS);
const rows = ref(DATA_ROWS);

const handleSearch = (text: string) => {
  console.log('text', text);
};
</script>
