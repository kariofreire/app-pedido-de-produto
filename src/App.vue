<template>
  <v-app>
    <v-main>
      <NavBarApp />
    </v-main>
  </v-app>
</template>
<script>
import NavBarApp from "@/components/NavBar/NavBar.vue";

export default {
  name: "App",

  components: {
    NavBarApp
  },
};
</script>
