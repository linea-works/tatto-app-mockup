<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Get the latest booking
const booking = authStore.user.history[0] || {}
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center p-6 bg-navy-dark relative">
        <div class="absolute inset-0 bg-[var(--color-success)]/5 z-0"></div>

        <div
            class="glass-panel p-8 w-full text-center relative z-10 border-[var(--color-success)] shadow-lg shadow-[var(--color-success)]/10">
            <div class="text-xs text-[var(--color-success)] uppercase tracking-[0.2em] mb-6 font-bold">Booking Confirmed
            </div>

            <div class="bg-white p-4 rounded-xl mx-auto w-48 h-48 mb-6 flex items-center justify-center">
                <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.id}`" alt="QR Code"
                    class="w-full h-full mix-blend-multiply" />
            </div>

            <div class="text-2xl font-mono font-bold text-white mb-1">ID: #{{ booking.id }}</div>
            <div class="text-sm text-white/50">{{ booking.date }} DEC 2025 • {{ booking.artist?.name }}</div>
        </div>

        <div class="mt-8 w-full space-y-4 relative z-10">
            <button class="btn-secondary bg-navy-dark border-none">Save to Gallery</button>
            <button @click="router.push('/home')" class="text-white/50 text-sm w-full text-center hover:text-white">Back
                to
                Home</button>
        </div>
    </div>
</template>
