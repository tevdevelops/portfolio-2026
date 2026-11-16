<script setup lang="ts">
definePageMeta({ layout: 'home' })

const { data: site } = await useAsyncData('site', () => queryCollection('site').first())
const { data: studies } = await useAsyncData('home-case-studies', () =>
  queryCollection('caseStudies')
    .where('featured', '=', true)
    .order('order', 'ASC')
    // Cards only need these fields; skip shipping full Case Study bodies in the home payload.
    .select('path', 'title', 'summary', 'org', 'period', 'status', 'stack', 'cover')
    .all())
const { data: projects } = await useAsyncData('home-projects', () =>
  queryCollection('projects').order('order', 'ASC').all())

useSeoMeta({
  title: 'Tevin Rivera | Senior Frontend Engineer',
  description: () => site.value?.headline,
})
</script>

<template>
  <div v-if="site" class="mx-auto grid max-w-7xl md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
    <header class="border-rule px-6 py-10 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-r md:px-10 md:py-12">
      <div class="flex min-h-full flex-col">
        <!-- Phones: nav shares the top row with the mark, like the other pages' header. -->
        <div class="flex items-start justify-between gap-4">
          <TevMark class="size-12 shrink-0 text-ink md:size-28" :framed="false" />
          <div class="pt-1 md:hidden">
            <SiteNav />
          </div>
        </div>
        <p class="mt-10 font-mono text-sm text-muted">{{ site.greeting }}</p>
        <h1 class="mt-3 text-5xl leading-none font-bold tracking-tight md:text-6xl">{{ site.name }}</h1>
        <p class="mt-4 font-mono text-sm text-accent">// {{ site.title.toLowerCase() }}</p>
        <p class="mt-8 max-w-md text-xl leading-snug font-medium">{{ site.headline }}</p>
        <p v-for="(p, i) in site.bio" :key="i" class="mt-4 max-w-md leading-relaxed text-muted">{{ p }}</p>
        <ContactList :contact="site.contact" class="mt-auto pt-10" />
      </div>
    </header>

    <main id="main" class="border-t border-rule md:border-t-0">
      <div class="flex items-center justify-between border-b border-rule px-6 py-4 md:px-10">
        <p class="font-mono text-xs text-muted uppercase">
          Case studies / {{ String(studies?.length ?? 0).padStart(2, '0') }}
        </p>
        <div class="hidden md:block">
          <SiteNav />
        </div>
      </div>

      <section id="work" aria-labelledby="work-heading">
        <h2 id="work-heading" class="sr-only">Case studies</h2>
        <CaseStudyCard v-for="s in studies" :key="s.path" :study="s" />
      </section>

      <section class="px-6 py-10 md:px-10" aria-labelledby="earlier-heading">
        <h2 id="earlier-heading" class="mb-6 font-mono text-xs text-muted uppercase">Earlier work</h2>
        <ul>
          <ProjectRow v-for="p in projects" :key="p.name" :project="p" />
        </ul>
      </section>

      <footer class="border-t border-rule px-6 py-10 font-mono text-xs text-muted md:px-10">
        © {{ new Date().getFullYear() }} {{ site.name }} · Built with Nuxt in Philadelphia
      </footer>
    </main>
  </div>
</template>
