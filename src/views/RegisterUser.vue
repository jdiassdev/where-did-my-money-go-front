<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Cadastro</h1>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <input
        v-model="form.name"
        type="text"
        placeholder="Nome"
        class="w-full p-2 border rounded"
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded"
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="Senha"
        class="w-full p-2 border rounded"
      />
      <button type="submit" class="w-full bg-green-500 text-white p-2 rounded">
        Cadastrar
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import type { RegisterUserRequest } from "@/api/types/user/dto";
import { register } from "@/api/user";
import { ref } from "vue";
export default {
  setup() {
    const form = ref<RegisterUserRequest>({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        const res = await register(form.value);
        alert("Cadastro realizado!");
        console.log(res);
      } catch (err) {
        alert("Erro ao cadastrar");
        console.error(err);
      }
    };

    return { form, handleRegister };
  },
};
</script>
