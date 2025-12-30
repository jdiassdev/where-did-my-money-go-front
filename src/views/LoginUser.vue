<template>
    <div class="max-w-md mx-auto mt-20 p-6 border rounded shadow">
        <h1 class="text-2xl font-bold mb-4">Login</h1>

        <form @submit.prevent="handleLogin" class="space-y-4">
            <input v-model="form.email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
            <input v-model="form.password" type="password" placeholder="Senha" class="w-full p-2 border rounded" />
            <button type="submit" class="w-full bg-green-500 text-white p-2 rounded">
                Entrar
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import type { LoginUserRequest } from "@/api/types/user/dto";
import { login } from "@/api/user";
import router from "@/router";
import { ref } from "vue";

export default {
    setup() {
        const form = ref<LoginUserRequest>({
            email: "",
            password: "",
        });

        const handleLogin = async () => {
            try {
                const res = await login(form.value);
                alert("Login realizado!");
                localStorage.setItem("token", res.token);

                router.push("/");
            } catch (err) {
                alert("Erro no login");
                console.error(err);
            }
        };

        return { form, handleLogin };
    },
};
</script>
