INSERT INTO TB_AUTH(TARGET_TYPE, TARGET_ID, AUTH)
SELECT ('USER', ${ userId }, ${ auth })
