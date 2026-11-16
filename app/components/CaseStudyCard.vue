<script setup lang="ts">
import type { CaseStudiesCollectionItem } from '@nuxt/content'

defineProps<{ study: Pick<CaseStudiesCollectionItem, 'path' | 'title' | 'summary' | 'org' | 'period' | 'status' | 'stack' | 'cover'> }>()
</script>

<template>
  <article class="group border-b border-rule">
    <NuxtLink :to="study.path" class="block px-6 py-10 md:px-10">
      <NuxtImg v-if="study.cover" :src="study.cover" alt="" class="aspect-[16/9] w-full object-cover" sizes="sm:100vw md:60vw" />
      <div v-else class="media-placeholder aspect-[16/9] w-full" />
      <div class="mt-6 flex justify-between font-mono text-xs uppercase text-muted">
        <span>{{ study.org }}</span>
        <span>{{ study.status === 'in-progress' ? 'In progress' : study.period }}</span>
      </div>
      <h3 class="mt-3 text-3xl font-bold tracking-tight group-hover:text-accent md:text-4xl">
        {{ study.title }} <span aria-hidden="true">→</span>
      </h3>
      <p class="mt-3 leading-relaxed text-muted">{{ study.summary }}</p>
      <ul class="mt-5 flex flex-wrap gap-2 font-mono text-xs" aria-label="Stack">
        <li v-for="s in study.stack" :key="s" class="border border-rule px-2 py-1">{{ s }}</li>
      </ul>
    </NuxtLink>
  </article>
</template>
