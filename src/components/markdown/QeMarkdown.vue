<template>
  <div>
    <!-- {{  markdown }} -->
    <textarea v-model="markdown"></textarea>
    <div v-html="markdownToHtml" style="width: 500px; height: 500px"></div>
  </div>
</template>

<script setup lang="ts">
// npm i --save-dev @types/marked
import { computed, ref } from 'vue';
//import  marked from 'marked';

const markdown = ref('# hello world');
const markdownToHtml = computed(() => markdown.value); //marked(markdown.value));

const getMarkdown = (): string => {
  return markdown.value;
};

const setMarkdown = (mdText: string) => {
  markdown.value = mdText;
};

defineExpose({
  getMarkdown,
  setMarkdown,
});
</script>
