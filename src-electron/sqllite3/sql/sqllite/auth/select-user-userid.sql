SELECT ID,
  USER_ID,
  PWD,
  EMAIL,
  NAMES,
  ENAMES
FROM TB_USER
WHERE USER_ID = $keyword
  AND USE_YN = 'Y'