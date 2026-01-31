<template>
    <div class="pa-6 d-flex flex-column flex-md-row justify-space-between align-md-center mb-8 gap-4">
      
      <div>
        <div class="d-flex align-center mb-1">
          <h1 class="text-h4 font-weight-bold text-grey-darken-3">
            Mis Tareas
          </h1>
          </div>
      </div>
      
      <div class="d-flex align-center gap-3">
        
        <v-btn 
          color="primary" 
          prepend-icon="mdi-plus" 
          class="text-none font-weight-bold px-6" 
          elevation="0" 
          height="44"
          rounded="lg"
          @click="emit('click:create')"
        >
          Nueva Tarea
        </v-btn>
  
        <v-divider vertical class="mx-2 hidden-sm-and-down" style="height: 24px" />
  
        <v-btn 
          variant="text" 
          prepend-icon="mdi-logout" 
          class="text-none text-grey-darken-1" 
          height="44" 
          rounded="lg"
          @click="logout"
        >
          Cerrar sesión
        </v-btn>
      </div>
  
    </div>
</template>
  
<script lang="ts" setup>
const { logout } = useAuth();

const emit = defineEmits<{
  (e: 'click:create'): void;
}>();

</script>

<style scoped>
.gap-4 {
gap: 16px;
}
.gap-3 {
gap: 12px;
}
</style>