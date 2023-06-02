<template>
  <q-page class="q-pa-md column">
    <div v-if="!!title" class="column q-pa-sm" style="flex: 0">
      <div class="text-h5" style="border-bottom: 1px solid burlywood">
        {{ title }}
      </div>
    </div>
    <div class="flex" style="flex: 1">
      <qe-splitter
        ref="splitterRef"
        :horizontal="!!horizontal"
      >
        <template v-slot:before>
          <slot name="before"></slot>
        </template>

        <template v-slot:after>
          <slot name="after"></slot>
        </template>
      </qe-splitter>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QeSplitter from 'src/components/splitter/QeSplitter.vue';



interface ISplitterPageProps {
  title?: string;
  horizontal?:boolean;
}

const props = defineProps<ISplitterPageProps>();

const splitterRef = ref();

const showSplitter = () => {
  splitterRef.value.showSplitter();
};

const hideSplitter = () => {
  splitterRef.value.hideSplitter();
};
defineExpose({
  showSplitter,
  hideSplitter,
});
</script>
