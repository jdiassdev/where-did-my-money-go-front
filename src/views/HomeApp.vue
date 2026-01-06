<template>
    <div class="mx-5 my-5">

        <div class="max-w-3xl mx-auto mt-12 px-4 space-y-6">
            <ul class="list bg-base-100 rounded-box shadow-md">


                <li class="p-4 grid grid-cols-2">
                    <CreateTransactionModal @added="transactions.unshift($event)" />
                    <div class="flex justify-end mb-4">
                        <button @click="reload" class="btn btn-outline">Recarregar</button>
                    </div>
                </li>

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    Suas transações
                </li>

                <li v-if="loading" class="p-6 text-center opacity-60">
                    Carregando...
                </li>

                <ListTransactionsTable v-if="!loading" :transactions="transactions" />

                <li v-if="!loading && transactions.length === 0" class="p-6 text-center opacity-60">
                    Nenhuma transação encontrada
                </li>

            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listUserTransactions } from "@/api/transactions";
import CreateTransactionModal from "@/components/ui/transactions/CreateTransactionModal.vue";
import type { ListTransaction } from "@/types/transaction";
import ListTransactionsTable from "@/components/ui/transactions/ListTransactionsTable.vue";

const transactions = ref<ListTransaction[]>([]);
const loading = ref(true);

const loadTransactions = async () => {
    loading.value = true;
    try {
        transactions.value = await listUserTransactions();
    } finally {
        loading.value = false;
    }
};

onMounted(() => loadTransactions());

const reload = () => loadTransactions();

</script>
