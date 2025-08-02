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

import { supabase } from "@/lib/supabase-client";

import { type Painting } from "@/types";

const paintings = ref<Painting[]>([]);

onMounted(() => {
  getShowcasePaintings();
});

const getShowcasePaintings = async () => {
  const { data, error } = await supabase
    .from("paintings")
    .select(
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
    )
    .filter("reference", "in", "(S8,S4,P1,F1)");

  if (error) {
    console.error(error);
    return;
  }

  paintings.value = data;
};
</script>
