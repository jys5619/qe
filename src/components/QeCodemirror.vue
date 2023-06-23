<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    :border="true"
    placeholder="test placeholder"
    :height="800"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Codemirror from "codemirror-editor-vue3";
// placeholder
import "codemirror/addon/display/placeholder.js";
// language
import "codemirror/mode/javascript/javascript.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// theme
import "codemirror/theme/dracula.css";

    const code = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`);
const cmOptions = ref({
  mode: "text/javascript", // Language mode
  theme: "dracula", // Theme
});
</script>
