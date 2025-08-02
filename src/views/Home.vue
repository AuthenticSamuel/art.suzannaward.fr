<template>
  <div class="flex flex-col gap-y-16">
    <Showcase />
    <div class="flex justify-center">
      <RouterLink :to="{ name: 'paintings' }">
        <Button>
          Voir toutes les peintures
          <ArrowRight />
        </Button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { RouterLink } from "vue-router";

import Showcase from "@/components/Showcase.vue";
import { Button } from "@/components/ui/button";
</script>
