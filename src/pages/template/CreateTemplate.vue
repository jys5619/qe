<template>
  <q-page class="q-pa-md" style="display: flex">
    <div class="q-pa-md example-row-equal-width">
    <div class="row">
      <input id="sourceFolder" name="sourceFolder" type="file" webkitdirectory="true" directory @change="onUploadFiles" :style="{display: 'none'}" />
      <label for="sourceFolder">
        <q-chip square color="primary" text-color="white" icon="folder">
          Template을 만들 Source 폴더 선택
        </q-chip>
      </label>
      <div class="q-pa-md q-gutter-sm">
      <div>
        <div class="q-gutter-sm">
          <q-btn size="sm" color="primary" @click="selectGoodService" label="Select 'Good service'" />
          <q-btn v-if="selected" size="sm" color="red" @click="unselectNode" label="Unselect node" />
        </div>
      </div>
      <q-tree
        :nodes="sourceTree"
        default-expand-all
        v-model:selected="selected"
        node-key="label"
        ref="sourceTreeRef"
      />
    </div>
    </div>
    <div class="row">
    <!-- <div  v-for="f in sourceList
    " :key="f.relativePath">
      <div :style="{background: 'green', display:'block', margin: '10px'}">
        <div>name : {{ f.name }}</div>
        <div>extension : {{ f.extension }}</div>
        <div>relativePath : {{ f.relativePath }}</div>
        <div>{{ f.source }}</div>
      </div>
    </div> flat infinite swipeable -->
    <q-card class="q-pa-sm" flat>
        <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="yellow-6"
          indicator-color="yellow-6"
          :align="`left`"
        >
          <q-tab v-for="f in sourceList
        " :key="f.relativePath" :name="f.relativePath" :label="f.relativePath" :style="{textTransform: 'initial'}"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-for="f in sourceList"
            :key="f.relativePath"
            :name="f.relativePath"
            :class="['bg-blue-1']"
          >
          <div>name : {{ f.fileName }}</div>
          <div>extension : {{ f.extension }}</div>
          <div>relativePath : {{ f.relativePath }}</div>




          <q-editor
            v-model="f.contents"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[]"

          >

    </q-editor>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { QTreeNode } from 'quasar';
import { ITemplate, templateService } from 'src/biz/template';
import { reactive, ref } from 'vue';
const sourceTreeRef = ref();
const tab = ref('filelist');
const selected = ref('');
const sourceList = reactive([] as ITemplate[]);
const sourceTree = reactive([] as QTreeNode[]);

const onUploadFiles = (event: any): void => {
  // File Load
  const files = [...(event?.target?.files ? event.target.files : [])] as ReadonlyArray<File>;

  // Template 만들기
  sourceList.length = 0;
  sourceList.push(...templateService.getSourceList(files));

  // Tree Data 만들기
  sourceTree.length = 0;
  sourceTree.push(templateService.getTreeData(sourceList));


  console.log(sourceTree);

  // contents 채우기
  files.forEach((file) => {
    const source = sourceList.find((s) => s.fileName === file.name);
    if ( !source ) return;
    templateService.setFileContents(file, source);
  });

  sourceTreeRef.value.expandAll();
};

const selectGoodService = () => {
  if (selected.value !== 'Good service') {
    selected.value = 'Good service';
  }
};

const unselectNode = () => {
  selected.value = '';
};

</script>

<!--
lastModified: 1685633548119
lastModifiedDate: Fri Jun 02 2023 00:32:28 GMT+0900 (한국 표준시) {}
name: "code.endpoint.ts"
path: "D:\\dev\\workspace\\qe\\src\\biz\\code\\code.endpoint.ts"
size: 1840
type: "video/vnd.dlna.mpeg-tts"
webkitRelativePath: "code/code.endpoint.ts"
-->
