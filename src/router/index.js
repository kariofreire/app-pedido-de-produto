import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Clientes/ClientesView.vue')
  },
  {
    path: '/novo-cliente',
    name: 'home',
    component: () => import('../views/Clientes/NovoClienteView.vue')
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import('../views/ProdutosView.vue')
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import('../views/PedidosView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
