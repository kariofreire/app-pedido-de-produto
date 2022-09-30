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
    name: 'novoCliente',
    component: () => import('../views/Clientes/NovoClienteView.vue')
  },
  {
    path: '/editar-cliente/:id',
    name: 'editarCliente',
    component: () => import('../views/Clientes/EditarClienteView.vue')
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: () => import('../views/Produtos/ProdutosView.vue')
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
