<template>
  <div flex>
  <Codemirror
    ref="codemirrorRef"
    v-model:value="code"
    :options="cmOptions"
    :border="true"
    :placeholder="placeholder"
    :height="height"
    wrap
  />
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Codemirror from 'codemirror-editor-vue3';
// placeholder
import 'codemirror/addon/display/placeholder.js';
// language
import 'codemirror/mode/javascript/javascript.js';
// placeholder
import 'codemirror/addon/display/placeholder.js';
// theme
import 'codemirror/theme/dracula.css';
import { EditorConfiguration } from 'codemirror';

export interface IQeCodeMirror {
  placeholder?: string;
  height?: number;
}

const props = defineProps<IQeCodeMirror>();
const codemirrorRef = ref();
const code = ref('');

const cmOptions = ref<EditorConfiguration>({
  mode: 'text/javascript', // Language mode
  lineWrapping: true,
  theme: 'dracula',
});
const placeholder = ref(props.placeholder || '');
const height = ref(props.height || 500);

const setSource = (source: string, ext = 'js') => {
  code.value = source;
  setOption(ext);
};

const getSource = () => {
  return code.value;
};

const setOption = (ext: string) => {
  if (ext === 'js') {
    cmOptions.value.mode = 'text/javascript';
  }
};

// onMounted(() => {
//   codemirrorRef.value.resize(1000);
// });

defineExpose({
  setSource,
  getSource,
});
</script>
