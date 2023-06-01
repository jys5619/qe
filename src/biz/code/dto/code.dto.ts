export interface ICodeGroupDto {
  id: number;
  codeGroup: string;
  codeGroupName: string;
  description?: string;
  memoryYn: string;
  sortNo?: number;
  useYn?: string;
}

export interface ICodeDto {
  id: number;
  codeGroup: string;
  code: string;
  codeName: string;
  description?: string;
  sortNo?: number;
  useYn?: string;
}
