import { strUtil } from '../utils/str.util';
import { ConvertTextType, IConvertText, ITemplate, ISourceVariable, TemplateDataType, convertTextKeys, ITemplateVariable } from './template.entity';

const makeTemplateList = (sourceList: ITemplate[], variableList : ISourceVariable[]): ITemplate[] => {
  if ( !variableList || variableList.length === 0) return sourceList;

  // 1. convert-text convert value setting
  variableList.forEach((variable:ISourceVariable) => {
    if ( variable.dataType === 'convert-text') {
      variable.convertText = getConvertText(variable.targetString)
    }
  });

  const pathSourceVariableList = variableList.filter((v:ISourceVariable) => v.target === 'path' || v.target === 'all');
  const sourceVariableList = variableList.filter((v:ISourceVariable) => v.target === 'source' || v.target === 'all');

  const templateList: ITemplate[] = [];
  sourceList.forEach((source: ITemplate) => {
    const template: ITemplate = makeTemplate(source, pathSourceVariableList, sourceVariableList);
    templateList.push(template);
  });

  return templateList;
};

const makeTemplate = (source: ITemplate, pathSourceVariableList : ISourceVariable[], sourceVariableList : ISourceVariable[]): ITemplate => {
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
  const pathTemplateVariable: ITemplateVariable[] = [];

  // 2.1 openFolderName convert
  template.openFolderName = convertVariableStr(source.openFolderName, pathSourceVariableList, pathTemplateVariable);
  console.log("1-1 :", source.openFolderName);
  console.log("1-2 :", template.openFolderName);

  // 2.2 relativePath convert
  template.relativePath = convertVariableStr(source.relativePath, pathSourceVariableList, pathTemplateVariable);
  console.log("2-1 :", source.relativePath);
  console.log("2-2 :", template.relativePath);

  // 2.3 path convert
  template.path = source.openPath + '/' + template.openFolderName + '/' + template.relativePath;
  console.log("3-1 :", source.path);
  console.log("3-3 :", template.path);

  // 3. source convert

  // 3.1 source escape
  // 3.2 sourceVarList 적용

  // openFolderName  :   "components"
  // openPath  :   "D:/dev/workspace/qe/src"
  // path  :   "D:/dev/workspace/qe/src/components/table/QeTable.vue"
  // relativePath  :   "table/QeTable.vue"
  console.log(template);
  console.log(pathTemplateVariable);
  return template;
};

/**
 *
 * @param normalText 자연언어 예) 'Sample Data Input'
 * normal : Sample Data Input
 * snake  : sample_data_input
 * camel  : sampleDataInput
 * pascal : SampleDataInput
 * kebab  : sample-data-input
 * SNAKE  : SAMPLE_DATA_INPUT
 */
const getConvertText = (normalText: string) => {
  debugger;
  const snakeNames = strUtil.convert.normalToSnake(normalText);

  const textVariable: IConvertText = {
    normal: normalText,
    snake: snakeNames,
    camel: strUtil.convert.snakeToCamel(snakeNames),
    pascal: strUtil.convert.snakeToPascal(snakeNames),
    kebab: strUtil.convert.snakeToKebab(snakeNames),
    SNAKE: strUtil.convert.snakeToUpper(snakeNames),
  };

  console.log("VAL :", normalText, JSON.stringify(textVariable));

  return textVariable;
}

const convertVariableStr = (context: string, sourceVariableList : ISourceVariable[], templateVariable: ITemplateVariable[]): string => {
  let templateString = context;
  let spaceString = context;

  sourceVariableList.forEach((variable: ISourceVariable) => {
    if ( variable.dataType === 'convert-text' ) {
      convertTextKeys.forEach((convertTextKey: ConvertTextType) => {
        let startIndex = -1;
        const searchText = variable.convertText?.[convertTextKey] || '';
        const templateKey = `<qe:${variable.id}.${convertTextKey}>`;

        while ( (startIndex = spaceString.indexOf(searchText)) > -1 ) {
          spaceString = spaceString.substring(0, startIndex) + ''.padEnd(templateKey.length, ' ') + spaceString.substring(startIndex + searchText.length);
          templateString = templateString.substring(0, startIndex) + templateKey + templateString.substring(startIndex + searchText.length);
          if ( !templateVariable.some((t:ITemplateVariable) => t.id === variable.id) ) {
            templateVariable.push({
              id: variable.id,
              dataType: variable.dataType,
            });
          }
        }
      });
    } else {
      let startIndex = -1;
      const searchText = variable.targetString;
      const templateKey = `<qe:${variable.id}>`;

      while ( (startIndex = spaceString.indexOf(searchText)) > -1 ) {
        spaceString = spaceString.substring(0, startIndex) + ''.padEnd(templateKey.length, ' ') + spaceString.substring(startIndex + searchText.length);
        templateString = templateString.substring(0, startIndex) + templateKey + templateString.substring(startIndex + searchText.length);
        if ( !templateVariable.some((t:ITemplateVariable) => t.id === variable.id) ) {
          templateVariable.push({
            id: variable.id,
            dataType: variable.dataType,
            value: variable.selectList || variable.selectList,
          });
        }
      }
    }
  });

  return templateString;
};

const templateUtil = {
  makeTemplateList,
};

export { templateUtil };
