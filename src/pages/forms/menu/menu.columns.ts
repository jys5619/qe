import { QTableColumn } from 'quasar';

export const menuColumns: QTableColumn[] = [
  {
    name: 'menuId',
    field: 'menuId',
    label: 'Menu ID',
    align: 'center',
    sortable: true,
  },
  {
    name: 'pmenuId',
    field: 'pmenuId',
    label: 'Parent Menu Id',
    align: 'center',
    sortable: true,
  },
  {
    name: 'menuName',
    field: 'menuName',
    label: 'Name',
    align: 'center',
    sortable: true,
  },
  {
    name: 'menuPath',
    field: 'menuPath',
    label: 'Path',
    align: 'left',
    sortable: true,
  },
  {
    name: 'icon',
    field: 'icon',
    label: 'Icon',
    align: 'center',
    sortable: true,
  },
  {
    name: 'separatorYn',
    field: 'separatorYn',
    label: 'Separator',
    align: 'center',
    sortable: true,
  },
  {
    name: 'auth',
    field: 'auth',
    label: 'Auth',
    align: 'center',
    format(val:any) {
      return val.join(',');
    },
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
