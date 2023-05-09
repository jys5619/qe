import { QTableColumn } from 'quasar';

export const userListColumn: QTableColumn[] = [
  { name: 'id', field: 'id', label: 'ID', align: 'center', sortable: true},
  { name: 'userId', field: 'userId', label: 'User ID', align: 'center', sortable: true },
  { name: 'pwd', field: 'pwd', label: 'Password',align: 'center' },
  { name: 'email', field: 'email', label: 'E-Mail',align: 'center'},
  { name: 'ename', field: 'ename', label: 'Eng Name' ,align: 'center'},
  { name: 'emno', field: 'emno', label: 'EMNO' ,align: 'center'},
  { name: 'auth', field: 'auth', label: 'Auth',align: 'center' },
];

