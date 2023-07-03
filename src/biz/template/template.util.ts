import { ITemplate, ITemplateVar } from './template.entity';

const convertTemplate = (source: ITemplate, sourceVarList : ITemplateVar[]) => {
  // openFolderName  :   "components"
  // openPath  :   "D:/dev/workspace/qe/src"
  // path  :   "D:/dev/workspace/qe/src/components/table/QeTable.vue"
  // relativePath  :   "table/QeTable.vue"
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

  return template;
};

// 변환 전 : My Visitor Count
// Camel Case(카멜 케이스) - 변환 후 : myVisitorCount
// Pascal Case(파스킬 케이스) - 변환 후 : MyVisitorCount
// Kebab Case(케밥 케이스) - 변환 후 : my-visitor-count
// Snake Case(스네이크 케이스) - 변환 후 : my_visitor_count
// Upper Snake Case(스네이크 케이스) - 변환 후 : MY_VISITOR_COUNT

// 기본 snake에서 변환 시킨다.

// 띄워쓰기로 단어구분
const sentenceToSnake = (string = '') => {
  return (string || '').toLowerCase().replace(/([A-Z])/g, (match, group) => ` ${group.toLowerCase()}`).replace(/ +_*/g, '_').replace(/(^_*|_*$)/g, '');
}

// camel -> snake
const camelToSnake = (string = '') => {
  return (string || '').replace(/([A-Z])/g, (match, group) => `_${group.toLowerCase()}`).replace(/^_/, '');
}

// snake -> camel
const snakeToCamel = (string = '') => {
   return (string || '').replace(/(_\w)/g, (match, group) => group.toUpperCase());
}

// snake -> Pascal
const snakeToPascal = (string = '') => {
  return ((string && `_${string}`) || '').replace(/(_\w)/g, (match, group) => group.toUpperCase());
}

// snake -> Kebab
const snakeToKebab = (string = '') => {
  return (string || '').replace(/(_)/g, '-');
}


// snake -> Kebab
const snakeToUpper = (string = '') => {
  return (string || '').toUpperCase();
}


const templateUtil = {
  convertTemplate,
};

export { templateUtil };
