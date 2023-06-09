<template>
  <splitter-page ref="splitPageRef" title="Menu">
    <template v-slot:before>
      <div class="q-pa-sm">
        <QeSearchSelect
          label="Search"
          hint="Menu ID"
          :options="menuList"
          @change="handleChange"
        />
      </div>
      <div class="q-pa-sm">
        <menu-grid
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

    <template v-slot:after>
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
            <menu-form
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
import { onMounted, ref } from 'vue';
import { QeSearchSelect } from 'src/components';
import { IMenu, menuEndpoint, menuService } from 'src/biz';
import SplitterPage from 'src/components/page/SplitterPage.vue';
import MenuForm from './form/MenuForm.vue';
import MenuGrid from './grid/MenuGrid.vue';

const menu = ref<IMenu | undefined>(undefined);
const tab = ref('menu');
const searchKeyword = ref<string | undefined>(undefined);
const readonly = ref<boolean>(true);
const splitPageRef = ref();
const listPageRef = ref();
const menuList = ref([{ value: 'MAIN', label: 'Main' }]);

const handleChange = (text: string) => {
  const isPreMain = searchKeyword.value === 'MAIN';
  const isCurMain = text === 'MAIN';
  if (isPreMain !== isCurMain) {
    splitPageRef.value.hideSplitter();
  }
  searchKeyword.value = text;
  listPageRef.value.searchList(searchKeyword.value);
};

const handleNewMenuAdd = () => {
  menu.value = menuService.getIMenuInitValue();
  menu.value.pmenuId = searchKeyword.value || '';
  menu.value.useYn = 'Y';
  menu.value.separatorYn = searchKeyword.value === 'MAIN' ? '' : 'N';
  splitPageRef.value.showSplitter();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRowDblClick = (event: Event, row: any) => {
  menu.value = row as IMenu;
  splitPageRef.value.showSplitter();
};

const handleClose = () => {
  splitPageRef.value.hideSplitter();
};

const handleSubmit = () => {
  listPageRef.value.searchList(searchKeyword.value);
};

const handleReadonly = (isReadonly: boolean) => {
  readonly.value = isReadonly;
};

onMounted(() => {
  (async () => {
    const searchMenuList = await menuEndpoint.getMenuList('MAIN', false);
    const menuListData = [
      {
        value: 'MAIN',
        label: 'Main',
      },
    ];

    searchMenuList.forEach((menu) => {
      menuListData.push({ value: menu.menuId, label: menu.menuName });
    });
    console.log(menuListData);
    menuList.value = menuListData;
  })();
});
</script>
