import endpointUtil from '../common/endpoint.util';
import { ICodeGroupDto, ICodeDto } from './dto/code.dto';
import { ICodeGroup, ICode } from './code.entity';
import { codeService } from './code.service';

/**
 * 코드그룹 목록 조회(Code Group List)
 * @param pmenuId
 * @returns
 */
async function getCodeGroupList(showNotify = true): Promise<ICodeGroup[]> {
  return endpointUtil
    .getList<ICodeGroupDto>(window.api.selectCodeGroupList(), showNotify)
    .then((datalist: ICodeGroupDto[]) => {
      return datalist.map((data: ICodeGroupDto) => {
        return codeService.convertICodeGroup(data);
      });
    });
}

/**
 * 코드 목록 조회(Code List)
 * @param pmenuId
 * @returns
 */
async function getCodeList(codeGroup: string, showNotify = true): Promise<ICode[]> {
  return endpointUtil
    .getList<ICodeDto>(window.api.selectCodeList(codeGroup), showNotify)
    .then((datalist: ICodeDto[]) => {
      return datalist.map((data: ICodeDto) => {
        return codeService.convertICode(data);
      });
    });
}

/**
 * 코드 그룹 정보 저장
 * id가 null, undefined, 1보다 작은경우 신규로 등록된다.
 * @param codeDto
 * @returns
 */
async function saveCodeGroup(codeGroup: Partial<ICodeGroup>): Promise<number> {
  const codeGroupDto = codeService.convertICodeGroupDto(codeGroup);
  return await endpointUtil.post(window.api.saveCodeGroup(codeGroupDto));
}

/**
 * 코드 정보 저장
 * id가 null, undefined, 1보다 작은경우 신규로 등록된다.
 * @param codeDto
 * @returns
 */
async function saveCode(code: Partial<ICode>): Promise<number> {
  const codeDto = codeService.convertICodeDto(code);
  return await endpointUtil.post(window.api.saveCode(codeDto));
}

const codeEndpoint = {
  getCodeGroupList,
  getCodeList,
  saveCodeGroup,
  saveCode,
};

export { codeEndpoint };
