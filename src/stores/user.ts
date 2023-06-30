import { defineStore } from 'pinia';
import { IUser, userService } from 'src/biz';

export const useStoreUser = defineStore('user', {
  state: () => ({
    user: userService.getIUserInitValue(),
  }),

  getters: {
    isLogin: (state) => {
      return state.user.id > -1;
    },
  },

  actions: {
    async set(user: IUser) {
      this.user = { ...user };
    },
  },
});
