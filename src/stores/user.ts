import { defineStore } from 'pinia';
import { IUser, getIUserInitValue } from 'src/entity/entity';

export const useStoreUser = defineStore('user', {
  state: () => ({
    user: getIUserInitValue(),
  }),

  getters: {
    isLogin: (state) => {
      return state.user.id > -1;
    },
  },

  actions: {
    set(user: IUser) {
      this.user = { ...user };
    },
  },
});
