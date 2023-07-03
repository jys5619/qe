<template>
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
    <q-chip
      square
      class="glossy"
      color="primary"
      text-color="white"
      font-size="5px"
      size="sm"
      style="padding: 13.2px"
      icon="folder"
    >
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { QTreeNode, useQuasar } from 'quasar';
import { ITemplate, templateService } from 'src/biz';

interface ITemplateTreePorps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sourceList: ITemplate[];
  sourceTree: QTreeNode[];
}

const props = defineProps<ITemplateTreePorps>();
const sourceTreeRef = ref();
const selectKey = ref('');
const selectPath = ref('');
const selecteNode = ref<ITemplate | undefined>(undefined);
const $q = useQuasar();

const emit = defineEmits(['update:changeCurrentNode']);

onMounted(() => {
  // eslint-disable-next-line vue/no-mutating-props
  props.sourceTree.push(
    templateService.getFolderNode('소스폴더', {
      icon: 'house',
      iconColor: 'blue',
      path: '',
    })
  );
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    props.sourceList.some((t: ITemplate) =>
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
  // eslint-disable-next-line vue/no-mutating-props
  props.sourceList.push(...newSourceList);

  // contents 채우기
  files.forEach((file) => {
    const source = newSourceList.find((s) => s.fileName === file.name);
    if (!source) return;
    templateService.setFileContents(file, source);
  });

  // Tree Data 만들기
  const newSourceTree = templateService.getTreeData(newSourceList);

  const rootNode = props.sourceTree[0].children || [];
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectTreeNode = (target: any) => {
  if (target) {
    selectPath.value = target;
    selecteNode.value = props.sourceList.find(
      (t: ITemplate) => t.path === target
    );
  } else if (target === '') {
    selectPath.value = '';
    selecteNode.value = undefined;
  }

  emit('update:changeCurrentNode', selecteNode.value);
};

const handleDelete = () => {
  if (selectPath.value) {
    const filterSourceList = props.sourceList.filter(
      (t: ITemplate) => !t.path.startsWith(selectPath.value)
    );
    // eslint-disable-next-line vue/no-mutating-props
    props.sourceList.length = 0;
    // eslint-disable-next-line vue/no-mutating-props
    props.sourceList.push(...filterSourceList);
    templateService.deleteTreeNode(selectPath.value, props.sourceTree[0]);
  }
};
</script>
