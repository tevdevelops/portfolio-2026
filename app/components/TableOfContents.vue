<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const props = defineProps<{ links: TocLink[] }>()
const active = ref(props.links[0]?.id)

// Highlight the Chapter whose heading most recently crossed the top third of the viewport.
onMounted(() => {
  const headings = props.links.map(l => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el)
  useIntersectionObserver(headings, (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) active.value = e.target.id
    }
  }, { rootMargin: '0px 0px -66% 0px' })
})
</script>

<template>
  <nav aria-label="Chapters" class="font-mono text-xs">
    <p class="mb-3 text-muted uppercase">Chapters</p>
    <ol class="space-y-2 border-l border-rule">
      <li v-for="(l, i) in links" :key="l.id">
        <a
          :href="`#${l.id}`"
          class="-ml-px block border-l-2 py-0.5 pl-4 hover:text-accent"
          :class="active === l.id ? 'border-accent text-ink' : 'border-transparent text-muted'"
          :aria-current="active === l.id ? 'location' : undefined"
        >
          <span class="text-muted">{{ String(i + 1).padStart(2, '0') }}</span> {{ l.text }}
        </a>
      </li>
    </ol>
  </nav>
</template>
