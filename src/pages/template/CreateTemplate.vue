<template>
  <q-page class="q-pa-md" style="display: flex">
    <input id="design" type="file" webkitdirectory="true" ref="uploadRef" directory @change="onUploadFiles" />
    <div><pre>{{ fileText }}</pre></div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const fileText = ref<string | ArrayBuffer | null>('');

const onUploadFiles = (event: any): void => {
  debugger;
  const files: ReadonlyArray<File> = [...(event?.target?.
    files ? event.target.files : [])];

    files.forEach((file) => {
        console.log(`File: ${file.name} - ${file.webkitRelativePath}`);
    });

    var file_reader = new FileReader();
    file_reader.onload = () => {
      fileText.value = file_reader.result;
    };
    file_reader.readAsText(files[0]);
};
</script>
