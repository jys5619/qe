INSERT INTO TB_USER(
    USER_ID,
    PWD,
    EMAIL,
    NAMES,
    ENAMES,
    EMNO,
    AUTH,
    USE_YN
  )
VALUES (
    ${ userId },
    '1111',
    ${ email },
    ${ names },
    ${ enames },
    ${ emno },
    ${ auth },
    ${ useYn }
  )
