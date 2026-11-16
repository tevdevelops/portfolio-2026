<script setup lang="ts">
const route = useRoute()
const { data: study } = await useAsyncData(`case-study-${route.path}`, () =>
  queryCollection('caseStudies').path(route.path).first())

if (!study.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true })
}

const { data: surround } = await useAsyncData(`case-study-surround-${route.path}`, () =>
  queryCollectionItemSurroundings('caseStudies', route.path, { fields: ['title', 'org'] }).order('order', 'ASC'))

useSeoMeta({
  title: `${study.value.title} | Tevin Rivera`,
  description: study.value.summary,
  ogTitle: study.value.title,
  ogDescription: study.value.summary,
  ogImage: study.value.cover,
})

const chapters = computed(() => study.value?.body.toc?.links ?? [])
const body = ref<HTMLElement>()
</script>

<template>
  <article v-if="study">
    <header class="border-b border-rule">
      <div class="mx-auto max-w-7xl px-6 pt-14 pb-12 md:px-10 md:pt-20">
        <p class="font-mono text-xs text-muted uppercase">
          Case study · {{ study.org }}
          <span v-if="study.status === 'in-progress'" class="ml-2 border border-accent px-1.5 py-0.5 text-accent">In progress</span>
        </p>
        <h1 class="mt-4 max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl">{{ study.title }}</h1>
        <p class="mt-6 max-w-3xl text-xl leading-snug text-muted">{{ study.summary }}</p>

        <div class="mt-12 grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <dl class="grid grid-cols-[5.5rem_1fr] content-start gap-y-3 font-mono text-sm">
            <dt class="text-muted">role</dt>
            <dd>{{ study.role }}</dd>
            <dt class="text-muted">period</dt>
            <dd>{{ study.period }}</dd>
            <dt class="text-muted">stack</dt>
            <dd>{{ study.stack.join(', ') }}</dd>
            <template v-if="study.liveUrl">
              <dt class="text-muted">live</dt>
              <dd><a :href="study.liveUrl" class="hover:text-accent" target="_blank" rel="noopener">{{ study.liveUrl.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '') }} ↗</a></dd>
            </template>
          </dl>
          <div>
            <h2 class="font-mono text-xs text-muted uppercase">Outcomes</h2>
            <ol class="mt-3">
              <li v-for="(o, i) in study.outcomes" :key="i" class="grid grid-cols-[2.5rem_1fr] border-t border-rule py-3 text-lg font-medium">
                <span class="font-mono text-sm text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                <span>{{ o }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </header>

    <NuxtImg v-if="study.cover" :src="study.cover" alt="" class="mx-auto aspect-[16/9] w-full max-w-7xl object-cover" sizes="sm:100vw xl:1280px" />

    <div class="mx-auto grid max-w-7xl gap-10 px-6 pb-14 md:grid-cols-[14rem_minmax(0,1fr)] md:px-10 md:pt-14">
      <ChapterBar v-if="chapters.length > 1" :links="chapters" :target="body" />
      <aside v-if="chapters.length > 1" class="hidden md:block">
        <TableOfContents :links="chapters" class="sticky top-8" />
      </aside>
      <div ref="body" class="min-w-0 md:col-start-2">
        <ContentRenderer :value="study" class="prose prose-site prose-lg max-w-3xl" />
      </div>
    </div>

    <nav v-if="surround?.some(Boolean)" aria-label="More case studies" class="border-t border-rule">
      <div class="mx-auto grid max-w-7xl md:grid-cols-2">
        <NuxtLink v-if="surround?.[0]" :to="surround[0].path" class="group border-rule px-6 py-10 md:border-r md:px-10">
          <p class="font-mono text-xs text-muted">← previous</p>
          <p class="mt-2 text-2xl font-bold tracking-tight group-hover:text-accent">{{ surround[0].title }}</p>
        </NuxtLink>
        <span v-else />
        <NuxtLink v-if="surround?.[1]" :to="surround[1].path" class="group px-6 py-10 text-right md:px-10">
          <p class="font-mono text-xs text-muted">next →</p>
          <p class="mt-2 text-2xl font-bold tracking-tight group-hover:text-accent">{{ surround[1].title }}</p>
        </NuxtLink>
      </div>
    </nav>
  </article>
</template>
