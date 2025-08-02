<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger>
      <AspectRatio
        :ratio="1 / 1"
        class="relative"
      >
        <img
          :src="getPhotoUrl(painting.photos[0])"
          class="size-full rounded-md object-cover"
        />
        <Badge class="absolute bottom-2 left-2">
          {{ getCategory(painting) }}
        </Badge>
      </AspectRatio>
    </DialogTrigger>
    <DialogContent>
      <div class="flex flex-col items-center gap-y-4">
        <Carousel
          class="relative w-full max-w-sm"
          @init-api="(api) => (emblaMainApi = api)"
        >
          <CarouselContent>
            <CarouselItem
              v-for="photo of painting.photos"
              :key="photo.file_path"
            >
              <div class="p-1">
                <AspectRatio :ratio="1 / 1">
                  <img
                    :src="getPhotoUrl(photo)"
                    class="size-full rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="invisible sm:visible" />
          <CarouselNext class="invisible sm:visible" />
        </Carousel>
        <Carousel
          class="relative w-full"
          @init-api="(api) => (emblaThumbnailApi = api)"
        >
          <CarouselContent class="ml-0 flex gap-1">
            <CarouselItem
              v-for="(photo, index) of painting.photos"
              :key="photo.file_path"
              class="basis-1/4 cursor-pointer pl-0"
              @click="onThumbnailClick(index)"
            >
              <div
                class="p-1"
                :class="index === selectedIndex ? '' : 'opacity-50'"
              >
                <AspectRatio :ratio="1 / 1">
                  <img
                    :src="getPhotoUrl(photo)"
                    class="size-full rounded-sm object-cover"
                  />
                </AspectRatio>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <DialogHeader>
        <DialogTitle>
          <div class="flex items-center justify-between gap-x-4">
            <div class="flex gap-x-2">
              <h3>
                {{ painting.name }}
              </h3>
              <span class="text-sm text-muted-foreground">
                {{ painting.reference }}
              </span>
            </div>
            <Badge class="ml-auto">{{ getCategory(painting) }}</Badge>
          </div>
        </DialogTitle>
        <DialogDescription>
          <div>{{ painting.width }} x {{ painting.height }} cm (l x h)</div>
          <div>{{ getTechnique(painting) }}</div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="ghost"
          @click="isDialogOpen = false"
        >
          Fermer
        </Button>
        <ContactDialog :painting="painting" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { watchOnce } from "@vueuse/core";
import { ref } from "vue";

import ContactDialog from "@/components/ContactDialog.vue";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getCategory, getTechnique } from "@/lib/painting";
import { getPhotoUrl } from "@/lib/supabase-client";

import type { Painting } from "@/types";

type Props = {
  painting: Painting;
};

defineProps<Props>();

const isDialogOpen = ref(false);

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

const onSelect = () => {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
};

const onThumbnailClick = (index: number) => {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
};

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});
</script>
