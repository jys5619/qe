<template>
  <normal-page title="Create Template">
    <template v-slot:page>
      <qe-splitter
        ref="pageRef"
        :only-show-after="true"
        :limits="[10, 50]"
        :splitterLeft="15"
      >
        <!-- 1 : Left -->
        <template v-slot:before>
            <input
              id="sourceFolder"
              name="sourceFolder"
              type="file"
              webkitdirectory="true"
              directory
              @change="onUploadFiles"
              :style="{ display: 'none' }"
            />
            <label for="sourceFolder">
              <q-chip square class="glossy" color="primary" text-color="white" font-size="5px" size="sm" style="padding: 13.2px" icon="folder">
                ADD FOLDER
              </q-chip>
            </label>
            <q-btn
              v-if="selectPath"
              class="glossy"
              size="sm"
              color="blue-grey-7"
              label="Delete"
              @click="handleDelete"
            />
            <q-tree
              dense
              :nodes="sourceTree"
              default-expand-all
              v-model:selected="selectKey"
              @update:selected="selectTreeNode"
              node-key="path"
              ref="sourceTreeRef"
            />
        </template>

        <!-- 2 : Center -->
        <template v-slot:after>
            <qe-splitter
              ref="pageRef"
              :only-show-after="true"
              :limits="[30, 80]"
              :splitterLeft="50"
            >
              <template v-slot:before>
                <div class="q-pa-sm" style="max-width: 100%; max-height: 400px; overflow-y: auto">
                  <q-list bordered separator dense>
                    <q-item
                      clickable
                      v-ripple
                      v-for="source in sourceList"
                      :key="source.path"
                      style="overflow: hidden"
                    >
                      <q-item-section>{{ source.path }} </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="q-pa-sm" style="max-width: 100%;">
                  <qe-code-mirror ref="codeRef" placeholder="source" />
                </div>
              </template>

              <!-- 3 : rieght -->
              <template v-slot:after>
                <qe-input label="ID" />
                <qe-input label="Target String" />
                <qe-input label="Result String" />
              </template>
            </qe-splitter>
        </template>
      </qe-splitter>

    </template>
  </normal-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { QTreeNode, useQuasar } from 'quasar';
import { ITemplate, templateService } from 'src/biz/template';
import { NormalPage } from '../forms/page';
import { QeCodeMirror, QeInput, QeSplitter } from 'src/components';

const pageRef = ref();
const sourceTreeRef = ref();
const codeRef = ref();
const selectKey = ref('');
const selectPath = ref('');
const selecteNode = ref<ITemplate | undefined>(undefined);
const sourceList = reactive([] as ITemplate[]);
const sourceTree = reactive([] as QTreeNode[]);

const $q = useQuasar();

// (() => {
//   if (sourceTree.length === 0) {
//     sourceTree.push(
//       templateService.getFolderNode('소스폴더', {
//         icon: 'house',
//         iconColor: 'blue',
//       })
//     );
//   }
// })();

onMounted(() => {
  sourceTree.push(
    templateService.getFolderNode('소스폴더', {
      icon: 'house',
      iconColor: 'blue',
      path: '',
    })
  );
});

const onUploadFiles = (event: any): void => {
  // File Load
  const files = [
    ...(event?.target?.files ? event.target.files : []),
  ] as ReadonlyArray<File>;

  if (!files || files.length === 0) return;

  const file = files[0];
  const openFolderName = file.webkitRelativePath.substring(
    0,
    file.webkitRelativePath.indexOf('/')
  );
  const sleashPath = file.path.replace(/\\/g, '/');
  const openPath = sleashPath.substring(
    0,
    sleashPath.indexOf(file.webkitRelativePath) - 1
  );

  // 기존에 열었던 폴더인 경우
  if (
    sourceList.some((t: ITemplate) =>
      `${t.path}`.startsWith(`${openPath}/${openFolderName}`)
    )
  ) {
    $q.dialog({
      title: 'Alert',
      message: `이미 등록된 폴더가 있습니다. 재등록을 원하시면 삭제 후 입력 하십시오.(${openPath}/${openFolderName})`,
    })
      .onOk(() => {
        // console.log('OK')
      })
      .onCancel(() => {
        // console.log('Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      });
    event.target.value = '';
    return;
  }

  // Template 만들기
  const newSourceList = templateService.getSourceList(
    files,
    openFolderName,
    openPath
  );
  sourceList.push(...newSourceList);

  // contents 채우기
  files.forEach((file) => {
    const source = newSourceList.find((s) => s.fileName === file.name);
    if (!source) return;
    templateService.setFileContents(file, source);
  });

  // Tree Data 만들기
  const newSourceTree = templateService.getTreeData(newSourceList);

  const rootNode = sourceTree[0].children || [];
  if (!rootNode.some((node: QTreeNode) => node.label === openPath)) {
    const pathNode = templateService.getFolderNode(openPath, {
      path: openPath,
      icon: 'start',
      iconColor: 'blue',
    });
    pathNode?.children?.push(newSourceTree);
    rootNode.push(pathNode);
  } else {
    const pathNode = rootNode.find(
      (node: QTreeNode) => node.label === openPath
    );
    pathNode?.children?.push(newSourceTree);
  }

  sourceTreeRef.value.expandAll();

  event.target.value = '';
};

const selectTreeNode = (target: any) => {
  if (target) {
    selectPath.value = target;
    selecteNode.value = sourceList.find((t: ITemplate) => t.path === target);
    codeRef.value.setSource(
      selecteNode.value?.contents,
      selecteNode.value?.extension
    );
  }

  if ( target === '' ) {
    selectPath.value = '';
    selecteNode.value = undefined;
  }

  console.log('selecteNode ', selecteNode.value, target);
};

const handleDelete = () => {

  if ( selectPath.value ) {
    const filterSourceList = sourceList.filter((t: ITemplate) => !t.path.startsWith(selectPath.value));
    sourceList.length = 0;
    sourceList.push(...filterSourceList);
    templateService.deleteTreeNode(selectPath.value, sourceTree[0]);
  }
}
</script>
