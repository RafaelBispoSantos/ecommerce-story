import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
    checkingAuth: false, // Para ações específicas
    initializingAuth: true, // Apenas para carregamento inicial

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });
		console.log("Signup started: ", { name, email, password, confirmPassword });

		if (password !== confirmPassword) {
			set({ loading: false });
			console.log("Passwords do not match");
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			console.log("Signup response: ", res.data);
			set({ user: res.data, loading: false });
		} catch (error) {
			console.error("Signup error: ", error.response?.data || error.message);
			set({ loading: false });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

    login: async (email, password) => {
        set({ loading: true }); // Marcar como carregando
        try {
          const res = await axios.post("/auth/login", { email, password });
          set({ user: res.data, loading: false }); // Atualizar o estado do usuário
        } catch (error) {
          set({ loading: false }); // Certifique-se de interromper o carregamento
          toast.error(error.response?.data?.message || "An error occurred during login");
        }
      },

	logout: async () => {
		console.log("Logout started");
		try {
			await axios.post("/auth/logout");
			set({ user: null });
			console.log("Logout successful");
		} catch (error) {
			console.error("Logout error: ", error.response?.data || error.message);
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

    checkAuth: async () => {
        const { initializingAuth } = get();
        if (!initializingAuth) return; // Evita múltiplos loops de inicialização
    
        set({ initializingAuth: true });
        try {
          const response = await axios.get("/auth/profile");
          set({ user: response.data, initializingAuth: false });
        } catch (error) {
          console.error("Erro ao verificar autenticação:", error.response?.data);
          set({ user: null, initializingAuth: false });
        }
      },

	refreshToken: async () => {
		if (get().checkingAuth) {
			console.log("Refresh already in progress");
			return;
		}

		set({ checkingAuth: true });
		console.log("Refreshing token...");
		try {
			const response = await axios.post("/auth/refresh-token");
			console.log("Refresh token response: ", response.data);
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			console.error("Refresh token error: ", error.message);
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				console.error("Interceptor refresh error: ", refreshError);
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
