<script setup>
import { useRouter } from 'vue-router'
import { useBookingStore } from '../stores/booking'
import { ChevronLeft, UploadCloud, CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const bookingStore = useBookingStore()

const { selectDate, selectArtist, selectSize } = bookingStore

const handleFileUpload = (event) => {
    // Mock file upload logic
    const files = event.target.files
    if (files.length > 0) {
        // In a real app, we'd upload this to a server or convert to base64
        console.log('Files selected:', files)
    }
}

const proceedToConfirm = () => {
    if (bookingStore.draft.size) {
        router.push('/booking-confirm')
    }
}
</script>

<template>
    <div class="p-6 pb-32">
        <button @click="router.push('/home')" class="mb-6 flex items-center text-xs text-white/50 hover:text-white">
            <ChevronLeft class="w-4 h-4 mr-1" /> Back
        </button>

        <div class="mb-10">
            <h3 class="text-accent-yellow text-xs tracking-widest font-bold mb-4">01 // SELECT DATE</h3>

            <!-- Month Mock Selector -->
            <div class="glass-panel p-3 mb-4 border-white/10 flex justify-between items-center">
                <button class="p-2 hover:bg-white/5 rounded-full">
                    <ChevronLeft class="w-4 h-4 text-white/50" />
                </button>
                <div class="text-center">
                    <div class="text-xs text-white/40 font-bold tracking-widest">YEAR</div>
                    <div class="text-sm font-bold text-white">DECEMBER 2025</div>
                </div>
                <button class="p-2 hover:bg-white/5 rounded-full">
                    <ChevronLeft class="w-4 h-4 text-white/50 rotate-180" />
                </button>
            </div>

            <div class="grid grid-cols-5 gap-2">
                <button v-for="d in bookingStore.dates" :key="d.day" @click="d.active ? selectDate(d.day) : null"
                    :class="[
                        'aspect-square rounded-lg flex flex-col items-center justify-center transition-all border',
                        bookingStore.draft.date === d.day
                            ? 'bg-accent-yellow border-accent-yellow text-navy-dark shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105'
                            : d.active
                                ? 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-white/10'
                                : 'bg-transparent border-transparent text-white/10 cursor-not-allowed'
                    ]">
                    <span class="text-[10px] uppercase mb-1 opacity-60">{{ d.dayName }}</span>
                    <span class="text-lg font-bold font-mono">{{ d.day }}</span>
                </button>
            </div>
        </div>

        <div class="mb-10" v-if="bookingStore.draft.date">
            <h3 class="text-accent-yellow text-xs tracking-widest font-bold mb-4">02 // SELECT ARTIST</h3>
            <div class="grid grid-cols-1 gap-3">
                <div v-for="artist in bookingStore.artists" :key="artist.id" @click="selectArtist(artist)" :class="[
                    'glass-panel p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 border',
                    bookingStore.draft.artist?.id === artist.id
                        ? 'bg-white/10 border-accent-yellow shadow-[0_0_20px_rgba(251,191,36,0.15)] transform scale-[1.02]'
                        : 'border-white/5 hover:bg-white/5 hover:border-white/10'
                ]">
                    <img :src="artist.img" class="w-14 h-14 rounded-full object-cover border-2"
                        :class="bookingStore.draft.artist?.id === artist.id ? 'border-accent-yellow' : 'border-white/20'" />

                    <div>
                        <div class="font-bold text-sm uppercase tracking-wide text-white">
                            {{ artist.name }}
                        </div>
                        <div class="text-xs mt-1"
                            :class="bookingStore.draft.artist?.id === artist.id ? 'text-accent-yellow font-bold' : 'text-white/50'">
                            {{ artist.style }}
                        </div>
                    </div>

                    <div v-if="bookingStore.draft.artist?.id === artist.id" class="ml-auto">
                        <div class="w-6 h-6 rounded-full bg-accent-yellow flex items-center justify-center shadow-glow">
                            <CheckCircle class="w-4 h-4 text-navy-dark" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-10" v-if="bookingStore.draft.artist">
            <h3 class="text-accent-yellow text-xs tracking-widest font-bold mb-4">03 // TATTOO DETAILS</h3>

            <div class="grid grid-cols-2 gap-3 mb-6">
                <button @click="selectSize('S - <5cm')"
                    :class="bookingStore.draft.size?.startsWith('S') ? 'btn-primary text-xs py-2' : 'btn-secondary text-xs py-2'">Small</button>
                <button @click="selectSize('M - 10cm')"
                    :class="bookingStore.draft.size?.startsWith('M') ? 'btn-primary text-xs py-2' : 'btn-secondary text-xs py-2'">Medium</button>
                <button @click="selectSize('L - 15cm')"
                    :class="bookingStore.draft.size?.startsWith('L') ? 'btn-primary text-xs py-2' : 'btn-secondary text-xs py-2'">Large</button>
                <button @click="selectSize('XL - Sleeve')"
                    :class="bookingStore.draft.size?.startsWith('X') ? 'btn-primary text-xs py-2' : 'btn-secondary text-xs py-2'">Full
                    Sleeve</button>
            </div>

            <div
                class="glass-panel border-dashed p-8 flex flex-col items-center justify-center text-center relative hover:bg-white/5 transition-all">
                <input type="file" multiple accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer"
                    @change="handleFileUpload" />
                <UploadCloud class="w-8 h-8 text-accent-yellow mb-2" />
                <span class="text-xs font-bold">UPLOAD REFERENCE</span>
                <span class="text-[10px] text-white/40 mt-1">Max 3 images. JPG/PNG.</span>
            </div>
        </div>

        <div v-if="bookingStore.draft.size" class="fixed bottom-6 left-0 w-full px-6">
            <button @click="proceedToConfirm" class="btn-primary shadow-lg text-navy-dark">
                Review Booking
            </button>
        </div>
    </div>
</template>
