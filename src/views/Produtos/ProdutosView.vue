<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">
      Lista de Produtos
      <v-btn
        outlined
        rounded
        text
        @click="novoProduto"
      > Novo Produto </v-btn>
    </v-card-text>

    <v-row>
      <div>
        <DetalhesProdutos
          :dadosProduto="dadosProduto"
          :dialog="statusDetalhesProduto"
          @fechar="toogleStatusDetalhesProduto"
        />
      </div>
    </v-row>

    <v-card-text>
      <v-simple-table class="mt-5">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Cor</th>
            <th>Tamanho</th>
            <th>Valor</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in produtos" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.cor }}</td>
            <td>{{ item.tamanho }}</td>
            <td>{{ item.valor }}</td>
            <td class="text-center">
              <v-btn class="mx-2" fab x-small color="primary" @click="detalhes(item)">
                <v-icon>$vuetify.icons.info</v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                fab
                x-small
                color="primary"
                @click="editar(item.id)"
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
import DetalhesProdutos from '@/components/Produtos/DetalhesProdutos';

export default {
  name: "ProdutosView",

  components: {
    DetalhesProdutos,
  },

  data: () => ({
    produtos: [],
    page: 1,
    pagination: {
      current: 1,
      total: 0
    },
    dadosProduto: {},
    statusDetalhesProduto: false,
  }),

  created() {
    this.getProdutos();
  },

  methods: {
    getProdutos() {
      fetch(`${urlApi}/produtos?page=${this.pagination.current}`, {
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

            this.produtos           = data.data;
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

    novoProduto() {
      this.$router.push('/novo-produto');
    },

    detalhes(dados) {
      this.dadosProduto = dados;
      this.toogleStatusDetalhesProduto();
    },

    toogleStatusDetalhesProduto() {
      this.statusDetalhesProduto = !this.statusDetalhesProduto;
    },

    editar(id) {
      this.$router.push(`/editar-produto/${id}`);
    },

    excluir(id) {
      fetch(`${urlApi}/produtos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
        },
      })
      .then((response) => response.json())
      .then((res) => {
        if ([200].includes(res.code)) {
          this.getProdutos();
          this.$toasted.success("Produto deletado com sucesso.");
        } else {
          this.$toasted.error(res.data);
        }
      });
    },
  },
};
</script>
