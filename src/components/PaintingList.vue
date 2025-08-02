<template>
  <section class="grid grid-cols-1 gap-8 sm:grid-cols-2">
    <PaintingDialog
      v-for="painting of paintings"
      :key="painting.reference"
      :painting="painting"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import PaintingDialog from "@/components/paintings/PaintingDialog.vue";

import { useFilter } from "@/composables/useFilter";

import { supabase } from "@/lib/supabase-client";

import type { Painting } from "@/types";

const { filters, onFilterChange } = useFilter();

const paintings = ref<Painting[]>([]);
const isLoading = ref(false);

onMounted(() => {
  getPaintings();
});

const getPaintings = async () => {
  isLoading.value = true;

  const filterValues = filters.value
    .filter(({ active }) => active)
    .map((filter) => filter.value);

  let query = supabase.from("paintings").select(
    `
      reference,
      name,
      technique,
      category,
      width,
      height,
      photos (
        file_path
      )
    `,
  );

  if (filterValues.length > 0) query = query.in("category", filterValues);

  const { data, error } = await query;

  isLoading.value = false;

  if (error) {
    console.error(error);
    return;
  }

  paintings.value = data;
};

onFilterChange(getPaintings);
</script>
