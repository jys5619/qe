export type LeftMenuNames = 'home' | 'setting' | 'test';

export interface ILeftMenuItem {
  icon: string;
  label: string;
  separator?: boolean;
  iconColor?: string;
  path?: string;
}

type ILeftMenuGroup = {
  [key in LeftMenuNames]: ILeftMenuItem[];
};

const LeftMenuList: ILeftMenuGroup = {
  home: [
    {
      icon: 'inbox',
      label: 'Inbox',
      separator: true,
    },
    {
      icon: 'send',
      label: 'Outbox',
    },
    {
      icon: 'delete',
      label: 'Trash',
    },
  ],
  setting: [
    {
      icon: 'error',
      label: 'Spam',
    },
    {
      icon: 'settings',
      label: 'Settings',
    },
    {
      icon: 'feedback',
      label: 'Send Feedback',
    },
    {
      icon: 'help',
      iconColor: 'primary',
      label: 'Help',
    },
  ],
  test: [
    {
      icon: 'delete',
      label: 'Icon',
      separator: true,
      path: '/test/icon',
    },
    {
      icon: 'search',
      label: 'Single Search Form',
      path: '/test/single-search-form',
    },
    {
      icon: 'feedback',
      label: 'Send Feedback',
    },
    {
      icon: 'help',
      iconColor: 'primary',
      label: 'Help',
    },
  ],
};

const LeftMenu = {
  getMenuList: (menu: LeftMenuNames): ILeftMenuItem[] => {
    return LeftMenuList[menu];
  },
};

export default LeftMenu;
