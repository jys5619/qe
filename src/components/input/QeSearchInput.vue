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
  emit('search', text.value);
}
</script>
