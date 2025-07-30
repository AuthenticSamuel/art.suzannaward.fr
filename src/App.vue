<template>
  <div>
    Test
    <button @click="handleButtonClick">Send event</button>
  </div>
</template>

<script setup lang="ts">
import { usePostHog } from "@/composables/usePostHog";

const { posthog } = usePostHog();

const handleButtonClick = () => {
  posthog.capture("event click", { property: "value" });
};
</script>
