<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ChevronLeft, User, Phone, Mail, Camera } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const user = authStore.user

// Clone user data for editing
const form = ref({
    name: user.name,
    phone: user.phone,
    email: user.email,
    avatar: user.avatar
})

const isSaving = ref(false)

const saveProfile = () => {
    isSaving.value = true

    // Simulate API call
    setTimeout(() => {
        // Update store directly for mock purposes
        authStore.user = {
            ...authStore.user,
            ...form.value,
            // Regenerate avatar URL based on new name just for effect if name changed
            avatar: `https://ui-avatars.com/api/?name=${form.value.name}&background=fbbf24&color=0a0f1c`
        }

        isSaving.value = false
        router.push('/home')
    }, 1000)
}
</script>

<template>
    <div class="h-screen flex flex-col p-6 bg-navy-dark relative">
        <!-- Navigation -->
        <div class="flex items-center justify-between mb-8 z-10">
            <button @click="router.back()" class="flex items-center text-xs text-white/50 hover:text-white">
                <ChevronLeft class="w-4 h-4 mr-1" /> Back
            </button>
            <h1 class="text-lg font-bold text-white">Edit Profile</h1>
            <div class="w-10"></div> <!-- Spacer -->
        </div>

        <div class="flex-1 max-w-md mx-auto w-full animate-fade-in">
            <!-- Avatar Edit -->
            <div class="flex flex-col items-center mb-8 relative group cursor-pointer w-fit mx-auto">
                <img :src="form.avatar"
                    class="w-28 h-28 rounded-full border-4 border-white/10 group-hover:border-accent-yellow transition-colors object-cover" />
                <div
                    class="absolute bottom-0 right-0 p-2 bg-accent-yellow rounded-full text-navy-dark shadow-lg group-hover:scale-110 transition-transform">
                    <Camera class="w-5 h-5" />
                </div>
            </div>

            <!-- Form -->
            <div class="space-y-6">
                <div>
                    <label class="text-xs text-white/60 uppercase tracking-wider mb-2 block font-bold">Full Name</label>
                    <div class="relative">
                        <User class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input v-model="form.name" type="text" class="input-glass !pl-12" placeholder="Your Name">
                    </div>
                </div>

                <div>
                    <label class="text-xs text-white/60 uppercase tracking-wider mb-2 block font-bold">WhatsApp</label>
                    <div class="relative">
                        <Phone class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input v-model="form.phone" type="tel" class="input-glass !pl-12" placeholder="Phone Number">
                    </div>
                </div>

                <div>
                    <label class="text-xs text-white/60 uppercase tracking-wider mb-2 block font-bold">Email</label>
                    <div class="relative">
                        <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input v-model="form.email" type="email" class="input-glass !pl-12" placeholder="Email Address">
                    </div>
                </div>

                <div class="pt-4">
                    <button @click="saveProfile" :disabled="isSaving"
                        class="btn-primary flex items-center justify-center gap-2">
                        <span v-if="!isSaving">SAVE CHANGES</span>
                        <span v-else class="animate-pulse">SAVING...</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
