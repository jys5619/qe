<template>
  <q-input
    bottom-slots
    v-model.trim="text"
    :label="label"
    @keydown.enter.prevent="search"
  >
    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="close"
        @click="text = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" @click="search" class="cursor-pointer" />
    </template>

    <template v-slot:hint>{{ hint }}</template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IQeSearchInput {
  label?: string;
  hint?: string;
}

const props = defineProps<IQeSearchInput>();
const label = ref<string>(props.label || 'Search');
const hint = ref<string>(props.hint || '');
const emit = defineEmits(['search']);

const text = ref('');

const search = (evt: Event) => {
  evt.preventDefault();
  emit('search', text.value);
};
</script>
