import { ValidateResult } from '../common/common';
import { ICodeGroup, ICode, ICodeGroupDto, ICodeDto } from './code.entity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isICodeGroup = (obj: any): obj is ICodeGroup => {
  return (
    'id' in obj &&
    'codeGroup' in obj &&
    'codeGroupName' in obj &&
    'memoryYn' in obj
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isICode = (obj: any): obj is ICode => {
  return (
    'id' in obj && 'codeGroup' in obj && 'code' in obj && 'codeName' in obj
  );
};

const getICodeGroupInitValue = (): ICodeGroup => {
  return {
    id: -1,
    codeGroup: '',
    codeGroupName: '',
    description: '',
    memoryYn: '',
    sortNo: 0,
    useYn: '',
  } as ICodeGroup;
};

const getICodeInitValue = (): ICode => {
  return {
    id: -1,
    codeGroup: '',
    code: '',
    codeName: '',
    description: '',
    sortNo: 0,
    useYn: '',
  } as ICode;
};

const convertICodeGroup = (codeGroupDto: ICodeGroupDto): ICodeGroup => {
  return {
    id: codeGroupDto.id,
    codeGroup: codeGroupDto.codeGroup,
    codeGroupName: codeGroupDto.codeGroupName,
    description: codeGroupDto.description,
    memoryYn: codeGroupDto.memoryYn,
    sortNo: codeGroupDto.sortNo,
    useYn: codeGroupDto.useYn,
  } as ICodeGroup;
};

const convertICodeGroupDto = (
  codeGroup: Partial<ICodeGroup>
): ICodeGroupDto => {
  return {
    id: codeGroup.id || '',
    codeGroup: codeGroup.codeGroup || '',
    codeGroupName: codeGroup.codeGroupName || '',
    description: codeGroup.description || '',
    memoryYn: codeGroup.memoryYn || '',
    sortNo: codeGroup.sortNo || '',
    useYn: codeGroup.useYn || '',
  } as ICodeGroupDto;
};

const convertICode = (codeDto: ICodeDto): ICode => {
  return {
    id: codeDto.id,
    codeGroup: codeDto.codeGroup,
    code: codeDto.code,
    codeName: codeDto.codeName,
    description: codeDto.description,
    sortNo: codeDto.sortNo,
    useYn: codeDto.useYn,
  } as ICode;
};

const convertICodeDto = (code: Partial<ICode>): ICodeDto => {
  return {
    id: code.id || '',
    codeGroup: code.codeGroup || '',
    code: code.code || '',
    codeName: code.codeName || '',
    description: code.description || '',
    sortNo: code.sortNo || '',
    useYn: code.useYn || '',
  } as ICodeDto;
};

const validateCodeGroup = (codeGroup: Partial<ICodeGroup>): ValidateResult => {
  const result = new ValidateResult();

  if (!codeGroup.codeGroup) {
    result.setMsg('codeGroup', 'Code Group empty.');
  }

  if (!codeGroup.codeGroupName) {
    result.setMsg('codeGroupName', 'Code Group Name Id empty.');
  }

  if (!codeGroup.memoryYn) {
    result.setMsg('memoryYn', 'Memory Load empty.');
  }
  return result;
};

const validateCode = (code: Partial<ICode>): ValidateResult => {
  const result = new ValidateResult();

  if (!code.codeGroup) {
    result.setMsg('codeGroup', 'Code Group empty.');
  }

  if (!code.code) {
    result.setMsg('code', 'Code empty.');
  }

  if (!code.codeName) {
    result.setMsg('codeName', 'Code Name empty.');
  }

  return result;
};

const codeService = {
  isICodeGroup,
  isICode,
  getICodeGroupInitValue,
  getICodeInitValue,
  convertICodeGroup,
  convertICode,
  convertICodeGroupDto,
  convertICodeDto,
  validateCodeGroup,
  validateCode,
};

export { codeService };
