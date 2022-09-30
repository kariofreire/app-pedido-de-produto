<template>
  <v-row justify="center">
    <v-dialog
      :value="dialog"
      @input="$emit('input')"
      max-width="650"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">Detalhes do Cliente</v-card-title>

        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              alt="Cliente"
              class="elevation-4"
              :src="require('@/assets/cliente.png')"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ dadosCliente.nome }}</v-list-item-title>

            <v-spacer></v-spacer>

            <v-list-item-subtitle>
              {{ dadosCliente.email + ' | ' + dadosCliente.sexo }}
            </v-list-item-subtitle>

            <v-spacer></v-spacer>

            <v-list-item-subtitle class="text--primary">
              {{ dadosCliente.cpf }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="fechar"
          >
            FECHAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "DetalhesView",

  props: {
    dialog: {
      type: Boolean,
      default: false
    },

    dadosCliente: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    fechar() {
      this.$emit("fechar");
    },
  },
}
</script>