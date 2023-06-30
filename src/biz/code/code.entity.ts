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

export { ICodeGroup, ICode };
