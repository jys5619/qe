<template>
  <router-view />

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your address</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="address"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add address" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStoreMenu, useStoreUser } from './stores';
import { authService } from './biz/auth/auth.service';
import { ILoginData } from 'app/src-electron/entity/qe.entity';
import { IMenu, menuEndpoint } from './biz/menu';

const prompt = ref(false);
const address = ref('');
const storeUser = useStoreUser();
const storeMenu = useStoreMenu();

const initApp = () => {
  menuEndpoint.getMyMenuList(storeUser.user.userId).then((value:IMenu[]) => {
    storeMenu.set(value);
  });
};


if (!storeUser.isLogin) {
  const loginData = {userId: 'user01', pwd: '1111'} as ILoginData;
  authService.login(loginData).then((value:boolean) => {
    if ( value ) {
      initApp();
    }
  });
}
</script>
