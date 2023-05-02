# QE (qe)

QE

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).

### Electron 추가
quasar mode add electron

### sqlLite3
npm install sqlite3
npm install --save-dev @types/sqlite3

## oracle
npm install oracledb
npm install --save-dev @types/oracledb

## Pinia
npm i pinia

### store/index.ts
파일 생성하고 아래와 같이 작성합니다.
```typescript
import { createPinia } from "pinia";
const pinia = createPinia();

export default pinia;
```

### main.ts
pinia를 등록해줍니다.
```typescript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import store from "@/store/index";

createApp(App).use(router).use(store).use(BootstrapVue3).mount("#app");
```
### store/modules/todo.ts
파일 생성 후 뼈대를 작성합니다.
pinia는 vuex 처럼 따로 어딘가에 등록 할 필요가 없으며 mutatiaons이 없습니다.
actions에서 하거나 컴포넌트 내부에서 작업해도 간단합니다.
```typescript
import { defineStore } from "pinia";

export const useStoreTodo = defineStore("todo", {
  state: () => ({}),
  getters: {},
  actions: {},
});
```
```typescript
import { defineStore } from "pinia";
import { TodoItem } from "../index.interface";

export const useStoreTodo = defineStore("todo", {
  state: () => ({
    todoList: [
      {
        id: 0,
        title: "청소하기",
        status: "active",
      },
      {
        id: 1,
        title: "공과금 내기",
        status: "active",
      },
      {
        id: 2,
        title: "운동 30분하기",
        status: "clear",
      },
    ] as TodoItem[],
  }),
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
    doublePlusOne() {
      return this.doubleCount + 1
    },
  },
  actions: {
    init() {
      Window.api.loadMenuList();
    }
    addTodoItem(item: TodoItem) {
      this.todoList.push(item);
    },
    removeTodoItem(id: number) {
      this.todoList.splice(id, 1);
    },
  },
});
```
