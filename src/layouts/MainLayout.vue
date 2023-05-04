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
          :label="menuItem.label"
          @click="setLeftMenu(menuItem.leftMenuKey)"
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
              :active="menuItem.label === 'Outbox'"
              v-ripple
              @click="goPage(menuItem?.path || 'home')"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
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
import { ref } from 'vue';
import LeftMenu, { ILeftMenuItem, menuList } from './menu.data';
import { useRouter } from 'vue-router';

const mainMenuList = ref(menuList);
const leftMenuList = ref<ILeftMenuItem[]>(LeftMenu.getMenuList('myDesk'));
const leftDrawerOpen = ref(true);
const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const setLeftMenu = (menu: string) => {
  leftMenuList.value = LeftMenu.getMenuList(menu);
};

const goPage = (path: string) => {
  router.push(path);
};
</script>
