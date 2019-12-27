// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  // {
  //   name: '反馈',
  //   path: 'https://github.com/alibaba/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'message',
  // },
  // {
  //   name: '帮助',
  //   path: 'https://alibaba.github.io/ice',
  //   external: true,
  //   newWindow: true,
  //   icon: 'bangzhu',
  // },
];

const asideMenuConfig = [
  {
    name: '抽奖活动管理',
    path: '/',
    children: [
      {
        name: '配置抽奖活动',
        path: '/prize/activity/list',
      },
      {
        name: '配置奖品',
        path: '/prize/products/list',
      },
      {
        name: '配置物品',
        path: '/prize/goods/list',
      },
    ],
  },
  // {
  //   name: '广告组',
  //   path: '/campaign',
  //   icon: 'home2',
  //   children: [
  //     {
  //       name: '列表页面',
  //       path: '/campaign/list',
  //     },
  //   ],
  // },
];

export { headerMenuConfig, asideMenuConfig };
