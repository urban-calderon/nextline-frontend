<template>
  <v-dialog v-model="isOpen" max-width="600px" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="text-h5 font-weight-bold pa-4 border-b">
        {{ isEditing ? 'Editar Tarea' : 'Nueva Tarea' }}
      </v-card-title>

      <v-card-text class="pa-4">
        <v-form ref="form" v-model="isValid">
          
          <v-text-field
            v-model="localTask.title"
            label="Título de la tarea *"
            variant="outlined"
            density="comfortable"
            :rules="[rules.required]"
            class="mb-2"
          />

          <v-textarea
            v-model="localTask.description"
            label="Descripción *"
            variant="outlined"
            density="comfortable"
            rows="3"
            :rules="[rules.required]"
            class="mb-2"
          />

          <v-row dense>
          <v-col cols="12" md="6">
              <v-select
                  v-model="localTask.status"
                  :items="statusOptions"
                  item-title="text"
                  item-value="value"
                  label="Estado *"
                  variant="outlined"
                  density="comfortable"
                  :rules="[rules.required]"
                  :disabled="!isEditing"
                  persistent-hint
              />
          </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="localTask.due_date"
                type="date" 
                label="Fecha de entrega *"
                variant="outlined"
                density="comfortable"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
          
          <v-text-field
            v-model="localTask.comments"
            label="Comentarios (Opcional)"
            variant="outlined"
            density="comfortable"
            class="mb-2"
          />

          <v-combobox
            v-model="localTask.tags"
            label="Etiquetas (Escribe y presiona Enter)"
            chips
            multiple
            closable-chips
            variant="outlined"
            density="comfortable"
            hide-details
          />

        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4 border-t justify-end">
        <v-btn variant="text" color="grey-darken-1" @click="close">
          Cancelar
        </v-btn>
        <v-btn 
          color="primary" 
          variant="flat" 
          :loading="loading" 
          @click="save"
          :disabled="!isValid"
        >
          {{ isEditing ? 'Actualizar' : 'Guardar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script setup lang="ts">
import type { Task } from '@/interfaces/task.interface';

const props = defineProps<{
    modelValue: boolean;
    taskToEdit?: Task | null;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'save', task: any): void;
}>();

const form = ref(null);
const isValid = ref(false);
const loading = ref(false);

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const defaultTask = {
    title: '',
    description: '',
    status: 'todo',
    due_date: getTodayDate(),
    comments: '',
    tags: [] as string[]
};

const localTask = ref({ ...defaultTask });

const rules = {
    required: (v: string) => !!v || 'Este campo es requerido',
};

const statusOptions = [
    { text: 'Por hacer', value: 'todo' },
    { text: 'En progreso', value: 'progress' },
    { text: 'Completado', value: 'done' }
];

const isOpen = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});

const isEditing = computed(() => !!props.taskToEdit?.id);

watch(() => props.modelValue, (val) => {
    if (val) {
        if (props.taskToEdit) {
            localTask.value = {
                ...props.taskToEdit,
                due_date: props.taskToEdit.due_date ? props.taskToEdit.due_date.substring(0, 10) : ''
            };
        } else {
            localTask.value = {
                ...defaultTask,
                due_date: getTodayDate()
            };
        }
    }
});

const close = () => {
    isOpen.value = false;
};

const save = async () => {
    if (!isValid.value) return;

    loading.value = true;
    try {
        emit('save', {
            ...localTask.value,
            id: props.taskToEdit?.id
        });
    } finally {
        loading.value = false;
    }
};
</script>