<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useBookingStore } from '../stores/booking'
import { CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const bookingStore = useBookingStore()
const draft = bookingStore.draft

const handleConfirm = () => {
    bookingStore.confirmBooking(authStore.user)
    router.push('/booking-success')
}
</script>

<template>
    <div class="p-6 h-screen flex flex-col">
        <h2 class="text-xl font-bold mb-6 text-white">CONFIRMATION</h2>

        <div class="glass-panel p-6 space-y-6 border-white/10 flex-1">
            <div>
                <label class="text-[10px] text-white/40 uppercase font-bold">Date & Time</label>
                <div class="text-xl font-mono text-white">{{ draft.date }} December 2025</div>
                <div class="text-sm text-accent-yellow">14:00 WIB</div>
            </div>
            <div class="h-px bg-white/10 w-full"></div>
            <div>
                <label class="text-[10px] text-white/40 uppercase font-bold">Artist</label>
                <div class="text-lg text-white">{{ draft.artist?.name }}</div>
                <div class="text-xs text-white/50">{{ draft.artist?.style }}</div>
            </div>
            <div class="h-px bg-white/10 w-full"></div>
            <div>
                <label class="text-[10px] text-white/40 uppercase font-bold">Specifications</label>
                <div class="text-lg text-white">{{ draft.size }}</div>
                <div class="text-xs text-accent-yellow mt-1 flex items-center gap-1">
                    <CheckCircle class="w-3 h-3" /> Reference Uploaded
                </div>
            </div>
        </div>

        <div class="mt-6 space-y-3">
            <button @click="handleConfirm" class="btn-primary text-navy-dark">CONFIRM BOOKING</button>
            <button @click="router.push('/booking')" class="btn-secondary border-none text-xs">Edit Details</button>
        </div>
    </div>
</template>
