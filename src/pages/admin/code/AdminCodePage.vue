<template>
  <splitter-page ref="splitPageRef" title="Code" :horizontal="true">
    <template v-slot:before>
      <qe-splitter ref="splitCodeGroupPageRef">
        <template v-slot:before>
          <div class="q-pa-sm">
            <code-group-grid
              ref="listCodeGroupPageRef"
              :search-keyword="searchKeyword"
              @row-dblclick="handleCodeGroupRowDblClick"
            />
          </div>
          <div class="q-pa-sm q-gutter-sm" style="text-align: right">
            <q-btn
              class="glossy"
              color="primary"
              label="NEW"
              size="sm"
              @click="handleNewCodeGroupAdd"
            />
          </div>
        </template>
        <template v-slot:after>
          <q-card class="q-pa-sm" flat>
            <q-tabs
              v-model="tabCodeGroup"
              dense
              class="bg-primary text-white"
              active-color="yellow-6"
              indicator-color="yellow-6"
              :align="`left`"
            >
              <q-tab name="codeGroup" label="Code Group" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tabCodeGroup" animated>
              <q-tab-panel
                name="codeGroup"
                :class="[readonlyCodeGroup ? 'bg-yellow-1' : 'bg-blue-1']"
              >
                <code-group-form
                  :code-group="codeGroup"
                  :readonly="readonlyCodeGroup"
                  @close="handleCloseCodeGroup"
                  @submit="handleSubmitCodeGroup"
                  @update:readonly="handleReadonlyCodeGroup"
                />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </template>
      </qe-splitter>
    </template>

    <template v-slot:after>
      <qe-splitter ref="splitCodePageRef">
        <template v-slot:before>
          <div class="q-pa-sm">
            <code-grid
              ref="listCodePageRef"
              :search-keyword="searchKeyword"
              @row-dblclick="handleCodeRowDblClick"
            />
          </div>
          <div class="q-pa-sm q-gutter-sm" style="text-align: right">
            <q-btn
              class="glossy"
              color="primary"
              label="NEW"
              size="sm"
              @click="handleNewCodeAdd"
            />
          </div>
        </template>
        <template v-slot:after>
          <q-card class="q-pa-sm" flat>
            <q-tabs
              v-model="tabCode"
              dense
              class="bg-primary text-white"
              active-color="yellow-6"
              indicator-color="yellow-6"
              :align="`left`"
            >
              <q-tab name="code" label="Code" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tabCode" animated>
              <q-tab-panel
                name="code"
                :class="[readonlyCode ? 'bg-yellow-1' : 'bg-blue-1']"
              >
                <code-form
                  :code="code"
                  :readonly="readonlyCode"
                  @close="handleCloseCode"
                  @submit="handleSubmitCode"
                  @update:readonly="handleReadonlyCode"
                />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </template>
      </qe-splitter>
    </template>
  </splitter-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ICodeGroup, ICode, codeService } from 'src/biz';
import { QeSplitter } from 'src/components';
import SplitterPage from 'src/components/page/SplitterPage.vue';
import CodeGroupForm from './form/CodeGroupForm.vue';
import CodeForm from './form/CodeForm.vue';
import CodeGroupGrid from './grid/CodeGroupGrid.vue';
import CodeGrid from './grid/CodeGrid.vue';

const codeGroup = ref<ICodeGroup | undefined>(undefined);
const code = ref<ICode | undefined>(undefined);
const tabCodeGroup = ref('codeGroup');
const tabCode = ref('code');
const searchKeyword = ref<string | undefined>(undefined);
const readonlyCodeGroup = ref<boolean>(true);
const readonlyCode = ref<boolean>(true);
const listCodeGroupPageRef = ref();
const listCodePageRef = ref();
const splitPageRef = ref();
const splitCodeGroupPageRef = ref();
const splitCodePageRef = ref();

const handleNewCodeGroupAdd = () => {
  codeGroup.value = codeService.getICodeGroupInitValue();
  codeGroup.value.memoryYn = 'N';
  codeGroup.value.useYn = 'Y';
  splitCodeGroupPageRef.value.showSplitter();
};

const handleNewCodeAdd = () => {
  code.value = codeService.getICodeInitValue();
  code.value.useYn = 'Y';
  splitCodePageRef.value.showSplitter();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCodeGroupRowDblClick = (event: Event, row: any) => {
  codeGroup.value = row as ICodeGroup;
  splitCodeGroupPageRef.value.showSplitter();
  listCodePageRef.value.searchList(codeGroup.value.codeGroup);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCodeRowDblClick = (event: Event, row: any) => {
  code.value = row as ICode;
  splitCodePageRef.value.showSplitter();
};

const handleSubmitCodeGroup = () => {
  listCodeGroupPageRef.value.searchList();
};

const handleSubmitCode = () => {
  listCodePageRef.value.searchList(codeGroup.value?.codeGroup);
};

const handleCloseCodeGroup = () => {
  splitCodeGroupPageRef.value.hideSplitter();
};

const handleCloseCode = () => {
  splitCodePageRef.value.hideSplitter();
};

const handleReadonlyCodeGroup = (isReadonly: boolean) => {
  console.log('handleReadonlyCodeGroup', isReadonly);
  readonlyCodeGroup.value = isReadonly;
};

const handleReadonlyCode = (isReadonly: boolean) => {
  readonlyCode.value = isReadonly;
};

onMounted(() => {
  listCodeGroupPageRef.value.searchList();
  splitPageRef.value.showSplitter();
});
</script>
