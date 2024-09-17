<template>
    <div class="md:container w-full mx-auto min-h-screen flex flex-col items-center justify-center">
        <NuxtPage />
        <Toaster />
    </div>
</template>

<script setup>
import { Toaster } from '../components/ui/toast'
</script>