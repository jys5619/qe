DELETE FROM TB_AUTH
WHERE TARGET_TYPE = 'MENU'
  AND TARGET_ID = ${ menuId }
