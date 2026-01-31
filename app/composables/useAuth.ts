import type { LoginPayload } from '@/interfaces/login-payload.interface';
import type { AuthResponse } from '@/interfaces/auth-response.interface';

export const useAuth = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.apiBase;

const token = useCookie<string | null>('auth_token');

  const login = async (payload: LoginPayload) => {
    try {
      const response = await $fetch<AuthResponse>(`${API_URL}/api/login`, {
        method: 'POST',
        body: payload,
      });

      if (response.success && response.data && response.data.access_token) {
        token.value = response.data.access_token;
        
        return navigateTo('/tasks');
      } else {
        throw new Error(response.message || 'Login failed');
      }
      
    } catch (error: any) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    return navigateTo('/');
  };

  return {
    token,
    login,
    logout,
    isLoggedIn: computed(() => !!token.value),
  };
};