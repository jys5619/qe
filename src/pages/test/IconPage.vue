<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="n in 100" :key="n">
        <q-item-section avatar>
          <q-avatar color="purple" text-color="white" icon="bluetooth" />
        </q-item-section>
        <q-item-section>bluetooth</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts"></script>
