<template>
  <q-page class="q-pa-md" style="display: flex">
    <div class="q-pa-md example-row-equal-width">
    <div class="row">
      <input id="sourceFolder" name="sourceFolder" type="file" webkitdirectory="true" ref="uploadRef" directory @change="onUploadFiles" :style="{display: 'none'}" />
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
        :nodes="props"
        default-expand-all
        v-model:selected="selected"
        node-key="label"
      />
    </div>
    </div>
    <div class="row">
    <!-- <div  v-for="f in fileList" :key="f.relativePath">
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
          <q-tab v-for="f in fileList" :key="f.relativePath" :name="f.relativePath" :label="f.relativePath" :style="{textTransform: 'initial'}"/>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-for="f in fileList" :key="f.relativePath"
            :name="f.relativePath"
            :class="['bg-blue-1']"
          >
          <div>name : {{ f.name }}</div>
          <div>extension : {{ f.extension }}</div>
          <div>relativePath : {{ f.relativePath }}</div>




          <q-editor
            v-model="f.source"
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
import { ITemplate, templateService } from 'src/biz/template';
import { reactive, ref } from 'vue';
const tab = ref('filelist');
const selected = ref('');
const fileList = reactive([] as ITemplate[]);
const props = ref([{} as any]);


function readFile(file: File, encoding = 'UTF-8'){
  const template = templateService.getITemplateInitValue();

  template.name = file.name;
  template.extension = file.name.substring(file.name.lastIndexOf('.') + 1);
  template.relativePath = file.webkitRelativePath.substring(file.webkitRelativePath.indexOf('/') + 1);

  const fileReader = new FileReader();
  fileReader.onload = () => {
    template.source = fileReader.result as string;
    fileList.push(template);
  }
  fileReader.readAsText(file, encoding);
}

const onUploadFiles = (event: any): void => {
  const files: ReadonlyArray<File> = [...(event?.target?.files ? event.target.files : [])];

  files.forEach((file) => {
    readFile(file);
  });

  // var file_reader = new FileReader();
  // file_reader.onload = (ev: ProgressEvent<FileReader>) => {
  //   console.log(ev);
  //   fileText.value = file_reader.result;
  // };
  // file_reader.readAsText(files[0], 'UTF-8');
};




const selectGoodService = () => {
  if (selected.value !== 'Good service') {
    selected.value = 'Good service';
  }
};

const unselectNode = () => {
  selected.value = '';
};

const makeTreeData = (files: ITemplate[]): any[] => {
  const treeData = [] as any[];


  return treeData;
};

props.value = [
        {
          label: 'Satisfied customers',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              label: 'Good food',
              icon: 'restaurant_menu',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            },
            {
              label: 'Good service',
              icon: 'room_service',
              children: [
                { label: 'Prompt attention', icon: 'star' },
                { label: 'Professional waiter', icon: 'star' }
              ]
            },
            {
              label: 'Pleasant surroundings',
              icon: 'photo',
              children: [
                {
                  label: 'Happy atmosphere'
                },
                {
                  label: 'Good table presentation'
                },
                {
                  label: 'Pleasing decor'
                }
              ]
            }
          ]
        }
      ]
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
