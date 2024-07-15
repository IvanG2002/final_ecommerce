import { create } from 'zustand';

// Definir el estado y las acciones
export const useUserStore = create((set) => ({
  user: {}, // Estado inicial del usuario
  login: (user) => set(() => ({ user })), // Función de inicio de sesión que actualiza el estado del usuario
}));
