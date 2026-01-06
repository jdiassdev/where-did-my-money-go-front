<template>
    <div>
        <label for="create_transaction_modal" class="btn btn-primary">
            Adicionar transação
        </label>

        <input type="checkbox" id="create_transaction_modal" class="modal-toggle" />

        <div class="modal">
            <div class="modal-box relative">
                <h3 class="text-lg font-bold mb-4">Nova Transação</h3>

                <form @submit.prevent="handleSubmit" class="space-y-2">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Descrição</legend>
                        <div class="relative w-full">
                            <input v-model="description" placeholder="Ex: BigMac" required class="input w-full" />
                        </div>
                    </fieldset>

                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Preço/Valor</legend>
                        <div class="relative w-full">
                            <input v-model="amount" placeholder="Ex: 30,50" required class="input w-full" />
                        </div>
                    </fieldset>


                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Descrição</legend>
                        <div class="relative w-full">
                            <select v-model="selectedCategory" required class="input w-full">
                                <option :value="null" disabled>Selecione uma categoria</option>
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                                    {{ cat.name }}
                                </option>
                            </select>
                        </div>
                    </fieldset>

                    <button type="submit" class="btn btn-primary w-full">
                        Adicionar
                    </button>
                </form>

                <div class="modal-action">
                    <label for="create_transaction_modal" class="btn btn-outline">
                        Cancelar
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { create } from "@/api/transactions";
import { getCategories } from "@/api/category";
import type { ListCategories } from "@/types/category";
import type { ListTransaction } from "@/types/transaction";
import { parseMoneyBR } from "@/utils/format";
import { useCategories } from "@/composables/local-storages";

const description = ref("");
const amount = ref("");
const selectedCategory = ref<number | null>(null);

const { categories, loadCategories } = useCategories();

onMounted(() => {
    loadCategories();
});


const emit = defineEmits<{
    (e: "added", transaction: ListTransaction): void;
}>();

const handleSubmit = async () => {
    if (!selectedCategory.value) return;

    const parsedAmount = parseMoneyBR(amount.value);

    const newTransaction = await create({
        description: description.value,
        amount: parsedAmount,
        category_id: selectedCategory.value
    });

    emit("added", newTransaction);

    description.value = "";
    amount.value = "";
    selectedCategory.value = null;

    const checkbox = document.getElementById(
        "create_transaction_modal"
    ) as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
};
</script>
