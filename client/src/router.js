import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/input-name',
      name: 'InputName',
      component: () => import(/* webpackChunkName: "InputName" */ './views/InputName.vue'),
    },
    {
      path: '/chooseQA',
      name: 'choose-qa',
      component: () => import(/* webpackChunkName: "ChooseQA" */ './views/ChooseQA.vue'),
    },
    {
      path: '/input-room-name',
      name: 'InputRoomName',
      component: () => import(/* webpackChunkName: "InputRoomName" */ './views/InputRoomName.vue'),
    },
    {
      path: '/create-questions',
      name: 'CreateQuestions',
      component: () => import(/* webpackChunkName: "CreateQuestions" */ './views/CreateQuestions.vue')
    }
  ],
});

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//       children: [
//         {
//           path: '/input-name',
//           name: 'InputName',
//           component: () => import(/* webpackChunkName: "InputName" */ './views/InputName.vue'),
//         },
//         {
//           path: '/chooseQA',
//           name: 'choose-qa',
//           component: () => import(/* webpackChunkName: "ChooseQA" */ './views/ChooseQA.vue'),
//         },
//         {
//           path: '/input-room-name',
//           name: 'InputRoomName',
//           component: () => import(/* webpackChunkName: "InputRoomName" */ '
//           ./views/InputRoomName.vue'),
//         },
//       ]
//     },
//   ],
// });
