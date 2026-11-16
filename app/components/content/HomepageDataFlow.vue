<script setup lang="ts">
// Redrawn (not copied) diagram of the Brad's Deals homepage data flow, used in the Case Study via MDC.
const server = [
  { source: 'Contentstack', step: 'Page arrives as a list of content blocks. The first few render on the server; the rest render as they near the viewport.' },
  { source: 'Contentstack', step: 'The featured placements block holds references to posts by ID only, not the posts themselves.' },
  { source: 'Search API', step: 'One batched request turns those IDs into full posts.' },
  { source: 'Search API', step: 'The deals grid below asks for its own feed, minus the posts already featured above it.' },
]
const client = [
  { source: 'Users service', step: 'The session is restored in the browser, never on the server.' },
  { source: 'Search API', step: 'If the visitor is a member, one batched request reveals member-only prices in place.' },
]
</script>

<template>
  <figure class="not-prose my-10 border border-rule font-sans">
    <div class="grid md:grid-cols-[1fr_auto_1fr]">
      <section class="p-5">
        <h4 class="font-mono text-xs text-muted uppercase">On the server · anonymous, cached at the CDN</h4>
        <ol class="mt-4 space-y-3">
          <li v-for="(s, i) in server" :key="i" class="grid grid-cols-[1.75rem_1fr] gap-2">
            <span class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
            <p><span class="font-mono text-xs text-muted">{{ s.source }}</span><br>{{ s.step }}</p>
          </li>
        </ol>
      </section>
      <div class="grid place-items-center border-y border-rule px-5 py-6 text-center md:border-x md:border-y-0">
        <div class="font-mono text-xs">
          <p class="text-muted">one record per post</p>
          <p class="mt-1 text-lg font-bold">Pinia store</p>
          <p class="mt-1 text-muted">feeds hold IDs only;<br>tiles read reactively</p>
        </div>
      </div>
      <section class="p-5">
        <h4 class="font-mono text-xs text-muted uppercase">In the browser · personalized</h4>
        <ol class="mt-4 space-y-3">
          <li v-for="(s, i) in client" :key="i" class="grid grid-cols-[1.75rem_1fr] gap-2">
            <span class="font-mono text-xs text-accent">{{ String(i + server.length + 1).padStart(2, '0') }}</span>
            <p><span class="font-mono text-xs text-muted">{{ s.source }}</span><br>{{ s.step }}</p>
          </li>
        </ol>
      </section>
    </div>
    <figcaption class="border-t border-rule px-5 py-3 font-mono text-xs text-muted">
      How the homepage comes together. Every source writes into the same store, so a post is loaded once and every tile showing it stays in sync.
    </figcaption>
  </figure>
</template>
