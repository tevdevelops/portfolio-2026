<script setup lang="ts">
// The TevDevelops mark (T / slash / D in a frame), redrawn from the 2021 SVG to use currentColor.
withDefaults(defineProps<{ framed?: boolean, filled?: boolean }>(), { framed: true, filled: true })
</script>

<template>
  <svg viewBox="0 0 301 301" role="img" aria-label="TevDevelops" xmlns="http://www.w3.org/2000/svg">
    <g :fill="filled ? 'currentColor' : 'none'" stroke="currentColor" :stroke-width="filled ? 0 : 3">
      <path d="M83.4 57.3V102.4H70.9V57.3H55.1V46.5H99.3V57.3H83.4Z" />
      <path fill-rule="evenodd" d="M245 205.9C250.3 210.8 253 217.6 253 226.3C253 235 250.4 241.9 245.2 246.9C240 252 232.1 254.5 221.4 254.5H202.3V198.6H222.1C232 198.5 239.7 201 245 205.9ZM235.9 239.1C239 236.2 240.5 232 240.5 226.5C240.5 221 239 216.8 235.9 213.8C232.8 210.8 228.1 209.4 221.8 209.4H214.8V243.4H222.7C228.4 243.4 232.8 242 235.9 239.1Z" />
      <path d="M45.1836 244.26L246.984 44.1596L252.616 49.8404L50.8164 249.94L45.1836 244.26Z" />
    </g>
    <path v-if="framed" fill="currentColor" fill-rule="evenodd" d="M293 8V293H8V8H293ZM301 0H0V301H301V0Z" />
  </svg>
</template>
