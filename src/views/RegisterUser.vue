<template>
  <div class="hero min-h-screen">
    <div class="hero-overlay bg-primary/90"></div>

    <div class="hero-content flex-col lg:flex-row-reverse gap-10 px-4 w-full max-w-6xl">
      <!-- TEXTO -->
      <div class="text-center lg:text-left text-white w-full max-w-md">
        <h1 class="text-3xl lg:text-5xl font-bold leading-tight">
          Crie sua conta agora
        </h1>

        <p class="mt-3 text-xl lg:text-3xl leading-snug">
          e tenha seu
          <span class="inline-flex items-center gap-2 font-semibold">
            dinheiro
            <span class="text-rotate h-8 lg:h-10 overflow-hidden">
              <span>
                <span class="bg-teal-500 px-2 rounded">sob controle</span>
                <span class="bg-purple-500 px-2 rounded">protegido</span>
                <span class="bg-blue-500 px-2 rounded">com mais economia</span>
              </span>
            </span>
          </span>
        </p>
      </div>

      <!-- CARD -->
      <div class="card bg-base-100 bg-opacity-95 w-full max-w-sm shadow-2xl">
        <div class="card-body">
          <form @submit.prevent="handleRegister" class="space-y-4">
            <label class="label">Nome</label>
            <input v-model="form.name" type="text" placeholder="Nome" class="input input-bordered w-full" required />

            <label class="label">Email</label>
            <input v-model="form.email" type="email" placeholder="Email" class="input input-bordered w-full" required />

            <label class="label">Senha</label>
            <input v-model="form.password" type="password" placeholder="Senha" class="input input-bordered w-full"
              minlength="6" required />

            <RouterLink to="/login" class="link link-hover text-sm block">
              Já possui conta?
            </RouterLink>

            <button class="btn btn-primary w-full mt-2" type="submit">
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api/user";
import type { RegisterUserRequest } from "@/api/dto/user";

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
