<template>
    <div class="card bg-base-200 shadow-sm w-full max-w-sm">
        <div class="card-body">
            <h2 class="card-title text-primary">{{ title }}</h2>
            <p class="text-base-content">{{ description }}</p>

        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
}>();
</script>