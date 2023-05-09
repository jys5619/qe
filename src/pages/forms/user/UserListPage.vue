<template>
  <QeTable :columns="columns" :rows="rows" />
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';
import QeTable from 'src/components/QeTable.vue';
import { userListColumn } from './user';
import { IUser } from 'src/entity/entity';

const columns = ref(userListColumn);
const rows = ref([] as IUser[]);

export interface IUserListPageProps {
  searchKeyword: string;
}

const props = defineProps<IUserListPageProps>();

watch(() => props.searchKeyword, () => {
    console.log('props.searchKeyword', props.searchKeyword);
    window.api.selectUserList(props.searchKeyword).then<IUser[], never>((res:IUser[]) => rows.value = res);
})
</script>
