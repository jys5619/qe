import { strUtil } from '../utils/str.util';
import { ConvertTextType, IConvertText, ITemplate, ISourceVariable, convertTextKeys, ITemplateVariable } from './template.entity';

const makeTemplateList = (sourceList: ITemplate[], sourceVariableList : ISourceVariable[]): ITemplate[] => {
  if ( !sourceVariableList || sourceVariableList.length === 0) return sourceList;

  // 1. convert-text convert value setting
  sourceVariableList.forEach((variable:ISourceVariable) => {
    if ( variable.dataType === 'convert-text') {
      variable.convertText = getConvertText(variable.targetString)
    }
  });

  // 2. path, context 적용변수 분리
  const pathVariableList = sourceVariableList.filter((v:ISourceVariable) => v.target === 'path' || v.target === 'all');
  const contextVariableList = sourceVariableList.filter((v:ISourceVariable) => v.target === 'source' || v.target === 'all');

  const templateList: ITemplate[] = [];
  sourceList.forEach((source: ITemplate) => {
    const template: ITemplate = makeTemplate(source, pathVariableList, contextVariableList);
    templateList.push(template);
  });

  return templateList;
};

const makeVariableList = (sourceVariableList: ISourceVariable[]): ITemplateVariable[] => {
  const templateVariableList: ITemplateVariable[] = [];

  sourceVariableList.forEach((variable:ISourceVariable) => {
    if ( variable.dataType === 'convert-text') {
      const templateVariable: ITemplateVariable = {
        id: variable.id,
        variableId: variable.variableId,
        dataType: variable.dataType,
        target: variable.target,
        value: variable.selectList || variable.changeString || '',
      }
      templateVariableList.push(templateVariable);
    }
  });

  return templateVariableList;
}

const makeTemplate = (source: ITemplate, pathVariableList : ISourceVariable[], sourceVariableList : ISourceVariable[]): ITemplate => {
  const template: ITemplate = {...source, templateType: 'template'};

  // 2. path convert
  // 2.1 openFolderName convert
  template.openFolderName = convertVariableStr(source.openFolderName, pathVariableList);

  // 2.2 relativePath convert
  template.relativePath = convertVariableStr(source.relativePath, pathVariableList);

  // 2.3 path convert
  //template.path = source.openPath + '/' + template.openFolderName + '/' + template.relativePath;

  // 3. source convert
  // 3.1 source escape
  template.contents = convertVariableStr(strUtil.escapeHtml(source.contents), sourceVariableList);

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
  const snakeNames = strUtil.convert.normalToSnake(normalText);

  const textVariable: IConvertText = {
    normal: normalText,
    snake: snakeNames,
    camel: strUtil.convert.snakeToCamel(snakeNames),
    pascal: strUtil.convert.snakeToPascal(snakeNames),
    kebab: strUtil.convert.snakeToKebab(snakeNames),
    SNAKE: strUtil.convert.snakeToUpper(snakeNames),
  };

  return textVariable;
}

const convertVariableStr = (context: string, variableList : ISourceVariable[]): string => {
  let templateString = context;
  let spaceString = context;

  variableList.forEach((variable: ISourceVariable) => {
    if ( variable.dataType === 'convert-text' ) {
      convertTextKeys.forEach((convertTextKey: ConvertTextType) => {
        let startIndex = -1;
        const searchText = variable.convertText?.[convertTextKey] || '';
        const templateKey = `<qe:${variable.variableId}.${convertTextKey}>`;

        while ( (startIndex = spaceString.indexOf(searchText)) > -1 ) {
          spaceString = spaceString.substring(0, startIndex) + ''.padEnd(templateKey.length, ' ') + spaceString.substring(startIndex + searchText.length);
          templateString = templateString.substring(0, startIndex) + templateKey + templateString.substring(startIndex + searchText.length);
        }
      });
    } else {
      let startIndex = -1;
      const searchText = variable.targetString;
      const templateKey = `<qe:${variable.variableId}>`;

      while ( (startIndex = spaceString.indexOf(searchText)) > -1 ) {
        spaceString = spaceString.substring(0, startIndex) + ''.padEnd(templateKey.length, ' ') + spaceString.substring(startIndex + searchText.length);
        templateString = templateString.substring(0, startIndex) + templateKey + templateString.substring(startIndex + searchText.length);
      }
    }
  });

  return templateString;
};

const templateUtil = {
  makeTemplateList,
  makeVariableList,
};

export { templateUtil };
