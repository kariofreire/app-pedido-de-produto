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

          <v-col cols="12" md="6">
            <v-btn
              :disabled="!valid"
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

    cliente_id: null,
    clientes: [],
    produtos: [],

    observacao: "",
  }),

  created() {
    this.listaDados();
  },

  methods: {
    cadastrarPedido() {
      const formData = {
        data_pedido: this.data_pedido,
        forma_pagamento: this.forma_pagamento,
        observacao: this.observacao,
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
            
            this.clientes = clientes.map((cliente) => ({ text: cliente.nome, value: cliente.id }));
            this.produtos = produtos.map((produto) => ({ text: produto.nome, value: produto.id }));
          } else {
            this.$toasted.error(res.message);
          }
        });
    },

    listarPedidos() {
      this.$router.push("/pedidos");
    },
  },
};
</script>
