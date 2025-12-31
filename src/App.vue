<script setup lang="ts">
import NavBar from "./components/layout/NavBar.vue";
import FooterBar from "./components/layout/FooterBar.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <!-- Conteúdo ocupa o espaço restante -->
    <main class="flex-1">
      <RouterView />
    </main>


    <FooterBar />
  </div>
</template>



<style scoped></style>
