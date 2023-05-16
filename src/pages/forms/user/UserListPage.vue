<template>
  <QeTable
    :columns="columns"
    :rows="rows"
    @qe:row-dblclick="handleRowDblClick"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import QeTable from 'src/components/QeTable.vue';
import { userListColumn } from './user';
import { IUser } from 'src/biz/user/user.entity';
import { userEndpoint } from 'src/biz/user';

const columns = ref(userListColumn);
const rows = ref([] as IUser[]);

export interface IUserListPageProps {
  searchKeyword?: string;
}

const props = defineProps<IUserListPageProps>();
const emit = defineEmits(['row-dblclick']);

const handleRowDblClick = (event: Event, row: any, index: number) => {
  emit('row-dblclick', event, row, index);
};

watch(
  () => props.searchKeyword,
  () => {
    searchUserList(props.searchKeyword || '');
  }
);

async function searchUserList (searchKeyword: string) {
  const user = await userEndpoint.getUserList(searchKeyword);
  if ( user ) {
    rows.value = user;
  }
};

defineExpose({
  searchUserList,
});
</script>
