import { QTableColumn } from 'quasar';

export const userListColumn: QTableColumn[] = [
  {
    name: 'userId',
    field: 'userId',
    label: 'User ID',
    align: 'center',
    sortable: true,
  },
  {
    name: 'email',
    field: 'email',
    label: 'E-Mail',
    align: 'center',
    sortable: true,
  },
  {
    name: 'names',
    field: 'names',
    label: 'Name',
    align: 'center',
    sortable: true,
  },
  {
    name: 'enames',
    field: 'enames',
    label: 'Eng Name',
    align: 'center',
    sortable: true,
  },
  {
    name: 'emno',
    field: 'emno',
    label: 'EMNO',
    align: 'center',
    sortable: true,
  },
  {
    name: 'auth',
    field: 'auth',
    label: 'Auth',
    align: 'center',
    format(val) {
      return val.join(',');
    },
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
