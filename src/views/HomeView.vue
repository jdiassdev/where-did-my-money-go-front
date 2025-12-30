<script lang="ts">
import { defineComponent, ref, computed } from "vue";

interface Transaction {
    id: number;
    description: string;
    category: string;
    amount: number;
    type: "NORMAL" | "CARO";
}

const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export default defineComponent({
    name: "HomePage",
    setup() {
        const balance = ref(1250.75);
        const recentTransactions = ref<Transaction[]>([
            { id: 1, description: "Ifood", category: "Comida", amount: 45.9, type: "CARO" },
            { id: 2, description: "Uber", category: "Transporte", amount: 18.3, type: "NORMAL" },
            { id: 3, description: "Netflix", category: "Assinaturas", amount: 29.9, type: "NORMAL" },
        ]);

        const formattedBalance = computed(() => formatCurrency(balance.value));

        return { balance: formattedBalance, recentTransactions, formatCurrency };
    },
});
</script>

<template>
    <div class="p-6 max-w-5xl mx-auto">

        <header class="mb-6">
            <h1 class="text-3xl font-bold">Where Did My Money Go</h1>
            <p class="text-gray-500">Controle suas finanças de forma simples</p>
        </header>


        <section class="mb-6 bg-green-50 p-4 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold">Saldo atual</h2>
            <p class="text-2xl font-bold mt-2">1000</p>
        </section>


        <section>
            <h2 class="text-xl font-semibold mb-4">Transações recentes</h2>
            <ul class="space-y-3">
                <li v-for="tx in recentTransactions" :key="tx.id"
                    class="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition">
                    <div>
                        <p class="font-medium">{{ tx.description }}</p>
                        <p class="text-sm text-gray-500">{{ tx.category }}</p>
                    </div>
                    <p :class="tx.type === 'CARO' ? 'text-red-500' : 'text-green-500'">
                        {{ tx.amount }}
                    </p>
                </li>
            </ul>
        </section>
    </div>
</template>
<style scoped></style>
