<template>
  <v-row justify="center">
    <v-dialog
      :value="dialog"
      @input="$emit('input')"
      max-width="650"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">Detalhes do Produto</v-card-title>

        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>Produto: {{ dadosProduto.nome }}</v-list-item-title>

            <v-spacer></v-spacer>

            <v-list-item-subtitle>Cor: {{ dadosProduto.cor }}</v-list-item-subtitle>

            <v-spacer></v-spacer>

            <v-list-item-subtitle>Tamanho: {{ dadosProduto.tamanho }}</v-list-item-subtitle>

            <v-list-item-subtitle class="text--primary">Valor: R$ {{ dadosProduto.valor }}</v-list-item-subtitle>
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
  name: "DetalhesProdutos",

  props: {
    dialog: {
      type: Boolean,
      default: false
    },

    dadosProduto: {
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