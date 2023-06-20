import { ValidateResult } from '../common/common';
import { ITemplateDto } from './dto/template.dto';
import { ITemplate } from './template.entity';

const isITemplate = (obj: any): obj is ITemplate => {
  return (
    'id' in obj &&
    'name' in obj &&
    'extension' in obj &&
    'relativePath' in obj &&
    'source' in obj &&
    'template' in obj
  );
};

const getITemplateInitValue = (): ITemplate => {
  return {
    id: -1,
    name: '',
    extension: '',
    relativePath: '',
    source: '',
    template: '',
  } as ITemplate;
};

const convertITemplate = (templateDto?: ITemplateDto): ITemplate => {
  const template = getITemplateInitValue();

  if ( templateDto ) {
    template.id = templateDto.id;
    template.name = templateDto.name;
    template.extension = templateDto.extension;
    template.relativePath = templateDto.relativePath;
    template.source = templateDto.source || '';
    template.template = templateDto.template;
    template.useYn = templateDto.useYn;
  }

  return template;
};

/**
 * ITemplate => ITemplateDto
 * @param template
 * @returns
 */
const convertITemplateDto = (template: Partial<ITemplate>): ITemplateDto => {
  const templateDto: ITemplateDto = {
    id: template.id || -1,
    name: template.name || '',
    extension: template.extension || '',
    relativePath: template.relativePath || '',
    source: template.source || '',
    template: template.template || '',
    useYn: template.useYn || '',
  };

  return templateDto;
};

/**
 * INSERT VALIDATION
 */
const validate = (template: Partial<ITemplate>): ValidateResult => {
  const result = new ValidateResult();

  if (!template.name) {
    result.setMsg('name', 'name empty.');
  }

  if (!template.extension) {
    result.setMsg('extension', 'extension empty.');
  }

  if (!template.relativePath) {
    result.setMsg('relativePath', 'relativePath empty.');
  }

  if (!template.source) {
    result.setMsg('source', 'source empty.');
  }

  return result;
};

const templateService = {
  isITemplate,
  getITemplateInitValue,
  convertITemplate,
  convertITemplateDto,
  validate,
};

export { templateService };
