<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    ref="templateVarForm"
    class="q-gutter-sm"
  >
    <qe-input
      v-model="source"
      label="Source String"
      :required="true"
    />
    <qe-input
      v-model="template"
      label="Template String"
      :required="true"
    />
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

</template>

<script setup lang="ts">
import { ref } from 'vue';
import {QeInput} from '../../../../components'

const source = ref('');
const template = ref('');
const templateVarForm = ref();

const onSubmit = () => {
  console.log(templateVarForm.value);
};

const onReset = () => {
  console.log(templateVarForm.value);
};

</script>
