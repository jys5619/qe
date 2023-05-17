<template>
  <splitter-page ref="splitPageRef" title="User">
    <template v-slot:left>
      <div class="q-pa-sm">
        <QeSearchInput
          label="Search"
          hint="User ID, Name, English Name, Auth"
          @search="handleSearch"
        />
      </div>
      <div class="q-pa-sm">
        <UserListPage
          ref="userListPageRef"
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
          @click="handleNewUserAdd"
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
          <q-tab name="user" label="User" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="user"
            :class="[userReadonly ? 'bg-yellow-1' : 'bg-blue-1']"
          >
            <user-page
              :user="user"
              :readonly="userReadonly"
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
import QeSearchInput from 'src/components/input/QeSearchInput.vue';
import { UserPage, UserListPage } from '../forms/user';
import { IUser } from 'src/biz/user';
import { SplitterPage } from '../forms/page';

const user = ref<IUser | undefined>(undefined);
const tab = ref('user');
const searchKeyword = ref<string | undefined>(undefined);
const userReadonly = ref<boolean>(true);
const splitPageRef = ref();
const userListPageRef = ref();

const handleSearch = (text: string) => {
  searchKeyword.value = text;
  userListPageRef.value.searchUserList(searchKeyword.value);
};

const handleNewUserAdd = () => {
  userReadonly.value = false;
  user.value = {} as IUser;
  splitPageRef.value.showSplitter(true);
};

const handleRowDblClick = (event: Event, row: any, index: number) => {
  user.value = row;
  splitPageRef.value.showSplitter(true);
};

const handleClose = (event: Event) => {
  splitPageRef.value.hideSplitter();
};

const handleSubmit = (event: Event) => {
  userListPageRef.value.searchUserList(searchKeyword.value);
};

const handleReadonly = (isReadonly: boolean) => {
  userReadonly.value = isReadonly;
};
</script>
