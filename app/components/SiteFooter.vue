<script setup lang="ts">
const { data: site } = await useAsyncData('site', () => queryCollection('site').first())
</script>

<template>
  <footer v-if="site" class="border-t border-rule">
    <div class="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:px-10">
      <div>
        <p class="font-mono text-xs text-muted uppercase">Let's talk</p>
        <a :href="site.contact[0]?.href" class="mt-3 block text-2xl font-bold tracking-tight hover:text-accent md:text-3xl">
          {{ site.contact[0]?.href.replace('mailto:', '') }}
        </a>
      </div>
      <div class="flex flex-col justify-between gap-6">
        <ContactList :contact="site.contact" />
        <p class="font-mono text-xs text-muted">© {{ new Date().getFullYear() }} {{ site.name }} · Built with Nuxt in Philadelphia</p>
      </div>
    </div>
  </footer>
</template>
