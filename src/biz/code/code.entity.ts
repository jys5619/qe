interface ICodeGroup {
  id: number;
  codeGroup: string;
  codeGroupName: string;
  description?: string;
  memoryYn: string;
  sortNo?: number;
  useYn?: string;
}

interface ICode {
  id: number;
  codeGroup: string;
  code: string;
  codeName: string;
  description?: string;
  sortNo?: number;
  useYn?: string;
}
interface ICodeGroupDto {
  id: number;
  codeGroup: string;
  codeGroupName: string;
  description?: string;
  memoryYn: string;
  sortNo?: number;
  useYn?: string;
}

interface ICodeDto {
  id: number;
  codeGroup: string;
  code: string;
  codeName: string;
  description?: string;
  sortNo?: number;
  useYn?: string;
}

export { ICodeGroup, ICode, ICodeGroupDto, ICodeDto };
