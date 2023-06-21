import { QTreeNode } from 'quasar';
import { ValidateResult } from '../common/common';
import { ITemplateDto } from './dto/template.dto';
import { ITemplate, TemplateType } from './template.entity';

const isITemplate = (obj: any): obj is ITemplate => {
  return (
    'id' in obj &&
    'templateType' in obj &&
    'name' in obj &&
    'extension' in obj &&
    'relativePath' in obj &&
    'contents' in obj
  );
};

const getITemplateInitValue = (templateType: TemplateType): ITemplate => {
  return {
    id: -1,
    templateType: templateType,
    fileName: '',
    extension: '',
    relativePath: '',
    contents: '',
  } as ITemplate;
};

const convertITemplate = (templateDto?: ITemplateDto): ITemplate => {
  const template = getITemplateInitValue('template');

  if ( templateDto ) {
    template.id = templateDto.id;
    template.templateType = templateDto.templateType;
    template.fileName = templateDto.fileName;
    template.extension = templateDto.extension;
    template.relativePath = templateDto.relativePath;
    template.contents = templateDto.contents || '';
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
    templateType: template.templateType || 'template',
    fileName: template.fileName || '',
    extension: template.extension || '',
    relativePath: template.relativePath || '',
    contents: template.contents || '',
    useYn: template.useYn || '',
  };

  return templateDto;
};

/**
 * INSERT VALIDATION
 */
const validate = (template: Partial<ITemplate>): ValidateResult => {
  const result = new ValidateResult();

  if (!template.templateType) {
    result.setMsg('templateType', 'templateType empty. (source | template)');
  }

  if (!template.fileName) {
    result.setMsg('name', 'name empty.');
  }

  if (!template.extension) {
    result.setMsg('extension', 'extension empty.');
  }

  if (!template.relativePath) {
    result.setMsg('relativePath', 'relativePath empty.');
  }

  return result;
};


const getSourceList = (files: ReadonlyArray<File>): ITemplate[] => {
  const sourceList = [] as ITemplate[];
  files.forEach((file) => {
    const source = templateService.getITemplateInitValue('source');
    source.fileName = file.name;
    source.extension = file.name.substring(file.name.lastIndexOf('.') + 1);
    source.relativePath = file.webkitRelativePath.substring(file.webkitRelativePath.indexOf('/') + 1);
    sourceList.push(source);
  });

  return sourceList;
};

const getRootNode = (): QTreeNode => {
  return {
    label: 'Source Files',
    icon: 'folder',
    iconColor: 'orange',
    children: []
  } as QTreeNode;
}

const getTreeData = (templateList: ITemplate[]): QTreeNode => {
  const rootNode = getRootNode();

  for ( const template of templateList) {
    appendTree(rootNode, template);
  }

  return rootNode;
};

const appendTree = (rootNode: QTreeNode, template: ITemplate) => {
  const paths = template.relativePath.split('/');
  let node = rootNode;
  for ( const path of paths) {

    if ( !!node.children ) {
      if ( path === template.fileName ) {
        // append new file
        const newFile = {
          label: template.fileName,
          icon: 'code', //template.extension,
          iconColor: 'purple'
        } as QTreeNode;
        node.children.push(newFile);
      } else {
        const findNodes = node.children.filter((n:QTreeNode) => n.label === path);
        if ( findNodes && findNodes.length > 0 ) {
          // exists folder
          node = findNodes;
        } else {
          // append new folder
          const newNode = {
            label: path,
            icon: 'folder',
            iconColor: 'orange',
            children: [],
          } as QTreeNode;
          node.children.push(newNode);
          node = newNode;
        }
      }
    }
  }
};

function setFileContents(file: File, source: ITemplate, encoding = 'UTF-8') {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    source.contents = fileReader.result as string;
  }
  fileReader.readAsText(file, encoding);
}

const templateService = {
  isITemplate,
  getITemplateInitValue,
  convertITemplate,
  convertITemplateDto,
  validate,
  getRootNode,
  getSourceList,
  getTreeData,
  setFileContents,
};

export { templateService };
