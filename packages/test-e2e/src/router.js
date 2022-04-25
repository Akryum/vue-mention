import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/defaults',
    component: () => import('./views/Defaults.vue'),
  },
  {
    path: '/multiple-collections',
    component: () => import('./views/MultipleCollections.vue'),
  },
  {
    path: '/search-event',
    component: () => import('./views/Events.vue'),
  },
  {
    path: '/insert-space',
    component: () => import('./views/InsertSpace.vue'),
  },
  {
    path: '/omit-key',
    component: () => import('./views/OmitKey.vue'),
  },
  {
    path: '/map-insert',
    component: () => import('./views/MapInsert.vue'),
  },
  {
    path: '/limit',
    component: () => import('./views/Limit.vue'),
  },
  {
    path: '/item-slot',
    component: () => import('./views/ItemSlot.vue'),
  },
  {
    path: '/wrapped-input',
    component: () => import('./views/WrappedInput.vue'),
  },
  {
    path: '/content-editable',
    component: () => import('./views/ContentEditable.vue'),
  },
  {
    path: '/allow-space',
    component: () => import('./views/AllowSpace.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
