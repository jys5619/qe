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
          <q-card class="q-pa-sm" flat>
            <q-tabs
              v-model="tab"
              dense
              class="bg-primary text-white"
              active-color="yellow-6"
              indicator-color="yellow-6"
              :align="`left`"
              :onchange="handleTabChange"
            >
              <q-tab name="files" label="Files" />
              <q-tab name="source" label="Source" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="files" :class="['bg-blue-1']">
                <qe-splitter
                  ref="pageRef"
                  :only-show-after="true"
                  :limits="[30, 80]"
                  :splitterLeft="50"
                >
                  <template v-slot:before>
                    <q-list bordered separator dense style="height: 100%">
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
                  </template>

                  <!-- 3 : rieght -->
                  <template v-slot:after>
                    <qe-input label="ID" />
                    <qe-input label="Target String" />
                    <qe-input label="Result String" />
                  </template>
                </qe-splitter>
              </q-tab-panel>

              <q-tab-panel name="source" :class="['bg-blue-1']">
                <qe-splitter
                  ref="pageRef"
                  :only-show-after="true"
                  :limits="[30, 80]"
                  :splitterLeft="50"
                >
                  <template v-slot:before>
                    <qe-code-mirror
                      ref="codeMirrorRef"
                      placeholder="source"
                      :height="100"
                    />
                  </template>

                  <!-- 3 : rieght -->
                  <template v-slot:after>
                    <qe-input label="ID" />
                    <qe-input label="Target String" />
                    <qe-input label="Result String" />
                  </template>
                </qe-splitter>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
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
import { QeCodeMirror, QeInput, QeSplitter } from 'src/components';
import TemplateTree from './tree/TemplateTree.vue';

const tab = ref('files');
const pageRef = ref();
const codeMirrorRef = ref();
const selectNode = ref<ITemplate | undefined>(undefined);
const sourceList = reactive([] as ITemplate[]);
const sourceTree = reactive([] as QTreeNode[]);

const changeCurrentNode = (currentNode: ITemplate) => {
  selectNode.value = currentNode;
  console.log('selectNode.value', selectNode.value);
};

const handleTabChange = () => {
  if (tab.value === 'source') {
    codeMirrorRef.value.setSource(
      selectNode.value?.contents,
      selectNode.value?.extension
    );
  }
};
</script>
