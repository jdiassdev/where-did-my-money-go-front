<script setup lang="ts">
import { computed } from "vue";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const props = defineProps<{
    data: any[];
}>();

const chartData = computed(() => ({
    labels: props.data.map(item => item.category),
    datasets: [
        {
            label: "Gastos por categoria",
            data: props.data.map(item => item.total),
            backgroundColor: "#3b82f6",
        },
    ],
}));

const options = {
    responsive: true,
    maintainAspectRatio: false,
};
</script>

<template>
    <div class="h-64">
        <Bar :data="chartData" :options="options" />
    </div>
</template>
