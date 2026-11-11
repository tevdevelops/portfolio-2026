<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`post-${route.path}`, () =>
  queryCollection('posts').path(route.path).first())

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: `${post.value.title} | Tevin Rivera`,
  description: post.value.excerpt,
  ogTitle: post.value.title,
  ogDescription: post.value.excerpt,
  ogImage: post.value.cover,
})
</script>

<template>
  <article v-if="post" class="mx-auto max-w-3xl px-6 py-14 md:py-20">
    <p class="font-mono text-xs text-muted">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time> · {{ post.tags.join(', ') }}
    </p>
    <h1 class="mt-4 text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl">{{ post.title }}</h1>
    <NuxtImg v-if="post.cover" :src="post.cover" alt="" class="mt-10 aspect-[16/9] w-full object-cover" sizes="sm:100vw md:768px" />
    <ContentRenderer :value="post" class="prose prose-site prose-lg mt-10" />
    <NuxtLink to="/writing" class="mt-14 inline-block font-mono text-sm text-muted hover:text-accent">← All writing</NuxtLink>
  </article>
</template>
