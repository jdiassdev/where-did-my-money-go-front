<script setup lang="ts">
import { computed } from "vue"
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js"
import { Line } from "vue-chartjs"

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const props = defineProps<{
    data: any[]
}>()

function formatMonth(value: string) {
    const [year, month] = value.split("-")
    return `${month}/${year}`
}

const chartData = computed(() => ({
    labels: props.data.map(i => formatMonth(i.month)),
    datasets: [
        {
            label: "Gastos por mês",
            data: props.data.map(i => i.total),
            borderWidth: 8,
            tension: 100,

            backgroundColor: "#3b82f6"
        }
    ]
}))

const options = {
    responsive: true,
    maintainAspectRatio: false,
}
</script>

<template>
    <div class="h-72">
        <Line :data="chartData" :options="options" />
    </div>
</template>
