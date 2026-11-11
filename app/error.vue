<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({ title: () => (notFound.value ? 'Not found' : 'Error') + ' | Tevin Rivera' })
</script>

<template>
  <NuxtLayout>
    <div class="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <p class="font-mono text-sm text-accent">// {{ error.statusCode }}</p>
      <h1 class="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
        {{ notFound ? 'Nothing here, jawn.' : 'Something broke.' }}
      </h1>
      <p class="mt-6 max-w-xl text-lg text-muted">
        {{ notFound ? 'That page doesn\'t exist, or it moved in the redesign.' : 'Try again in a moment.' }}
      </p>
      <button class="mt-10 bg-ink px-4 py-2 font-mono text-sm text-bg hover:bg-accent" @click="clearError({ redirect: '/' })">
        Back to home
      </button>
    </div>
  </NuxtLayout>
</template>
