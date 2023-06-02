UPDATE TB_CODE_GROUP
SET CODE_GROUP = ${ codeGroup },
  CODE_GROUP_NAME = ${ codeGroupName },
  DESCRIPTION = ${ description },
  MEMORY_YN = ${ memoryYn },
  SORT_NO = ${ sortNo },
  USE_YN = ${ useYn }
WHERE ID = ${ id }
