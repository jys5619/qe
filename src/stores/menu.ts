import { defineStore } from 'pinia';
import { IMenu } from 'src/biz/menu';

// SELECT '{''menuId'':''' || MENU_ID || ''''||
//        ',''pmenuId'':''' || PMENU_ID || ''''||
//        ',''menuName'':''' || MENU_NAME || ''''||
//        ',''menuPath'':''' || IFNULL(MENU_PATH, '') || '''' ||
//        ',''icon'':''' || IFNULL(ICON, '') || '''' ||
//        ',''separatorYn'':''' || IFNULL(SEPARATOR_YN, 'N') || '''},' AS JSON
//   FROM TB_MENU

export const useStoreMenu = defineStore('menu', {
  state: () => ({
    rootPath: '/',
    menuList: [
      {
        menuId: 'myDesk',
        pmenuId: 'MAIN',
        menuName: 'My Desk',
        menuPath: '',
        icon: '',
        separatorYn: 'N',
      },
      {
        menuId: 'project',
        pmenuId: 'MAIN',
        menuName: 'Project',
        menuPath: '',
        icon: '',
        separatorYn: 'N',
      },
      {
        menuId: 'program',
        pmenuId: 'MAIN',
        menuName: 'Program',
        menuPath: '',
        icon: '',
        separatorYn: 'N',
      },
      {
        menuId: 'data',
        pmenuId: 'MAIN',
        menuName: 'Data',
        menuPath: '',
        icon: '',
        separatorYn: 'N',
      },
      {
        menuId: 'admin',
        pmenuId: 'MAIN',
        menuName: 'Admin',
        menuPath: '',
        icon: '',
        separatorYn: '',
      },
      {
        menuId: 'sample',
        pmenuId: 'MAIN',
        menuName: 'Sample',
        menuPath: '',
        icon: '',
        separatorYn: 'N',
      },

      {
        menuId: 'mySetting',
        pmenuId: 'myDesk',
        menuName: 'Setting',
        menuPath: '',
        icon: 'settings',
        separatorYn: 'N',
      },

      {
        menuId: 'projectSetting',
        pmenuId: 'project',
        menuName: 'Setting',
        menuPath: '',
        icon: 'settings',
        separatorYn: 'N',
      },

      {
        menuId: 'programSetting',
        pmenuId: 'program',
        menuName: 'Setting',
        menuPath: '',
        icon: 'settings',
        separatorYn: 'N',
      },

      {
        menuId: 'dataSetting',
        pmenuId: 'data',
        menuName: 'Setting',
        menuPath: '',
        icon: 'settings',
        separatorYn: 'N',
      },

      {
        menuId: 'adminSetting',
        pmenuId: 'admin',
        menuName: 'Setting',
        menuPath: '/admin/setting',
        icon: 'settings',
        separatorYn: 'N',
      },
      {
        menuId: 'adminCode',
        pmenuId: 'admin',
        menuName: 'Code',
        menuPath: '/admin/code',
        icon: 'code',
        separatorYn: 'N',
      },
      {
        menuId: 'adminUser',
        pmenuId: 'admin',
        menuName: 'User',
        menuPath: '/admin/user',
        icon: 'perm_identity',
        separatorYn: 'N',
      },
      {
        menuId: 'adminMenu',
        pmenuId: 'admin',
        menuName: 'Menu',
        menuPath: '/admin/menu',
        icon: 'menu',
        separatorYn: 'N',
      },

      {
        menuId: 'sampleIcon',
        pmenuId: 'sample',
        menuName: 'Icon',
        menuPath: '/sample/icon',
        icon: 'delete',
        separatorYn: 'N',
      },
      {
        menuId: 'sampleSingleSearchForm',
        pmenuId: 'sample',
        menuName: 'Single Search Form',
        menuPath: '/sample/single-search-form',
        icon: 'search',
        separatorYn: 'N',
      },
      {
        menuId: 'sampleSingleSearchFormSide',
        pmenuId: 'sample',
        menuName: 'Single Search Form & Side',
        menuPath: '/sample/single-search-form-side',
        icon: 'search',
        separatorYn: 'N',
      },
    ] as IMenu[],
  }),
  getters: {
    getMainList: (state) => () =>
      state.menuList.filter((m) => m.pmenuId === 'MAIN'),
    getMenuList: (state) => {
      return (pmenuId = 'myDesk') =>
        state.menuList.filter((m) => m.pmenuId == pmenuId);
    },
    getRootPath: (state) => () => state.rootPath,
  },
  actions: {
    // async initData(userId: string) {
    //   this.menuList.splice(0);
    //   const data = await menuEndpoint.getMyMenuList(userId);
    //   this.menuList.push(...data);
    // },
    async set(menuList: IMenu[]) {
      this.menuList = [...menuList];
    },
  },
});
