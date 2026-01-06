<template>
    <div class="max-w-3xl mx-auto mt-12 px-4 space-y-6">

        <h1 class="text-2xl font-bold text-primary ">Meu Perfil</h1>

        <div class="card bg-base-100 shadow border">
            <div class="card-body space-y-6">

                <div v-if="loading" class="flex justify-center py-20">
                    <span class="loading loading-spinner"></span>
                </div>

                <div v-else class="space-y-6">
                    <ProfileFieldText label="Nome" :value="user.name" @save="(v) => update({ name: v })"
                        :editable="true" />
                    <ProfileFieldText label="Email" :value="user.email" :editable="false" />
                    <ProfileFieldMoney label="Salario / Renda mensal" :value="user.monthly_salary"
                        @save="(v) => update({ monthly_salary: v })" />
                    <ProfileFieldMoney label="Limite de gasto semanal" :value="user.expensive_threshold"
                        @save="(v) => update({ expensive_threshold: v })" />
                </div>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { me, updateMe } from "@/api/user";
import ProfileFieldText from "@/components/ui/profile/ProfileFieldText.vue"
import ProfileFieldMoney from "@/components/ui/profile/ProfileFieldMoney.vue"
import type { User } from "@/types/user";


const loading = ref(true);
const user = ref<User>({
    name: "",
    email: "",
    monthly_salary: 0,
    expensive_threshold: 0
});

onMounted(async () => {
    try {
        const data = await me();
        if (!data) throw new Error("User vazio");
        user.value = data;
    } catch (e) {
        console.error(e);

        user.value = {
            name: "Desconhecido",
            email: "Desconhecido",
            monthly_salary: 0,
            expensive_threshold: 0
        };
    } finally {
        loading.value = false;
    }
});


async function update(payload: Partial<User>) {
    const updated = await updateMe(payload);
    user.value = { ...user.value, ...updated };
}

</script>
