<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    ref="qeCodeGroupForm"
    class="q-gutter-sm"
  >
    <qe-input
      v-model="editCodeGroup.codeGroup"
      label="Code Group"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="editCodeGroup.codeGroupName"
      label="Code Group Name"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-model="editCodeGroup.description"
      label="Description"
      :required="true"
      :readonly="readonly"
    />
    <q-toggle
      :label="`Memory Load`"
      false-value="N"
      true-value="Y"
      dense
      :disable="readonly"
      v-model="editCodeGroup.memoryYn"
    />
    <qe-input
      type="number"
      v-model="editCodeGroup.sortNo"
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
      v-model="editCodeGroup.useYn"
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
        v-if="readonly || editCodeGroup.id === -1"
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
import { ICodeGroup, codeEndpoint, codeService } from 'src/biz/code';

interface ICodeGroupEditProps {
  codeGroup?: Partial<ICodeGroup | number>;
  readonly: boolean;
}

const props = defineProps<ICodeGroupEditProps>();
const loading = ref<boolean>(false);
const originalCodeGroup = ref<Partial<ICodeGroup>>({});
const editCodeGroup = ref<Partial<ICodeGroup>>({});
const qeCodeGroupForm = ref();
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
  if (!codeService.validateCodeGroup(editCodeGroup.value).isSuccess()) return;
  await codeEndpoint.saveCodeGroup(editCodeGroup.value);
  debugger;
  emit('update:readonly', true);
  emit('submit', event);
  loading.value = false;
};

const onReset = () => {
  debugger;
  emit('update:readonly', true);
  resetForm();
};

const onNew = () => {
  resetForm();
  if (qeCodeGroupForm.value) {
    qeCodeGroupForm.value.reset();
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
  editCodeGroup.value = { ...originalCodeGroup.value };
};

watch(
  () => props.codeGroup,
  (newCodeGroup, oldCodeGroup) => {
    if (newCodeGroup !== oldCodeGroup) {
      if (typeof newCodeGroup === 'number' && newCodeGroup > -1) {
        // TODO : ID으로 CodeGroup정보를 조회한다.
        originalCodeGroup.value = {} as ICodeGroup;
        onReset();
      } else if (codeService.isICodeGroup(newCodeGroup)) {
        debugger;
        originalCodeGroup.value = { ...(props.codeGroup as ICodeGroup) };
        if ( originalCodeGroup.value.id === -1 ) {
          onNew();
        } else {
          onReset();
        }
      }
    }
  }
);

</script>
