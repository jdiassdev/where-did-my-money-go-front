<script setup lang="ts">
import { ref, onMounted } from "vue";
import { me } from "@/api/user";

const user = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
    try {
        user.value = await me();
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
});

</script>

<template>
    <div class="max-w-3xl mx-auto mt-12 px-4">

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-20">
            <span class="text-gray-400">Carregando perfil...</span>
        </div>

        <!-- Conteúdo -->
        <div v-else-if="user" class="space-y-6">

            <!-- Header -->
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold">Meu Perfil</h1>

                <button class="text-sm px-4 py-2 border rounded hover:bg-gray-100 transition">
                    Editar
                </button>
            </div>

            <!-- Card -->
            <div class="bg-white border rounded-xl shadow-sm p-6 space-y-6">

                <!-- Nome -->
                <div>
                    <p class="text-sm text-gray-500">Nome</p>
                    <p class="text-lg font-medium">{{ user.name }}</p>
                </div>

                <!-- Email -->
                <div>
                    <p class="text-sm text-gray-500">Email</p>
                    <p class="text-lg font-medium">{{ user.email }}</p>
                </div>

                <!-- Limite -->
                <div>
                    <p class="text-sm text-gray-500">Limite de gasto considerado alto</p>
                    <p class="text-lg font-medium text-green-600">
                        R$ {{ user.expensiveThreshold }}
                    </p>
                </div>

            </div>
        </div>

        <!-- Erro -->
        <div v-else class="text-center py-20 text-red-500">
            Não foi possível carregar o perfil.
        </div>

    </div>
</template>
