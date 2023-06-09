<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    ref="qeMenuForm"
    class="q-gutter-sm"
  >
    <qe-input
      v-model="editMenu.menuId"
      label="Menu ID"
      :required="true"
      :readonly="readonly"
    />
    <qe-select
      v-model="editMenu.pmenuId"
      label="Parent Menu ID"
      :required="true"
      :readonly="readonly || editMenu.pmenuId === 'MAIN'"
      :disable="!readonly && editMenu.pmenuId === 'MAIN'"
      :options="mainMenuList"
    />
    <qe-input
      v-model="editMenu.menuName"
      label="Name"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-if="editMenu.pmenuId !== 'MAIN'"
      v-model="editMenu.menuPath"
      label="Path"
      :required="true"
      :readonly="readonly"
    />
    <qe-input
      v-if="editMenu.pmenuId !== 'MAIN'"
      v-model="editMenu.icon"
      label="Icon"
      :readonly="readonly"
    />

    <q-toggle
      v-if="editMenu.pmenuId !== 'MAIN'"
      :label="`Separator`"
      false-value="N"
      true-value="Y"
      dense
      :disable="readonly"
      v-model="editMenu.separatorYn"
    />
    <qe-multi-select
      v-model="editMenu.auth"
      label="Auth"
      :required="true"
      :readonly="readonly"
      :options="auth"
    />
    <qe-input
      type="number"
      v-model="editMenu.sortNo"
      label="Sort No"
      :required="true"
      :readonly="readonly"
    />
    <q-toggle
      :label="`Use`"
      false-value="N"
      true-value="Y"
      dense
      :disable="readonly"
      v-model="editMenu.useYn"
    />
    <div class="q-mt-sm q-gutter-sm" style="text-align: right">
      <q-btn
        v-if="!readonly"
        type="submit"
        class="glossy"
        size="sm"
        color="primary"
        label="Submit"
      />
      <q-btn
        v-if="!readonly"
        type="reset"
        class="glossy"
        size="sm"
        color="blue-grey-7"
        label="Reset"
      />
      <q-btn
        v-if="readonly"
        class="glossy"
        size="sm"
        color="primary"
        label="Edit"
        @click="handleEdit"
      />
      <q-btn
        v-if="readonly || editMenu.id === -1"
        class="glossy"
        size="sm"
        color="blue-grey-7"
        label="Close"
        @click="handleClose"
      />
    </div>
  </q-form>

  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">저장하시겠습니까?</span>
      </q-card-section>

      <q-card-actions :align="'right'">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Ok"
          color="primary"
          v-close-popup
          @click="onSubmitCallback"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { QeInput, QeSelect, QeMultiSelect } from '../../../../components';
import { IMenu, menuEndpoint, menuService } from '../../../../biz';

interface IMenuEditProps {
  menu?: Partial<IMenu> | number;
  readonly: boolean;
}

const authList = [
  {
    label: 'USER',
    value: 'USER',
  },
  {
    label: 'ADMIN',
    value: 'ADMIN',
  },
];
const auth = ref(authList);
const props = defineProps<IMenuEditProps>();
const loading = ref<boolean>(false);
const originalMenu = ref<Partial<IMenu>>({});
const editMenu = ref<Partial<IMenu>>({});
const qeMenuForm = ref();
const confirm = ref(false);
const mainMenuList = ref([{ label: '', value: '' }]);
const emit = defineEmits([
  'close',
  'edit',
  'submit',
  'update:menu',
  'update:readonly',
]);

const onSubmit = async () => {
  confirm.value = true;
};

const onSubmitCallback = async (event: Event) => {
  loading.value = true;
  if (!menuService.validate(editMenu.value).isSuccess()) return;
  await menuEndpoint.saveMenu(editMenu.value);

  emit('update:readonly', true);
  emit('submit', event);
  loading.value = false;
};

const onReset = () => {
  emit('update:readonly', true);
  resetForm();
};

const onNew = () => {
  resetForm();
  if (qeMenuForm.value) {
    qeMenuForm.value.reset();
  }
  emit('update:readonly', false);
};

const handleEdit = (event: Event) => {
  emit('update:readonly', false);
  emit('edit', event);
};

const handleClose = (event: Event) => {
  emit('close', event);
};

const resetForm = () => {
  editMenu.value = { ...originalMenu.value };
};

watch(
  () => props.menu,
  (newMenu, oldMenu) => {
    if (newMenu !== oldMenu) {
      if (typeof newMenu === 'number' && newMenu > -1) {
        // TODO : ID으로 menu정보를 조회한다.
        originalMenu.value = {} as IMenu;
        onReset();
      } else if (menuService.isIMenu(newMenu)) {
        originalMenu.value = { ...(props.menu as IMenu) };
        if (originalMenu.value.id === -1) {
          onNew();
        } else {
          onReset();
        }
      }
    }
  }
);

onMounted(() => {
  (async () => {
    const searchMenuList = await menuEndpoint.getMenuList('MAIN', false);
    const menuListData = Array<{ label: string; value: string }>();

    searchMenuList.forEach((menu) => {
      menuListData.push({ value: menu.menuId, label: menu.menuName });
    });

    mainMenuList.value = menuListData;
  })();
});
</script>
