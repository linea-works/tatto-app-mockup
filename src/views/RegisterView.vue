<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { User, Lock, Mail, Phone, ChevronRight, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const mode = ref('register') // 'register' | 'login'

// Forms
const regForm = ref({ name: '', phone: '', email: '' })
const loginForm = ref({ email: '', pass: '' })
const isLoading = ref(false)

const setMode = (m) => mode.value = m

const handleRegister = async () => {
    if (!regForm.value.name) return
    isLoading.value = true

    // Simulate API delay for effect
    setTimeout(() => {
        authStore.register(regForm.value)
        router.push('/register-success')
        isLoading.value = false
    }, 1500)
}

const handleLogin = async () => {
    isLoading.value = true
    setTimeout(() => {
        const result = authStore.login(loginForm.value)
        isLoading.value = false

        if (result.success) {
            if (result.role === 'admin') router.push('/admin/dashboard')
            else router.push('/home')
        } else {
            alert(result.message || 'Login failed')
        }
    }, 1000)
}
</script>

<template>
    <div class="min-h-screen flex bg-navy-dark">
        <!-- Visual Side (Desktop / large screens) -->
        <div class="hidden lg:block w-1/2 relative overflow-hidden">
            <div class="absolute inset-0 bg-navy-dark/40 z-10 mix-blend-multiply"></div>
            <img src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop"
                class="w-full h-full object-cover animate-fade-in" alt="Tattoo Art" />
            <div class="absolute bottom-12 left-12 z-20">
                <h1 class="text-6xl font-bold text-white mb-4 tracking-tighter">INK<span
                        class="text-accent-yellow">FLOW</span></h1>
                <p class="text-xl text-white/70 max-w-md">Join the exclusive community. Book your session. Create your
                    legacy.</p>
            </div>
        </div>

        <!-- Form Side -->
        <div class="w-full lg:w-1/2 relative flex flex-col justify-center p-6 lg:p-20">
            <!-- Mobile Background Image Faint -->
            <div class="lg:hidden absolute inset-0 opacity-10 pointer-events-none z-0">
                <img src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=1000&auto=format&fit=crop"
                    class="w-full h-full object-cover" />
            </div>

            <div class="relative z-10 max-w-md mx-auto w-full">
                <!-- Toggle -->
                <div class="flex p-1 bg-white/5 rounded-xl mb-12 border border-white/10 w-fit mx-auto lg:mx-0">
                    <button @click="setMode('register')"
                        class="px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300"
                        :class="mode === 'register' ? 'bg-accent-yellow text-navy-dark shadow-lg' : 'text-white/50 hover:text-white'">
                        JOIN
                    </button>
                    <button @click="setMode('login')"
                        class="px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300"
                        :class="mode === 'login' ? 'bg-accent-yellow text-navy-dark shadow-lg' : 'text-white/50 hover:text-white'">
                        SIGN IN
                    </button>
                </div>

                <!-- Register Form -->
                <div v-if="mode === 'register'" class="space-y-6 animate-fade-in">
                    <div>
                        <h2 class="text-4xl font-bold text-white mb-2">Create Account</h2>
                        <p class="text-white/50">Get your Member ID and start booking.</p>
                    </div>

                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-accent-yellow uppercase tracking-widest ml-1">Full
                                Name</label>
                            <div class="relative">
                                <User
                                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                                <input v-model="regForm.name" type="text" class="input-glass !pl-12"
                                    placeholder="Enter your full name">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold text-accent-yellow uppercase tracking-widest ml-1">WhatsApp</label>
                            <div class="relative">
                                <Phone
                                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                                <input v-model="regForm.phone" type="tel" class="input-glass !pl-12"
                                    placeholder="+62 812...">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-accent-yellow uppercase tracking-widest ml-1">Email
                                (Optional)</label>
                            <div class="relative">
                                <Mail
                                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                                <input v-model="regForm.email" type="email" class="input-glass !pl-12"
                                    placeholder="alex@example.com">
                            </div>
                        </div>
                    </div>

                    <button @click="handleRegister" :disabled="isLoading"
                        class="btn-primary group flex items-center justify-center gap-2 mt-8 py-5 text-base shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                        <span v-if="!isLoading">GET MEMBER ID</span>
                        <span v-else class="animate-pulse">PROCESSING...</span>
                        <ArrowRight v-if="!isLoading" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p class="text-center text-xs text-white/30 mt-6">By joining, you agree to our Terms & Studio Rules.
                    </p>
                </div>

                <!-- Login Form -->
                <div v-else class="space-y-6 animate-fade-in">
                    <div>
                        <h2 class="text-4xl font-bold text-white mb-2">Welcome Back</h2>
                        <p class="text-white/50">Access your dashboard and history.</p>
                    </div>

                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-accent-yellow uppercase tracking-widest ml-1">Access ID
                                / Email</label>
                            <div class="relative">
                                <User
                                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                                <input v-model="loginForm.email" type="text" class="input-glass !pl-12"
                                    placeholder="Member ID or Email">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold text-accent-yellow uppercase tracking-widest ml-1">Passcode</label>
                            <div class="relative">
                                <Lock
                                    class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                                <input v-model="loginForm.pass" type="password" class="input-glass !pl-12"
                                    placeholder="••••••••">
                            </div>
                            <div class="text-right">
                                <a href="#" class="text-xs text-white/30 hover:text-white transition">Forgot
                                    Passcode?</a>
                            </div>
                        </div>
                    </div>

                    <button @click="handleLogin" :disabled="isLoading"
                        class="btn-primary group flex items-center justify-center gap-2 mt-8 py-5 text-base shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                        <span v-if="!isLoading">ENTER</span>
                        <span v-else class="animate-pulse">AUTHENTICATING...</span>
                        <ChevronRight v-if="!isLoading"
                            class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div class="mt-8 p-4 rounded-lg bg-white/5 border border-white/5">
                        <p class="text-xs text-center text-white/40">
                            <strong>Demo Credentials:</strong><br>
                            Admin: admin / admin<br>
                            Member: any / any
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
