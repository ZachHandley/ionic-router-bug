<template>
  <ion-content class="lrmodal__container">
    <ion-modal
      class="lrmodal__modal"
      ref="modal"
      :is-open="internalIsOpen"
      @willDismiss="onWillDismiss"
    >
      <ion-header class="lrmodal__header">
        <h2 class="heading-2 lrmodal__title" v-if="isLogin">Login</h2>
        <h2 class="heading-2 lrmodal__title" v-else>Register</h2>
      </ion-header>
      <ion-content class="lrmodal__content">
        <ion-grid class="lrmodal__content--grid">
          <ion-row class="lrmodal__tabs">
            <ion-col class="lrmodal__tabs--col">
              <ion-segment :value="selectedTab" @ionChange="handleTabChange">
                <ion-segment-button value="Login" class="lrmodal__tabs--tab">
                  <ion-label class="lrmodal__tabs--label"> Login </ion-label>
                </ion-segment-button>
                <ion-segment-button value="Register" class="lrmodal__tabs--tab">
                  <ion-label class="lrmodal__tabs--label"> Register </ion-label>
                </ion-segment-button>
              </ion-segment>
            </ion-col>
          </ion-row>
          <form
            @submit.prevent="submitLogin()"
            class="lrmodal__content--form"
            v-if="isLogin"
          >
            <ion-row class="lrmodal__content--row">
              <ion-col class="lrmodal__content--col" size="12">
                <ion-item class="lrmodal__content--item">
                  <ion-input
                    label="Email"
                    labelPlacement="floating"
                    name="email"
                    type="email"
                    required
                    autofocus
                    v-model="logInput.email"
                    class="lrmodal__content--input"
                  />
                </ion-item>
                <div
                  class="lrmodal__errors input-errors"
                  v-for="error of login$v.email.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </ion-col>
              <ion-col class="lrmodal__content--col" size="12">
                <ion-item class="lrmodal__content--item">
                  <ion-input
                    label="Password"
                    labelPlacement="floating"
                    name="password"
                    type="password"
                    required
                    v-model="logInput.password"
                    class="lrmodal__content--input"
                  />
                </ion-item>
                <div
                  class="lrmodal__errors input-errors"
                  v-for="error of login$v.password.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </ion-col>
            </ion-row>
            <ion-row class="lrmodal__content--buttons">
              <ion-col class="lrmodal__content--col">
                <ion-button
                  class="lrmodal__content--btn"
                  expand="block"
                  @click="cancel"
                  color="danger"
                >
                  <!-- @click="login ? submitLogin() : submitRegister()" -->
                  Cancel
                </ion-button>
              </ion-col>
              <ion-col class="lrmodal__content--col">
                <ion-button
                  class="lrmodal__content--btn"
                  expand="block"
                  type="submit"
                  @click="submitLogin()"
                >
                  <!-- @click="login ? submitLogin() : submitRegister()" -->
                  Login
                </ion-button>
              </ion-col>
            </ion-row>
          </form>
          <form
            @submit.prevent="submitRegister()"
            class="lrmodal__content--form"
            v-else
          >
            <ion-row class="lrmodal__content--row">
              <ion-col class="lrmodal__content--col" size="12">
                <ion-item class="lrmodal__content--item">
                  <ion-input
                    label="Full Name"
                    labelPlacement="floating"
                    name="email"
                    type="email"
                    autofocus
                    required
                    v-model="regInput.name"
                    class="lrmodal__content--input"
                  />
                </ion-item>
                <div
                  class="lrmodal__errors input-errors"
                  v-for="error of register$v.name.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </ion-col>
              <ion-col class="lrmodal__content--col" size="12">
                <ion-item class="lrmodal__content--item">
                  <ion-input
                    label="Email"
                    labelPlacement="floating"
                    name="email"
                    type="email"
                    required
                    v-model="regInput.email"
                    class="lrmodal__content--input"
                  />
                </ion-item>
                <div
                  class="lrmodal__errors input-errors"
                  v-for="error of register$v.email.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </ion-col>
              <ion-col class="lrmodal__content--col" size="12">
                <ion-item class="lrmodal__content--item">
                  <ion-input
                    label="Password"
                    labelPlacement="floating"
                    name="password"
                    type="password"
                    required
                    v-model="regInput.password"
                    class="lrmodal__content--input"
                  />
                </ion-item>
                <div
                  class="lrmodal__errors input-errors"
                  v-for="error of register$v.password.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </ion-col>
              <ion-col class="lrmodal__content--col" size="12">
                <ion-item class="lrmodal__content--item">
                  <ion-input
                    label="Confirm Password"
                    labelPlacement="floating"
                    name="password"
                    type="password"
                    required
                    v-model="regInput.passwordConfirm"
                    class="lrmodal__content--input"
                  />
                </ion-item>
                <div
                  class="lrmodal__errors input-errors"
                  v-for="error of register$v.passwordConfirm.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </ion-col>
            </ion-row>
            <ion-row class="lrmodal__content--buttons">
              <ion-col class="lrmodal__content--col">
                <ion-button
                  class="lrmodal__content--btn"
                  expand="block"
                  @click="cancel"
                  color="danger"
                >
                  <!-- @click="login ? submitLogin() : submitRegister()" -->
                  Cancel
                </ion-button>
              </ion-col>
              <ion-col class="lrmodal__content--col">
                <ion-button
                  class="lrmodal__content--btn"
                  expand="block"
                  type="submit"
                  @click="submitRegister()"
                >
                  <!-- @click="login ? submitLogin() : submitRegister()" -->
                  Register
                </ion-button>
              </ion-col>
            </ion-row>
          </form>
        </ion-grid>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>
