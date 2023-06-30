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
import { codeColumns } from './code.columns';
import { ICode, codeEndpoint } from 'src/biz';

const loading = ref<boolean>(false);
const columns = ref(codeColumns);
const rows = ref([] as ICode[]);

const emit = defineEmits(['row-dblclick']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleRowDblClick = (event: Event, row: any, index: number) => {
  emit('row-dblclick', event, row, index);
};

async function searchList(codeGroup: string) {
  loading.value = true;
  const codeList = await codeEndpoint.getCodeList(codeGroup);
  rows.value = codeList;
  loading.value = false;
}

defineExpose({
  searchList,
});
</script>
