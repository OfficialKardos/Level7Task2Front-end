import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';
import Home from '../components/Home.vue'; 

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home 
    },
    {
        path: '/tasks',
        name: 'TaskList',
        component: TaskList
    },
    {
        path: '/task/:id',
        name: 'TaskForm',
        component: TaskForm,
        props: true
    },
    {
        path: '/tasks/create',
        name: 'CreateTask',
        component: TaskForm
    },
    {
        path: '/tasks/:id/edit',
        name: 'EditTask',
        component: TaskForm
    },
    {
        path: '/users',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/users/create',
        name: 'CreateUser',
        component: UserForm
    },
    {
        path: '/users/:id/edit',
        name: 'EditUser',
        component: UserForm
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Home',
        component: Home 
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
