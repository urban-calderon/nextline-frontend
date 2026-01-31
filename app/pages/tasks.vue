<template>
  <div>
    <SharedHeader @click:create="openCreateModal" />
    
    <v-card class="rounded-lg" elevation="0" border>
        <TaskTable 
            :items="tasks?.data || []" 
            @click:edit="openEditModal"
            @click:delete="confirmDelete"
        />
    </v-card>

    <TaskModalForm
      v-model="isModalOpen"
      :task-to-edit="editingTask"
      @save="handleSaveTask"
    />

    <TaskModalDelete
        v-model="isDeleteDialogOpen"
        :task-title="taskToDelete?.title"
        :loading="isDeleting"
        @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/interfaces/task.interface';
import { useActionTask } from '@/composables/useActionTask';
import TaskTable from '@/components/task/Table.vue';
import TaskModalForm from '@/components/task/ModalForm.vue';
import TaskModalDelete from '@/components/task/ModalDelete.vue';

const { tasks, refresh, createTask, updateTask, deleteTask } = await useActionTask();

const isModalOpen = ref(false);
const editingTask = ref<Task | null>(null);

const openCreateModal = () => {
  editingTask.value = null; 
  isModalOpen.value = true;
};

const openEditModal = (task: Task) => {
  editingTask.value = task; 
  isModalOpen.value = true;
};

const isDeleteDialogOpen = ref(false);
const taskToDelete = ref<Task | null>(null);
const isDeleting = ref(false);

const handleSaveTask = async (taskForm: any) => {
  try {
    if (taskForm.id) {
      await updateTask(taskForm.id, taskForm);
    } else {
      await createTask(taskForm);
    }
    
    isModalOpen.value = false;
    await refresh();
    
  } catch (error) {
    console.error('Error al guardar:', error);
  }
};

const confirmDelete = (task: Task) => {
  taskToDelete.value = task;
  isDeleteDialogOpen.value = true;
};

const handleDeleteConfirm = async () => {
  if (!taskToDelete.value) return;

  isDeleting.value = true;
  try {
    await deleteTask(taskToDelete.value.id);
    await refresh();
    isDeleteDialogOpen.value = false; // Cerramos el modal
    taskToDelete.value = null;      // Limpiamos la selección
  } catch (error) {
    console.error('Error al eliminar:', error);
  } finally {
    isDeleting.value = false;
  }
};
</script>