import { QTableColumn } from 'quasar';

export const codeGroupColumns: QTableColumn[] = [
  {
    name: 'codeGroup',
    field: 'codeGroup',
    label: 'Code Group',
    align: 'left',
    sortable: true,
  },
  {
    name: 'codeGroupName',
    field: 'codeGroupName',
    label: 'Code Group Name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'description',
    field: 'description',
    label: 'Description',
    align: 'left',
    sortable: true,
  },
  {
    name: 'memoryYn',
    field: 'memoryYn',
    label: 'Memory Load',
    align: 'center',
    sortable: true,
  },
  {
    name: 'sortNo',
    field: 'sortNo',
    label: 'Sort No',
    align: 'center',
    sortable: true,
  },
  {
    name: 'useYn',
    field: 'useYn',
    label: 'Use',
    align: 'center',
    sortable: true,
  },
];

export const codeColumns: QTableColumn[] = [
  {
    name: 'codeGroup',
    field: 'codeGroup',
    label: 'Code Group',
    align: 'left',
    sortable: true,
  },
  {
    name: 'code',
    field: 'code',
    label: 'Code',
    align: 'left',
    sortable: true,
  },
  {
    name: 'codeName',
    field: 'codeName',
    label: 'Code Name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'description',
    field: 'description',
    label: 'Description',
    align: 'left',
    sortable: true,
  },
  {
    name: 'sortNo',
    field: 'sortNo',
    label: 'Sort No',
    align: 'center',
    sortable: true,
  },
  {
    name: 'useYn',
    field: 'useYn',
    label: 'Use',
    align: 'center',
    sortable: true,
  },
];
