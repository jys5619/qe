type TemplateType = 'source' | 'template';

interface ITemplateInfo {
  id: number;
  templateTitle: string;
  templateType: string;
}

interface ITemplateInfoDto {
  id: number;
  templateTitle: string;
  templateType: string;
}

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

const ConvertTextObject = {
  normal: '',
  snake: '',
  camel: '',
  pascal: '',
  kebab: '',
  SNAKE: '',
};
type IConvertText = typeof ConvertTextObject;
type ConvertTextType = keyof IConvertText;
const convertTextKeys = Object.keys(ConvertTextObject) as ConvertTextType[];

type TemplateDataType = 'convert-text' | 'text' | 'date' | 'select' | 'function';

interface ISourceVariable {
  id: number;
  dataType: TemplateDataType;
  target: 'path' | 'source' | 'all';
  variableId: string;
  targetString: string;
  title: string;
  description: string;
  convertText?: IConvertText;
  selectList?: string; // select 일때 입력
  dateFormat?: string; // data 일때 입력
  delYn?: true | false | undefined | null;
  viewData: boolean;
}


interface ITemplateVariable {
  id: number;
  variableId: string;
  dataType: TemplateDataType;
  target: 'path' | 'source' | 'all';
  value?: string;
}


interface ITemplateVariableDto {
  id: number;
  variableId: string;
  dataType: TemplateDataType;
  target: 'path' | 'source' | 'all';
  value?: string;
}

export type {
  ITemplateInfo,
  ITemplateInfoDto,
  TemplateType,
  ITemplate,
  ITemplateDto,
  ISourceVariable,
  ITemplateVariable,
  ITemplateVariableDto,
  TemplateDataType,
  IConvertText,
  ConvertTextType
};
export { convertTextKeys, ConvertTextObject };
