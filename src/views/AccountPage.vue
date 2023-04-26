<template>
  <ion-page class="account">
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Account Info</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item>
                    <ion-input
                      type="text"
                      label="Username"
                      labelPlacement="stacked"
                      :value="authVars.name"
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-input
                      type="text"
                      label="Email"
                      labelPlaement="stacked"
                      :value="authVars.email"
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Gender</ion-label>
                    <!-- MARK// ADD GENDER SELECT HERE -->
                  </ion-item>
                  <ion-item>
                    <ion-input
                      type="text"
                      label="First Name"
                      labelPlaement="stacked"
                      :value="firstName"
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-input
                      type="text"
                      label="Last Name"
                      labelPlaement="stacked"
                      :value="lastName"
                    ></ion-input>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/vue";
import { ref, computed, onMounted } from "vue";
import { useAuth } from "@/store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const auth = useAuth();
await auth.SetupClient();
await auth.NewSession();

const authVars = ref({
  name: auth.accountInfo.name,
  email: auth.accountInfo.email,
});
const memberVars = ref({
  firstName: auth.accountMember.firstName,
  lastName: auth.accountMember.lastName,
  username: auth.accountMember.username,
  gender: auth.accountMember.gender,
  dateOfBirth: auth.accountMember.dateOfBirth,
  address: auth.accountMember.address,
  photo: auth.accountMember.photoUrl,
});

const firstName = computed(() => {
  const fn = authVars.value.name.split(" ")[0];
  return fn !== undefined ? fn : "";
});
const lastName = computed(() => {
  const ln = authVars.value.name.split(" ")[1];
  return ln !== undefined ? ln : "";
});

onMounted(async () => {
  console.log("AccountPage mounted");
  if (auth.accountInfo === undefined) {
    const navResult = await router.push("/");

    if (navResult) {
      console.log("Account Page: Navigation failed back to home");
    } else {
      console.log("AccountPage: user is not logged in");
    }
  }
});
</script>
