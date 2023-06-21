import { TemplateType } from '../template.entity';

export interface ITemplateDto {
  id: number;
  templateType: TemplateType,
  fileName: string;
  extension: string;
  relativePath: string;
  contents: string;
  useYn: string;
}
