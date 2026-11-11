<script setup lang="ts">
import type { RolesCollectionItem } from '@nuxt/content'

const props = defineProps<{ roles: RolesCollectionItem[] }>()

// Roles arrive newest first; consecutive Roles at one organization (promotions) are grouped.
const groups = computed(() => {
  const out: { org: string, roles: RolesCollectionItem[] }[] = []
  for (const r of props.roles) {
    const last = out.at(-1)
    if (last?.org === r.org) last.roles.push(r)
    else out.push({ org: r.org, roles: [r] })
  }
  return out
})
</script>

<template>
  <ol>
    <li v-for="g in groups" :key="g.org" class="grid gap-4 border-t border-rule py-8 md:grid-cols-[14rem_1fr]">
      <div>
        <h3 class="text-xl font-bold tracking-tight">{{ g.org }}</h3>
        <p class="mt-1 font-mono text-xs text-muted">
          {{ formatYearMonth(g.roles.at(-1)!.start) }}–{{ formatYearMonth(g.roles[0]!.end) }}
        </p>
      </div>
      <ol class="space-y-6">
        <li v-for="r in g.roles" :key="r.title">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <p class="font-medium">{{ r.title }}</p>
            <p class="font-mono text-xs text-muted">
              {{ formatYearMonth(r.start) }}–{{ formatYearMonth(r.end) }}<template v-if="r.remote"> · Remote</template>
            </p>
          </div>
          <ul v-if="r.bullets.length" class="mt-3 space-y-2 text-muted">
            <li v-for="(b, i) in r.bullets" :key="i" class="relative pl-4 leading-relaxed before:absolute before:left-0 before:text-accent before:content-['–']">
              {{ b }}
            </li>
          </ul>
        </li>
      </ol>
    </li>
  </ol>
</template>
