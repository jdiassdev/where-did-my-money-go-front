<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCurrentMonth, getMonthlyEvolution, getTopCategoryMonth } from "@/api/dashboard";
import MonthSummaryCards from "@/components/ui/dashboard/MonthSummaryCards.vue";
import TopCategoriesChart from "@/components/ui/dashboard/charts/TopCategoriesChart.vue";
import MonthlyExpenseChart from "@/components/ui/dashboard/charts/MonthlyExpenseChart.vue";

const summary = ref<any | null>(null);
const topCategories = ref<any[]>([]);
const monthlyEvolution = ref<any[]>([]);

const loadDashboard = async () => {
    const date = new Date();

    summary.value = await getCurrentMonth(date);
    topCategories.value = await getTopCategoryMonth(date);
    monthlyEvolution.value = await getMonthlyEvolution(date);


};

onMounted(loadDashboard);
</script>

<template>
    <div class="mx-5 my-5 space-y-6">
        <section v-if="summary" class="space-y-3">
            <h3 class="text-lg font-semibold">Resumo do mês</h3>
            <MonthSummaryCards :summary="summary" />
        </section>


        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MonthlyExpenseChart :data="monthlyEvolution" />
            <TopCategoriesChart :data="topCategories" />
        </div>

        <button class="btn" @click="loadDashboard">
            Recarregar
        </button>
    </div>
</template>
