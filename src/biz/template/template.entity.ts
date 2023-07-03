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

interface ITemplateVar {
  id: number;
  varId: string;
}

interface ITemplateVardto {
  id: number;
  varId: string;
}

export { TemplateType, ITemplate, ITemplateDto, ITemplateVar, ITemplateVardto };
