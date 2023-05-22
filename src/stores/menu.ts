import { defineStore } from 'pinia';
import { IMenu, menuEndpoint } from 'src/biz/menu';

export const useStoreMenu = defineStore('menu', {
  state: () => ({
    menuList: [] as IMenu[],
  }),
  getters: {
    getMenuList: (state) => {
      return (pmenuId: string) =>
        state.menuList.filter(
          (m) => m.pmenuId == pmenuId
        );
    },
  },
  actions: {
    async initData(userId: string) {
      this.menuList.splice(0);
      const data = await menuEndpoint.getMyMenuList(userId);
      console.log('data', data);
      this.menuList.push(...data);
    },
  },
});
