<template>
  <q-form
    @submit="onSubmit"
    ref="templateVarForm"
    class="q-gutter-sm"
  >
    <div>
      <qe-input
        v-model="templateInfo.templateTitle"
        label="Template Name"
        :required="true"
      />
      <qe-select
        v-model="templateInfo.templateType"
        label="Template Type"
        :required="true"
        :options="templateTypeList"
      />
    </div>
    <div v-for="variable in variableList.filter(v => !v.delYn)" :key="variable.id">
      <q-card class="my-card bg-blue-3 text-black" :class="variable.id === -1 ? 'bg-blue-3' : 'bg-yellow-2'">
        <q-card-section v-if="variable.id === -1">
          <qe-input
            v-model="variable.title"
            label="Title"
            :required="true"
          />
          <qe-input
            v-model="variable.description"
            label="Description"
          />
          <qe-select
            v-model="variable.target"
            label="Target"
            :required="true"
            :options="targetList"
          />
          <qe-input
            v-model="variable.variableId"
            label="ID"
            :required="true"
          />
          <qe-select
            v-model="variable.dataType"
            label="Data Type"
            :required="true"
            :options="dataTypeList"
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
            v-if="variable.dataType === 'convert-text'"
          />
          <div v-if="variable.dataType === 'convert-text'" class="q-pa-md hint-text">
            <div class="row">
              <div class="col-2">
                normal
              </div>
              <div class="col-10">
                {{ strUtil.convert.snakeToNormal(strUtil.convert.allToSnake(variable.targetString)) }}
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                snake
              </div>
              <div class="col-10">
                {{ strUtil.convert.allToSnake(variable.targetString) }}
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                camel
              </div>
              <div class="col-10">
                {{ strUtil.convert.snakeToCamel(strUtil.convert.allToSnake(variable.targetString)) }}
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                pascal
              </div>
              <div class="col-10">
                {{ strUtil.convert.snakeToPascal(strUtil.convert.allToSnake(variable.targetString)) }}
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                kebab
              </div>
              <div class="col-10">
                {{ strUtil.convert.snakeToKebab(strUtil.convert.allToSnake(variable.targetString)) }}
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                SNAKE
              </div>
              <div class="col-10">
                {{ strUtil.convert.snakeToUpper(strUtil.convert.allToSnake(variable.targetString)) }}
              </div>
            </div>
          </div>
          <qe-input
            v-model="variable.selectList"
            label="Select List"
            v-if="variable.dataType === 'select'"
          />
          <div v-if="variable.dataType === 'select'" class="q-pa-md hint-text">
            <div class="row">
              <div class="col-12">
                {{ strUtil.split(variable.selectList || '') }}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                맨앞에 구분자를 입력한후 SELECT에 출력할 문자열을 구분자로 등록한다.
              </div>
            </div>
          </div>
          <qe-input
            v-model="variable.dateFormat"
            label="Date Format"
            :required="true"
            v-if="variable.dataType === 'date'"
          />
          <div v-if="variable.dataType === 'date'" class="q-pa-md hint-text bg-blue-1">
            <div class="row">
              <div class="col-12">
                {{ dateUtil.dateFormater(variable.dateFormat || '') || 'Empty Data Format'}}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                yyyy.MM.DD HH:MI:SS.fff [a]
              </div>
              <div class="col-6">
                {{ dateUtil.dateFormater('yyyy.MM.DD HH:MI:SS.fff a') }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                yyyy/mm/dd hh:mi:ss.fff [k]
              </div>
              <div class="col-6">
                {{ dateUtil.dateFormater('yyyy.mm.dd hh:mi:ss.fff k') }}
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                EE, SE, KE
              </div>
              <div class="col-6">
                {{ dateUtil.dateFormater('EE, SE, KE') }}
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section v-if="variable.id === -2">
          <div  style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-9 text-subtitle1">{{ variable.title || "Title"}}</div>
            <div class="col-3" :align="'right'"><q-toggle v-model="variable.viewData" dense label="View Data" /></div>
          </div>
          <div v-if="variable.viewData" style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-3 text-subtitle2">Description</div>
            <div class="col-9"> : {{ variable.description }}</div>
          </div>
          <div v-if="variable.viewData" style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-3 text-subtitle2">Target</div>
            <div class="col-9"> : {{ targetList.find((d) => d.value === variable.target)?.label || variable.target }}</div>
          </div>
          <div v-if="variable.viewData" style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-3 text-subtitle2">ID</div>
            <div class="col-9"> : {{ variable.variableId }}</div>
          </div>
          <div v-if="variable.viewData" style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-3 text-subtitle2">Data Type</div>
            <div class="col-9"> : {{ dataTypeList.find((d) => d.value === variable.dataType)?.label || variable.dataType }}</div>
          </div>
          <div v-if="variable.viewData" style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-3 text-subtitle2">Target String</div>
            <div class="col-9"> : {{ variable.targetString }}</div>
          </div>
          <div v-if="variable.viewData && variable.dataType === 'date'" style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-3 text-subtitle2">Date Format</div>
            <div class="col-9"> : {{dateUtil.dateFormater(variable.dateFormat || '') }}</div>
          </div>
          <div v-if="variable.viewData && variable.dataType === 'select'" style="overflow-x: hidden; white-space: nowrap;text-overflow: ellipsis;" class="row">
            <div class="col-3 text-subtitle2">Select List</div>
            <div class="col-9"> : {{ strUtil.split(variable.selectList || '') }}</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions :align="'right'">
          <q-btn v-if="variable.id === -1" class="glossy" color="primary" size="sm" @click="variable.id = -2">DONE</q-btn>
          <q-btn v-if="variable.id === -2" class="glossy" color="primary" size="sm" @click="variable.id = -1">EDIT</q-btn>
          <q-btn class="glossy" color="red" size="sm" @click="variable.delYn = true">DEL</q-btn>
          <q-btn class="glossy" color="green" size="sm" @click="variableList.push({...variable, id:-1})">COPY</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-mt-sm q-gutter-sm" style="text-align: right">
      <q-btn
        type="button"
        class="glossy"
        size="sm"
        color="primary"
        label="Add"
        @click="handleAdd"
      />
      <q-btn
        id="btnMakeTemplate"
        type="submit"
        class="glossy"
        size="sm"
        color="primary"
        label="Source > Template"
      />
      <q-btn
        id="btnSave"
        type="submit"
        class="glossy"
        size="sm"
        color="primary"
        label="Save"
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
import { ISourceVariable, ITemplateInfo } from 'src/biz/template/template.entity';

const emit = defineEmits(['update:make-template', 'update:save-template']);

const templateVarForm = ref();
const templateInfo = ref<ITemplateInfo>({
  id: -1,
  templateTitle: '',
  templateType: '',
})
const variableList = ref<Array<ISourceVariable>>([]);
const templateTypeList = ref([
  {label:'Form', value: 'form'},
  {label:'Batch', value: 'batch'},
]);
const dataTypeList = ref([
  {label:'Convert Text', value: 'convert-text'},
  {label:'Text', value: 'text'},
  {label:'Date', value: 'date'},
  {label:'Select', value: 'select'},
  {label:'Template', value: 'template'},
  {label:'Function', value: 'function'},
]);
const targetList = ref([
  {label:'All(Path + Source)', value: 'all'},
  {label:'Path', value: 'path'},
  {label:'Source', value: 'source'},
]);

const handleAdd = () => {
  variableList.value.push(templateService.getISourceVariable());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = (evt: any) => {

  if ( evt.submitter?.id && evt.submitter.id === 'btnSave' ) {
    emit('update:save-template', templateInfo.value, variableList.value);
  } else {
    emit('update:make-template', variableList.value);
  }
};

</script>
<style lang="sass">
.hint-text
  .row > div
    padding: 3px 10px
    background: rgba(#ccc,.15)
    border: 1px solid rgba(#999,.2)
  .row + .row
    margin-top: -1px
</style>
