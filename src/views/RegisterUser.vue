<template>
  <div class="hero min-h-screen">

    <div class="hero-overlay bg-primary/90"></div>

    <div class="hero-content flex-col lg:flex-row-reverse gap-8 px-4 lg:px-16">

      <div class="text-center lg:text-left text-white max-w-lg">
        <h1 class="text-5xl font-bold leading-tight">
          Crie sua conta agora
        </h1>

        <p class="mt-2 text-3xl">
          e tenha seu
          <span class="inline-flex items-center gap-2 h-8 overflow-hidden font-semibold">
            dinheiro
            <span class="text-rotate">
              <span>
                <span class="bg-teal-500 px-2 rounded">sob controle</span>
                <span class="bg-purple-500 px-2 rounded">protegido</span>
                <span class="bg-blue-500 px-2 rounded">com mais economia</span>
              </span>
            </span>
          </span>
        </p>
      </div>



      <div class="card bg-base-100 bg-opacity-90 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <fieldset class="fieldset space-y-4">
            <form @submit.prevent="handleRegister">

              <label class="label">Nome</label>
              <input v-model="form.name" type="text" placeholder="Nome" class="input input-bordered validator w-full"
                required />
              <p class="validator-hint">Obrigatório</p>

              <label class="label">Email</label>
              <input v-model="form.email" type="email" placeholder="Email" class="input input-bordered validator w-full"
                required />
              <p class="validator-hint">Email inválido</p>

              <label class="label">Password</label>
              <input v-model="form.password" type="password" placeholder="Password"
                class="input input-bordered validator w-full" required minlength="6" />
              <p class="validator-hint">Mínimo 6 caracteres</p>

              <div>
                <RouterLink to="/login" class="link link-hover text-sm">
                  Já possui conta?
                </RouterLink>
              </div>

              <button class="btn btn-primary mt-4 w-full" type="submit">
                Criar
              </button>
            </form>
          </fieldset>

        </div>
      </div>




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
