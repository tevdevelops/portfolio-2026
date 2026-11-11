<script setup lang="ts">
defineProps<{ contact: { label: string, href: string }[] }>()

// Everything except email opens in a new tab so the portfolio stays open behind it.
const newTab = (href: string) => !href.startsWith('mailto:')
const display = (href: string) => href.replace(/^(mailto:|https:\/\/(www\.)?)/, '').replace(/\/$/, '')
</script>

<template>
  <dl class="grid grid-cols-[5.5rem_1fr] gap-y-2 font-mono text-sm">
    <template v-for="c in contact" :key="c.label">
      <dt class="text-muted">{{ c.label.toLowerCase() }}</dt>
      <dd class="min-w-0 truncate">
        <a
          :href="c.href"
          class="hover:text-accent"
          :target="newTab(c.href) ? '_blank' : undefined"
          :rel="newTab(c.href) ? 'noopener' : undefined"
        >{{ display(c.href) }}<span v-if="newTab(c.href)" class="sr-only"> (opens in a new tab)</span></a>
      </dd>
    </template>
  </dl>
</template>
