import Vue from 'vue'
import Router from 'vue-router'
import Contacts from '@/views/Contacts'


Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Contacts
        },
        {
            path: '/create',
            component: () => import('./views/Create')
        },
        {
            path: '/contact/:id',
            component: () => import('./views/ChangeContact')
        }
    ]
})
