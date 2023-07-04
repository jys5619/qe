type TemplateType = 'source' | 'template';

interface ITemplate {
  id: number;
  templateType: TemplateType;
  fileName: string;
  extension: string;
  relativePath: string;
  openPath: string;
  openFolderName: string;
  path: string;
  contents: string;
  useYn: string;
}

interface ITemplateDto {
  id: number;
  templateType: TemplateType;
  fileName: string;
  extension: string;
  relativePath: string;
  openPath: string;
  openFolderName: string;
  path: string;
  contents: string;
  useYn: string;
}

const ConvertVariableArray: Array<string> = ['normal', 'snake', 'camel', 'pascal', 'kebab', 'SNAKE'];

interface IConvertVariable {
  normal: string;
  snake: string;
  camel: string;
  pascal: string;
  kebab: string;
  SNAKE: string;
};

interface ITemplateVariable {
  id: number;
  variableId?: string;
  normalName?: string;
  selectList?: Array<string>;
  target: 'path' | 'source' | 'all';
  type: 'text' | 'date' | 'select' | 'check' | 'function';
  textVariable?: IConvertVariable;
}

interface ITemplateVardto {
  id: number;
  varId: string;
}

export type { TemplateType, ITemplate, ITemplateDto, ITemplateVariable, ITemplateVardto };
export { ConvertVariableArray };
