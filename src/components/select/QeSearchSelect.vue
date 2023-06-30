<template>
  <q-select
    v-model="text"
    :options="options"
    :label="label"
    @update:model-value="change"
    :hint="hint"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface IQeSearchSelect {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<{ label: string; value: any }>;
  label?: string;
  hint?: string;
}

const props = defineProps<IQeSearchSelect>();
const label = ref<string>(props.label || 'Search');
const hint = ref<string>(props.hint || '');
const emit = defineEmits(['change']);

const text = ref({ value: '', label: '' });

const change = () => {
  emit('change', text.value.value);
};
</script>
