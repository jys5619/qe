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
      @update:model-value="handleTargetStringChange"
    />
    <qe-select
      v-model="variable.target"
      label="Target"
      :required="true"
      :options="targetList"
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
      v-model="variable.variableId"
      label="ID"
      :required="true"
    />
    <qe-input
      v-model="variable.targetString"
      label="Target String"
      :required="true"
      v-if="variable.dataType !== 'convert-text'"
    />
    <qe-input
      v-model="variable.targetString"
      label="Target String"
      :required="true"
      @update:model-value="handleTargetStringChange"
      v-if="variable.dataType === 'convert-text'"
    />
      <div v-if="variable.dataType === 'convert-text'" class="q-pa-md convert-text">
        <div class="row">
          <div class="col-2">
            normal
          </div>
          <div class="col-10">
            {{ variable.convertText?.normal }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            snake
          </div>
          <div class="col-10">
            {{ variable.convertText?.snake }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            camel
          </div>
          <div class="col-10">
            {{ variable.convertText?.camel }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            pascal
          </div>
          <div class="col-10">
            {{ variable.convertText?.pascal }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            kebab
          </div>
          <div class="col-10">
            {{ variable.convertText?.kebab }}
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            SNAKE
          </div>
          <div class="col-10">
            {{ variable.convertText?.SNAKE }}
          </div>
        </div>
      </div>
    <qe-input
      v-model="variable.selectList"
      label="Select List"
      v-if="variable.dataType === 'select'"
    />
    <qe-input
      v-model="variable.dateFormat"
      label="Date Format"
      :required="true"
      v-if="variable.dataType === 'date'"
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
import { strUtil } from 'src/biz/utils/str.util';
import { dateUtil } from 'src/biz/utils/date.util';

const templateVarForm = ref();
const variable = ref(templateService.getISourceVariable());
const dataTypeList = ref([
  {label:'convert-text', value: 'convert-text'},
  {label:'text', value: 'text'},
  {label:'date', value: 'date'},
  {label:'select', value: 'select'},
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

const handleTargetStringChange = () => {
  if (variable.value.dataType === 'convert-text') {
    const snakeNames = strUtil.convert.allToSnake(variable.value.targetString);

    variable.value.convertText = {
      normal: strUtil.convert.snakeToNormal(snakeNames),
      snake: snakeNames,
      camel: strUtil.convert.snakeToCamel(snakeNames),
      pascal: strUtil.convert.snakeToPascal(snakeNames),
      kebab: strUtil.convert.snakeToKebab(snakeNames),
      SNAKE: strUtil.convert.snakeToUpper(snakeNames),
    };
  }

  console.log(dateUtil.dateFormater('yyyy.MM.DD yyyy.mm.dd'));
  console.log(dateUtil.dateFormater('HH:MI:SS.fff hh:mi:ss.fff'));
  console.log(dateUtil.dateFormater('EE SE KE'));
}

</script>
<style lang="sass">
.convert-text
  .row > div
    padding: 3px 10px
    background: rgba(#ccc,.15)
    border: 1px solid rgba(#999,.2)
  .row + .row
    margin-top: -1px
</style>
