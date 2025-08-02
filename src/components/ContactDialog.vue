<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button>
        <Heart />
        Je suis intéressé·e
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cette peinture vous intéresse ?</DialogTitle>
        <DialogDescription>
          Laissez-nous vos coordonnées et Suzanna vous répondra dans les plus
          brefs délais.
        </DialogDescription>
      </DialogHeader>
      <form
        @submit="onSubmit"
        class="space-y-4"
      >
        <FormField
          v-slot="{ componentField }"
          name="name"
        >
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Jean"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>Adresse mail</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="jean@gmail.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="message"
        >
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea
                type="message"
                placeholder="Votre message ici. La référence de la peinture est automatiquement transmise avec ce message."
                rows="5"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
      <Alert
        v-if="isError"
        variant="destructive"
      >
        <XCircle />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur est survenue lors de l'envoi de votre message. Veuillez
          réessayer ultérieurement.
        </AlertDescription>
      </Alert>
      <DialogFooter>
        <Button
          variant="ghost"
          @click="isDialogOpen = false"
        >
          Fermer
        </Button>
        <Button
          @click="onSubmit"
          :disabled="isLoading"
        >
          <Loader2
            v-if="isLoading"
            class="animate-spin"
          />
          <Send v-else />
          Envoyer le message
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Heart, Loader2, Send, XCircle } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { ref } from "vue";
import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import FormMessage from "@/components/ui/form/FormMessage.vue";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import type { Painting } from "@/types";

type Props = {
  painting?: Painting;
};

const props = defineProps<Props>();

const isDialogOpen = ref(false);
const isLoading = ref(false);
const isError = ref(false);

const formSchema = toTypedSchema(
  z.object({
    name: z.string({ message: "Requis" }).min(1),
    email: z.string({ message: "Requis" }).email("Requis"),
    message: z.string({ message: "Requis" }).min(1),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        reference: props.painting?.reference,
      }),
    });
    isDialogOpen.value = false;
  } catch (error) {
    isError.value = true;
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>
