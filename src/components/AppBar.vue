<template>
  <ion-header background-color="secondary">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-toggle>
          <ion-button>
            <ion-icon slot="icon-only" :icon="menu" />
          </ion-button>
        </ion-menu-toggle>
      </ion-buttons>
      <ion-img :src="logo" class="navbar__svg" />
      <!-- <ion-title>Melee Matrix</ion-title> -->
      <ion-buttons slot="end" class="navbar__buttons">
        <ion-button class="navbar__btn" href="#">
          <ion-icon
            slot="start"
            class="navbar__btn--icon"
            :icon="trophyOutline"
          />
          Tournaments
        </ion-button>
        <ion-button class="navbar__btn" href="#">
          <ion-icon
            slot="start"
            class="navbar__btn--icon"
            :icon="videocamOutline"
          />
          Live Streams
        </ion-button>
        <ion-button class="navbar__btn" href="#">
          <ion-icon
            slot="start"
            class="navbar__btn--icon"
            :icon="musicalNoteOutline"
          />
          Music
        </ion-button>
        <ion-button class="navbar__btn" href="#">
          Join Now
          <ion-icon
            slot="start"
            class="navbar__btn--icon"
            :icon="arrowForwardOutline"
          />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>
<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonButton,
  IonIcon,
  IonImg,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import {
  menu,
  trophyOutline,
  videocamOutline,
  musicalNoteOutline,
  arrowForwardOutline,
} from "ionicons/icons";
import logo from "../assets/logo_horizontal.svg";
</script>
