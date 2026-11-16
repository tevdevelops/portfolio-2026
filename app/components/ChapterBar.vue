<script setup lang="ts">
// Phones only: a slim sticky bar showing the current Chapter and reading progress.
// Tapping it opens the Chapter list. Sits under the header when the header is showing.
import type { TocLink } from '@nuxt/content'

const props = defineProps<{ links: TocLink[], target?: HTMLElement }>()
const active = useActiveHeading(() => props.links)
const { hidden, height } = useHeadroom()
const open = ref(false)

const index = computed(() => Math.max(0, props.links.findIndex(l => l.id === active.value)))
const pad = (n: number) => String(n).padStart(2, '0')

// Reading progress through the Case Study body, 0 → 1.
const { top, height: bodyHeight } = useElementBounding(() => props.target)
const { height: viewport } = useWindowSize()
const progress = computed(() => {
  const scrollable = bodyHeight.value - viewport.value
  return scrollable > 0 ? Math.min(1, Math.max(0, -top.value / scrollable)) : 0
})

onKeyStroke('Escape', () => (open.value = false))
</script>

<template>
  <div
    class="sticky z-30 -mx-6 self-start border-b border-rule bg-bg transition-[top] duration-200 md:hidden"
    :style="{ top: hidden ? '0px' : `${height}px` }"
  >
    <button
      type="button"
      class="flex w-full items-center justify-between gap-3 px-6 py-3 text-left font-mono text-xs"
      :aria-expanded="open"
      aria-controls="chapter-menu"
      @click="open = !open"
    >
      <span class="min-w-0 truncate">
        <span class="text-accent">{{ pad(index + 1) }}</span><span class="text-muted"> / {{ pad(links.length) }} · </span>{{ links[index]?.text }}
      </span>
      <Icon :name="open ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="size-4 shrink-0 text-muted" />
      <span class="sr-only">{{ open ? 'Hide' : 'Show' }} chapters</span>
    </button>
    <div class="h-0.5 origin-left bg-accent" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
    <nav v-show="open" id="chapter-menu" aria-label="Chapters" class="border-t border-rule px-6 py-2">
      <ol class="font-mono text-xs">
        <li v-for="(l, i) in links" :key="l.id">
          <a
            :href="`#${l.id}`"
            class="block py-2.5"
            :class="i === index ? 'text-ink' : 'text-muted'"
            :aria-current="i === index ? 'location' : undefined"
            @click="open = false"
          >
            <span class="text-accent">{{ pad(i + 1) }}</span> {{ l.text }}
          </a>
        </li>
      </ol>
    </nav>
  </div>
</template>
