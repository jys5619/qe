INSERT INTO TB_USER(
    USER_ID,
    PWD,
    EMAIL,
    NAMES,
    ENAMES,
    USE_YN
  )
VALUES (
    $ { userId },
    '1111',
    $ { email },
    $ { names },
    $ { enames },
    $ { useYn }
  )