import Vue from 'vue';
import Router from 'vue-router';
import ArrayForEach from '../views/ArrayForEach.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/array_foreach',
            name: 'ArrayForEach',
            component: ArrayForEach
        },
        {
            path: '/array_function',
            name: 'ArrayFunction',
            component: () =>
                import('../views/ArrayFunction.vue')
        },
        {
            path: '/async_await',
            name: 'AsyncAwait',
            component: () =>
                import('../views/AsyncAwait.vue')
        }
    ]
});
