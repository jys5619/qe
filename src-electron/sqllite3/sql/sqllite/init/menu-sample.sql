INSERT
  OR REPLACE INTO TB_MENU
VALUES (
    1,
    'myDesk',
    'MAIN',
    'My Desk',
    NULL,
    NULL,
    NULL,
    1,
    'Y'
  ),
  (
    2,
    'project',
    'MAIN',
    'Project',
    NULL,
    NULL,
    NULL,
    2,
    'Y'
  ),
  (
    3,
    'program',
    'MAIN',
    'Program',
    NULL,
    NULL,
    NULL,
    3,
    'Y'
  ),
  (
    4,
    'data',
    'MAIN',
    'Data',
    NULL,
    NULL,
    NULL,
    4,
    'Y'
  ),
  (
    5,
    'admin',
    'MAIN',
    'Admin',
    NULL,
    NULL,
    NULL,
    5,
    'Y'
  ),
  (
    6,
    'sample',
    'MAIN',
    'Sample',
    NULL,
    NULL,
    NULL,
    6,
    'Y'
  ),
  (
    7,
    'mySetting',
    'myDesk',
    'Setting',
    NULL,
    'settings',
    'N',
    1,
    'Y'
  ),
  (
    8,
    'projectSetting',
    'project',
    'Setting',
    NULL,
    'settings',
    'N',
    1,
    'Y'
  ),
  (
    9,
    'programSetting',
    'program',
    'Setting',
    NULL,
    'settings',
    'N',
    1,
    'Y'
  ),
  (
    10,
    'dataSetting',
    'data',
    'Setting',
    NULL,
    'settings',
    'N',
    1,
    'Y'
  ),
  (
    11,
    'adminSetting',
    'admin',
    'Setting',
    '/admin/setting',
    'settings',
    'N',
    1,
    'Y'
  ),
  (
    12,
    'adminCode',
    'admin',
    'User',
    '/admin/code',
    'code',
    'N',
    2,
    'Y'
  ),
  (
    13,
    'adminUser',
    'admin',
    'User',
    '/admin/user',
    'perm_identity',
    'N',
    3,
    'Y'
  ),
  (
    14,
    'adminMenu',
    'admin',
    'Menu',
    '/admin/menu',
    'menu',
    'N',
    4,
    'Y'
  ),
  (
    15,
    'sampleIcon',
    'sample',
    'Icon',
    '/sample/icon',
    'delete',
    'N',
    1,
    'Y'
  ),
  (
    16,
    'sampleSingleSearchForm',
    'sample',
    'Single Search Form',
    '/sample/single-search-form',
    'search',
    'N',
    2,
    'Y'
  ),
  (
    17,
    'sampleSingleSearchFormSide',
    'sample',
    'Single Search Form & Side',
    '/sample/single-search-form-side',
    'search',
    'N',
    3,
    'Y'
  )