<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    ref="templateVarForm"
    class="q-gutter-sm"
  >
    <qe-select
      v-model="variable.dataType"
      label="Data Type"
      :required="true"
      :options="dataTypeList"
    />
    <qe-select
      v-model="variable.target"
      label="Data Type"
      :required="true"
      :options="targetList"
    />
    <qe-input
      v-model="variable.variableId"
      label="ID"
      :required="true"
    />
    <qe-input
      v-model="variable.targetString"
      label="Target String"
      :required="true"
    />
    <qe-input
      v-model="variable.title"
      label="Title"
      :required="true"
    />
    <qe-input
      v-model="variable.description"
      label="Description"
    />
    <qe-input
      v-model="variable.selectList"
      label="Select List"
    />
    <qe-input
      v-model="variable.changeString"
      label="Change String"
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
import {QeInput, QeSelect} from 'src/components'
import { templateService } from 'src/biz';

const templateVarForm = ref();
const variable = ref(templateService.getISourceVariable());
const dataTypeList = ref([
  {label:'convert-text', value: 'convert-text'},
  {label:'text', value: 'text'},
  {label:'date', value: 'date'}
]);
const targetList = ref([
  {label:'path', value: 'path'},
  {label:'source', value: 'source'},
  {label:'all', value: 'all'}
]);

const onSubmit = () => {
  console.log(templateVarForm.value);
};

const onReset = () => {
  console.log(templateVarForm.value);
};

</script>
