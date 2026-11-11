<script setup lang="ts">
import type { ProjectsCollectionItem } from '@nuxt/content'

defineProps<{ project: ProjectsCollectionItem }>()
</script>

<template>
  <li class="grid gap-2 border-t border-rule py-5 md:grid-cols-[11rem_1fr] md:gap-4">
    <div>
      <p class="font-bold">{{ project.name }}</p>
      <p class="font-mono text-xs text-muted">{{ project.org }}</p>
    </div>
    <div>
      <p class="text-muted">{{ project.blurb }}</p>
      <p class="mt-2 flex flex-wrap gap-x-4 font-mono text-xs">
        <a v-for="l in project.links" :key="l.url" :href="l.url" class="hover:text-accent" target="_blank" rel="noopener">{{ l.label }} ↗</a>
      </p>
    </div>
  </li>
</template>
