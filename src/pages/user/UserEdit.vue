<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
    <q-input
      v-model="user.userId"
      label="ID *"
      color="blue-12"
      dense
      :rules="[
        (val) => (val && val.length > 0) || 'Please input id',
      ]"
    />

    <q-input
      type="password"
      v-model="user.pwd"
      label="Password *"
      color="blue-12"
      dense
      :rules="[
        (val) => (val && val.length > 0) || 'Please input password',
      ]"
    />

    <q-input
      v-model="user.name"
      label="Name *"
      color="blue-12"
      dense
      :rules="[
        (val) => (val && val.length > 0) || 'Please type Name',
      ]"
    />

    <q-input
      v-model="user.ename"
      label="English Name *"
      color="blue-12"
      dense
      :rules="[
        (val) => (val && val.length > 0) || 'Please type English Name',
      ]"
    />

    <q-input
      type="email"
      v-model="user.email"
      label="Email *"
      color="blue-12"
      dense
      :rules="[
        (val) => (val && val.length > 0) || 'Please type email',
      ]"
    />

    <q-input
      v-model="user.auth"
      label="Auth *"
      color="blue-12"
      dense
      :rules="[
        (val) => (val && val.length > 0) || 'Please select auth',
      ]"
    />

    <q-input
      v-model="user.emno"
      label="EMNO *"
      color="blue-12"
      dense
    />
  </q-form>

  <div class="q-gutter-sm" style="text-align: right">
    <q-btn
      type="submit"
      class="glossy"
      size="md"
      color="primary"
      label="Submit"
      @click="onSubmit"
    />
    <q-btn
      type="reset"
      class="glossy"
      size="md"
      color="blue-grey-7"
      label="Reset"
    />
  </div>

  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script setup lang="ts">
import { IUser } from 'src/stores/user.interface';
import { ref } from 'vue';

interface IUserEditProps {
  user: Partial<IUser> | null | undefined;
}

const props = defineProps<IUserEditProps>();

const loading = ref<boolean>(false);
const propUser = props.user || {};
const user = ref<Partial<IUser>>({ ...propUser });

const onSubmit = () => {
  console.log(3);
};

const onReset = () => {
  console.log(3);
};
</script>
