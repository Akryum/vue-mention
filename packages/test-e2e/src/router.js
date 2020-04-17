import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Defaults from './views/Defaults.vue'
import MultipleCollections from './views/MultipleCollections.vue'
import SearchEvent from './views/SearchEvent.vue'
import InsertSpace from './views/InsertSpace.vue'
import OmitKey from './views/OmitKey.vue'
import MapInsert from './views/MapInsert.vue'
import Limit from './views/Limit.vue'
import ItemSlot from './views/ItemSlot.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/defaults',
    component: Defaults,
  },
  {
    path: '/multiple-collections',
    component: MultipleCollections,
  },
  {
    path: '/search-event',
    component: SearchEvent,
  },
  {
    path: '/insert-space',
    component: InsertSpace,
  },
  {
    path: '/omit-key',
    component: OmitKey,
  },
  {
    path: '/map-insert',
    component: MapInsert,
  },
  {
    path: '/limit',
    component: Limit,
  },
  {
    path: '/item-slot',
    component: ItemSlot,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
