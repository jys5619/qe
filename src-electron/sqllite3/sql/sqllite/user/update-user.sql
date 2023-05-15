UPDATE TB_USER
SET USER_ID = ${ userId },
  EMAIL = ${ email },
  NAMES = ${ names },
  ENAMES = ${ enames },
  EMNO = ${ emno },
  AUTH = ${ auth },
  USE_YN = ${ useYn }
WHERE ID = ${ id }
