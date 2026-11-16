<script setup lang="ts">
// Muted screen recording for Case Studies. Plays only while visible; with reduced motion it never
// autoplays and shows controls instead. preload="none" keeps it off the critical path.
defineProps<{ src: string, poster: string, caption?: string }>()

const video = ref<HTMLVideoElement>()
const reducedMotion = usePreferredReducedMotion()
const autoplay = computed(() => reducedMotion.value !== 'reduce')

useIntersectionObserver(video, ([entry]) => {
  if (!video.value || !autoplay.value) return
  if (entry?.isIntersecting) video.value.play().catch(() => {})
  else video.value.pause()
}, { threshold: 0.25 })
</script>

<template>
  <figure class="not-prose my-10">
    <video
      ref="video"
      :src="src"
      :poster="poster"
      :controls="!autoplay"
      class="aspect-video w-full bg-rule object-cover"
      muted
      loop
      playsinline
      preload="none"
    />
    <figcaption v-if="caption" class="mt-3 font-mono text-xs text-muted">{{ caption }}</figcaption>
  </figure>
</template>
