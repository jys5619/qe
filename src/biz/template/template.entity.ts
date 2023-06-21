export type TemplateType = 'source' | 'template';

export interface ITemplate {
  id: number;
  templateType: TemplateType,
  fileName: string;
  extension: string;
  relativePath: string;
  contents: string;
  useYn: string;
}
