import { defineStore } from 'pinia';
import { IMenu } from 'src/biz';

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
    menuList: [] as IMenu[],
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
