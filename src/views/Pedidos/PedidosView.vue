<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">
      Lista de Pedidos
      <v-btn
        outlined
        rounded
        text
        @click="novoPedido"
      > Novo Pedido </v-btn>
    </v-card-text>

    <v-row>
      <div>
        <DetalhesPedidoView
          :dadosPedido="dadosPedido"
          :dialog="statusDetalhesPedido"
          @fechar="toogleStatusDetalhesPedido"
        />
      </div>
    </v-row>

    <v-card-text>
      <v-simple-table class="mt-5">
        <thead>
          <tr>
            <th>Código</th>
            <th>Data do Pedido</th>
            <th>Cliente</th>
            <th>Forma de Pagamento</th>
            <th>Observação</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pedidos" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.data_pedido }}</td>
            <td>{{ item.cliente.nome }}</td>
            <td>{{ item.forma_pagamento }}</td>
            <td>{{ item.observacao }}</td>
            <td class="text-center">
              <v-btn class="mx-2" fab x-small color="primary" @click="detalhes(item)">
                <v-icon>$vuetify.icons.info</v-icon>
              </v-btn>

              <v-btn class="mx-2" fab x-small color="error" @click="excluir(item.id)">
                <v-icon>$vuetify.icons.delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>

    <div class="text-center">
      <v-pagination
        v-model="pagination.current"
        :length="pagination.total"
        :total-visible="7"
        @input="onPageChange"
      ></v-pagination>
    </div>
  </v-card>
</template>

<script>
import urlApi from '@/plugins/urlApi';
import DetalhesPedidoView from "@/components/Pedidos/DetalhesPedidoView.vue";

export default {
  name: "PedidosView",

  components: {
    DetalhesPedidoView,
  },

  data: () => ({
    pedidos: [],
    page: 1,
    pagination: {
      current: 1,
      total: 0
    },
    dadosPedido: {},
    statusDetalhesPedido: false,
  }),

  created() {
    this.getPedidos();
  },

  methods: {
    getPedidos() {
      fetch(`${urlApi}/pedidos?page=${this.pagination.current}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if ([200].includes(res.code)) {
            const { data } = res;

            this.pedidos            = data.data;
            this.pagination.current = data.current_page;
            this.pagination.total   = data.last_page;

          } else {
            this.$toasted.error(res.data);
          }
        });
    },

    onPageChange() {
      this.getPedidos()
    },

    novoPedido() {
      this.$router.push('/novo-pedido');
    },

    detalhes(dados) {
      this.dadosPedido = dados;
      this.toogleStatusDetalhesPedido();
    },

    toogleStatusDetalhesPedido() {
      this.statusDetalhesPedido = !this.statusDetalhesPedido;
    },

    editar(id) {
      this.$router.push(`/editar-pedido/${id}`);
    },

    excluir(id) {
      fetch(`${urlApi}/pedidos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
        },
      })
      .then((response) => response.json())
      .then((res) => {
        if ([200].includes(res.code)) {
          this.getPedidos();
          this.$toasted.success("Pedido deletado com sucesso.");
        } else {
          this.$toasted.error(res.data);
        }
      });
    },
  },
};
</script>
