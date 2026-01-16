<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
    getCurrentMonth,
    getCurrentMonthSalary,
    getMonthlyEvolution,
    getTopCategoryMonth
} from "@/api/dashboard";

import MonthSummaryCards from "@/components/ui/dashboard/MonthSummaryCards.vue";
import TopCategoriesChart from "@/components/ui/dashboard/charts/TopCategoriesChart.vue";
import MonthlyExpenseChart from "@/components/ui/dashboard/charts/MonthlyExpenseChart.vue";
import ExpenseChart from "@/components/ui/dashboard/charts/ExpenseChart.vue";

const summary = ref<any | null>(null);
const topCategories = ref<any[]>([]);
const monthlyEvolution = ref<any[]>([]);
const monthlySummary = ref(null);

const selectedDate = ref<string>("");

const loadDashboard = async () => {
    if (!selectedDate.value) return;

    const date = new Date(selectedDate.value);

    summary.value = await getCurrentMonth(date);
    topCategories.value = await getTopCategoryMonth(date);
    monthlyEvolution.value = await getMonthlyEvolution(date);
    monthlySummary.value = await getCurrentMonthSalary(date);
};

onMounted(() => {
    selectedDate.value = new Date().toISOString().substring(0, 10);
    loadDashboard();
});
</script>

<template>
    <div class="max-w-7xl mx-auto px-4 py-6 space-y-6">

        <div class="card bg-base-100 shadow-md">
            <div class="card-body flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                    <h2 class="text-2xl font-bold">Dashboard financeiro</h2>
                    <p class="text-sm text-base-content/70">
                        Acompanhe seus gastos mensais de forma clara
                    </p>
                </div>

                <div class="flex items-end gap-3">
                    <div class="form-control">
                        <label class="label label-text">Data base</label>
                        <input type="date" v-model="selectedDate" class="input input-bordered" />
                    </div>

                    <button class="btn btn-primary" @click="loadDashboard">
                        Aplicar
                    </button>
                </div>

            </div>
        </div>

        <section v-if="summary">
            <MonthSummaryCards :summary="summary" />
        </section>

        <section class="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <div class="card bg-base-100 shadow">
                <div class="card-body">
                    <h4 class="card-title text-base">Evolução de gastos</h4>
                    <MonthlyExpenseChart v-if="monthlyEvolution.length" :data="monthlyEvolution" />
                </div>
            </div>

            <div class="card bg-base-100 shadow">
                <div class="card-body">
                    <h4 class="card-title text-base">Gastos por categoria</h4>
                    <TopCategoriesChart v-if="topCategories.length" :data="topCategories" />
                </div>
            </div>

        </section>

        <section>
            <div class="card bg-base-100 shadow">
                <div class="card-body">
                    <h4 class="card-title text-base">
                        Comparação: salário x gastos
                    </h4>
                    <ExpenseChart v-if="monthlySummary" :data="monthlySummary" />
                </div>
            </div>
        </section>

    </div>
</template>
