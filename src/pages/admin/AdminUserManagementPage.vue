<template>
  <q-page class="q-pa-md column">
    <div class="column q-pa-sm" style="flex: 0">
      <div class="text-h5" style="border-bottom: 1px solid burlywood">User</div>
    </div>
    <div class="flex" style="flex: 1">
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
            <UserListPage :search-keyword="searchKeyword" />
          </div>
          <div class="q-pa-sm q-gutter-sm" style="text-align: right">
            <q-btn
              class="glossy"
              color="primary"
              label="NEW"
              size="sm"
              @click="loadMenuList"
            />
          </div>
        </template>

        <template v-slot:after>
          <q-card class="q-pa-sm" flat>
            <q-tabs
              v-model="tab"
              dense
              class="bg-primary text-white"
              active-color="indigo-10"
              indicator-color="indigo-10"
              :align="`left`"
            >
              <q-tab name="user" label="User" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated class="bg-blue-1">
              <q-tab-panel name="user">
                <div class="text-h6">User</div>
                <UserPage />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import QeSearchInput from 'src/components/input/QeSearchInput.vue';
import { useStoreMenu } from 'src/stores/menu';
import { UserPage, UserListPage } from '../forms/user';

const splitterModel = ref(50);
const tab = ref('user');
const searchKeyword = ref('');

// const loading = ref(false);

const handleSearch = (text: string) => {
  console.log('text', text);
  searchKeyword.value = text;
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

const loadMenuList = async () => {
  const menuStore = useStoreMenu();
  await menuStore.initData();
  console.log(menuStore.menuList);
};
</script>
