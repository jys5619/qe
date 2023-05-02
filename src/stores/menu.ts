import { defineStore } from 'pinia';
import { IMenu } from './menu.interface';

export const useStoreMenu = defineStore('menu', {
  state: () => ({
    menuList: [] as IMenu[],
  }),
  getters: {
    getMenuList: (state) => {
      return state.menuList.filter(m => m.menuType === 'MAIN');
    },
    getSubMenuList(state) {
      return (pMenuId:string) => state.menuList.filter(m => m.menuType === 'SUB' && m.pMenuId == pMenuId);
    },
  },
  actions: {
    init() {
      window.qeDb.selectMenuList();
    }
  },
});
