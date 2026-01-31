<template>
  <v-container class="login-container bg-grey-lighten-5" fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
        
        <v-card class="rounded-lg pa-8" elevation="0" border color="white">
          <div class="text-center mb-8">
            <h1 class="text-h5 font-weight-bold text-grey-darken-4 mb-1">Bienvenido</h1>
            <p class="text-body-2 text-medium-emphasis">
              Inicie sesión para gestionar sus tareas
            </p>
          </div>

          <v-alert v-if="errorMsg" type="error" variant="tonal" class="mb-6" density="compact">
            {{ errorMsg }}
          </v-alert>

          <v-form v-model="form" @submit.prevent="handleLogin">
            
            <label class="text-caption font-weight-bold text-grey-darken-2 mb-2 d-block text-uppercase">
              Correo electrónico
            </label>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              placeholder="name@company.com"
              variant="outlined"
              color="primary"
              density="comfortable"
              bg-color="white"
              class="mb-4"
              single-line
              hide-details="auto"
            ></v-text-field>

            <label class="text-caption font-weight-bold text-grey-darken-2 mb-2 d-block text-uppercase">
              Contraseña
            </label>
            
            <v-text-field
              v-model="password"
              :rules="[rules.required]"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              placeholder="Enter your password"
              variant="outlined"
              color="primary"
              density="comfortable"
              bg-color="white"
              class="mb-8"
              single-line
              hide-details="auto"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>

            <v-btn
              type="submit"
              block
              color="blue-darken-1"
              size="large"
              class="text-none font-weight-bold rounded-lg"
              elevation="0"
              :loading="loading"
              height="48"
            >
              Iniciar sesión
            </v-btn>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});

const { login } = useAuth();

const form = ref(false);
const loading = ref(false);
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const showPassword = ref(false);

const rules = {
  required: (v: string) => !!v || 'Este campo es requerido',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Correo electrónico inválido',
};

const handleLogin = async () => {
  if (!form.value) return;
  
  loading.value = true;
  errorMsg.value = '';

  try {
    await login({ 
      email: email.value, 
      password: password.value 
    });
  } catch (e: any) {
    errorMsg.value = e.response?._data?.message || 'Credenciales inválidas';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-container :deep(.v-row) {
  flex: 1;
  min-height: 0;
}
</style>
