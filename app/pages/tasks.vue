<template>
  <div>
    <SharedHeader @click:create="openCreateModal" />
    
    <v-card class="rounded-lg" elevation="0" border>
        <TasksTaskTable 
            :items="tasks?.data || []" 
            @click:edit="openEditModal"
            @click:delete="handleDelete"
        />
    </v-card>

    <TaskModal
      v-model="isModalOpen"
      :task-to-edit="editingTask"
      @save="handleSaveTask"
    />
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/interfaces/task.interface';
import TaskModal from '~/components/tasks/TaskModal.vue';

const { tasks, refresh, createTask, updateTask } = await useTask();

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

const handleDelete = async (task: Task) => {
}
</script>