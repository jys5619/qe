SELECT ID,
  MENU_ID,
  PMENU_ID,
  MENU_NAME,
  MENU_PATH,
  ICON,
  SEPARATOR_YN,
  AUTH,
  SORT_NO,
  USE_YN
FROM TB_MENU
WHERE PMENU_ID = $keyword
ORDER BY SORT_NO
