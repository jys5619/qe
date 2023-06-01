<template>
  <splitter-page ref="splitPageRef" title="Code">
    <template v-slot:before>
      <splitter-page ref="splitListPageRef">
        <template v-slot:before>
          <div class="q-pa-sm">
            <CodeGroupListPage
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
          <div class="q-pa-sm">
            <CodeListPage
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
      </splitter-page>
    </template>

    <template v-slot:after>
      <q-card class="q-pa-sm" flat>
        <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="yellow-6"
          indicator-color="yellow-6"
          :align="`left`"
        >
          <q-tab name="codeGroup" label="Code Group" />
          <q-tab name="code" label="Code" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="codeGroup"
            :class="[readonly ? 'bg-yellow-1' : 'bg-blue-1']"
          >
            <code-group-page
              :menu="codeGroup"
              :readonly="readonly"
              @close="handleClose"
              @submit="handleSubmitCodeGroup"
              @update:readonly="handleReadonly"
            />
          </q-tab-panel>
          <q-tab-panel
            name="code"
            :class="[readonly ? 'bg-yellow-1' : 'bg-blue-1']"
          >
            <code-page
              :menu="code"
              :readonly="readonly"
              @close="handleClose"
              @submit="handleSubmitCode"
              @update:readonly="handleReadonly"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </template>
  </splitter-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CodeGroupListPage, CodeGroupPage, CodeListPage, CodePage } from '../forms/code';
import { ICodeGroup, ICode, codeEndpoint, codeService } from 'src/biz/code';
import { SplitterPage } from '../forms/page';

const codeGroup = ref<ICodeGroup | undefined>(undefined);
const code = ref<ICode | undefined>(undefined);
const tab = ref('codeGroup');
const searchKeyword = ref<string | undefined>(undefined);
const readonly = ref<boolean>(true);
const listCodeGroupPageRef = ref();
const listCodePageRef = ref();
const splitPageRef = ref();
// const splitListPageRef = ref();

const handleNewCodeGroupAdd = () => {
  codeGroup.value = codeService.getICodeGroupInitValue();
  codeGroup.value.useYn = 'Y';
  tab.value = 'codeGroup';
  splitPageRef.value.showSplitter();
};

const handleNewCodeAdd = () => {
  code.value = codeService.getICodeInitValue();
  code.value.useYn = 'Y';
  tab.value = 'code';
  splitPageRef.value.showSplitter();
};

const handleCodeGroupRowDblClick = (event: Event, row: any, index: number) => {
  codeGroup.value = row as ICodeGroup;
  splitPageRef.value.showSplitter();
  listCodePageRef.value.searchList(codeGroup.value.codeGroup);
};

const handleCodeRowDblClick = (event: Event, row: any, index: number) => {
  code.value = row as ICode;
  splitPageRef.value.showSplitter();
};

const handleClose = (event: Event) => {
  splitPageRef.value.hideSplitter();
};

const handleSubmitCodeGroup = (event: Event) => {
  listCodeGroupPageRef.value.searchList();
};

const handleSubmitCode = (event: Event) => {
  listCodePageRef.value.searchList(codeGroup.value?.codeGroup);
};

const handleReadonly = (isReadonly: boolean) => {
  readonly.value = isReadonly;
};

onMounted(() => {
  listCodeGroupPageRef.value.searchList();
});
</script>
