<template>
  <div class="mainLayout">
    <AppBar />
    <NavDrawer />
    <slot />
  </div>
</template>
<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import NavDrawer from "@/components/AppNavDrawer.vue";
import { IonPage } from "@ionic/vue";
</script>
