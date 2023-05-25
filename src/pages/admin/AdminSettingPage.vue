<template>
  <q-page class="q-pa-md" style="display: flex">
    <q-splitter
      v-model="splitterModel"
      :limits="[30, 70]"
      style="flex: 1"
      separator-class="bg-gray-8"
      separator-style="width: 3px"
    >
      <template v-slot:before>
        <div class="q-pa-sm">
          <QeSearchInput @search="handleSearch" />
        </div>
        <div class="q-pa-sm">
          <QeTable :columns="columns" :rows="rows" />
        </div>
        <div class="q-pa-sm q-gutter-sm" style="text-align: right">
          <q-btn
            class="glossy"
            color="primary"
            label="NEW"
            size="sm"
          />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-sm">
          <q-tabs
            v-model="tab"
            dense
            class="bg-primary text-white"
            active-color="indigo-10"
            indicator-color="indigo-10"
            :align="`justify`"
          >
            <q-tab name="user" label="User" />
            <q-tab name="alarms" label="Alarms" />
            <q-tab name="movies" label="Movies" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
            <q-tab-panel name="user">
              <div class="text-h6">User</div>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
            <q-tab-panel name="movies">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {QeTable} from 'src/components';
import QeSearchInput from 'src/components/input/QeSearchInput.vue';
import { DATA_COLUMNS, DATA_ROWS } from 'src/data';


const columns = ref(DATA_COLUMNS);
const rows = ref(DATA_ROWS);
const splitterModel = ref(50);
const tab = ref('mails');

// const loading = ref(false);

const handleSearch = (text: string) => {
  console.log('text', text);
};

// const onSubmit = () => {
//   console.log(3);
// };

// const onReset = () => {
//   console.log(3);
// };

// const simulateProgress = () => {
//   loading.value = true;

//   setTimeout(() => {
//     loading.value = false;
//   }, 3000);
// };

// const loadMenuList = async () => {
//   const menuStore = useStoreMenu();
//   await menuStore.initData();
//   console.log(menuStore.menuList);
// };
</script>
