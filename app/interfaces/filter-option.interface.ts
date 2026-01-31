import type { TaskFilterType } from '@/types/task-filter.type';

export interface FilterOption {
    text: string;
    value: TaskFilterType;
    icon: string;
}