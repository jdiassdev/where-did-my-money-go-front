<script setup lang="ts">
import type { ListTransaction, UpdateTransaction } from "@/types/transaction";
import { formatDateTimeBR, formatMoneyBR } from "@/utils/format";
import UpdateTransactionModal from "./UpdateTransactionModal.vue";
import { inactivateTransaction, updateTransaction } from "@/api/transactions";
import { ref } from "vue";

defineProps<{
    transactions: ListTransaction[];
}>();


const emit = defineEmits<{
    (e: "updated", transaction: ListTransaction): void
    (e: "inactivated", id: number): void
}>()

const showModal = ref(false);
const showToast = ref(false)
const selectedTransaction = ref<UpdateTransaction | null>(null);

function onEdit(t: ListTransaction) {
    selectedTransaction.value = t;
    showModal.value = true;
}

async function onSubmitUpdate(payload: {
    id: number;
    description: string;
    amount: number;
}) {
    const updated = await updateTransaction(payload, payload.id)
    emit("updated", updated)
    showModal.value = false

    showModal.value = false;
}

async function onInactivate(id: number) {
    await inactivateTransaction(id)

    emit("inactivated", id)
    showToast.value = true

    setTimeout(() => {
        showToast.value = false
    }, 3000)
}

</script>

<template>
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table class="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th>Criado em</th>
                    <th class="text-end">Ações</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="t in transactions" :key="t.id">
                    <th class="tabular-nums">{{ t.id }}</th>
                    <td>{{ t.description }}</td>
                    <td class="uppercase font-semibold opacity-60 text-xs">
                        {{ t.category }}
                    </td>
                    <td class="font-semibold inline-flex items-baseline gap-1">
                        <span>R$</span>
                        <span class="tabular-nums">{{ formatMoneyBR(t.amount) }}</span>
                    </td>
                    <td class="uppercase font-semibold opacity-60 text-xs">
                        {{ formatDateTimeBR(t.created_at) }}
                    </td>

                    <td class="text-right space-x-2">
                        <button class="btn btn-ghost btn-xs" @click="onEdit(t)">
                            Editar
                        </button>

                        <button class="btn btn-ghost btn-xs text-error" @click="onInactivate(t.id)">
                            Excluir
                        </button>

                        <div v-if="showToast" class="toast toast-center toast-middle z-50">
                            <div class="alert alert-error shadow-lg">
                                <span>Excluído com sucesso</span>
                            </div>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <UpdateTransactionModal v-model="showModal" :transaction="selectedTransaction" @submit="onSubmitUpdate" />
</template>
