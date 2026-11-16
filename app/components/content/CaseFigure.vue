<script setup lang="ts">
// A single captioned screenshot in a Case Study.
defineProps<{ src: string, alt: string, caption?: string }>()
</script>

<template>
  <figure class="not-prose my-10">
    <NuxtImg :src="src" :alt="alt" loading="lazy" class="w-full border border-rule" sizes="sm:100vw md:768px" />
    <figcaption v-if="caption" class="mt-3 font-mono text-xs text-muted">{{ caption }}</figcaption>
  </figure>
</template>
