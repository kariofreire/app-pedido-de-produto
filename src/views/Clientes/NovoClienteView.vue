<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">Cadastrar Cliente</v-card-text>

    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nome"
              :rules="nomeRules"
              label="Nome do Cliente"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="sexo"
              :items="sexos"
              label="Sexo do Cliente"
              :rules="[v => !!v || 'Sexo é obrigatório']"
              required
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="cpf"
              :rules="cpfRules"
              :counter="11"
              label="CPF do Cliente"
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
              @click="cadastrarCliente"
            >
              Cadastrar Cliente
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
      (v) => !!v || "Nome é obrigatório"
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) => /.+@.+/.test(v) || "E-mail está inválido",
    ],
    sexo: null,
    sexos: [
      'Masculino',
      'Faminino',
      'Prefiro não informar'
    ],
    cpf: "",
    cpfRules: [
      (v) => !!v || "Nome é obrigatório",
      (v) => v.length >= 11 || "Necessário ter 11 dígitos",
    ],
  }),

  methods: {
    cadastrarCliente() {
      const formData = {
        nome: this.nome,
        email: this.email,
        sexo: this.sexo,
        cpf: this.cpf
      };

      fetch(`${urlApi}/clientes`, {
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

            this.$toasted.success("Usuário cadastrado com sucesso.");

            this.listarClientes();
          } else {
            this.$toasted.error(res.message);
          }
        });

    },

    listarClientes() {
      this.$router.push('/');
    },
  },
};
</script>
