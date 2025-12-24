<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ChevronLeft, Calendar, Clock, User, Download, FileText } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// Mock fetching booking by ID (In real app, fetch from API)
// For mock, we just take the first item in history or find by ID if we had a full list
const bookingId = route.params.id
const booking = authStore.user.history.find(b => b.id === bookingId) || authStore.user.history[0]

const isUpcoming = booking?.status === 'Upcoming'
</script>

<template>
    <div class="h-screen flex flex-col p-6 bg-navy-dark relative overflow-hidden">
        <!-- Background Ambient -->
        <div class="absolute -top-20 -right-20 w-64 h-64 bg-accent-yellow/5 rounded-full blur-3xl pointer-events-none">
        </div>

        <!-- Navigation -->
        <button @click="router.back()" class="flex items-center text-xs text-white/50 hover:text-white mb-8 z-10 w-fit">
            <ChevronLeft class="w-4 h-4 mr-1" /> Back
        </button>

        <div v-if="booking" class="flex-1 flex flex-col z-10 animate-fade-in relative">

            <!-- Header Status -->
            <div class="mb-6 flex justify-between items-start">
                <div>
                    <h1 class="text-2xl font-bold text-white mb-1">Booking Detail</h1>
                    <p class="text-sm font-mono text-white/40">#{{ booking.id }}</p>
                </div>
                <div class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                    :class="isUpcoming ? 'bg-accent-yellow/10 border-accent-yellow text-accent-yellow' : 'bg-white/5 border-white/10 text-white/50'">
                    {{ booking.status }}
                </div>
            </div>

            <!-- Main Card -->
            <div class="glass-panel p-0 overflow-hidden mb-6 flex-1 max-h-[500px] flex flex-col">
                <!-- Artist Section -->
                <div class="p-6 border-b border-white/5 bg-white/5 flex items-center gap-4">
                    <img :src="booking.artist.img"
                        class="w-16 h-16 rounded-full object-cover border-2 border-white/10" />
                    <div>
                        <div class="text-[10px] uppercase tracking-widest text-accent-yellow font-bold mb-1">Artist
                        </div>
                        <div class="text-lg font-bold text-white leading-none mb-1">{{ booking.artist.name }}</div>
                        <div class="text-xs text-white/50">{{ booking.artist.style }}</div>
                    </div>
                </div>

                <!-- Details Grid -->
                <div class="p-6 grid gap-6">
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <div class="flex items-center gap-2 mb-2 text-white/40">
                                <Calendar class="w-4 h-4" />
                                <span class="text-[10px] font-bold uppercase tracking-widest">Date</span>
                            </div>
                            <div class="text-white font-mono text-lg">{{ booking.date }} DEC 2025</div>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 mb-2 text-white/40">
                                <Clock class="w-4 h-4" />
                                <span class="text-[10px] font-bold uppercase tracking-widest">Time</span>
                            </div>
                            <div class="text-white font-mono text-lg">14:00 WIB</div>
                        </div>
                    </div>

                    <div class="h-px bg-white/5 w-full"></div>

                    <div>
                        <div class="flex items-center gap-2 mb-2 text-white/40">
                            <FileText class="w-4 h-4" />
                            <span class="text-[10px] font-bold uppercase tracking-widest">Specifications</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="text-white text-lg">{{ booking.size }}</div>
                            <div class="text-sm text-accent-yellow font-bold">~IDR 1.500.000</div>
                        </div>
                    </div>
                </div>

                <!-- QR Code Stamp -->
                <div class="mt-auto p-6 bg-navy-dark/30 border-t border-white/5 flex justify-between items-center">
                    <div class="text-xs text-white/30 max-w-[150px]">Show this QR at the reception upon arrival.</div>
                    <div class="p-2 bg-white rounded-lg">
                        <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.id}`"
                            class="w-16 h-16 mix-blend-multiply" />
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="grid grid-cols-2 gap-3 mt-auto">
                <button class="btn-secondary flex items-center justify-center gap-2">
                    <Download class="w-4 h-4" /> Save Invoice
                </button>
                <button v-if="isUpcoming" class="btn-error border-error text-error bg-transparent hover:bg-error/10">
                    Cancel Booking
                </button>
                <button v-else class="btn-primary">
                    Book Again
                </button>
            </div>
        </div>

        <div v-else class="flex-1 flex flex-col items-center justify-center text-white/30">
            <p>Booking not found.</p>
        </div>
    </div>
</template>
