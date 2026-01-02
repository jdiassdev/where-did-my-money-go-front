<template>
    <div class="flex items-center justify-between gap-4">
        <div class="flex-1">
            <p class="text-sm text-gray-500">{{ label }}</p>

            <div v-if="!editing" class="text-lg font-medium">
               R$  {{ value  ?? 0 }} 
            </div>

            <div v-else class="flex gap-2 mt-1">
                <input v-model.number="localValue" type="number" class="input input-bordered input-sm w-full" />

                <button class="btn btn-success btn-sm" @click="save">
                    Salvar
                </button>

                <button class="btn btn-ghost btn-sm" @click="cancel">
                    Cancelar
                </button>
            </div>
        </div>

        <button v-if="!editing" class="btn btn-outline btn-sm" @click="editing = true">
            Editar
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    label: string;
    value: number;
}>();

const emit = defineEmits<{
    (e: "save", value: number): void;
}>();

const editing = ref(false);
const localValue = ref<number>(0);

watch(
    () => props.value,
    (v) => (localValue.value = v),
    { immediate: true }
);

function save() {
    emit("save", localValue.value);
    editing.value = false;
}

function cancel() {
    editing.value = false;
}
</script>
