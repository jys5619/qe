import { defineStore } from 'pinia';
import { IMenu, menuEndpoint } from 'src/biz/menu';

export const useStoreMenu = defineStore('menu', {
  state: () => ({
    menuList: [
      {'menuId':'myDesk','pmenuId':'MAIN','menuName':'My Desk','menuPath':'','icon':'','separatorYn':'N'},
      {'menuId':'project','pmenuId':'MAIN','menuName':'Project','menuPath':'','icon':'','separatorYn':'N'},
      {'menuId':'program','pmenuId':'MAIN','menuName':'Program','menuPath':'','icon':'','separatorYn':'N'},
      {'menuId':'data','pmenuId':'MAIN','menuName':'Data','menuPath':'','icon':'','separatorYn':'N'},
      {'menuId':'admin','pmenuId':'MAIN','menuName':'Admin','menuPath':'','icon':'','separatorYn':''},
      {'menuId':'sample','pmenuId':'MAIN','menuName':'Sample','menuPath':'','icon':'','separatorYn':'N'},
      {'menuId':'mySetting','pmenuId':'myDesk','menuName':'Setting','menuPath':'','icon':'settings','separatorYn':'N'},
      {'menuId':'projectSetting','pmenuId':'project','menuName':'Setting','menuPath':'','icon':'settings','separatorYn':'N'},
      {'menuId':'programSetting','pmenuId':'program','menuName':'Setting','menuPath':'','icon':'settings','separatorYn':'N'},
      {'menuId':'dataSetting','pmenuId':'data','menuName':'Setting','menuPath':'','icon':'settings','separatorYn':'N'},
      {'menuId':'adminSetting','pmenuId':'admin','menuName':'Setting','menuPath':'/admin/setting','icon':'settings','separatorYn':'N'},
      {'menuId':'adminUser','pmenuId':'admin','menuName':'User','menuPath':'/admin/user','icon':'perm_identity','separatorYn':'N'},
      {'menuId':'adminMenu','pmenuId':'admin','menuName':'Menu','menuPath':'/admin/menu','icon':'menu','separatorYn':'N'},
      {'menuId':'sampleIcon','pmenuId':'sample','menuName':'Icon','menuPath':'/sample/icon','icon':'delete','separatorYn':'N'},
      {'menuId':'sampleSingleSearchForm','pmenuId':'sample','menuName':'Single Search Form','menuPath':'/sample/single-search-form','icon':'search','separatorYn':'N'},
      {'menuId':'sampleSingleSearchFormSide','pmenuId':'sample','menuName':'Single Search Form & Side','menuPath':'/sample/single-search-form-side','icon':'search','separatorYn':'N'},
    ] as IMenu[],
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
