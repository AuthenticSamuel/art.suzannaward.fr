<template>
  <header class="flex flex-col items-start justify-between gap-4 sm:flex-row">
    <h1 class="text-3xl font-semibold">Galerie d'art de Suzanna</h1>
    <ThemeDropdownMenu />
  </header>
</template>

<script setup lang="ts">
import ThemeDropdownMenu from "@/components/ThemeDropdownMenu.vue";
</script>
