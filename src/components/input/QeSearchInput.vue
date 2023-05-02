<template>
  <q-input bottom-slots v-model="text" label="Search">
    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="close"
        @click="text = ''"
        class="cursor-pointer"
      />
      <q-icon
        name="search"
        @click="search"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['search'])

const text = ref('');

const search = (evt: Event) => {
  evt.preventDefault();
  const conntext = window.qeDb.testConnect();
  conntext.then(result => console.log('result', result));
  emit('search', text.value);
}
</script>
