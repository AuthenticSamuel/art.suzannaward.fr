<template>
  <div class="flex flex-col gap-y-16">
    <FilterBar />
    <PaintingList />
  </div>
</template>

<script setup lang="ts">
import FilterBar from "@/components/FilterBar.vue";
import PaintingList from "@/components/PaintingList.vue";
</script>
