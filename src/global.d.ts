import { IMenu } from './stores/menu.interface';

export {}

declare global {
  interface Window {
    api: {
      saveTextFile (text:string): Promise<string>;
      loadTextFile (): Promise<string>;
    };
    qeDb: {
      testConnect (): Promise<string>;
      selectMenuList (): Promise<IMenu[]>;
    };
  }
}
