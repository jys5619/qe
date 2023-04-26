import { ipcMain as im, dialog, SaveDialogOptions, OpenDialogOptions } from 'electron';
import { promises as fsp } from 'fs';

im.handle('saveTextFile', async (event, text:string) => {
    const options: SaveDialogOptions = {
        properties: ['createDirectory']
    }
    const r = await dialog.showSaveDialog(options);
    if (!r.filePath) throw Error('cancel');
    await fsp.writeFile(r.filePath, text);
    return r.filePath;
});

im.handle('loadTextFile', async () => {
    const options: OpenDialogOptions = {
        properties: ['openFile']
    }
    const r = await dialog.showOpenDialog(options);
    if (!r.filePaths) throw Error('cancel');
    const buf = await fsp.readFile((await r).filePaths[0]);
    return buf.toString();
});