// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

import UserLogin from './pages/UserLogin';
import Activity from './pages/PrizeActivity/Activity';
import Products from './pages/PrizeProducts/Products';
import Goods from './pages/PrizeGoods/Goods';

const routerConfig = [
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/prize/activity/list',
    component: Activity,
  },
  {
    path: '/prize/products/list',
    component: Products,
  },
  {
    path: '/prize/goods/list',
    component: Goods,
  },

];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
