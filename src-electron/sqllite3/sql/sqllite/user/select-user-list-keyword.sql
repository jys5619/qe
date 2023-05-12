SELECT ID,
  USER_ID,
  PWD,
  EMAIL,
  NAMES,
  ENAMES,
  EMNO,
  AUTH,
  USE_YN
FROM TB_USER
WHERE USER_ID LIKE '%' || $keyword || '%'
  OR NAMES LIKE '%' || $keyword || '%'
  OR ENAMES LIKE '%' || $keyword || '%'
  OR AUTH LIKE '%' || $keyword || '%'
ORDER BY NAMES
