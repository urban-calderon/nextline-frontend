import type { Task } from "@/interfaces/task.interface";

export const useTask = async () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiBase;
  const token = useCookie('auth_token');

  const getHeaders = () => ({
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'application/json',
  });

  const { data, error, status, refresh, pending } = await useFetch<{ data: Task[] }>(`${API_URL}/api/tasks`, {
    headers: getHeaders(),
    watch: [token]
  });

  const createTask = async (task: Partial<Task>) => {
    return await $fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: task
    });
  };

  const updateTask = async (id: number, task: Partial<Task>) => {
    return await $fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: task
    });
  };
  
  return {
    tasks: data,
    error,
    status,
    refresh,
    pending,
    createTask,
    updateTask
  };
};
  