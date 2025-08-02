<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="icon"
      >
        <Moon
          class="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <Sun
          class="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
        <span class="sr-only">Changer de thème</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">Clair</DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">Sombre</DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">Système</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Moon, Sun } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mode = useColorMode({
  initialValue: "light",
});
</script>
