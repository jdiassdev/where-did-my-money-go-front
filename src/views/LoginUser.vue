<template>
    <div class="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <div class="w-full max-w-md bg-white border rounded-xl shadow-sm p-6 space-y-6">


            <div class="text-center">
                <h1 class="text-2xl font-bold">Entrar</h1>
                <p class="text-sm text-gray-500 mt-1">
                    Acesse sua conta e acompanhe seus gastos
                </p>
            </div>


            <form @submit.prevent="handleLogin" class="space-y-4">
                <input v-model="form.email" type="email" placeholder="Email"
                    class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />

                <input v-model="form.password" type="password" placeholder="Senha"
                    class="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" />

                <button type="submit" :disabled="loading"
                    class="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white p-3 rounded transition">
                    {{ loading ? "Entrando..." : "Entrar" }}
                </button>
            </form>


            <div class="text-center text-sm text-gray-500">
                Não tem conta?
                <RouterLink to="/register" class="text-green-600 hover:underline">
                    Cadastre-se
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
import { login } from "@/api/user";
import type { LoginUserRequest } from "@/api/types/user/dto";
import { useAuth } from "@/composables/use-auth";

const router = useRouter();
const { setToken } = useAuth();


const form = ref<LoginUserRequest>({
    email: "",
    password: "",
});

const loading = ref(false);
const error = ref("");

async function handleLogin() {
    loading.value = true;
    error.value = "";

    try {
        const res = await login(form.value);

        setToken(res.token);
        router.push("/profile");
    } catch (e) {
        error.value = "Email ou senha inválidos";
    } finally {
        loading.value = false;
    }
}
</script>
