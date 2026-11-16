<script setup lang="ts">
// Two screenshots side by side: "compare" = equal halves (before/after), "device" = desktop + phone.
withDefaults(defineProps<{
  first: string
  firstAlt: string
  firstLabel?: string
  second: string
  secondAlt: string
  secondLabel?: string
  caption?: string
  layout?: 'compare' | 'device'
}>(), { layout: 'compare', firstLabel: undefined, secondLabel: undefined, caption: undefined })
</script>

<template>
  <figure class="not-prose my-10">
    <div class="grid items-start gap-4" :class="layout === 'device' ? 'grid-cols-[3fr_1fr]' : 'sm:grid-cols-2'">
      <div>
        <p v-if="firstLabel" class="mb-2 font-mono text-xs text-muted uppercase">{{ firstLabel }}</p>
        <NuxtImg :src="first" :alt="firstAlt" loading="lazy" class="w-full border border-rule" sizes="sm:100vw md:600px" />
      </div>
      <div>
        <p v-if="secondLabel" class="mb-2 font-mono text-xs text-muted uppercase">{{ secondLabel }}</p>
        <NuxtImg :src="second" :alt="secondAlt" loading="lazy" class="w-full border border-rule" :sizes="layout === 'device' ? 'sm:30vw md:200px' : 'sm:100vw md:600px'" />
      </div>
    </div>
    <figcaption v-if="caption" class="mt-3 font-mono text-xs text-muted">{{ caption }}</figcaption>
  </figure>
</template>
