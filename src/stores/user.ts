import { defineStore } from 'pinia';
import { IUser } from './user.interface';

export const useStoreUser = defineStore('user', {
  state: () => ({
    user: {id:-1, userId:'', pwd: '', email: '', name: '', ename: '', emno: '', auth: ''} as IUser,
  }),

  getters: {
    isLogin : (state) => {
      return state.user.id > -1;
    }
  },

  actions: {
    set(user: IUser) {
      this.user.id = user.id;
      this.user.userId = user.userId;
      this.user.pwd = user.pwd;
      this.user.email = user.email;
      this.user.name = user.name;
      this.user.ename = user.ename;
      this.user.emno = user.emno;
      this.user.auth = user.auth;
    },
  },
});

