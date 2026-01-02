<template>
  <div class="flex items-center justify-between gap-4">
    <div class="flex-1">
      <p class="text-sm text-primary">{{ label }}</p>

      <div v-if="!editing" class="text-lg font-medium">
        {{ value }}
      </div>

      <div v-else class="flex gap-2 mt-1">
        <input v-model="localValue" type="text" class="input input-bordered input-sm w-full" />

        <button class="btn btn-success btn-sm" @click="save">
          Salvar
        </button>

        <button class="btn btn-ghost btn-sm" @click="cancel">
          Cancelar
        </button>
      </div>
    </div>

    <button v-if="canEdit" class="btn btn-outline btn-sm" @click="editing = true">
      Editar
    </button>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  label: string;
  value: string;
  editable?: boolean;
}>();


const emit = defineEmits<{
  (e: "save", value: string): void;
}>();



const editing = ref(false);
const localValue = ref("");

const canEdit = computed(() => {
  return props.editable !== false && !editing.value;
});

watch(
  () => props.value,
  (v) => {
    if (!editing.value) {
      localValue.value = v;
    }
  },
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
