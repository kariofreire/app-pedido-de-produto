<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">Cadastrar Produto</v-card-text>

    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nome"
              :rules="nomeRules"
              label="Nome do Produto"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="cor"
              :rules="corRules"
              label="Cor do Produto"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="tamanho"
              :rules="tamanhoRules"
              label="Tamanho do Produto"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="valor"
              :rules="valorRules"
              label="Valor do Produto"
              prefix="R$"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="cadastrarProduto"
            >
              Cadastrar Produto
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import urlApi from '@/plugins/urlApi';

export default {
  data: () => ({
    valid: true,
    
    nome: "",
    nomeRules: [
      (v) => !!v || "Nome do produto é obrigatório"
    ],
    
    cor: "",
    corRules: [
      (v) => !!v || "Cor do produto é obrigatório"
    ],

    tamanho: "",
    tamanhoRules: [
      (v) => !!v || "Tamanho do produto é obrigatório"
    ],

    valor: "",
    valorRules: [
      (v) => !!v || "Valor do produto é obrigatório"
    ],
  }),

  methods: {
    cadastrarProduto() {
      const formData = {
        nome: this.nome,
        cor: this.cor,
        tamanho: this.tamanho,
        valor: this.valor
      };

      fetch(`${urlApi}/produtos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access": "application/json"
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(res => {
          if ([200].includes(res.code)) {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$toasted.success("Produto cadastrado com sucesso.");

            this.listarProdutos();
          } else {
            this.$toasted.error(res.message);
          }
        });

    },

    listarProdutos() {
      this.$router.push('/produtos');
    },
  },
};
</script>
