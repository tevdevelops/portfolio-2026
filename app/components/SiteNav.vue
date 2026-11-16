<script setup lang="ts">
const links = [
  { label: 'work', to: '/#work' },
  { label: 'about', to: '/about' },
  { label: 'writing', to: '/writing' },
]
</script>

<template>
  <nav aria-label="Primary" class="flex items-center gap-3 font-mono text-xs whitespace-nowrap uppercase sm:gap-5">
    <NuxtLink v-for="l in links" :key="l.label" :to="l.to" class="text-muted hover:text-accent" active-class="text-ink">
      {{ l.label }}
    </NuxtLink>
    <a href="/tevin-rivera-resume.pdf" target="_blank" rel="noopener" class="text-muted hover:text-accent">
      resume<span class="hidden sm:inline" aria-hidden="true"> ↓</span><span class="sr-only"> (opens in a new tab)</span>
    </a>
    <ThemeToggle />
  </nav>
</template>
