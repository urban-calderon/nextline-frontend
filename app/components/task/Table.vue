<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    :loading="loading"
    hover
    class="text-body-2"
  >
    <template #item.title="{ item }">
      <div class="py-2">
        <div 
          class="font-weight-medium text-body-1"
          :class="{ 'text-decoration-line-through text-medium-emphasis': item.status === 'completed' || item.status === 'Completed' }"
        >
          {{ item.title }}
        </div>
        <div class="text-caption text-medium-emphasis">
          {{ item.description }}
        </div>
      </div>
    </template>

    <template #item.createdAt="{ item }">
        <div class="d-flex align-center">
        <v-icon icon="mdi-calendar-blank-outline" size="small" class="mr-2"/>
        <span class="text-capitalize">
            {{ formatDate(item.created_at) }}
        </span>
      </div>
    </template>

    <template #item.dueDate="{ item }">
      <div class="d-flex align-center">
        <v-icon icon="mdi-calendar-clock-outline" size="small" class="mr-2"/>
        <span class="text-capitalize">
          {{ formatDate(item.due_date) }}
        </span>
      </div>
    </template>

    <template #item.status="{ item }">
      <v-chip 
        :color="getStatusColor(item.status)" 
        size="small" 
        variant="flat" 
        class="font-weight-medium"
      >
        {{ getStatusLabel(item.status) }}
      </v-chip>
    </template>

    <template #item.actions="{ item }">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" variant="text" density="comfortable" color="grey" v-bind="props" />
        </template>
        <v-list density="compact">
            <v-list-item @click="emit('click:edit', item)" prepend-icon="mdi-pencil" title="Editar" />
            <v-list-item @click="emit('click:delete', item)" prepend-icon="mdi-delete" title="Eliminar" color="error" />
        </v-list>
      </v-menu>
    </template>

    <template #bottom>
      <div class="d-flex justify-center pa-4 text-caption text-medium-emphasis border-t">
        Mostrando {{ items.length }} tareas
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Task } from '@/interfaces/task.interface';
import { useTaskUI } from '@/composables/useTaskUI';

const props = defineProps<{
  items: Task[];
  search?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Task[]): void;
  (e: 'click:edit', item: Task): void;
  (e: 'click:delete', item: Task): void;
}>();

const { getStatusColor, getStatusLabel, formatDate } = useTaskUI();

const headers = [
  { title: 'Titulo', align: 'start', key: 'title', width: '35%' },
  { title: 'Estado', align: 'start', key: 'status', width: '15%' },
  { title: 'Creado', align: 'start', key: 'createdAt', width: '20%' },
  { title: 'Vencimiento', align: 'start', key: 'dueDate', width: '20%' },
  { title: 'Acciones', align: 'end', key: 'actions', sortable: false },
] as const;
</script>