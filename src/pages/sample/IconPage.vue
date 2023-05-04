<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="ic in icons" :key="ic">
        <q-item-section avatar>
          <q-avatar color="purple" text-color="white" :icon="ic" />
        </q-item-section>
        <q-item-section>{{ ic }} </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
const icons: string[] = [
  'bluetooth',
  'search',
  'feedback',
  'help',
  'error',
  'delete',
  'send',
  'inbox',
  'perm_identity',
  'signal_wifi_off',
  'drafts',
  'mail',
  'send',
];
</script>
