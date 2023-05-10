<template>
  [{{ props }}] [{{ readonly }}]
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
    <qe-input
      v-model="user.userId"
      label="User ID"
      :required="true"
      :readonly="readonly"
    />

    <qe-input
      v-model="user.pwd"
      type="password"
      label="Password"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="user.names"
      label="Name"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="user.enames"
      label="English Name"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="user.email"
      type="email"
      label="Email"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="user.auth"
      label="Auth"
      :required="true"
      :readonly="readonly"
    />
    <qe-input v-model="user.emno" label="EMNO" :readonly="readonly" />
    <div class="q-mt-sm q-gutter-sm" style="text-align: right">
      <q-btn
        v-if="!readonly"
        type="submit"
        class="glossy"
        size="sm"
        color="primary"
        label="Submit"
      />
      <q-btn
        v-if="!readonly"
        type="reset"
        class="glossy"
        size="sm"
        color="blue-grey-7"
        label="Reset"
      />
      <q-btn
        v-if="readonly"
        class="glossy"
        size="sm"
        color="primary"
        label="Edit"
        @click="readonly = false"
      />
      <q-btn
        v-if="readonly"
        class="glossy"
        size="sm"
        color="blue-grey-7"
        label="Close"
        @click="handleClose"
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
import { ref, watch } from 'vue';
import QeInput from 'src/components/input/QeInput.vue';
import { IUser } from 'src/entity/entity';

interface IUserEditProps {
  user?: Partial<IUser>;
  userId?: number;
  readonlyValue?: string;
}

const props = defineProps<IUserEditProps>();
const loading = ref<boolean>(false);
const user = ref<Partial<IUser>>({ ...props.user });
const readonly = ref<boolean>(props.readonlyValue);

const emit = defineEmits(['close']);

if (props.user) {
  user.value = { ...props.user, userId: props.user.userId || '' };
} else if (props.userId) {
  // User 정보 조회
}

const onSubmit = () => {
  console.log(user, user.value);
};

const onReset = () => {
  resetUser();
  readonly.value = true;
};

const handleClose = (event: Event) => {
  emit('close', event);
};

const resetUser = () => {
  user.value = { ...props.user };
};
watch(props, () => {
  console.log('props', props);
  resetUser();
});
</script>
