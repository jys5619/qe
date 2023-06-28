import { TemplateType } from '../template.entity';

export interface ITemplateDto {
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
