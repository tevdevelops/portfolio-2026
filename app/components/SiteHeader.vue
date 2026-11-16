<script setup lang="ts">
// Phones: sticky, slides away while scrolling down and returns on any scroll up.
// From md up it's a normal static header. Stays visible while anything inside it has focus.
const el = ref<HTMLElement>()
const { hidden, height } = useHeadroom()
const { y } = useWindowScroll()
const { height: measured } = useElementSize(el, undefined, { box: 'border-box' })
watch(measured, h => (height.value = h), { immediate: true })

const THRESHOLD = 8
let lastY = 0
watch(y, (now) => {
  const delta = now - lastY
  if (now <= height.value) hidden.value = false
  else if (delta > THRESHOLD) hidden.value = true
  else if (delta < -THRESHOLD) hidden.value = false
  lastY = now
})

const route = useRoute()
watch(() => route.path, () => (hidden.value = false))
</script>

<template>
  <header
    ref="el"
    class="sticky top-0 z-40 border-b border-rule bg-bg transition-transform duration-200 focus-within:translate-y-0 md:static md:translate-y-0"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
      <NuxtLink to="/" class="flex items-center gap-3 hover:text-accent">
        <TevMark class="size-7" :framed="false" />
        <span class="font-bold tracking-tight">Tevin Rivera</span>
      </NuxtLink>
      <SiteNav />
    </div>
  </header>
</template>
