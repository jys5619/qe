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

type TemplateDataType = 'convert-text' | 'text' | 'date' | 'select' | 'check' | 'function';

interface ISourceVariable {
  id: string;
  title: string;
  description: string;
  targetString: string;
  target: 'path' | 'source' | 'all';
  dataType: TemplateDataType;
  convertText?: IConvertText;
  selectList?: string; // select 일때 입력
  dateFormat?: string; // data 일때 입력
}


interface ITemplateVariable {
  id: string;
  dataType: TemplateDataType;
  target: 'path' | 'source' | 'all';
  value?: string;
}

export type { TemplateType, ITemplate, ITemplateDto, ISourceVariable, ITemplateVariable, TemplateDataType, IConvertText, ConvertTextType };
export { convertTextKeys, ConvertTextObject };
