<template>
  <ion-app>
    <MainLayout>
      <ion-router-outlet id="main-content" />
    </MainLayout>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "./store/auth";
import MainLayout from "./layout/MainLayout.vue";

const auth = useAuth();
const router = useRouter();

onMounted(async () => {
  // Added row
  await auth.SetupClient();
  await auth.CheckConnection();

  // Move accountInfo check **After** the CheckConnection functions
  // Is before that it will always be empty
  if (auth.accountInfo === undefined) {
    console.log("User is not logged in");
  } else {
    console.log("User is logged in");
  }
});
</script>
