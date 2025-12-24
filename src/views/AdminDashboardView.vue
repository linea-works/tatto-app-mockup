<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useBookingStore } from '../stores/booking'
import { LogOut, FileText, CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const bookingStore = useBookingStore()
const bookings = bookingStore.adminBookings

const markDone = (id) => {
    bookingStore.markCompleted(id)
}

const logout = () => {
    authStore.logout()
    router.push('/register')
}
</script>

<template>
    <div class="min-h-screen p-4 bg-navy-dark">
        <header class="flex justify-between items-center mb-8">
            <h2 class="text-xl font-bold text-accent-yellow">DASHBOARD</h2>
            <LogOut @click="logout" class="w-5 h-5 text-white/50 cursor-pointer hover:text-white" />
        </header>

        <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="glass-panel p-4 border-white/10">
                <div class="text-xs text-white/50 mb-1">TODAY</div>
                <div class="text-2xl font-bold text-white">4</div>
            </div>
            <div class="glass-panel p-4 border-white/10">
                <div class="text-xs text-white/50 mb-1">PENDING</div>
                <div class="text-2xl font-bold text-white">{{bookings.filter(b => b.status === 'Pending').length}}
                </div>
            </div>
        </div>

        <div class="space-y-4">
            <div class="text-xs text-white/30 uppercase tracking-widest">Booking List</div>

            <div v-for="b in bookings" :key="b.id" class="glass-panel p-4 flex justify-between items-center"
                :class="{ 'opacity-50': b.status === 'Completed' }">
                <div>
                    <div class="font-bold text-white">{{ b.customer }}</div>
                    <div class="text-xs text-accent-yellow">{{ b.artist }} • {{ b.size }}</div>
                    <div class="text-[10px] text-white/40 font-mono mt-1">ID: {{ b.id }}</div>
                </div>
                <div class="text-right">
                    <div class="text-xs font-mono mb-2 text-white/60">{{ b.date }} DEC</div>
                    <div class="flex gap-2 justify-end">
                        <button v-if="b.status === 'Pending'" @click="markDone(b.id)"
                            class="text-accent-yellow hover:text-white" title="Mark Complete">
                            <CheckCircle class="w-5 h-5" />
                        </button>
                        <div v-else class="text-xs text-[var(--color-success)] font-bold">DONE</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
