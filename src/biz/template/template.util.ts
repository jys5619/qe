import { strUtil } from '../utils/str.util';
import { ConvertVariableArray, ITemplate, ITemplateVariable } from './template.entity';

const makeTemplateList = (sourceList: ITemplate[], variableList : ITemplateVariable[]): ITemplate[] => {
  if ( !variableList || variableList.length === 0) return sourceList;

  // 1. variableId convert value setting
  variableList.forEach((v:ITemplateVariable) => {

    const normalName = v.normalName || '';
    const snakeNames = strUtil.convert.normalToSnake(normalName);;

    v.variableId = strUtil.convert.snakeToCamel(snakeNames);

    if ( v.type === 'text' ) {
      v.textVariable.normal = normalName;
      v.textVariable.snake = snakeNames;
      v.textVariable.camel = strUtil.convert.snakeToCamel(snakeNames);
      v.textVariable.pascal = strUtil.convert.snakeToPascal(snakeNames);
      v.textVariable.kebab = strUtil.convert.snakeToKebab(snakeNames);
      v.textVariable.SNAKE = strUtil.convert.snakeToUpper(snakeNames);
    }
  });

  const pathVariableList = variableList.filter((v:ITemplateVariable) => v.target === 'path' || v.target === 'all');
  const sourceVariableList = variableList.filter((v:ITemplateVariable) => v.target === 'source' || v.target === 'all');

  const templateList: ITemplate[] = [];
  sourceList.forEach((source: ITemplate) => {
    const template: ITemplate = makeTemplate(source, pathVariableList, sourceVariableList);
    templateList.push(template);
  });

  return templateList;
};

const makeTemplate = (source: ITemplate, pathVariableList : ITemplateVariable[], sourceVariableList : ITemplateVariable[]): ITemplate => {

  const template: ITemplate = {
    id: -1,
    templateType: 'template',
    fileName: '',
    extension: '',
    relativePath: '',
    openPath: '',
    openFolderName: '',
    path: '',
    contents: '',
    useYn: '',
  };

  // 2. path convert

  // 2.1 openFolderName convert
  template.openFolderName = convertVariableStr(source.openFolderName, pathVariableList);

  // 2.2 relativePath convert
  template.relativePath = convertVariableStr(source.relativePath, pathVariableList);

  // 2.3 path convert

  // 3. source convert


  // 3.1 source escape
  // 3.2 sourceVarList 적용

  // openFolderName  :   "components"
  // openPath  :   "D:/dev/workspace/qe/src"
  // path  :   "D:/dev/workspace/qe/src/components/table/QeTable.vue"
  // relativePath  :   "table/QeTable.vue"

  return template;
};

const convertVariableStr = (names: string, variableList : ITemplateVariable[]): string => {
  if ( !names ) return '';

  let resultStr = names;
  let varKeys: {[key: string]: string};

  // type === 'text'
  const textVariableList = variableList.filter((v:ITemplateVariable) => v.type === 'text');

  let findText = '';
  let variableId = '';
  let keyName = '';

  textVariableList.forEach((v: ITemplateVariable) => {
    varKeys = {};
    for ( const variableType of ConvertVariableArray ) {
      findText = v.textVariable[variableType];
      variableId = v.variableId;

      if ( resultStr.indexOf(findText) > -1 ) {
        keyName = `{$${Object.keys(varKeys).length}}`
        varKeys[keyName] = `<qe:text:${variableId}:${variableType}>`;
        resultStr = resultStr.replaceAll(findText, keyName);
      }
    }
  });

  for ( const key of Object.keys(varKeys) ) {
    resultStr = resultStr.replaceAll(key, varKeys[key]);
  }

  return resultStr;
};

const templateUtil = {
  makeTemplateList,
};

export { templateUtil };
