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
import { userListColumn } from './user';
import { IUser } from 'src/biz/user';
import { userEndpoint } from 'src/biz/user';

const loading = ref<boolean>(false);
const columns = ref(userListColumn);
const rows = ref([] as IUser[]);

const emit = defineEmits(['row-dblclick']);

const handleRowDblClick = (event: Event, row: any, index: number) => {
  emit('row-dblclick', event, row, index);
};

async function searchUserList(searchKeyword: string) {
  loading.value = true;
  const user = await userEndpoint.getUserList(searchKeyword);
  rows.value = user;
  loading.value = false;
}

defineExpose({
  searchUserList,
});
</script>
