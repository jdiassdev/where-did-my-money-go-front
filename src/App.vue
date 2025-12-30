<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <main class="flex-1">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <RouterView />
      </div>
    </main>

    <FooterBar />
  </div>
</template>


<style scoped></style>
