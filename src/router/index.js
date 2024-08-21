import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/components/UserList.vue'
import UserForm from '@/components/UserForm.vue'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'

const routes = [
  { path: '/users', component: UserList },
  { path: '/users/create', component: UserForm },
  { path: '/users/:id/edit', component: UserForm },
  { path: '/tasks', component: TaskList },
  { path: '/tasks/create', component: TaskForm },
  { path: '/tasks/:id/edit', component: TaskForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
