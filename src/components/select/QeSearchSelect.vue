<template>
  <q-select v-model="text" :options="options" :label="label" @update:model-value="search" :hint="hint" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IQeSearchSelect {
  options: Array<{label: string; value: any;}>;
  label?: string;
  hint?: string;
}

const props = defineProps<IQeSearchSelect>();
const label = ref<string>(props.label || 'Search');
const hint = ref<string>(props.hint || '');
const emit = defineEmits(['search']);

const text = ref('');

const search = (event: Event) => {
  emit('search', text.value);
};
</script>
