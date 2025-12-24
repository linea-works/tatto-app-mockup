<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = (path) => {
    router.push(path)
}
</script>

<template>
    <section class="h-screen flex flex-col justify-end p-6 pb-12 relative">
        <div class="absolute top-1/4 left-0 w-full text-center px-6">
            <img src="/src/assets/linea-works-light.png" class="mx-auto mix-blend-soft-light" />
        </div>

        <div class="glass-panel p-8 mb-8 relative z-10 border-white/5">
            <h1 class="text-4xl font-bold text-white mb-2 tracking-tight">BOOK YOUR <span
                    class="text-accent-yellow">INK</span>.</h1>
            <p class="text-white/60 mb-8 font-light">Your tattoo. Your time. Your artist.</p>

            <div class="space-y-4">
                <button @click="navigate('/register')" class="btn-primary flex items-center justify-center gap-2">
                    <span>Get Started</span>
                </button>
                <button @click="navigate('/register')" class="btn-secondary">
                    Get it on App Store
                </button>
            </div>
        </div>
    </section>
</template>
