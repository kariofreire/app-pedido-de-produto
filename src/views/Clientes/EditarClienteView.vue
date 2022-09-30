<template>
  <v-card class="mx-auto" max-width="100%" outlined>
    <v-card-text class="text-h6 mt-2 mb-2">Editar Cliente</v-card-text>

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
              @click="editarCliente"
            >
              Salvar Dados
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
  name: "EditarClienteView",

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
      { text: "Masculino", value: "masculino" },
      { text: "Feminino", value: "feminino" },
      { text: "Prefiro não informar", value: "prefiro não informar" },
    ],
    cpf: "",
    cpfRules: [
      (v) => !!v || "Nome é obrigatório",
      (v) => v.length >= 11 || "Necessário ter 11 dígitos",
    ],
  }),

  methods: {
    editarCliente() {
      const formData = {
        nome: this.nome,
        email: this.email,
        sexo: this.sexo,
        cpf: this.cpf
      };

      const clienteId = this.$route.params.id;

      fetch(`${urlApi}/clientes/${clienteId}`, {
          method: "PUT",
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

            this.$toasted.success("Usuário atualizado com sucesso.");

            this.listarClientes();
          } else {
            this.$toasted.error(res.message);
          }
        });
    },

    getCliente(id) {
      fetch(`${urlApi}/clientes/${id}`, {
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

            if (!data?.nome) {
              this.$toasted.error("Dados não encontrado na base de dados.");
              this.listarClientes();
            }

            this.nome  = data.nome;
            this.email = data.email;
            this.cpf   = data.cpf;
            this.sexo  = data.sexo;
          } else {
            this.$toasted.error(res.data);
            this.listarClientes();
          }
        });
    },

    listarClientes() {
      this.$router.push('/');
    },
  },

  mounted() {
    if (this.$route.params.id) this.getCliente(this.$route.params.id);
  },
};
</script>
