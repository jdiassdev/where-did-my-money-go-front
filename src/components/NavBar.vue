<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const isAuthenticated = computed(() => true);

const router = useRouter();

function logout() {
    router.push("/login");
}
</script>

<template>
    <nav class="w-full bg-white border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

            <div class="text-xl font-semibold text-gray-800">
                WhereDidMyMoneyGo
            </div>

            <div class="flex items-center gap-4">
                <RouterLink to="/" class="text-gray-600 hover:text-gray-900 transition">
                    Home
                </RouterLink>

                <RouterLink v-if="isAuthenticated" to="/register" class="text-gray-600 hover:text-gray-900 transition">
                    Cadastre-se
                </RouterLink>

                <RouterLink v-if="!isAuthenticated" to="/login" class="text-gray-600 hover:text-gray-900 transition">
                    Entrar
                </RouterLink>
                <RouterLink  to="/profile" class="text-gray-600 hover:text-gray-900 transition">
                    Perfil
                </RouterLink>

                <button v-if="isAuthenticated" @click="logout" class="text-red-500 hover:text-red-700 transition">
                    Sair
                </button>
            </div>
        </div>
    </nav>
</template>
