import endpointUtil from '../common/endpoint.util';
import { IMenuDto } from './dto/menu.dto';
import { IMenu } from './menu.entity';
import { menuService } from './menu.service';

/**
 * 메뉴 목록 조회(Parent Menu Id)
 * @param pmenuId
 * @returns
 */
async function getMenuList(pmenuId: string | undefined, showNotify = true): Promise<IMenu[]> {
  return endpointUtil
    .getList<IMenuDto>(window.api.selectMenuList(pmenuId || ''), showNotify)
    .then((datalist: IMenuDto[]) => {
      return datalist.map((data: IMenuDto) => {
        return menuService.convertIMenu(data);
      });
    });
}

/**
 * 메뉴 목록 조회(User Id)
 * @param searchKeyword
 * @returns
 */
async function getMyMenuList(userid: string): Promise<IMenu[]> {
  return endpointUtil
    .getList<IMenuDto>(window.api.selectMyMenuList(userid))
    .then((datalist: IMenuDto[]) => {
      return datalist.map((data: IMenuDto) => {
        return menuService.convertIMenu(data);
      });
    });
}

/**
 * 메뉴 정보 저장
 * id가 null, undefined, 1보다 작은경우 신규로 등록된다.
 * @param menuDto
 * @returns
 */
async function saveMenu(menu: Partial<IMenu>): Promise<number> {
  const menuDto = menuService.convertIMenuDto(menu);
  return await endpointUtil.post(window.api.saveMenu(menuDto));
}

const menuEndpoint = {
  getMenuList,
  getMyMenuList,
  saveMenu,
};

export { menuEndpoint };
