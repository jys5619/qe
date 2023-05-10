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
import { IUser } from 'src/entity/entity';

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
    console.log('props.searchKeyword', props.searchKeyword);
    window.api
      .selectUserList(props.searchKeyword || '')
      .then<IUser[], never>((res: IUser[]) => {
        console.log('res', res);
        rows.value = res;
        return res;
      });
  }
);
</script>
