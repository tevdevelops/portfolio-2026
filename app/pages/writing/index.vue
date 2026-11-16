<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('posts').order('date', 'DESC').all())

useSiteSeo({ title: 'Writing', description: 'Notes on frontend engineering and design by Tevin Rivera.' })
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
    <h1 class="text-4xl font-bold tracking-tight md:text-6xl">Writing</h1>
    <ol class="mt-12">
      <li v-for="p in posts" :key="p.path" class="group border-t border-rule">
        <NuxtLink :to="p.path" class="grid gap-2 py-8 md:grid-cols-[14rem_1fr]">
          <time :datetime="p.date" class="font-mono text-xs text-muted">{{ formatDate(p.date) }}</time>
          <div>
            <h2 class="text-2xl font-bold tracking-tight group-hover:text-accent">{{ p.title }}</h2>
            <p class="mt-2 max-w-2xl leading-relaxed text-muted">{{ p.excerpt }}</p>
          </div>
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>
