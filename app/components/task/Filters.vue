<template>
    <v-card-text class="d-flex flex-column flex-md-row align-stretch align-md-center justify-space-between py-4 px-6 border-b">
        
        <div class="d-flex gap-2 w-100 w-md-auto overflow-x-auto mb-4 mb-md-0 hide-scrollbar align-center">
            <v-btn 
                v-for="option in filterOptions" 
                :key="option.value"
                :variant="localFilter === option.value ? 'flat' : 'text'"
                :color="localFilter === option.value ? 'black' : 'grey-darken-1'"
                :prepend-icon="option.icon"
                class="text-none px-4 rounded-pill flex-shrink-0"
                height="36"
                @click="localFilter = option.value"
            >
                {{ option.text }}
            </v-btn>
        </div>

        <div class="w-100 search-container">
            <v-text-field
                v-model="localSearch"
                density="compact"
                variant="solo"
                placeholder="Buscar tareas..."
                prepend-inner-icon="mdi-magnify"
                hide-details
                single-line
                bg-color="grey-lighten-4"
                class="rounded-lg"
                flat
                clearable
            ></v-text-field>
        </div>
    </v-card-text>
</template>

<script setup lang="ts">
import type { TaskFilterType } from '@/types/task-filter.type';
import type { FilterOption } from '@/interfaces/filter-option.interface';

const props = withDefaults(defineProps<{
    search?: string;
    filter?: TaskFilterType;
}>(), {
    search: '',
    filter: 'all'
});

const emit = defineEmits<{
    (e: 'update:search', value: string): void;
    (e: 'update:filter', value: TaskFilterType): void;
}>();

const localSearch = computed({
    get: () => props.search,
    set: (val) => emit('update:search', val)
});

const localFilter = computed({
    get: () => props.filter,
    set: (val) => emit('update:filter', val)
});

const filterOptions: FilterOption[] = [
    { text: 'Todas', value: 'all', icon: 'mdi-view-list' },
    { text: 'Por hacer', value: 'todo', icon: 'mdi-circle-outline' },
    { text: 'En progreso', value: 'progress', icon: 'mdi-progress-clock' },
    { text: 'Completado', value: 'done', icon: 'mdi-check-circle-outline' },
];
</script>

<style scoped>
.gap-2 {
    gap: 8px;
}

.overflow-x-auto {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch; 
}

.hide-scrollbar::-webkit-scrollbar {
    display: none; 
}

.hide-scrollbar {
    -ms-overflow-style: none; 
    scrollbar-width: none; 
}


.flex-shrink-0 {
    flex-shrink: 0 !important;
}


@media (min-width: 960px) {
    .search-container {
        max-width: 300px;
        margin-left: auto;
    }
}
</style>