import type { Task } from "./task.interface";

export interface TaskResponse {
    success: boolean;
    message: string;
    data:    Task[];
}