/*
 * @Author: nigel
 * @Date: 2020-03-19 17:42:35
 * @LastEditTime: 2020-07-20 16:13:39
 */
import Login from './views/login/login.vue';
import NotFound from './views/404.vue';
import Home from './views/Home.vue';
import generalocr from './views/generalocr/generalocr.vue';
let routes = [{
    path: '/login',
    component: Login,
    name: 'login',
},
{
    path: '/404',
    component: NotFound,
    name: '',
},
{
    path: '/',
    component: Home,
    name: 'Home',
    children: [
        {
            path: '/generalocr',
            component: generalocr,
            name: 'generalocr',
            alias: '通用印刷体文字识别'
        },
    ]
},
{
    path: '*',
    redirect: {
        path: '/404'
    }
}
];

export default routes;