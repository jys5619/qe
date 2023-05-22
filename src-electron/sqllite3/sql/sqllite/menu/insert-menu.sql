INSERT INTO TB_MENU(
    MENU_ID,
    PMENU_ID,
    MENU_NAME,
    MENU_PATH,
    ICON,
    SEPARATOR_YN,
    AUTH,
    SORT_NO,
    USE_YN
  )
VALUES (
    ${ menuId },
    ${ pmenuId },
    ${ menuName },
    ${ menuPath },
    ${ icon },
    ${ separatorYn },
    ${ auth },
    ${ soertNo },
    ${ useYn }
  )
