import { ipcMain as im } from 'electron';

im.handle('testConnect', async () => {
    return 'success connected!!!';
});
