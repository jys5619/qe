<template>
  <q-page class="q-pa-md" style="display: flex">
    <div class="row">
      <div class="row">
        <div class="q-gutter-sm">
          <input id="sourceFolder" name="sourceFolder" type="file" webkitdirectory="true" directory @change="onUploadFiles" :style="{display: 'none'}" />
          <label for="sourceFolder">
            <q-chip square color="primary" text-color="white" icon="folder">
              Template을 만들 Folder Select...
            </q-chip>
          </label>
          <q-tree
            :nodes="sourceTree"
            default-expand-all
            v-model:selected="selected"
            node-key="path"
            ref="sourceTreeRef"
          />
        </div>

      </div>
    </div>
    <div class="row">
      {{ selected}}
          <!-- <div>name : {{ selected.fileName }}</div>
          <div>extension : {{ selected?.extension }}</div>
          <div>relativePath : {{ selected?.relativePath }}</div>

          <q-editor
            v-model="selected.contents"
            toolbar-text-color="white"
            toolbar-toggle-color="yellow-8"
            toolbar-bg="primary"
            :toolbar="[]"
          ></q-editor> -->


    </div>
    <!-- </div> -->
  </q-page>
</template>

<script setup lang="ts">
import { QTreeNode, useQuasar } from 'quasar';
import { ITemplate, templateService } from 'src/biz/template';
import { reactive, ref } from 'vue';
const sourceTreeRef = ref();
const tab = ref('filelist');
const selected = ref('');
const sourceList = reactive([] as ITemplate[]);
const sourceTree = reactive([] as QTreeNode[]);

const $q = useQuasar();

(() => {
  if ( sourceTree.length === 0 ) {
    sourceTree.push(templateService.getFolderNode('소스폴더'));
  }
})();

const onUploadFiles = (event: any): void => {
  // File Load
  const files = [...(event?.target?.files ? event.target.files : [])] as ReadonlyArray<File>;

  if ( !files || files.length === 0 ) return;

  const file = files[0];
  const openFolderName = file.webkitRelativePath.substring(0, file.webkitRelativePath.indexOf('/'))
  const sleashPath = file.path.replace(/\\/g, '/');
  const openPath = sleashPath.substring(0, sleashPath.indexOf(file.webkitRelativePath) - 1);

  // 기존에 열었던 폴더인 경우
  if ( sourceList.some((t: ITemplate) => (`${t.openPath}/${t.openFolderName}/${t.relativePath}`).startsWith(`${openPath}/${openFolderName}`)) ) {
    $q.dialog({
      title: 'Alert',
      message: `이미 등록된 폴더가 있습니다. 재등록을 원하시면 삭제 후 입력 하십시오.(${openPath}/${openFolderName})`
    }).onOk(() => {
      // console.log('OK')
    }).onCancel(() => {
      // console.log('Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
    event.target.value = '';
    return;
  }

  // Template 만들기
  const newSourceList = templateService.getSourceList(files, openFolderName, openPath);
  sourceList.push(...newSourceList);

  // contents 채우기
  files.forEach((file) => {
    const source = newSourceList.find((s) => s.fileName === file.name);
    if ( !source ) return;
    templateService.setFileContents(file, source);
  });

  // Tree Data 만들기
  const newSourceTree = templateService.getTreeData(newSourceList);

  const rootNode = sourceTree[0].children || [];
  if ( !rootNode.some((node: QTreeNode) => node.label === openPath) ) {
    const pathNode = templateService.getFolderNode(openPath, {path: openPath});
    pathNode?.children?.push(newSourceTree);
    rootNode.push(pathNode);
  } else {
    const pathNode = rootNode.find((node: QTreeNode) => node.label === openPath);
    pathNode?.children?.push(newSourceTree);
  }

  sourceTreeRef.value.expandAll();

  event.target.value = '';
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
