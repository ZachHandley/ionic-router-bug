<template>
  <LoginRegisterModal
    v-model:isLoginInitial="isLoginModalSelected"
    v-model:isOpen="isLoginRegisterShowing"
  />
  <ion-menu content-id="main-content" class="navdrawer">
    <ion-header class="navdrawer__header">
      <ion-toolbar color="primary" class="navdrawer__toolbar">
        <ion-title class="navbar__title">Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="navdrawer__content">
      <ion-list class="navdrawer__content--list">
        <!-- <ion-list-header class="navdrawer__content--header">
            <span class="navdrawer__content--header">Navigation</span>
          </ion-list-header> -->
        <ion-menu-toggle :auto-hide="false">
          <ion-item
            button
            class="navdrawer__item"
            router-link="/"
            v-if="auth.accountInfo?.email"
          >
            <ion-icon
              slot="start"
              :icon="home"
              class="navdrawer__item--icon"
            ></ion-icon>
            <ion-label class="navdrawer__item--label"> Home </ion-label>
          </ion-item>
          <!-- IF THE USER IS NOT LOGGED IN -->
          <ion-item
            button
            class="navdrawer__item"
            @click="toggleLoginModal"
            v-if="!auth.accountInfo?.email"
          >
            <ion-icon
              slot="start"
              :icon="logInOutline"
              class="navdrawer__item--icon"
            ></ion-icon>
            <ion-label class="navdrawer__item--label"> Login </ion-label>
          </ion-item>
          <ion-item
            button
            class="navdrawer__item"
            @click="toggleRegisterModal"
            v-if="!auth.accountInfo?.email"
          >
            <ion-icon
              slot="start"
              :icon="personAddOutline"
              class="navdrawer__item--icon"
            ></ion-icon>
            <ion-label class="navdrawer__item--label"> Register </ion-label>
          </ion-item>
          <ion-item
            button
            class="navdrawer__item"
            router-link="/account"
            v-if="auth.accountInfo?.email"
          >
            <ion-icon
              slot="start"
              :icon="personCircleOutline"
              class="navdrawer__item--icon"
            ></ion-icon>
            <ion-label class="navdrawer__item--label"> My Account </ion-label>
          </ion-item>
          <ion-item
            button
            class="navdrawer__item"
            @click="logout"
            v-if="auth.accountInfo?.email"
          >
            <ion-icon
              slot="start"
              :icon="logOutOutline"
              class="navdrawer__item--icon"
            ></ion-icon>
            <ion-label class="navdrawer__item--label"> Logout </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
<script setup lang="ts">
import {
  IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import {
  menu,
  home,
  logInOutline,
  personAddOutline,
  personCircleOutline,
  logOutOutline,
} from "ionicons/icons";
import LoginRegisterModal from "@/components/LoginRegisterModal.vue";
import { onMounted, ref } from "vue";
import { useAuth } from "@/store/auth";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();
const isLoginRegisterShowing = ref(false);
const isLoginModalSelected = ref(true);

const toggleLoginModal = () => {
  isLoginModalSelected.value = true;
  isLoginRegisterShowing.value = isLoginRegisterShowing.value ? false : true;
};

const toggleRegisterModal = () => {
  isLoginModalSelected.value = false;
  isLoginRegisterShowing.value = isLoginRegisterShowing.value ? false : true;
};

const logout = () => {
  auth.Logout();
  router.push("/");
};
</script>
