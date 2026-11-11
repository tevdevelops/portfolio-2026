<script setup lang="ts">
const links = [
  { label: 'work', to: '/#work' },
  { label: 'about', to: '/about' },
  { label: 'writing', to: '/writing' },
]
</script>

<template>
  <nav aria-label="Primary" class="flex items-center gap-5 font-mono text-xs uppercase">
    <NuxtLink v-for="l in links" :key="l.label" :to="l.to" class="text-muted hover:text-accent" active-class="text-ink">
      {{ l.label }}
    </NuxtLink>
    <a href="/tevin-rivera-resume.pdf" target="_blank" rel="noopener" class="text-muted hover:text-accent">
      resume ↓<span class="sr-only"> (opens in a new tab)</span>
    </a>
    <ThemeToggle />
  </nav>
</template>
