<script setup lang="ts">
import { ref, onMounted } from "vue";
import { me } from "@/api/user";

const user = ref<any>(null);

onMounted(async () => {
    try {
        console.log("Buscando usuário...");
        user.value = await me();
        console.log("Usuário carregado:", user.value);
    } catch (err) {
        console.error("Não autenticado", err);
    }
});

</script>

<template>
    <div v-if="user" class="max-w-3xl mx-auto mt-10 p-6">
        <h1 class="text-2xl font-bold mb-6">Meu Perfil</h1>

        <div class="bg-white border rounded-lg shadow p-6 space-y-4">
            <div>
                <label class="text-sm text-gray-500">Nome</label>
                <p class="text-lg font-medium">{{ user.name }}</p>
            </div>

            <div>
                <label class="text-sm text-gray-500">Email</label>
                <p class="text-lg font-medium">{{ user.email }}</p>
            </div>

            <div>
                <label class="text-sm text-gray-500">Limite de gasto caro</label>
                <p class="text-lg font-medium">
                    R$ {{ user.expensiveThreshold }}
                </p>
            </div>
        </div>
    </div>

    <div v-else class="text-center mt-20 text-gray-500">
        Carregando perfil...
    </div>
</template>
