<script setup lang="ts">
type Props = {
    total_itens: number;
    total_amount: number;
    min_amount: number;
    max_amount: number;
};

defineProps<Props>();

const formatMoney = (value: number) =>
    value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
</script>

<template>
    <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div class="stat">
            <div class="stat-title">Transações</div>
            <div class="stat-value">{{ total_itens }}</div>
        </div>

        <div class="stat">
            <div class="stat-title">Total gasto</div>
            <div class="stat-value text-error">
                {{ formatMoney(total_amount) }}
            </div>
        </div>

        <div class="stat">
            <div class="stat-title">Menor gasto</div>
            <div class="stat-value text-success">
                {{ formatMoney(min_amount) }}
            </div>
        </div>

        <div class="stat">
            <div class="stat-title">Maior gasto</div>
            <div class="stat-value text-warning">
                {{ formatMoney(max_amount) }}
            </div>
        </div>
    </div>
</template>
