<template>
  <q-select v-model="text" :options="options" :label="label" @update:model-value="change" :hint="hint" />
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
const emit = defineEmits(['change']);

const text = ref({value:'', label:''});

const change = (event: Event) => {
  emit('change', text.value.value);
};
</script>
