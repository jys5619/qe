<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    ref="qeCodeForm"
    class="q-gutter-sm"
  >
    <qe-input
      v-model="editCode.codeGroup"
      label="Code Group"
      :required="true"
      :readonly="true"
      :disable="!readonly"
    />
    <qe-input
      v-model="editCode.code"
      label="Code Group"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="editCode.codeName"
      label="Code Group Name"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="editCode.description"
      label="Description"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      type="number"
      v-model="editCode.sortNo"
      label="Sort No"
      :required="true"
      :readonly="readonly"
    />
    <q-toggle
      :label="`Use`"
      false-value="N"
      true-value="Y"
      dense
      :disable="readonly"
      v-model="editCode.useYn"
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
        v-if="readonly || editCode.id === -1"
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
import { QeInput } from 'src/components';
import { ICode, codeEndpoint, codeService } from 'src/biz/code';

interface ICodeEditProps {
  code?: Partial<ICode | number>;
  readonly: boolean;
}

const props = defineProps<ICodeEditProps>();
const loading = ref<boolean>(false);
const originalCode = ref<Partial<ICode>>({});
const editCode = ref<Partial<ICode>>({});
const qeCodeForm = ref();
const confirm = ref(false);
const emit = defineEmits([
  'close',
  'edit',
  'submit',
  'update:readonly',
]);

const onSubmit = async (event: Event) => {
  confirm.value = true;
};

const onSubmitCallback = async (event: Event) => {
  loading.value = true;
  if (!codeService.validateCode(editCode.value).isSuccess()) return;
  await codeEndpoint.saveCode(editCode.value);

  emit('update:readonly', true);
  emit('submit', event);
  loading.value = false;
};

const onReset = () => {
  emit('update:readonly', true);
  resetForm();
};

const onNew = () => {
  resetForm();
  if (qeCodeForm.value) {
    qeCodeForm.value.reset();
  }
  emit('update:readonly', false);
};

const handleEdit = (event: Event) => {
  emit('update:readonly', false);
  emit('edit', event);
};

const handleClose = (event: Event) => {
  emit('close', event);
};

const resetForm = () => {
  editCode.value = { ...originalCode.value };
};

watch(
  () => props.code,
  (newCode, oldCode) => {
    if (newCode !== oldCode) {
      if (typeof newCode === 'number' && newCode > -1) {
        // TODO : ID으로 Code정보를 조회한다.
        originalCode.value = {} as ICode;
        onReset();
      } else if (codeService.isICode(newCode)) {
        originalCode.value = { ...(props.code as ICode) };
        if ( originalCode.value.id === -1 ) {
          onNew();
        } else {
          onReset();
        }
      }
    }
  }
);

</script>
