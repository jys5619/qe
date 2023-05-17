<template>
  <q-page class="q-pa-md column">
    <div v-if="title" class="column q-pa-sm" style="flex: 0">
      <div class="text-h5" style="border-bottom: 1px solid burlywood">
        {{ title }}
      </div>
    </div>
    <div class="flex" style="flex: 1">
      <q-splitter
        v-model="splitterModel"
        style="flex: 1"
        :limits="limits"
        separator-class="bg-gray-8"
        :separator-style="separatorStyle"
      >
        <template v-slot:before>
          <slot name="left"></slot>
        </template>

        <template v-slot:after>
          <slot name="right"></slot>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ISplitterPageProps {
  title?: string;
}

const props = defineProps<ISplitterPageProps>();
const splitterModel = ref(100);
const limits = ref([100, 100]);
const separatorStyle = ref<string>('width: 0');

const showSplitter = () => {
  limits.value = [30, 70];
  splitterModel.value = 50;
  separatorStyle.value = 'width: 3px';
};

const hideSplitter = () => {
  limits.value = [100, 100];
  splitterModel.value = 100;
  separatorStyle.value = 'width: 0';
};
defineExpose({
  showSplitter,
  hideSplitter,
});
</script>
