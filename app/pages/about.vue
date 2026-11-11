<script setup lang="ts">
const { data: site } = await useAsyncData('site', () => queryCollection('site').first())
const { data: roles } = await useAsyncData('roles', () =>
  queryCollection('roles').order('start', 'DESC').all())

useSeoMeta({
  title: 'About | Tevin Rivera',
  description: 'Experience, skills and how Tevin Rivera works: senior frontend engineer in Philadelphia.',
})
</script>

<template>
  <div v-if="site" class="mx-auto max-w-7xl px-6 md:px-10">
    <section class="grid gap-10 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-20">
      <SiteHeadshot :src="site.headshot" :alt="`Portrait of ${site.name}`" class="max-w-sm" />
      <div>
        <p class="font-mono text-sm text-muted">{{ site.greeting }}</p>
        <h1 class="mt-3 text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl">About</h1>
        <p v-for="(p, i) in site.about" :key="i" class="mt-6 max-w-2xl text-lg leading-relaxed" :class="i ? 'text-muted' : ''">{{ p }}</p>
        <div class="mt-10 flex flex-wrap gap-3 font-mono text-sm">
          <a href="/tevin-rivera-resume.pdf" class="bg-ink px-4 py-2 text-bg hover:bg-accent">Download resume (PDF)</a>
          <a :href="site.contact[0]?.href" class="border border-ink px-4 py-2 hover:border-accent hover:text-accent">Email me</a>
        </div>
      </div>
    </section>

    <section aria-labelledby="how-heading" class="border-t border-rule py-14">
      <h2 id="how-heading" class="font-mono text-xs text-muted uppercase">How I work</h2>
      <ol class="mt-8 grid gap-10 md:grid-cols-2">
        <li v-for="(h, i) in site.howIWork" :key="h.title">
          <p class="font-mono text-sm text-accent">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="mt-2 text-2xl font-bold tracking-tight">{{ h.title }}</h3>
          <p class="mt-3 leading-relaxed text-muted">{{ h.body }}</p>
        </li>
      </ol>
    </section>

    <section aria-labelledby="experience-heading" class="border-t border-rule py-14">
      <h2 id="experience-heading" class="mb-8 font-mono text-xs text-muted uppercase">Experience</h2>
      <RoleTimeline v-if="roles" :roles="roles" />
    </section>

    <section class="grid gap-10 border-t border-rule py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        <h2 class="font-mono text-xs text-muted uppercase">Education</h2>
        <p class="mt-4 text-xl font-bold tracking-tight">{{ site.education.degree }}</p>
        <p class="text-muted">{{ site.education.school }} · {{ site.education.year }}</p>
      </div>
      <div>
        <h2 class="font-mono text-xs text-muted uppercase">Skills</h2>
        <dl class="mt-4 space-y-4">
          <div v-for="s in site.skills" :key="s.group">
            <dt class="font-medium">{{ s.group }}</dt>
            <dd class="mt-2 flex flex-wrap gap-2 font-mono text-xs">
              <span v-for="item in s.items" :key="item" class="border border-rule px-2 py-1">{{ item }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>
