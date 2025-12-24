<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
    setTimeout(() => router.push('/home'), 2500)
})
</script>

<template>
    <section class="h-screen flex flex-col items-center justify-center p-6 text-center">
        <div
            class="w-24 h-24 rounded-full border-2 border-[var(--color-success)] shadow-lg shadow-[var(--color-success)]/20 flex items-center justify-center mb-6">
            <CheckCircle class="w-10 h-10 text-[var(--color-success)]" />
        </div>
        <h2 class="text-xl font-bold mb-2 text-white">REGISTRATION COMPLETE</h2>
        <p class="text-white/50 text-sm mb-8">Welcome to InkFlow.</p>

        <div class="glass-panel p-6 w-full border-white/10 bg-white/5">
            <div class="text-xs text-[var(--color-success)] uppercase tracking-widest mb-2 font-bold">Member ID</div>
            <div class="text-3xl font-mono font-bold tracking-widest text-white">{{ authStore.user.id }}</div>
        </div>

        <p class="mt-8 text-xs animate-pulse text-white/40">Redirecting to Home...</p>
    </section>
</template>
