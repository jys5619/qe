UPDATE TB_MENU
SET MENU_ID = ${ menuId },
  PMENU_ID = ${ pmenuId },
  MENU_NAME = ${ menuName },
  MENU_PATH = ${ menuPath },
  ICON = ${ icon },
  SEPARATOR_YN = ${ separatorYn },
  AUTH = ${ auth },
  SORT_NO = ${ soertNo },
  USE_YN = ${ useYn }
WHERE ID = ${ id }
