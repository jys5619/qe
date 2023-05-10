<template>
  <q-page class="q-pa-md column">
    <div class="column q-pa-sm" style="flex: 0">
      <div class="text-h5" style="border-bottom: 1px solid burlywood">User</div>
    </div>
    <div class="flex" style="flex: 1">
      <q-splitter
        v-model="splitterModel"
        style="flex: 1"
        :limits="limits"
        separator-class="bg-gray-8"
        :separator-style="separatorStyle"
      >
        <template v-slot:before>
          <div class="q-pa-sm">
            <QeSearchInput
              label="Search : [User ID, Name, English Name, Auth]"
              @search="handleSearch"
            />
          </div>
          <div class="q-pa-sm">
            <UserListPage
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
          [{{ userReadonly }}]
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
              <q-tab name="user" label="User" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated class="bg-yellow-1">
              <q-tab-panel name="user">
                <user-page
                  :user="user"
                  :readonlyValue="userReadonly"
                  @close="handleClose"
                />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import QeSearchInput from 'src/components/input/QeSearchInput.vue';
import { UserPage, UserListPage } from '../forms/user';
import { IUser } from 'src/entity/entity';

const user = ref<IUser | undefined>(undefined);
const splitterModel = ref(100);
const tab = ref('user');
const limits = ref([100, 100]);
const searchKeyword = ref<string | undefined>(undefined);
const separatorStyle = ref<string>('width: 0');
const userReadonly = ref<boolean>(false);

const handleSearch = (text: string) => {
  searchKeyword.value = text;
};

const handleNewUserAdd = () => {
  console.log(3);
};

const handleRowDblClick = (event: Event, row: any, index: number) => {
  limits.value = [30, 70];
  splitterModel.value = 50;
  separatorStyle.value = 'width: 3px';
  user.value = row;
};

const handleClose = (event: Event) => {
  limits.value = [100, 100];
  splitterModel.value = 100;
  separatorStyle.value = 'width: 0';
};
</script>
