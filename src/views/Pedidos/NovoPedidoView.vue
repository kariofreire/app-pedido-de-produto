<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">Cadastrar Pedido</v-card-text>

    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="4">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="data_pedido"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="data_pedido"
                  label="Data do Pedido"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="data_pedido" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancelar
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(data_pedido)"
                >
                  Selecionar Data
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="forma_pagamento"
              :items="formasPagamento"
              label="Forma de pagamento"
              :rules="[(v) => !!v || 'Forma de pagamento é obrigatório']"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="cliente_id"
              :items="clientes"
              label="Cliente"
              :rules="[(v) => !!v || 'Cliente é obrigatório']"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="12">
            <v-textarea
              v-model="observacao"
              rows="2"
              label="Observação do pedido"
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="5">
            <v-autocomplete
              v-model="produto_id"
              :items="produtos"
              item-value="id"
              item-text="nome"
              label="Produto"
              :rules="[(v) => !!v || 'Produto é obrigatório.']"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="5">
            <v-text-field
              v-model="quantidade"
              :rules="quantidadeRules"
              label="Quantidade do Produto"
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-btn
              class="success mt-3"
              width="100%"
              @click.stop="adicionarProdutoAoCarrinho()"
            >
              Adicionar
            </v-btn>
          </v-col>

          <v-col cols="12">
            Produtos:

            <v-list>
              <v-list-item>
                <v-list-item-title class="d-flex">
                  Produto <v-spacer></v-spacer> Quantidade
                  <v-spacer></v-spacer> Valor Unit. <v-spacer></v-spacer>
                  Valor Total
                </v-list-item-title>
                <v-list-item-icon>
                  <v-icon> </v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item
                :key="itemPedido.id"
                v-for="(itemPedido, indexItemPedido) in itensPedido"
              >
                <v-list-item-title class="d-flex">
                  {{ itemPedido.nome }} <v-spacer></v-spacer>
                  {{ itemPedido.quantidade }} <v-spacer></v-spacer>
                  {{ itemPedido.preco | formatoDinheiro }} <v-spacer></v-spacer>
                  {{
                    (itemPedido.preco * itemPedido.quantidade) | formatoDinheiro
                  }}
                </v-list-item-title>

                <v-list-item-icon>
                  <v-icon @click.stop="removerItemPedido(indexItemPedido)">
                    mdi-delete
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item>
                <v-list-item-title class="d-flex">
                  Valor Total <v-spacer></v-spacer>
                  {{ valorTotalPedido | formatoDinheiro }}
                </v-list-item-title>

                <v-list-item-icon>
                  <v-icon> </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <v-btn
              color="success"
              class="mr-4"
              @click="cadastrarPedido"
            >
              Cadastrar Pedido
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import urlApi from "@/plugins/urlApi";

export default {
  data: () => ({
    data_pedido: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    valid: true,

    forma_pagamento: null,
    formasPagamento: [
      { text: "Dinheiro", value: "dinheiro" },
      { text: "Cartão", value: "cartão" },
      { text: "Cheque", value: "cheque" },
    ],

    itensPedido: [],

    cliente_id: null,
    clientes: [],

    produto_id: null,
    produtos: [],

    quantidade: 1,
    quantidadeRules: [
      (v) => !!v || "Quantidade do produto é obrigatório",
      (v) => v > 1 || "Necessário ter ao menos 1 quantidade.",
    ],

    observacao: "",
  }),

  computed: {
    valorTotalPedido: function () {
      let total = 0;

      if (this.itensPedido.length >= 1) {
        this.itensPedido.forEach((produto) => {
          total = total + (produto.preco * produto.quantidade)
        })
      }

      return total;
    },
  },

  filters: {
    formatoDinheiro: function (preco) {
      if (!preco) return "";

      return `R$ ${parseFloat(preco).toFixed(2)}`;
    },
  },

  created() {
    this.listaDados();
  },

  methods: {
    cadastrarPedido() {
      const formData = {
        data_pedido: this.data_pedido,
        observacao: this.observacao,
        forma_pagamento: this.forma_pagamento,
        valor_total: this.valorTotalPedido,
        cliente_id: this.cliente_id,
        quantidade: this.itensPedido.map((pedido) => (pedido.quantidade)),
        valor: this.itensPedido.map((pedido) => (parseFloat(pedido.preco * pedido.quantidade).toFixed(2))),
        produto_id: this.itensPedido.map((pedido) => (pedido.id))
      };

      fetch(`${urlApi}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((res) => {
          if ([200].includes(res.code)) {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$toasted.success("Pedido cadastrado com sucesso.");

            this.listarPedidos();
          } else {
            this.$toasted.error(res.message);
          }
        });
    },

    listaDados() {
      fetch(`${urlApi}/pedidos/create`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if ([200].includes(res.code)) {
            const { clientes, produtos } = res.data;

            this.clientes = clientes.map((cliente) => ({
              text: cliente.nome,
              value: cliente.id,
            }));

            this.produtos = produtos.map((produto) => ({
              id: produto.id,
              nome: produto.nome,
              preco: produto.valor,
            }));
          } else {
            this.$toasted.error(res.message);
          }
        });
    },

    listarPedidos() {
      this.$router.push("/pedidos");
    },

    adicionarProdutoAoCarrinho() {
      if (this.produto_id === null) {
        this.$toasted.error("Informe um produto.");
        return false;
      }

      const produto = this.produtos.find((produto) => {
        return produto.id === this.produto_id;
      });

      this.itensPedido.push({ ...produto, quantidade: this.quantidade });
    },

    removerItemPedido(indexItemPedido) {
      this.itensPedido = this.itensPedido.filter((produto, index) => {
        return index !== indexItemPedido;
      });
    },
  },
};
</script>
