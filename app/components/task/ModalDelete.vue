<template>
    <v-dialog v-model="isOpen" max-width="450px" persistent>
        <v-card class="rounded-lg">
            <v-card-title class="text-h6 font-weight-bold pa-4">
                Eliminar tarea
            </v-card-title>

            <v-card-text class="pa-4 pt-0 text-body-1 text-medium-emphasis">
                ¿Estás seguro que deseas eliminar la tarea?
                Esta acción no se puede deshacer.
            </v-card-text>

            <v-card-actions class="pa-4 justify-end">
                <v-btn variant="text" color="grey-darken-1" @click="close" :disabled="loading">
                    Cancelar
                </v-btn>

                <v-btn color="error" variant="flat" @click="emit('confirm')" :loading="loading">
                    Eliminar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean;
    taskTitle?: string;
    loading?: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'confirm'): void;
}>();

const isOpen = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

const close = () => {
    isOpen.value = false;
};
</script>