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
          <template-tree
            :sourceList="sourceList"
            :sourceTree="sourceTree"
            @update:change-current-node="changeCurrentNode"
          />
        </template>

        <!-- 2 : Center -->
        <template v-slot:after>
          <qe-splitter
            ref="sourcePageRef"
            :only-show-after="true"
            :limits="[30, 80]"
            :splitterLeft="50"
          >
            <template v-slot:before>
              <q-list bordered separator dense style="height: 400px;margin: 15px;overflow-y: auto;">
                <q-item
                  clickable
                  v-ripple
                  v-for="source in (selectType === 'source' ? sourceList : templateList)"
                  :key="source.path"
                  style="overflow: hidden"
                  @click="handleClickPath(source)"
                >
                  <q-item-section>{{ source.openPath + '/' + source.openFolderName + '/' + source.relativePath }}</q-item-section>
                </q-item>
                <q-item v-if="sourceList.length === 0">
                  <q-item-section>File Not Exists</q-item-section>
                </q-item>
              </q-list>

              <div style="margin: 15px">
                <qe-code-mirror
                  ref="codeMirrorRef"
                  placeholder="source"
                  :height="600"
                  :style="{ marginRight: '15px' }"
                />
              </div>
            </template>

            <!-- 3 : rieght -->
            <template v-slot:after>
              <div style="padding: 10px;">
                <template-var-form
                  @update:make-template="handleMakeTemplate"
                />
              </div>
              <!-- <q-btn
                type="button"
                class="glossy"
                size="sm"
                color="blue-grey-7"
                label="Make Template"
                @click="handleMakeTemplate"
              /> -->
            </template>
          </qe-splitter>
        </template>
      </qe-splitter>
    </template>
  </normal-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { QTreeNode } from 'quasar';
import { ITemplate } from 'src/biz';
import NormalPage from 'src/components/page/NormalPage.vue';
import { QeCodeMirror, QeSplitter } from 'src/components';
import TemplateTree from './tree/TemplateTree.vue';
import TemplateVarForm from './form/TemplateVarForm.vue';
import { templateUtil } from 'src/biz/template/template.util';
import { ConvertTextObject, ISourceVariable } from 'src/biz/template/template.entity';
import { strUtil } from 'src/biz/utils/str.util';

const sourcePageRef = ref();
const codeMirrorRef = ref();
const selectNode = ref<ITemplate | undefined>(undefined);
const sourceList = reactive([] as ITemplate[]);
const sourceTree = reactive([] as QTreeNode[]);
const templateList = reactive([] as ITemplate[]);
const selectType = ref<'source'|'template'>('source');

const changeCurrentNode = (currentNode: ITemplate) => {
  selectNode.value = currentNode;

  if ( selectType.value === 'source' ) {
    codeMirrorRef.value.setSource(
      selectNode.value?.contents,
      selectNode.value?.extension
    );
  } else {
    const template = templateList.find((template: ITemplate) => selectNode.value?.path === template.path);
    if ( template ) {

      codeMirrorRef.value.setSource(
        strUtil.unescapeHtml(template.contents),
        template.extension
      );
    }
  }
};

const handleClickPath = (source: ITemplate) => {
  codeMirrorRef.value.setSource(strUtil.unescapeHtml(source.contents), source.extension);
};

const handleMakeTemplate = (variableList : ISourceVariable[]) => {
  // const variableList : ISourceVariable[] = [];
  // variableList.push({
  //   id: -1,
  //   variableId: 'id01',
  //   title: 'Component',
  //   description: 'Component',
  //   targetString: 'Table',
  //   target: 'path',
  //   dataType: 'convert-text',
  //   convertText: {...ConvertTextObject},
  //   selectList: '',
  //   dateFormat: '',
  //   viewData: false,
  // });
  // variableList.push({
  //   id: -1,
  //   variableId: 'id02',
  //   title: 'Component',
  //   description: 'Component',
  //   targetString: 'Search Input',
  //   target: 'all',
  //   dataType: 'convert-text',
  //   convertText: {...ConvertTextObject},
  //   selectList: '',
  //   dateFormat: '',
  //   viewData: false,
  // });
  // variableList.push({
  //   id: -1,
  //   variableId: 'id03',
  //   title: 'Components',
  //   description: 'Components',
  //   targetString: 'components',
  //   target: 'path',
  //   dataType: 'text',
  //   convertText: {...ConvertTextObject},
  //   selectList: '',
  //   dateFormat: '',
  //   viewData: false,
  // });
console.log('variableList', variableList);
  templateList.length = 0;
  templateList.push(...templateUtil.makeTemplateList(sourceList, variableList));

  selectType.value = 'template';
};

</script>
