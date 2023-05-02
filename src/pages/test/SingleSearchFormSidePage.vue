<template>
  <q-page class="q-pa-md" style="display:flex">
    <q-splitter
      v-model="splitterModel"
      :limits="[30, 70]"
      style="flex: 1"
      separator-class="bg-gray-8"
      separator-style="width: 3px"
    >
      <template v-slot:before>
        <div class="q-pa-sm">
          <QeSearchInput @search="handleSearch"/>
        </div>
        <div class="q-pa-sm">
          <QeTable :columns="columns" :rows="rows" :loading="isLoad" />
        </div>
        <div class="q-pa-sm q-gutter-sm" style="text-align: right;">
          <q-btn class="glossy" color="primary" label="NEW" />
        </div>
      </template>

      <template v-slot:after>
        <div class="q-pa-sm">
          <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="indigo-10"
          indicator-color="indigo-10"
          align="justify"
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>
          <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
            <q-tab-panel name="mails">
              <div class="text-h6">Mails</div>
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-sm"
              >
                <q-input
                  v-model="name"
                  label="Your name *"
                  color="blue-12"
                  dense
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-input
                  type="number"
                  v-model="age"
                  dense
                  color="blue-12"
                  label="Your age *"
                  lazy-rules
                  :rules="[
                    val => val !== null && val !== '' || 'Please type your age',
                    val => val > 0 && val < 100 || 'Please type a real age'
                  ]"
                />
              </q-form>

              <div class="q-gutter-sm" style="text-align: right;">
                <q-btn type="submit" class="glossy" size="md" color="primary" label="Submit" :loading="loading" @click="simulateProgress" />
                <q-btn type="reset" class="glossy" size="md" color="blue-grey-7" label="Reset" />
              </div>
              <q-inner-loading
                :showing="loading"
                label="Please wait..."
                label-class="text-teal"
                label-style="font-size: 1.1em"
              />
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              <q-form
                class="q-gutter-sm"
              >
                <q-input
                  v-model="name"
                  label="Your name *"
                  color="blue-12"
                  readonly
                  dense
                />
                <q-input
                  type="number"
                  v-model="age"
                  dense
                  color="blue-12"
                  label="Your age *"
                  readonly
                />
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>


        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup lang="ts">
import QeTable from 'src/components/QeTable.vue';
import QeSearchInput from 'src/components/input/QeSearchInput.vue';
import { DATA_COLUMNS, DATA_ROWS } from 'src/data';
import { ref } from 'vue';


const isLoad = ref<boolean>(false);
const columns = ref(DATA_COLUMNS);
const rows = ref(DATA_ROWS);
const splitterModel = ref(50)
const tab = ref('mails')

const name = ref(null)
const age = ref(null)
const loading = ref(false)

const handleSearch = (text:string) => {
  console.log('text', text);
};

const onSubmit = () => {
console.log(3);
};

const onReset = () => {
console.log(3);
};

const simulateProgress = () => {
      loading.value = true;

      setTimeout(() => {
        loading.value = false;
      }, 3000)
    }

</script>

<style >
.vwrapper {
    display: flex;
}
</style>
