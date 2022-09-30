<template>
  <v-row justify="center">
    <v-dialog
      :value="dialog"
      @input="$emit('input')"
      max-width="650"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">Detalhes do Pedido</v-card-title>

        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>Código do Produto: {{ dadosPedido.id }}</v-list-item-title>

            <v-spacer></v-spacer>

            <v-list-item-subtitle>Data do Pedido: {{ dadosPedido.data_pedido }}</v-list-item-subtitle>
            <v-list-item-subtitle>Cliente: {{ dadosPedido?.cliente?.nome }}</v-list-item-subtitle>
            <v-list-item-subtitle>Forma de Pagamento: {{ dadosPedido.forma_pagamento }}</v-list-item-subtitle>
            <v-list-item-subtitle>Observação: {{ dadosPedido.observacao }}</v-list-item-subtitle>

            <v-spacer></v-spacer>
            
            <div v-for="item in dadosPedido.carrinhos" :key="item.carrinhos">
                <v-spacer></v-spacer>

                <v-list-item-subtitle>Produto: {{ item.produto.nome }}</v-list-item-subtitle>
                <v-list-item-subtitle>Quantidade: {{ item.produto.quantidade }}</v-list-item-subtitle>
                <v-list-item-subtitle>Valor: R$ {{ item.produto.valor }}</v-list-item-subtitle>
            </div>
            
            <v-spacer></v-spacer>

            <v-list-item-subtitle class="text--primary">Valor Total: {{ dadosPedido.valor_total }}</v-list-item-subtitle>
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
  name: "DetalhesPedidoView",

  props: {
    dialog: {
      type: Boolean,
      default: false
    },

    dadosPedido: {
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