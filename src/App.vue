<template>
  <div class="flex min-h-screen justify-center p-8 font-display">
    <div class="flex w-full max-w-4xl flex-col gap-y-16">
      <AppHeader />
      <main>
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>
