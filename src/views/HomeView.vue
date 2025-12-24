<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Calendar, User, LogOut, X, Settings } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const user = authStore.user

const showDrawer = ref(false)

const navigate = (path) => router.push(path)
const toggleDrawer = () => showDrawer.value = !showDrawer.value

const logout = () => {
    authStore.logout()
    router.push('/register')
}
</script>

<template>
    <div class="p-6 space-y-8 min-h-screen pb-24 relative overflow-x-hidden">

        <!-- Profile Drawer -->
        <div class="fixed inset-0 z-[100] transition-all duration-300"
            :class="showDrawer ? 'visible pointer-events-auto' : 'invisible pointer-events-none'">

            <!-- Backdrop -->
            <div class="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm transition-opacity duration-300"
                :class="showDrawer ? 'opacity-100' : 'opacity-0'" @click="toggleDrawer"></div>

            <!-- Drawer Content -->
            <div class="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-navy-dark border-l border-white/10 shadow-2xl transition-transform duration-300 transform flex flex-col p-6 pointer-events-auto"
                :class="showDrawer ? 'translate-x-0' : 'translate-x-full'">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-xl font-bold text-white">Profile</h2>
                    <button @click="toggleDrawer" class="p-2 hover:bg-white/10 rounded-full">
                        <X class="w-5 h-5 text-white" />
                    </button>
                </div>

                <div class="flex flex-col items-center mb-8">
                    <img :src="user.avatar"
                        class="w-24 h-24 rounded-full border-4 border-accent-yellow shadow-glow mb-4" />
                    <h3 class="text-xl font-bold text-white">{{ user.name }}</h3>
                    <p class="text-accent-yellow text-sm font-bold tracking-widest uppercase">{{ user.role }}</p>
                    <div class="mt-2 bg-white/5 px-3 py-1 rounded text-xs font-mono text-white/50">ID: {{ user.id }}
                    </div>
                </div>

                <div class="space-y-2 mb-auto">
                    <div class="glass-panel p-4 flex items-center gap-3 hover:bg-white/5 transition cursor-pointer">
                        <Settings class="w-5 h-5 text-white/50" />
                        <span class="text-sm font-bold">Settings</span>
                    </div>
                    <div @click="navigate('/profile/edit')"
                        class="glass-panel p-4 flex items-center gap-3 hover:bg-white/5 transition cursor-pointer">
                        <User class="w-5 h-5 text-white/50" />
                        <span class="text-sm font-bold">Edit Profile</span>
                    </div>
                </div>

                <button @click="logout"
                    class="btn-outline-primary border-error text-error hover:bg-error/10 hover:border-error hover:text-error flex items-center justify-center gap-2">
                    <LogOut class="w-4 h-4" /> Sign Out
                </button>
            </div>
        </div>

        <header class="flex justify-between items-center glass-panel p-4 mb-4 border-white/5 sticky top-4 z-50">
            <div class="text-sm font-bold tracking-widest text-white">INKFLOW</div>

            <div v-if="authStore.isAuthenticated && user.avatar" @click="toggleDrawer"
                class="flex items-center gap-3 group cursor-pointer">
                <div class="text-right hidden sm:block">
                    <div class="text-[10px] text-accent-yellow font-bold uppercase tracking-widest">{{ user.role }}
                    </div>
                    <div class="text-xs font-bold text-white">{{ user.id }}</div>
                </div>
                <img :src="user.avatar"
                    class="w-8 h-8 rounded-full border border-accent-yellow shadow-glow group-hover:scale-105 transition-transform" />
            </div>

            <User v-else @click="navigate('/register')"
                class="w-5 h-5 text-white/50 hover:text-accent-yellow cursor-pointer transition" />
        </header>

        <div>
            <h1 class="text-2xl font-bold text-white">Welcome back, <br><span class="text-white/50">{{ user.name ||
                'Guest' }}</span></h1>
        </div>

        <div>
            <div class="flex justify-between items-end mb-4">
                <h3 class="text-xs text-accent-yellow tracking-widest font-bold">UPCOMING SESSION</h3>
                <button v-if="user.history.length > 0" @click="navigate('/booking')"
                    class="text-[10px] font-bold text-white hover:text-accent-yellow border-b border-transparent hover:border-accent-yellow transition-all">+
                    NEW BOOKING</button>
            </div>

            <div v-if="user.history.length > 0" @click="navigate('/booking/' + user.history[0].id)"
                class="glass-panel p-5 relative overflow-hidden group cursor-pointer hover:border-accent-yellow transition-all">
                <div class="absolute top-0 right-0 p-2 bg-accent-yellow text-navy-dark text-[10px] font-bold uppercase">
                    {{ user.history[0].status }}</div>
                <div class="flex items-center gap-4 mb-4">
                    <img v-if="user.history[0].artist?.img" :src="user.history[0].artist.img"
                        class="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                    <div v-else class="w-12 h-12 rounded-full bg-white/10 border border-white/10"></div>
                    <div>
                        <div class="font-bold text-lg text-white">{{ user.history[0].artist.name }}</div>
                        <div class="text-xs text-white/50">{{ user.history[0].artist.style }}</div>
                    </div>
                </div>
                <div class="flex justify-between border-t border-white/10 pt-4">
                    <div class="text-sm"><span class="text-accent-yellow">TYPE:</span> {{ user.history[0].size }}</div>
                    <div class="text-sm font-mono">{{ user.history[0].date }}th DEC</div>
                </div>
            </div>

            <div v-else class="glass-panel p-8 text-center border-dashed border-white/10">
                <div
                    class="mb-4 opacity-30 mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <Calendar class="w-8 h-8 text-white" />
                </div>
                <p class="text-white/50 text-sm mb-4">No bookings yet. Let's get started.</p>
                <button @click="navigate('/booking')" class="btn-primary text-xs py-3 w-auto px-8">Book Now</button>
            </div>
        </div>

        <div>
            <h3 class="text-xs text-white/40 tracking-widest mb-4">HISTORY</h3>
            <div class="space-y-3">
                <!-- Mock History Item -->
                <div class="glass-panel p-4 flex justify-between items-center opacity-50">
                    <span class="text-sm">Nov 12, 2024</span>
                    <span class="text-xs bg-white/10 px-2 py-1 rounded text-white/50">Completed</span>
                </div>
            </div>
        </div>
    </div>
</template>
