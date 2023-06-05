UPDATE TB_CODE
SET CODE_GROUP = ${ codeGroup },
  CODE = ${ code },
  CODE_NAME = ${ codeName },
  DESCRIPTION = ${ description },
  SORT_NO = ${ sortNo },
  USE_YN = ${ useYn }
WHERE ID = ${ id }
