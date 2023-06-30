/* eslint-disable @typescript-eslint/no-explicit-any */
import { QTreeNode } from 'quasar';
import { ValidateResult } from '../common/common';
import { ITemplate, TemplateType, ITemplateDto } from './template.entity';

const isITemplate = (obj: any): obj is ITemplate => {
  return (
    'id' in obj &&
    'templateType' in obj &&
    'name' in obj &&
    'extension' in obj &&
    'relativePath' in obj &&
    'openPath' in obj &&
    'openFolderName' in obj &&
    'path' in obj &&
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
    openPath: '',
    openFolderName: '',
    path: '',
    contents: '',
    useYn: '',
  } as ITemplate;
};

const convertITemplate = (templateDto?: ITemplateDto): ITemplate => {
  const template = getITemplateInitValue('template');

  if (templateDto) {
    template.id = templateDto.id;
    template.templateType = templateDto.templateType;
    template.fileName = templateDto.fileName;
    template.extension = templateDto.extension;
    template.relativePath = templateDto.relativePath;
    template.openPath = templateDto.openPath;
    template.openFolderName = templateDto.openFolderName;
    template.path = templateDto.path;
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
    openPath: template.openPath || '',
    openFolderName: template.openFolderName || '',
    path: template.path || '',
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

const getSourceList = (
  files: ReadonlyArray<File>,
  openFolderName: string,
  openPath: string
): ITemplate[] => {
  const sourceList = [] as ITemplate[];
  files.forEach((file) => {
    const source = templateService.getITemplateInitValue('source');
    source.fileName = file.name;
    source.extension = file.name.substring(file.name.lastIndexOf('.') + 1);
    source.relativePath = file.webkitRelativePath.substring(
      file.webkitRelativePath.indexOf('/') + 1
    );
    source.openFolderName = openFolderName;
    source.openPath = openPath;
    source.path =
      source.openPath + '/' + source.openFolderName + '/' + source.relativePath;
    sourceList.push(source);
  });

  return sourceList;
};

const getFolderNode = (
  label: string,
  params: { [index: string]: any } = {}
): QTreeNode => {
  return {
    label: label,
    icon: 'folder',
    iconColor: 'orange',
    children: [],
    type: 'folder',
    ...params,
  } as QTreeNode;
};

const getFileNode = (
  label: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: { [index: string]: any } = {}
): QTreeNode => {
  return {
    label: label,
    icon: 'code',
    iconColor: 'purple',
    type: 'file',
    ...params,
  } as QTreeNode;
};

const getTreeData = (templateList: ITemplate[]): QTreeNode => {
  if (templateList.length === 0) return {};

  const openFolderNode = getFolderNode(templateList[0].openFolderName, {
    path: `${templateList[0].openPath}/${templateList[0].openFolderName}`,
  });

  for (const template of templateList) {
    appendTree(openFolderNode, template);
  }

  return openFolderNode;
};

const appendTree = (rootNode: QTreeNode, template: ITemplate) => {
  const paths = template.relativePath.split('/');
  let node = rootNode;
  for (const path of paths) {
    if (!!node.children) {
      if (path === template.fileName) {
        // append new file
        node.children.push(
          getFileNode(template.fileName, { path: `${node['path']}/${path}` })
        );
      } else {
        const findNodes = node.children.filter(
          (n: QTreeNode) => n.label === path
        );
        if (findNodes && findNodes.length > 0) {
          // exists folder
          node = findNodes[0];
        } else {
          // append new folder
          const newNode = getFolderNode(path, {
            path: `${node['path']}/${path}`,
          });
          node.children.push(newNode);
          node = newNode;
        }
      }
    }
  }
};

const deleteTreeNode = (path: string, node: QTreeNode): boolean => {
  if (node.children?.some((c: QTreeNode) => c.path === path)) {
    const filterList = node.children?.filter((c: QTreeNode) => c.path !== path);
    node.children = [...filterList];
    return true;
  }

  if (!node.children) return false;

  let result = false;

  for (const child of node.children) {
    if (child.type === 'folder') {
      result = deleteTreeNode(path, child);
      if (result) {
        return true;
      }
    }
  }

  return result;
};

/**
 * file contents load
 */
const setFileContents = (file: File, source: ITemplate, encoding = 'UTF-8') => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    source.contents = fileReader.result as string;
  };
  fileReader.readAsText(file, encoding);
};

const templateService = {
  isITemplate,
  getITemplateInitValue,
  convertITemplate,
  convertITemplateDto,
  validate,
  getFolderNode,
  getSourceList,
  getTreeData,
  setFileContents,
  deleteTreeNode,
};

export { templateService };
