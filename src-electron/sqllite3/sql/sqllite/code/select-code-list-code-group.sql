SELECT ID,
    CODE_GROUP,
    CODE,
    CODE_NAME,
    DESCRIPTION,
    SORT_NO,
    USE_YN
FROM TB_CODE
WHERE CODE_GROUP = $keyword
ORDER BY SORT_NO