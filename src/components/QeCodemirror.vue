<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    :border="true"
    :placeholder="placeholder"
    :height="height"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Codemirror from 'codemirror-editor-vue3';
// placeholder
import 'codemirror/addon/display/placeholder.js';
// language
import 'codemirror/mode/javascript/javascript.js';
// placeholder
import 'codemirror/addon/display/placeholder.js';
// theme
import 'codemirror/theme/dracula.css';

export interface IQeCodeMirror {
  placeholder?: string;
  height?: number;
}

const props = defineProps<IQeCodeMirror>();
const code = ref('');
const theme = ref('dracula');
const cmOptions = ref({
  mode: 'text/javascript', // Language mode
  theme: theme.value,
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
    cmOptions.value = { mode: 'text/javascript', theme: theme.value };
  }
};

defineExpose({
  setSource,
  getSource,
});
</script>
