<template>
  <q-layout view="hhh lpR fFf">
    <q-header elevated class="bg-grey-3 text-black" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> PPDM </q-toolbar-title>
      </q-toolbar>

      <q-tabs :align="`left`">
        <q-tab
          v-for="(menuItem, index) in mainMenuList"
          :key="index"
          :label="menuItem.menuName"
          @click="setLeftMenu(menuItem.menuId)"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="300"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in leftMenuList" :key="index">
            <q-item
              clickable
              :active="menuItem.menuName === 'Outbox'"
              v-ripple
              @click="goPage(menuItem.menuPath)"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.menuName }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separatorYn" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>YS Soft Copr. Ver 1.0</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useStoreMenu } from 'src/stores';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const storeMenu = useStoreMenu();

const mainMenuList = reactive(storeMenu.getMainList());
const leftMenuList = reactive(storeMenu.getMenuList());
const leftDrawerOpen = ref(true);
const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const setLeftMenu = (pmenuId: string) => {
  leftMenuList.length = 0;
  leftMenuList.push(...storeMenu.getMenuList(pmenuId));
  leftDrawerOpen.value = true;
};

const goPage = (path?: string) => {
  console.log('SUB_MENU_CLICK', path || storeMenu.getRootPath());
  router.push(path || storeMenu.getRootPath());
};
</script>
