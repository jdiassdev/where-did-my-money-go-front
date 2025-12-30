<template>
  <div class="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white border rounded-xl shadow-sm p-6 space-y-6">


      <div class="text-center">
        <h1 class="text-2xl font-bold">Criar conta</h1>
        <p class="text-sm text-gray-500 mt-1">
          Controle seus gastos de forma simples
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">

        <div>
          <input v-model="form.name" type="text" placeholder="Nome"
            class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div>
          <input v-model="form.email" type="email" placeholder="Email"
            class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div>
          <input v-model="form.password" type="password" placeholder="Senha"
            class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white p-3 rounded transition">
          {{ loading ? "Cadastrando..." : "Cadastrar" }}
        </button>
      </form>


      <div class="text-center text-sm text-gray-500">
        Já tem uma conta?
        <RouterLink to="/login" class="text-green-600 hover:underline">
          Entrar
        </RouterLink>
      </div>

      <p v-if="error" class="text-center text-sm text-red-500">
        {{ error }}
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api/user";
import type { RegisterUserRequest } from "@/api/types/user/dto";

const router = useRouter();

const form = ref<RegisterUserRequest>({
  name: "",
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

async function handleRegister() {
  error.value = "";
  loading.value = true;

  try {
    await register(form.value);
    router.push("/login");
  } catch (e) {
    error.value = "Erro ao criar conta";
  } finally {
    loading.value = false;
  }
}
</script>
