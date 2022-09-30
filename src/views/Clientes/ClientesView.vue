<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">
      Lista de Clientes
      <v-btn
        outlined
        rounded
        text
        @click="novoCliente"
      > Novo Cliente </v-btn>
    </v-card-text>

    <v-card-text>
      <v-simple-table class="mt-5">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Sexo</th>
            <th>Email</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clientes" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.cpf }}</td>
            <td>{{ item.sexo }}</td>
            <td>{{ item.email }}</td>
            <td class="text-center">
              <v-btn class="mx-2" fab x-small color="primary" @click="detalhes(item)">
                <v-icon>$vuetify.icons.info</v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                fab
                x-small
                color="primary"
                @click="editarCliente(item.id)"
              >
                <v-icon>$vuetify.icons.edit</v-icon>
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

export default {
  name: "ClientesView",

  data: () => ({
    clientes: [],
    page: 1,
    pagination: {
      current: 1,
      total: 0
    }
  }),

  created() {
    this.getClientes();
  },

  methods: {
    getClientes() {
      fetch(`${urlApi}/clientes?page=${this.pagination.current}`, {
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

            this.clientes           = data.data;
            this.pagination.current = data.current_page;
            this.pagination.total   = data.last_page;

          } else {
            this.$toasted.error(res.data);
          }
        });
    },

    onPageChange() {
      this.getClientes()
    },

    novoCliente() {
      this.$router.push('/novo-cliente');
    },

    detalhes(dados) {
      console.log(dados);
    },

    editarCliente(id) {
      this.$router.push(`/editar-cliente/${id}`);
    },

    excluir(id) {
      console.log(id);
    },
  },
};
</script>
