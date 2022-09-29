<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">
      Lista de Clientes
      <v-btn outlined rounded text> Novo Cliente </v-btn>
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
                @click="getCliente(item.id)"
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
      <v-pagination v-model="page" :length="15" :total-visible="7"></v-pagination>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ClientesView",

  components: {},

  data: () => ({
    clientes: [],
    page: 1,
  }),

  created() {
    this.getClientes();
  },

  methods: {
    getClientes() {
      fetch(`http://localhost:8000/api/v1/clientes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if ([200].includes(res.code)) {
            this.clientes = res.data.data;
          } else {
            this.$toasted.error(res.data);
          }
        });
    },

    detalhes(dados) {
      console.log(dados);
    },

    getCliente(id) {
      console.log(id);
    },

    excluir(id) {
      console.log(id);
    },
  },
};
</script>
