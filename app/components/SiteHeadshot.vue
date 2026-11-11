<script setup lang="ts">
// Shows the headshot when site.yml has one; otherwise a clearly marked placeholder.
defineProps<{ src?: string, alt: string }>()
</script>

<template>
  <NuxtImg v-if="src" :src="src" :alt="alt" class="aspect-[4/5] w-full object-cover grayscale-[15%]" sizes="sm:320px md:400px" />
  <div v-else class="media-placeholder grid aspect-[4/5] w-full place-items-center" role="img" :aria-label="`${alt} (photo coming soon)`">
    <TevMark class="size-16 text-rule" :framed="false" />
  </div>
</template>
