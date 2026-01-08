<template>
    <div class="mx-5 my-5">

        <div class="max-w-3xl mx-auto mt-12 px-4 space-y-6">
            <div v-if="!loadingResume">
                <TotalResumeCard :total_itens="resume.total_itens" :total_amount="resume.total_amount"
                    :min_amount="resume.min_amount" :max_amount="resume.max_amount" />
            </div>

            <div v-else class="p-4 text-center opacity-60">
                Carregando resumo...
            </div>


            <ul class="list bg-base-100 rounded-box shadow-md">


                <li class="p-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                    <CreateTransactionModal @added="handleTransactionAdded" />

                    <select v-model="selectedCategory" class="select select-bordered w-full">
                        <option :value="null">Todas categorias</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>


                    <div class="flex justify-end">
                        <button @click="reload" class="btn btn-outline w-full md:w-auto">Filtrar</button>
                    </div>
                </li>


                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
                    Suas transações
                </li>

                <li v-if="loadingTransactions" class="p-6 text-center opacity-60">
                    Carregando...
                </li>

                <ListTransactionsTable v-else :transactions="transactions" />

                <li v-if="!loadingResume && transactions.length === 0" class="p-6 text-center opacity-60">
                    Nenhuma transação encontrada
                </li>

            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listUserTransactions, totalResume } from "@/api/transactions";
import CreateTransactionModal from "@/components/ui/transactions/CreateTransactionModal.vue";
import type { ListTransaction, TotalResume } from "@/types/transaction";
import ListTransactionsTable from "@/components/ui/transactions/ListTransactionsTable.vue";
import TotalResumeCard from "@/components/ui/transactions/TotalResumeCard.vue";
import { useCategories } from "@/composables/local-storages";

const { categories, loadCategories } = useCategories();
const selectedCategory = ref<number | null>(null);
const transactions = ref<ListTransaction[]>([]);
const resume = ref<TotalResume>({
    total_itens: 0,
    total_amount: 0,
    min_amount: 0,
    max_amount: 0
});

const loadingResume = ref(true)
const loadingTransactions = ref(true)

const loadResume = async () => {
    loadingResume.value = true
    try {
        resume.value = await totalResume()
    } finally {
        loadingResume.value = false
    }
}

const loadTransactions = async () => {
    loadingTransactions.value = true
    try {
        transactions.value = await listUserTransactions(selectedCategory.value ?? undefined);
    } finally {
        loadingTransactions.value = false
    }
}

onMounted(async () => {
    await Promise.all([
        loadCategories(),
        loadTransactions(),
        loadResume()
    ]);
});

const handleTransactionAdded = async (transaction: ListTransaction) => {
    transactions.value.unshift(transaction)

    await loadResume()
}
const reload = async () => {
    await Promise.all([
        loadTransactions(),
        // loadResume()
    ]);
};

</script>
