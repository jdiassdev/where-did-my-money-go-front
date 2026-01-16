<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const props = defineProps({
    data: Object
})

const chartData = computed(() => {
    if (!props.data) {
        return {
            labels: [],
            datasets: []
        }
    }

    return {
        labels: ['Salário', 'Total gasto', 'Gastos essenciais', 'Saldo'],
        datasets: [
            {
                label: 'Resumo financeiro',
                data: [
                    props.data.monthly_salary,
                    props.data.total_spent,
                    props.data.total_expensive_spent,
                    props.data.remaining_balance
                ],
                tension: 0.3,
                backgroundColor: "#3b82f6",
            }
        ]
    }
})
</script>

<template>
    <Line :data="chartData" />
</template>
