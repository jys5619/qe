<template>
  <QeTable
    :columns="columns"
    :rows="rows"
    @qe:row-dblclick="handleRowDblClick"
  />

  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QeTable } from 'src/components';
import { menuColumns } from './menu.columns';
import { IMenu } from 'src/biz/menu';
import { menuEndpoint } from 'src/biz/menu';

const loading = ref<boolean>(false);
const columns = ref(menuColumns);
const rows = ref([] as IMenu[]);

const emit = defineEmits(['row-dblclick']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRowDblClick = (event: Event, row: any, index: number) => {
  emit('row-dblclick', event, row, index);
};

async function searchList(pmenuId: string) {
  loading.value = true;
  const menu = await menuEndpoint.getMenuList(pmenuId);
  rows.value = menu;
  loading.value = false;
}

defineExpose({
  searchList,
});
</script>
