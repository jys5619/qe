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
  const doc = new DOMParser().parseFromString(unhtml, 'text/html');
  return doc.documentElement.textContent;
};

/**
 * 띄워쓰기 문장 -> camel
 * 'Sample Data Input -> sample_data_input
 **/
const normalToSnake = (string = '') => {
  return (string || '').toLowerCase().replace(/([A-Z])/g, (match, group) => ` ${group.toLowerCase()}`).replace(/ +_*/g, '_').replace(/(^_*|_*$)/g, '');
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
   return (string || '').replace(/(_\w)/g, (match, group) => group.toUpperCase());
};

/**
 * snake -> Pascal
 * sample_data_input -> SampleDataInput
 **/
const snakeToPascal = (string = '') => {
  return ((string && `_${string}`) || '').replace(/(_\w)/g, (match, group) => group.toUpperCase());
}

/**
 * snake -> Kebab
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

const strUtil = {
  escapeHtml,
  unescapeHtml,
  convert: {
    normalToSnake,
    camelToSnake,
    snakeToCamel,
    snakeToPascal,
    snakeToKebab,
    snakeToUpper,
  }
};

export { strUtil };
