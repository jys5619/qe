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
            :class="[readonly ? 'bg-yellow-1' : 'bg-blue-1']"
          >
            <user-page
              :user="user"
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
import { QeSearchInput } from 'src/components';
import { UserPage, UserListPage } from '../forms/user';
import { IUser, userService } from 'src/biz/user';
import { SplitterPage } from '../forms/page';

const user = ref<IUser | undefined>(undefined);
const tab = ref('user');
const searchKeyword = ref<string | undefined>(undefined);
const readonly = ref<boolean>(true);
const splitPageRef = ref();
const listPageRef = ref();


const handleSearch = (text: string) => {
  searchKeyword.value = text;
  listPageRef.value.searchUserList(searchKeyword.value);
};

const handleNewUserAdd = () => {
  user.value = userService.getIUserInitValue();
  user.value.useYn = 'Y';
  splitPageRef.value.showSplitter();
};

const handleRowDblClick = (event: Event, row: any, index: number) => {
  user.value = row;
  splitPageRef.value.showSplitter();
};

const handleClose = (event: Event) => {
  splitPageRef.value.hideSplitter();
};

const handleSubmit = (event: Event) => {
  listPageRef.value.searchUserList(searchKeyword.value);
};

const handleReadonly = (isReadonly: boolean) => {
  readonly.value = isReadonly;
};
</script>
