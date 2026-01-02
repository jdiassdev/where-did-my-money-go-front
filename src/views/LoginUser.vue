<template>
    <div class="hero min-h-screen ">
        <div class="hero-overlay bg-primary/90"></div>

        <div class="hero-content flex-col lg:flex-row gap-8 px-4 lg:px-16">

            <div class="text-center lg:text-left text-white max-w-lg">
                <h1 class="text-5xl font-bold mb-4">
                    Acesse sua conta
                </h1>
                <p
                    class="py-2 text-2xl bg-linear-to-r from-blue-500 via-green-800 to-blue-800 bg-clip-text text-transparent">
                    Veja seus gastos, compare períodos e mantenha o controle do seu dinheiro.
                </p>
            </div>

            <div class="card bg-base-100 bg-opacity-90 w-full max-w-sm shrink-0 shadow-2xl">
                <div class="card-body">
                    <fieldset class="fieldset space-y-4">
                        <form @submit.prevent="handleLogin">

                            <label class="label">Email</label>
                            <input v-model="form.email" type="email" placeholder="Email"
                                class="input input-bordered validator w-full" required />
                            <p class="validator-hint">Email inválido</p>

                            <label class="label">Password</label>
                            <input v-model="form.password" type="password" placeholder="Password"
                                class="input input-bordered validator w-full" required minlength="6" />
                            <p class="validator-hint">Mínimo 6 caracteres</p>

                            <div>
                                <RouterLink to="/register" class="link link-hover text-sm">
                                    Não possui conta?
                                </RouterLink>
                            </div>

                            <button class="btn btn-primary mt-4 w-full" type="submit">
                                Entrar
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
import { login } from "@/api/user";
import type { LoginUserRequest } from "@/api/dto/user";
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
