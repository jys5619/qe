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
      <slot name="after" v-if="!!onlyShowAfter || !!showAfter"></slot>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IQeSplitterProps {
  onlyShowAfter?: boolean;
  showAfter?: boolean;
  horizontal?:boolean;
  limits?: any[];
  splitterLeft?: number;
}

const props = defineProps<IQeSplitterProps>();
const limits = ref(props.onlyShowAfter || props.showAfter ? props.limits || [30, 70] : [100, 100]);
const preLimits = ref([30, 70]);
const splitterModel = ref(props.onlyShowAfter || props.showAfter ? props.splitterLeft || 50 : 100);
const preSplitterModel = ref(100);
const separatorStyle = ref<string>(props.onlyShowAfter || props.showAfter ? !!props.horizontal ? 'height: 3px' : 'width: 3px' : 'display: none');
const showAfter = ref(!!props.showAfter);

const showSplitter = () => {
  if ( !showAfter.value && !props.onlyShowAfter ) {
    limits.value = preLimits.value;
    splitterModel.value = preSplitterModel.value;
    separatorStyle.value = !!props.horizontal ? 'height: 3px' : 'width: 3px';
    showAfter.value = true;
  }
};

const hideSplitter = () => {
  if ( showAfter.value && !props.onlyShowAfter) {
    preLimits.value = limits.value;
    preSplitterModel.value = splitterModel.value;
    limits.value = [100, 100];
    splitterModel.value = 100;
    separatorStyle.value = 'display: none';
    showAfter.value = false;
  }
};
defineExpose({
  showSplitter,
  hideSplitter,
});
</script>
