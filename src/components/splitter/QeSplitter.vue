<template>
  <q-splitter
    v-model="splitterModel"
    :horizontal="!!horizontal"
    style="flex: 1"
    :limits="limits"
    separator-class="bg-gray-8"
    :separator-style="separatorStyle"
  >
    <template v-slot:before>
      <slot name="before"></slot>
    </template>

    <template v-slot:after>
      <slot name="after"></slot>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IQeSplitterProps {
  horizontal?:boolean;
}

const props = defineProps<IQeSplitterProps>();
const splitterModel = ref(100);
const limits = ref([100, 100]);
const separatorStyle = ref<string>('width: 0');

const showSplitter = () => {
  limits.value = [30, 70];
  splitterModel.value = 50;
  separatorStyle.value = props.horizontal ? 'height: 3px' : 'width: 3px';
};

const hideSplitter = () => {
  limits.value = [100, 100];
  splitterModel.value = 100;
  separatorStyle.value = props.horizontal ? 'height: 0' : 'width: 0';
};
defineExpose({
  showSplitter,
  hideSplitter,
});
</script>
