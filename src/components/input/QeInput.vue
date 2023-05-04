<template>
  <q-input
    :model-value="model"
    @update:model-value="(value) => emit('update:model', value)"
    :label="`${label}${required ? ' *' : ''}`"
    :color="color"
    dense
    :type="_type"
    :rules="ruleList"
    :disable="disable"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { PropType, ref } from 'vue';

const props = defineProps({
  model: {
    required: false,
    type: [String, Number, null, undefined] as PropType<
      string | number | null | undefined
    >,
  },
  label: {
    required: false,
    type: String,
    default: '',
  },
  type: {
    required: false,
    type: String,
    default: 'text',
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
  maxLength: {
    required: false,
    type: Number,
    default: 0,
  },
  color: {
    required: false,
    type: String,
    default: 'blue-12',
  },
});

const _type = ref(
  props.type as
    | 'number'
    | 'textarea'
    | 'time'
    | 'text'
    | 'password'
    | 'email'
    | 'search'
    | 'tel'
    | 'file'
    | 'url'
    | 'date'
    | undefined
);
const ruleList = [] as ValidationRule<string>[];

if (props.required) {
  ruleList.push(
    (val: string) => (val && val.length > 0) || `Please input ${props.label}`
  );

  if (props.maxLength > 0) {
    ruleList.push(
      (val: string) =>
        (val && val.length <= props.maxLength) ||
        `${props.label} length over ${props.maxLength}`
    );
  }
}

const emit = defineEmits(['update:model']);
</script>

<!-- <template>
  <q-input
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    :label="`${label}${required ? ' *' : ''}`"
    :color="color"
    dense
    :type="_type"
    :rules="_ruleList"
    :disable="disable"
    :readonly="readonly"
  />
</template>

<script lang="ts">
import { ValidationRule } from 'quasar';
import { PropType } from 'vue';

export default {
  name: 'QeInputSample',
  props: {
    modelValue: {
      required: false,
      type: [String, Number, null, undefined] as PropType<
        string | number | null | undefined
      >,
    },
    label: {
      required: false,
      type: String,
      default: '',
    },
    type: {
      required: false,
      type: String,
      default: 'text',
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
    maxLength: {
      required: false,
      type: Number,
      default: 0,
    },
    color: {
      required: false,
      type: String,
      default: 'blue-12',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    _type() {
      return this.$props.type as
        | 'number'
        | 'textarea'
        | 'time'
        | 'text'
        | 'password'
        | 'email'
        | 'search'
        | 'tel'
        | 'file'
        | 'url'
        | 'date'
        | undefined;
    },
    _ruleList() {
      const ruleList: ValidationRule<string>[] = [
        (val: string) =>
          (val && val.length > 0) || `Please input ${this.$props.label}`,
      ];

      if (this.$props.maxLength > 0) {
        ruleList.push(
          (val: string) =>
            (val && val.length <= this.$props.maxLength) ||
            `${this.$props.label} length over ${this.$props.maxLength}`
        );
      }
      return ruleList;
    },
  },
};
</script> -->
