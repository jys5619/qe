/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

import { contextBridge, ipcRenderer as ir } from 'electron';
import { IMenu, IUser } from './entity/qe.entity';

contextBridge.exposeInMainWorld('api', {
  saveTextFile(text: string) {
    return ir.invoke('saveTextFile', text);
  },

  loadTextFile() {
    return ir.invoke('loadTextFile');
  },

  // User
  selectUserList(searchKeyword: string) {
    return ir.invoke('selectUserList', searchKeyword);
  },

  saveUser(user: IUser) {
    return ir.invoke('saveUser', user);
  },

  // Menu
  selectMenuList(pmenuId: string) {
    return ir.invoke('selectMenuList', pmenuId);
  },

  selectMyMenuList(userid: string) {
    return ir.invoke('selectMyMenuList', userid);
  },

  saveMenu(menu: IMenu) {
    return ir.invoke('saveMenu', menu);
  }
});
