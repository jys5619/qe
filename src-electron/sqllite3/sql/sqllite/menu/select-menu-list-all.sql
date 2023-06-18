SELECT A.ID,
  A.MENU_ID,
  A.PMENU_ID,
  A.MENU_NAME,
  A.MENU_PATH,
  A.ICON,
  A.SEPARATOR_YN,
  A.SORT_NO,
  A.USE_YN,
  GROUP_CONCAT(B.AUTH, ',') AS AUTH
FROM TB_MENU A
  LEFT OUTER JOIN TB_AUTH B ON B.TARGET_TYPE = 'MENU'
  AND B.TARGET_ID = A.MENU_ID
GROUP BY A.ID,
  A.MENU_ID,
  A.PMENU_ID,
  A.MENU_NAME,
  A.MENU_PATH,
  A.ICON,
  A.SEPARATOR_YN,
  A.SORT_NO,
  A.USE_YN
ORDER BY A.PMENU_ID,
  A.SORT_NO
