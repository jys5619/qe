SELECT A.ID,
  A.USER_ID,
  A.PWD,
  A.EMAIL,
  A.NAMES,
  A.ENAMES,
  A.USE_YN,
  GROUP_CONCAT(B.AUTH, ',') AS AUTH
FROM TB_USER A,
  TB_AUTH B
WHERE (
    A.USER_ID LIKE '%' || $keyword || '%'
    OR A.NAMES LIKE '%' || $keyword || '%'
    OR A.ENAMES LIKE '%' || $keyword || '%'
  )
  AND B.TARGET_TYPE = 'USER'
  AND B.TARGET_ID = A.ID
GROUP BY A.ID,
  A.USER_ID,
  A.PWD,
  A.EMAIL,
  A.NAMES,
  A.ENAMES,
  A.USE_YN
ORDER BY A.NAMES