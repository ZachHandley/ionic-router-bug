import { defineStore } from "pinia";
import { ref } from "vue";
import { Client, Account, ID, Models, Databases, Query } from "appwrite";
import core from "../core/core";
import { DateTime } from "luxon";

export const useAuth = defineStore("auth", () => {
  // CONSTANTS We won't use but need to define for type safety
  // Check if isConnected is true, false, or null in local storage
  const isConnectedStorage = localStorage.getItem("isConnected");
  // Check if AutoSave is true, false, or null in local storage
  const isAutoSaveStorage = localStorage.getItem("autoSave");
  // Check if we have created an associated members document for the user
  const isMemberStorage = localStorage.getItem("member");
  // Database for connecting to the members collection
  const database = ref();

  const client = ref();
  const account = ref();
  const accountInfo = ref();
  const accountMember = ref();
  const isConnected = ref(
    isConnectedStorage === null ? false : isConnectedStorage
  );
  const autoSave = ref(isAutoSaveStorage === null ? false : isAutoSaveStorage);
  const memberStorage = ref(
    isMemberStorage !== null ? JSON.parse(isMemberStorage) : false
  );

  const SetupClient = async () => {
    if (!client.value) {
      client.value = new Client();
      client.value
        .setEndpoint(core.constants.ENDPOINT)
        .setProject(core.constants.PROJECT);

      database.value = new Databases(client.value);
      account.value = new Account(client.value);
      await CheckConnection();
    }
  };

  const CreateAccount = async (
    email: string,
    password: string,
    name: string
  ) => {
    console.log("Creating account...");
    let response, type;
    try {
      await account.value.create(ID.unique(), email, password, name);
      accountInfo.value = await account.value.createEmailSession(
        email,
        password
      );
      await NewSession();
      response = "Account has been created";
      type = "success";
    } catch (error: any) {
      response = error.message;
      type = "error";
    }
    return { response: response, type: type };
  };

  const Login = async (email: string, password: string) => {
    console.log("Logging in...");
    let response, type;
    try {
      accountInfo.value = await account.value.createEmailSession(
        email,
        password
      );
      response = "Logged in";
      type = "success";
    } catch (error: any) {
      response = error.message;
      type = "error";
    }
    await NewSession();
    return { response: response, type: type };
  };

  const Logout = async () => {
    try {
      await account.value.deleteSessions();
      isConnected.value = false;
      accountInfo.value = null;
      accountMember.value = null;
      localStorage.removeItem("isConnected");
      localStorage.removeItem("member");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const CheckConnection = async () => {
    if (account.value == null) {
      isConnected.value = false;
    }
    try {
      const session = await account.value.get();
      if (session) {
        isConnected.value = true;
        accountInfo.value = session;
        localStorage.setItem("isConnected", JSON.stringify(accountInfo.value));
      }
    } catch (error) {
      console.log("Not connected");
      isConnected.value = false;
    }
  };

  async function NewSession() {
    await CheckConnection();
  }

  const DeleteAccount = () => {
    // TODO: Delete account
  };

  const SetAutoSave = (value: any) => {
    autoSave.value = value;
    localStorage.setItem("autoSave", value);
  };

  return {
    SetupClient,
    account,
    accountInfo,
    accountMember,
    memberStorage,
    isConnected,
    autoSave,
    CreateAccount,
    Login,
    CheckConnection,
    Logout,
    NewSession,
  };
});
