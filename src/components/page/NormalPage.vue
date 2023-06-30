<template>
  <q-page class="q-pa-md column">
    <div v-if="!!title" class="column q-pa-sm" style="flex: 0">
      <div class="text-h5" style="border-bottom: 1px solid burlywood">
        {{ title }}
      </div>
    </div>
    <div class="flex" style="flex: 1">
      <slot name="page"></slot>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {} from 'vue';

interface INormalPageProps {
  title?: string;
}

defineProps<INormalPageProps>();
</script>
