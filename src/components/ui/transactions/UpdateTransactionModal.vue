<script setup lang="ts">
import { useCategories } from "@/composables/local-storages";
import type { UpdateTransaction } from "@/types/transaction";
import { formatMoneyBR, parseMoneyBR } from "@/utils/format";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
    modelValue: boolean;
    transaction: UpdateTransaction | null;
}>();

const { categories, loadCategories } = useCategories();

onMounted(() => {
    loadCategories();
});

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", payload: {
        id: number;
        description: string;
        category?: string;
        category_id?: number;
        amount: number;
    }): void;
}>();

const description = ref("");
const amount = ref("");
const category_id = ref<number | null>(null);


watch(
    [() => props.transaction, categories],
    ([t, cats]) => {
        if (!t || !cats.length) return;

        description.value = t.description;
        amount.value = formatMoneyBR(t.amount);

        const found = cats.find(c => c.name === t.category);
        category_id.value = found ? found.id : null;
    },
    { immediate: true }
);



function close() {
    emit("update:modelValue", false);

    description.value = props.transaction?.description ?? "";
    amount.value = props.transaction
        ? formatMoneyBR(props.transaction.amount)
        : "";

    const found = categories.value.find(
        c => c.name === props.transaction?.category
    );

    category_id.value = found ? found.id : null;
}


function submit() {
    if (!props.transaction || !category_id.value) return;

    emit("submit", {
        id: props.transaction.id,
        description: description.value,
        category_id: category_id.value,
        amount: parseMoneyBR(amount.value),
    });

    close();
}


</script>

<template>
    <dialog class="modal" :class="{ 'modal-open': modelValue }">
        <div class="modal-box">
            <h3 class="font-bold text-lg mb-4">Editar Transação</h3>

            <div class="space-y-3">
                <input class="input input-bordered w-full" placeholder="Descrição" v-model="description" />

                <input v-model="amount" type="text" inputmode="numeric" class="input input-bordered w-full"
                    placeholder="0,00" />

                <select required class="select select-bordered w-full" v-model.number="category_id">
                    <option :value="null" disabled>Selecione uma categoria</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                        {{ cat.name }}
                    </option>
                </select>


            </div>

            <div class="modal-action">
                <button class="btn btn-ghost" @click="close">Cancelar</button>
                <button class="btn btn-primary" @click="submit">Salvar</button>
            </div>
        </div>
    </dialog>
</template>
