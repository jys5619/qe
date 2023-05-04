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
      path: '/admin/setting-management',
    },
    {
      icon: 'perm_identity',
      label: 'User',
      path: '/admin/user-management',
    },
    {
      icon: 'menu',
      label: 'Menu',
      path: '/admin/menu-management',
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

export default LeftMenu;
