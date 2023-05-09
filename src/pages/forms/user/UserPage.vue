<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
    <qe-input v-model="user.userId" label="ID" :required="true" />
    <qe-input
      v-model="user.pwd"
      type="password"
      label="Password"
      :required="true"
    />
    <qe-input v-model="user.name" label="Name" :required="true" />
    <qe-input v-model="user.ename" label="English Name" :required="true" />
    <qe-input
      v-model="user.email"
      type="email"
      label="Email"
      :required="true"
    />
    <qe-input v-model="user.auth" label="Auth" :required="true" />
    <qe-input v-model="user.emno" label="EMNO" />

    <div class="q-mt-sm q-gutter-sm" style="text-align: right">
      <q-btn
        type="submit"
        class="glossy"
        size="sm"
        color="primary"
        label="Submit"
      />
      <q-btn
        type="reset"
        class="glossy"
        size="sm"
        color="blue-grey-7"
        label="Reset"
      />
    </div>
  </q-form>

  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QeInput from 'src/components/input/QeInput.vue';
import { IUser } from 'src/entity/entity';

interface IUserEditProps {
  user?: Partial<IUser> | null;
  userId?: number;
}

const props = defineProps<IUserEditProps>();
const loading = ref<boolean>(false);
const user = ref<Partial<IUser>>({});

let propUser = {} as Partial<IUser>;

if (props.user) {
  user.value = { ...props.user, userId: props.user.userId || '' };
} else if (props.userId) {
  // User 정보 조회
}

const onSubmit = () => {
  console.log(user, user.value, user.value);
};

const onReset = () => {
  console.log('onReset');
  user.value = { ...propUser };
  user.value.id = undefined;
};
</script>
