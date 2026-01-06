<script setup lang="ts">
import type { ListTransaction } from "@/types/transaction";
import { formatDateTimeBR, formatMoneyBR } from "@/utils/format";


const props = defineProps<{
    transactions: ListTransaction[];
}>();
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
                    <th class="text-right">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(t, index) in transactions" :key="t.id">
                    <th class="tabular-nums">{{ t.id }}</th>
                    <td>{{ t.description }}</td>
                    <td class="uppercase font-semibold opacity-60 text-xs">{{ t.category }}</td>
                    <td class="font-semibold inline-flex items-baseline gap-1">
                        <span>R$</span>
                        <span class="tabular-nums">{{ formatMoneyBR(t.amount) }}</span>
                    </td>
                    <td class="uppercase font-semibold opacity-60 text-xs">{{ formatDateTimeBR(t.created_at) }}
                    </td>
                    <td class="text-right space-x-2">
                        <button class="btn btn-ghost btn-xs" @click="$emit('edit', t)">
                            ✏️
                        </button>

                        <button class="btn btn-ghost btn-xs text-error" @click="$emit('delete', t.id)">
                            🗑
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
