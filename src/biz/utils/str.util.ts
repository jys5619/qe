const replaceAll = (str: string, search: string, replacement: string) => {
  return str.split(search).join(replacement);
};

/**
 * [&, Tag, ", ']가 포함된 문자열을 escape문자열로 변환한다.
 * @param html [&, Tag, ", ']가 포함된 문자열
 * @returns  & -> &amp;, < -> &lt;, > -> &gt;, " -> &quot;, ' -> &#039;
 */
const escapeHtml = (html: string) => {
  const map: {[key: string]: string} = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return html.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * [&amp;, &lt;, &quot;, &#039;]가 포함된 문자열을 unescape문자열로 변환한다.
 * @param unhtml [&amp;, &lt;, &quot;, &#039;]가 포함된 문자열
 * @returns  &amp; -> &, &lt; -> <, &gt; -> >, &quot; -> ", &#039 -> ';
 */
const unescapeHtml = ( unhtml: string ) => {
  // const doc = new DOMParser().parseFromString(unhtml, 'text/html');
  // return doc.documentElement.textContent;
  let temp = replaceAll(unhtml, '&#039;', "'");
  temp = replaceAll(temp, '&quot;', '"');
  temp = replaceAll(temp, '&gt;', '>');
  temp = replaceAll(temp, '&lt;', '<');
  temp = replaceAll(temp, '&amp;', '&');
  return temp;
};

/**
 * All -> camel
 * 모든문자열 -> sample_data_input
 **/
const allToSnake = (string = '') => {
  let snakeText = '';

  if ( string.indexOf(' ') > -1 ) {
    snakeText = normalToSnake(string);
  } else if ( string.indexOf('_') > -1 ) {
    snakeText = string.toLowerCase();
  } else if ( string.indexOf('-') > -1 ) {
    snakeText = replaceAll(string, '-', '_').toLowerCase();
  } else if ( string.indexOf('-') > -1 ) {
    snakeText = replaceAll(string, '-', '_').toLowerCase();
  } else {
    snakeText = camelToSnake(string.substring(0, 1).toLowerCase() + string.substring(1));
  }

  return snakeText;
};

/**
 * 띄워쓰기 문장 -> camel
 * Sample Data Input -> sample_data_input
 **/
const normalToSnake = (string = '') => {
  return (string || '').toLowerCase().replace(/([A-Z])/g, (match, group) => ` ${group.toLowerCase()}`).replace(/ +_*/g, '_').replace(/(^_*|_*$)/g, '');
};

/**
 * snake -> 띄워쓰기 문장
 * sample_data_input -> Sample Data Input
 **/
const snakeToNormal = (string = '') => {
  return ('_' + string || '').replace(/(_\w)/g, (match, group) => ` ${group[1].toUpperCase()}`);
};

/**
 * camel -> snake
 * sampleDataInput -> sample_data_input
 **/
const camelToSnake = (string = '') => {
  return (string || '').replace(/([A-Z])/g, (match, group) => `_${group.toLowerCase()}`).replace(/^_/, '');
};

/**
 * snake -> camel
 * sample_data_input -> sampleDataInput
 **/
const snakeToCamel = (string = '') => {
   return (string || '').replace(/(_\w)/g, (match, group) => group[1].toUpperCase());
};

/**
 * snake -> pascal
 * sample_data_input -> SampleDataInput
 **/
const snakeToPascal = (string = '') => {
  return ((string && `_${string}`) || '').replace(/(_\w)/g, (match, group) => group[1].toUpperCase());
}

/**
 * snake -> kebab
 * sample_data_input -> sample-data-input
 **/
const snakeToKebab = (string = '') => {
  return (string || '').replace(/(_)/g, '-');
}

/**
 * snake -> snake Upper
 * sample_data_input -> SAMPLE_DATA_INPUT
 **/
const snakeToUpper = (string = '') => {
  return (string || '').toUpperCase();
}

/**
 * 맨앞 1자를 구분자로하여 배열을 반환한다.
 * @param str
 */
const split = (str: string): string[] => {
  if ( !str || str.length < 2 ) return [];
  const spliter = str.substring(0, 1);
  return str.substring(1).split(spliter);
}

const strUtil = {
  replaceAll,
  escapeHtml,
  unescapeHtml,
  convert: {
    allToSnake,
    normalToSnake,
    camelToSnake,
    snakeToNormal,
    snakeToCamel,
    snakeToPascal,
    snakeToKebab,
    snakeToUpper,
  },
  split,
};

export { strUtil };
