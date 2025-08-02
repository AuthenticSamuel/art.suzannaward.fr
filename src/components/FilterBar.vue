<template>
  <section class="flex flex-col gap-y-1">
    <div class="text-sm text-muted-foreground">Filtres</div>
    <div class="flex flex-wrap gap-2">
      <Badge
        v-for="filter of filters"
        :key="filter.value"
        :variant="filter.active ? 'default' : 'outline'"
        @click="toggleFilter(filter)"
        class="cursor-pointer"
      >
        {{ filter.text }}
      </Badge>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";

import { useFilter } from "@/composables/useFilter";

const { filters, toggleFilter } = useFilter();
</script>
