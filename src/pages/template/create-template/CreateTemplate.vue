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
                  v-for="source in sourceList"
                  :key="source.path"
                  style="overflow: hidden"
                >
                  <q-item-section>{{ source.path }}</q-item-section>
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
              <template-var-form />
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

const sourcePageRef = ref();
const codeMirrorRef = ref();
const selectNode = ref<ITemplate | undefined>(undefined);
const sourceList = reactive([] as ITemplate[]);
const sourceTree = reactive([] as QTreeNode[]);

const changeCurrentNode = (currentNode: ITemplate) => {
  selectNode.value = currentNode;

  codeMirrorRef.value.setSource(
    selectNode.value?.contents,
    selectNode.value?.extension
  );
};

</script>
