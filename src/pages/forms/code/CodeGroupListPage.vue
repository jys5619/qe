<template>
  <qe-table
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
import { codeGroupColumns } from './code.columns';
import { ICodeGroup } from 'src/biz/code';
import { codeEndpoint } from 'src/biz/code';

const loading = ref<boolean>(false);
const columns = ref(codeGroupColumns);
const rows = ref([] as ICodeGroup[]);

const emit = defineEmits(['row-dblclick']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRowDblClick = (event: Event, row: any, index: number) => {
  emit('row-dblclick', event, row, index);
};

async function searchList() {
  loading.value = true;
  const codeGroupList = await codeEndpoint.getCodeGroupList();
  rows.value = codeGroupList;
  loading.value = false;
}

defineExpose({
  searchList,
});
</script>
