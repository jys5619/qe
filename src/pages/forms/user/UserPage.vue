<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    ref="qeUserForm"
    class="q-gutter-sm"
  >
    <qe-input
      v-model="editUser.userId"
      label="User ID"
      :required="true"
      :readonly="readonly || editUser.id !== -1"
      :disable="!readonly && editUser.id !== -1"
    />

    <!-- <qe-input
      v-model="editUser.pwd"
      type="password"
      label="Password"
      :required="true"
      :readonly="readonly"
    /> -->

    <qe-input
      v-model="editUser.names"
      label="Name"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="editUser.enames"
      label="English Name"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="editUser.email"
      type="email"
      label="Email"
      :required="true"
      :readonly="readonly"
    />
    <qe-multi-select
      v-model="editUser.auth"
      label="Auth"
      :required="true"
      :readonly="readonly"
      :options="userAuth"
    />
    <qe-input v-model="editUser.emno" label="EMNO" :readonly="readonly" />

    <q-toggle
      :label="`Use`"
      false-value="N"
      true-value="Y"
      dense
      :disable="readonly"
      v-model="editUser.useYn"
    />
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
        @click="handleEdit"
      />
      <q-btn
        v-if="readonly || editUser.id === -1"
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

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">저장하시겠습니까?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Ok"
          color="primary"
          v-close-popup
          @click="onSubmitCallback"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { QeInput, QeMultiSelect } from 'src/components';
import { IUser } from 'src/biz/user/user.entity';
import { userEndpoint, userService } from 'src/biz/user';

interface IUserEditProps {
  user?: Partial<IUser> | number;
  readonly: boolean;
}

const authList = [
  {
    label: 'USER',
    value: 'USER',
  },
  {
    label: 'ADMIN',
    value: 'ADMIN',
  },
];
const userAuth = ref(authList);
const props = defineProps<IUserEditProps>();
const loading = ref<boolean>(false);
const originalUser = ref<Partial<IUser>>({});
const editUser = ref<Partial<IUser>>({});
const qeUserForm = ref();
const confirm = ref(false);
const emit = defineEmits([
  'close',
  'edit',
  'submit',
  'update:user',
  'update:readonly',
]);

const onSubmit = async (event: Event) => {
  confirm.value = true;
};

const onSubmitCallback = async (event: Event) => {
  loading.value = true;
  if (!userService.validate(editUser.value).isSuccess()) return;
  await userEndpoint.saveUser(editUser.value);

  emit('update:readonly', true);
  emit('submit', event);
  loading.value = false;
};

const onReset = () => {
  emit('update:readonly', true);
  resetForm();
};

const onNew = () => {
  emit('update:readonly', false);
  resetForm();
  if (qeUserForm.value) {
    qeUserForm.value.reset();
  }
};

const handleEdit = (event: Event) => {
  emit('update:readonly', false);
  emit('edit', event);
};

const handleClose = (event: Event) => {
  emit('close', event);
};

const resetForm = () => {
  editUser.value = { ...originalUser.value };
};

watch(
  () => props.user,
  (newUser, oldUser) => {
    if (newUser !== oldUser) {
      if (typeof newUser === 'number' && newUser > -1) {
        // TODO : 사번으로 user정보를 조회한다.
        originalUser.value = {} as IUser;
        onReset();
      } else if (userService.isIUser(newUser)) {
        originalUser.value = { ...(props.user as IUser) };
        if ( originalUser.value.id === -1 ) {
          onNew();
        } else {
          onReset();
        }
      }
    }
  }
);
</script>
