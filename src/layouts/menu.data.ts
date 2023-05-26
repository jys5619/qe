export interface ILeftMenuItem {
  icon: string;
  label: string;
  separator?: boolean;
  iconColor?: string;
  path?: string;
}

type ILeftMenuGroup = {
  [key in string]: ILeftMenuItem[];
};

const LeftMenuList: ILeftMenuGroup = {
  myDesk: [
    {
      icon: 'error',
      label: 'Spam',
    },
  ],
  project: [
    {
      icon: 'error',
      label: 'Spam',
    },
  ],
  program: [
    {
      icon: 'error',
      label: 'Spam',
    },
  ],
  data: [
    {
      icon: 'error',
      label: 'Spam',
    },
  ],
  admin: [
    {
      icon: 'settings',
      label: 'Setting',
      path: '/admin/setting',
    },
    {
      icon: 'perm_identity',
      label: 'User',
      path: '/admin/user',
    },
    {
      icon: 'menu',
      label: 'Menu',
      path: '/admin/menu',
    },
  ],
  sample: [
    {
      icon: 'delete',
      label: 'Icon',
      separator: true,
      path: '/sample/icon',
    },
    {
      icon: 'search',
      label: 'Single Search Form',
      path: '/sample/single-search-form',
    },
    {
      icon: 'search',
      label: 'Single Search Form & Side',
      path: '/sample/single-search-form-side',
    },
    {
      icon: 'help',
      iconColor: 'primary',
      label: 'Help',
    },
  ],
};

const LeftMenu = {
  getMenuList: (menu: string): ILeftMenuItem[] => {
    return LeftMenuList[menu];
  },
};

export const menuList = [
  {
    leftMenuKey: 'myDesk',
    label: 'My Desk',
  },
  {
    leftMenuKey: 'project',
    label: 'Project',
  },
  {
    leftMenuKey: 'program',
    label: 'Program',
  },
  {
    leftMenuKey: 'data',
    label: 'Data',
  },
  {
    leftMenuKey: 'admin',
    label: 'Admin',
  },
  {
    leftMenuKey: 'sample',
    label: 'Sample',
  },
];

export interface IMenu {
  menuId: string;
  pmenuId: string;
  label: string;
  icon?: string;
  separator?: boolean;
  iconColor?: string;
  path?: string;
  auth?: string[];
  sortNo?: number;
  useYn: string;
}

export const menuDb = [
  {
    menuId: 'myDesk',
    pmenuId: 'MAIN',
    label: 'My Desk',
  },
  {
    menuId: 'project',
    pmenuId: 'MAIN',
    label: 'Project',
  },
  {
    menuId: 'program',
    pmenuId: 'MAIN',
    label: 'Program',
  },
  {
    menuId: 'data',
    pmenuId: 'MAIN',
    label: 'Data',
  },
  {
    menuId: 'admin',
    pmenuId: 'MAIN',
    label: 'Admin',
  },
  {
    menuId: 'sample',
    pmenuId: 'MAIN',
    label: 'Sample',
  },
  {
    menuId: 'mySetting',
    pmenuId: 'myDesk',
    icon: 'settings',
    label: 'Setting',
  },
  {
    menuId: 'projectSetting',
    pmenuId: 'project',
    icon: 'settings',
    label: 'Setting',
  },
  {
    menuId: 'programSetting',
    pmenuId: 'program',
    icon: 'settings',
    label: 'Setting',
  },
  {
    menuId: 'dataSetting',
    pmenuId: 'data',
    icon: 'settings',
    label: 'Setting',
  },
  {
    menuId: 'adminCode',
    pmenuId: 'code',
    icon: 'c',
    label: 'Code',
    path: '/admin/code',
  },
  {
    menuId: 'adminUser',
    pmenuId: 'admin',
    icon: 'perm_identity',
    label: 'User',
    path: '/admin/user',
  },
  {
    menuId: 'adminMenu',
    pmenuId: 'admin',
    icon: 'menu',
    label: 'Menu',
    path: '/admin/menu',
  },
  {
    menuId: 'adminSetting',
    pmenuId: 'admin',
    icon: 'settings',
    label: 'Setting',
    path: '/admin/setting',
  },
  {
    menuId: 'sampleIcon',
    pmenuId: 'sample',
    icon: 'delete',
    label: 'Icon',
    path: '/sample/icon',
  },
  {
    menuId: 'sampleSingleSearchForm',
    pmenuId: 'sample',
    icon: 'search',
    label: 'Single Search Form',
    path: '/sample/single-search-form',
  },
  {
    menuId: 'sampleSingleSearchFormSide',
    pmenuId: 'sample',
    icon: 'search',
    label: 'Single Search Form & Side',
    path: '/sample/single-search-form-side',
  },
] as IMenu[];

const Menu = {
  getMenuList: (pmenuId: string): IMenu[] => {
    return menuDb.filter((menu: IMenu) => menu.pmenuId === pmenuId);
  },
};

export { Menu };
export default LeftMenu;
