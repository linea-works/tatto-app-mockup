import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({
    name: null,
    id: null,
    role: "guest", // 'guest' | 'member' | 'admin'
    phone: null,
    email: null,
    history: [],
    avatar: null,
  });

  const isAuthenticated = computed(() => !!user.value.id);
  const isMember = computed(() => user.value.role === "member");
  const isAdmin = computed(() => user.value.role === "admin");

  const register = (data) => {
    // Generate Customer ID: YYMMDD + 3 random digits
    const today = new Date();
    const yymmdd = today.toISOString().slice(2, 10).replace(/-/g, "");
    const random = Math.floor(100 + Math.random() * 900);
    const generatedId = `${yymmdd}-${random}`;

    user.value = {
      ...data,
      id: generatedId,
      role: "member",
      history: [],
      avatar: `https://ui-avatars.com/api/?name=${data.name}&background=fbbf24&color=0a0f1c`,
    };
  };

  const login = (credentials) => {
    // 1. Check Admin
    if (credentials.email.includes("admin") && credentials.pass === "admin") {
      user.value = {
        name: "Administrator",
        id: "ADMIN-001",
        role: "admin",
        email: credentials.email,
        history: [],
        avatar: null,
      };
      return { success: true, role: "admin" };
    }

    // 2. Mock Member Login (Any other email/pass works for demo)
    if (credentials.email && credentials.pass) {
      user.value = {
        name: "Returning Member",
        id: "241224-882",
        role: "member",
        email: credentials.email,
        phone: "08123456789",
        history: [], // In real app, fetch from DB
        avatar: `https://ui-avatars.com/api/?name=Returning+Member&background=fbbf24&color=0a0f1c`,
      };
      return { success: true, role: "member" };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    user.value = {
      name: null,
      id: null,
      role: "guest",
      phone: null,
      email: null,
      history: [],
      avatar: null,
    };
  };

  return { user, isAuthenticated, isMember, isAdmin, register, login, logout };
});