<script setup lang="ts">
import {
  IonHeader,
  IonContent,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { ref, watch } from "vue";
import { useAuth } from "@/store/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useRouter } from "vue-router";

const auth = useAuth();
const router = useRouter();
const props = defineProps<{
  isOpen: boolean;
  isLoginInitial: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", isOpen: boolean): void;
}>();

const internalIsOpen = ref(props.isOpen);
const selectedTab = ref("Login");
const isLogin = ref(props.isLoginInitial);

const modal = ref();
const logInput = ref({
  email: "",
  password: "",
});

const regInput = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const logRules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};
const regRules = {
  name: { required },
  email: { required, email },
  password: {
    required,
    minLength: minLength(8),
  },
  passwordConfirm: {
    required,
    minLength: minLength(8),
    sameAsPassword: {
      $validator: (value: string) => value === regInput.value.password,
      $message: "Passwords do not match",
      $watchTargets: [() => regInput.value.password],
    },
  },
};

const login$v = useVuelidate(logRules, logInput);
const register$v = useVuelidate(regRules, regInput);

watch(
  () => props.isOpen,
  (newValue) => {
    internalIsOpen.value = newValue;
  }
);

watch(
  () => props.isLoginInitial,
  (newValue) => {
    selectedTab.value = newValue ? "Login" : "Register";
  }
);

watch(selectedTab, (newValue) => {
  isLogin.value = newValue === "Login";
});

const handleTabChange = (event: any) => {
  selectedTab.value = event.target.value;
};

const resetInputs = () => {
  logInput.value.email = "";
  logInput.value.password = "";
  regInput.value.email = "";
  regInput.value.name = "";
  regInput.value.password = "";
  regInput.value.passwordConfirm = "";
  login$v.value.$reset();
  register$v.value.$reset();
};

const cancel = () => {
  if (modal !== null) {
    modal.value.$el.dismiss(null, "cancel");
    resetInputs();
  }
};
const onWillDismiss = () => {
  emit("update:isOpen", false);
  resetInputs();
};

const submitLogin = async () => {
  const isFormCorrect = await login$v.value.$validate();
  if (!isFormCorrect) return;
  console.log("Login Submitted with details: ", logInput.value);
  const accountLogged = await auth.Login(
    logInput.value.email,
    logInput.value.password
  );
  if (accountLogged.type === "success") {
    const navResult = await router.push("/account");
    if (navResult) {
      // Navigation failed
      console.log("Navigation failed to account page");
    } else {
      console.log("Navigation to account page successful");
    }
  }
};

const submitRegister = async () => {
  console.log("Register Submitted with details: ", regInput.value);
  const isFormCorrect = await register$v.value.$validate();
  if (!isFormCorrect) return;
  const accountCreated = await auth.CreateAccount(
    regInput.value.email,
    regInput.value.password,
    regInput.value.name
  );
  if (accountCreated.type === "success") {
    const navResult = await router.push("/account");
    if (navResult) {
      // Navigation failed
      console.log(`Navigation failed to account page ${navResult.message}`);
    } else {
      resetInputs();
    }
  }
};
</script>
