<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    summary: any;
}>();

const formattedAmount = computed(() =>
    props.summary.total_amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
);

const period = computed(() => {
    const start = new Date(props.summary.start_date).toLocaleDateString("pt-BR");
    const end = new Date(props.summary.end_date).toLocaleDateString("pt-BR");
    return `${start} → ${end}`;
});
</script>

<template>
    <div class="stats stats-vertical lg:stats-horizontal shadow w-full">


        <div class="stat">
            <div class="stat-title">Quantidade de transações</div>
            <div class="stat-value">
                {{ summary.total_items }}
            </div>
        </div>


        <div class="stat">
            <div class="stat-title">Total do mês</div>
            <div class="stat-value text-primary">
                {{ formattedAmount }}
            </div>
        </div>


        <div class="stat">
            <div class="stat-title">Período</div>
            <div class="stat-desc">
                {{ period }}
            </div>
        </div>

    </div>
</template>
