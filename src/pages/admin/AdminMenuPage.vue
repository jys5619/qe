<template>
  <splitter-page ref="splitPageRef" title="Menu">
    <template v-slot:left>
      <div class="q-pa-sm">
        <QeSearchSelect
          label="Search"
          hint="Menu ID"
          :options="menuList"
          @search="handleSearch"
        />
      </div>
      <div class="q-pa-sm">
        <MenuListPage
          ref="listPageRef"
          :search-keyword="searchKeyword"
          @row-dblclick="handleRowDblClick"
        />
      </div>
      <div class="q-pa-sm q-gutter-sm" style="text-align: right">
        <q-btn
          class="glossy"
          color="primary"
          label="NEW"
          size="sm"
          @click="handleNewMenuAdd"
        />
      </div>
    </template>

    <template v-slot:right>
      <q-card class="q-pa-sm" flat>
        <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="yellow-6"
          indicator-color="yellow-6"
          :align="`left`"
        >
          <q-tab name="menu" label="Menu" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="menu"
            :class="[readonly ? 'bg-yellow-1' : 'bg-blue-1']"
          >
            <menu-page
              :menu="menu"
              :readonly="readonly"
              @close="handleClose"
              @submit="handleSubmit"
              @update:readonly="handleReadonly"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </template>
  </splitter-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QeSearchSelect } from 'src/components/select';
import { MenuPage, MenuListPage } from '../forms/menu';
import { IMenu } from 'src/biz/menu';
import { SplitterPage } from '../forms/page';


const menuListData = [
  {
    value: 'myDesk',
    label: 'My Desk',
  },
  {
    value: 'project',
    label: 'Project',
  },
  {
    value: 'program',
    label: 'Program',
  },
  {
    value: 'data',
    label: 'Data',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'sample',
    label: 'Sample',
  },
];

const menu = ref<IMenu | undefined>(undefined);
const tab = ref('menu');
const searchKeyword = ref<string | undefined>(undefined);
const readonly = ref<boolean>(true);
const splitPageRef = ref();
const listPageRef = ref();
const menuList = ref(menuListData);

const handleSearch = (text: string) => {
  searchKeyword.value = text;
  listPageRef.value.searchMenuList(searchKeyword.value);
};

const handleNewMenuAdd = () => {
  readonly.value = false;
  menu.value = {} as IMenu;
  splitPageRef.value.showSplitter(true);
};

const handleRowDblClick = (event: Event, row: any, index: number) => {
  menu.value = row;
  splitPageRef.value.showSplitter(true);
};

const handleClose = (event: Event) => {
  splitPageRef.value.hideSplitter();
};

const handleSubmit = (event: Event) => {
  listPageRef.value.searchMenuList(searchKeyword.value);
};

const handleReadonly = (isReadonly: boolean) => {
  readonly.value = isReadonly;
};
</script>
