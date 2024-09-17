<template>
    <div class="flex flex-col gap-20">
        <Card class="p-6 border-2 border-dashed animate-float rounded-full backdrop-blur-sm bg-transparent">
            <form @submit.prevent="handleGenerateEvent" class="flex items-center gap-3">
                <Input type="text" placeholder="ex. google.com" class="rounded-full" v-model="url" />
                <Button type="submit" class="rounded-full flex items-center gap-3 bg-green-600" :disabled="isLoading ? true : false">
                    <Icon v-if="isLoading" name="svg-spinners:180-ring-with-bg" class="w-6 h-6" />
                    <p>{{ isLoading ? 'Processing' : 'Generate' }}</p>
                </Button>
            </form>
        </Card>
        <Card v-if="downloadUrl"
            class="p-6 border-2 border-dashed animate-float rounded-md backdrop-blur-sm bg-transparent flex items-center justify-center relative">
            <a :href="downloadUrl" download="QR-Code">
                <Button class="absolute bottom-3 left-1/2 transform -translate-x-1/2 rounded-full">
                    Download
                </Button>
            </a>
            <img :src="downloadUrl" alt="" class="w-[300px] h-[300px] object-contain">
        </Card>
    </div>

</template>

<script setup>
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from './ui/toast'
import { ref } from 'vue'
import { validateUrl } from '~/utils/validation'

const url = ref('')
const downloadUrl = ref('')
const isLoading = ref(false)

const handleGenerateEvent = async () => {
    if (url.value.trim()) {
        const checker = validateUrl(url.value)
        if (!checker) {
            toast({ description: "URL must include .com", variant: 'destructive' })
            return
        }
        isLoading.value = true
        try {
            const res = await $fetch('/api/generate', {
                method: "POST",
                body: {
                    url: url.value
                }
            })
            console.log(res)
            setTimeout(() => {
                const blob = URL.createObjectURL(res)
                downloadUrl.value = blob
                url.value = ''
                isLoading.value = false
            }, 3000);
        } catch (error) {
            isLoading.value = false
            toast({ description: error })
        }
    } else {
        isLoading.value = false
        toast({ description: "URL is missing", variant: "destructive" })
    }
}
</script>