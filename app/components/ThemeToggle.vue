<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="grid size-8 place-items-center text-muted hover:text-accent"
      :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="colorMode.preference = isDark ? 'light' : 'dark'"
    >
      <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-4" />
    </button>
    <template #fallback>
      <span class="size-8" />
    </template>
  </ClientOnly>
</template>
