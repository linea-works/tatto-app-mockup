<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const pass = ref('')

const handleLogin = () => {
    if (authStore.loginAdmin({ email: email.value, pass: pass.value })) {
        router.push('/admin/dashboard')
    } else {
        alert('Invalid credentials (try admin/admin)')
    }
}
</script>

<template>
    <div class="h-screen flex flex-col justify-center p-6 bg-navy-dark">
        <div class="mb-8 border-l-4 border-accent-yellow pl-4">
            <h1 class="text-3xl font-bold text-white">STAFF<br>ACCESS</h1>
        </div>
        <div class="space-y-4">
            <input v-model="email" type="email" placeholder="Artist ID (admin)"
                class="input-glass border-white/10 focus:border-accent-yellow">
            <input v-model="pass" type="password" placeholder="Passcode (admin)"
                class="input-glass border-white/10 focus:border-accent-yellow">
            <button @click="handleLogin"
                class="w-full py-4 rounded-xl font-bold text-navy-dark bg-accent-yellow hover:bg-accent-hover transition shadow-lg">
                AUTHENTICATE
            </button>
        </div>
        <div @click="router.push('/home')" class="mt-8 text-center text-xs text-white/30 cursor-pointer">Return to
            Client View
        </div>
    </div>
</template>
