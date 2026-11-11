<template>
  <header class="border-b border-rule">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
      <NuxtLink to="/" class="flex items-center gap-3 hover:text-accent">
        <TevMark class="size-7" :framed="false" />
        <span class="font-bold tracking-tight">Tevin Rivera</span>
      </NuxtLink>
      <SiteNav />
    </div>
  </header>
</template>
