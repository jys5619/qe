<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
    :options="options"
    :label="label"
    dense
    emit-value
    map-options
    :rules="ruleList"
    :disable="disable"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    required: false,
    type: [Number, String, Array, null, undefined] as PropType<
      number | string | string[] | null | undefined
    >,
  },
  label: {
    required: false,
    type: String,
    default: '',
  },
  required: {
    required: false,
    type: Boolean,
    default: false,
  },
  disable: {
    required: false,
    type: Boolean,
    default: false,
  },
  readonly: {
    required: false,
    type: Boolean,
    default: false,
  },
  options: {
    required: true,
    type: Array<{label: string; value: string;}>
  }
});

const emit = defineEmits(['update:modelValue']);
// const options = ref(authList);

const ruleList = [] as ValidationRule<string>[];

if (props.required) {
  ruleList.push(
    (val: string) => (val && val.length > 0) || `Please select ${props.label}`
  );
}
</script>
