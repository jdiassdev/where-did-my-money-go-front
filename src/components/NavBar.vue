<script setup lang="ts">
import { useAuth } from "@/composables/use-auth";
import { useRouter } from "vue-router";

const router = useRouter();
const { isAuthenticated, logout } = useAuth();

function handleLogout() {
    logout();
    router.push("/login");
}
</script>

<template>
    <nav class="w-full bg-white border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

            <div class="text-xl font-semibold text-gray-800">
                <RouterLink to="/" class="">
                    WhereDidMyMoneyGo
                </RouterLink>
            </div>

            <div class="flex items-center gap-4">
                <RouterLink v-if="!isAuthenticated" to="/register">
                    Cadastre-se
                </RouterLink>

                <RouterLink v-if="!isAuthenticated" to="/login">
                    Entrar
                </RouterLink>

                <RouterLink v-if="isAuthenticated" to="/profile">
                    Perfil
                </RouterLink>

                <RouterLink v-if="isAuthenticated" to="/app">
                    Dashboard
                </RouterLink>

                <button v-if="isAuthenticated" @click="handleLogout">
                    Sair
                </button>

            </div>
        </div>
    </nav>
</template>
