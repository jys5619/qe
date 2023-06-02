import { IpcMainInvokeEvent } from 'electron';
import sqlliteDb from './common';
import { ICodeGroup, ICode } from 'app/src-electron/entity/qe.entity';

const selectCodeGroupList = (
  event: IpcMainInvokeEvent
): Promise<ICodeGroup[]> => {
  const codeGroups = sqlliteDb.all<ICodeGroup>('code/select-code-group-list');

  return codeGroups;
};

const selectCodeList = (
  event: IpcMainInvokeEvent,
  codeGroup?: string
): Promise<ICode[]> => {
  if (!codeGroup) {
    return Promise.resolve([]);
  }

  const codes = sqlliteDb.selectList<ICode, { $keyword: string }>(
    'code/select-code-list-code-group',
    { $keyword: codeGroup }
  );

  return codes;
};

const saveCodeGroup = (
  event: IpcMainInvokeEvent,
  codeGroup: ICodeGroup
): Promise<number> => {
  if (!!codeGroup.id && codeGroup.id > 0) {
    return sqlliteDb.exec('code/update-code-group', codeGroup);
  } else {
    return sqlliteDb.exec('code/insert-code-group', codeGroup);
  }
};

const saveCode = (event: IpcMainInvokeEvent, code: ICode): Promise<number> => {
  if (!!code.id && code.id > 0) {
    return sqlliteDb.exec('code/update-code', code);
  } else {
    return sqlliteDb.exec('code/insert-code', code);
  }
};

const codeDao = {
  selectCodeGroupList,
  selectCodeList,
  saveCodeGroup,
  saveCode,
};

export default codeDao;
