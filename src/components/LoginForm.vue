<script setup lang="ts">
import { isAxiosError } from "axios";
import { ref } from "vue";
import { UserModel } from "../types/UserModel";
import useUserStore from "../stores/userStore";
import axiosClient from "../plugins/axiosClient";

const username = ref("");
const password = ref("");
const csrfmiddlewaretoken = ref("");
const userModel = ref<UserModel>();

const store = useUserStore();

const emit = defineEmits<{
  logged_on: [value: UserModel];
  logged_off: [];
}>();

const LOGIN_URL = "/accounts/login/?next=/api/me";
const LOGOUT_URL = "/accounts/logout/?next=/api/me";

const refreshToken = async () => {
  const res = await axiosClient.get<string>(LOGIN_URL);
  const doc = new DOMParser().parseFromString(res.data, "text/html");
  const input = doc.querySelector(
    "input[name=csrfmiddlewaretoken]"
  ) as HTMLInputElement;
  csrfmiddlewaretoken.value = input.value;
};

const login = async () => {
  try {
    await refreshToken();
    const res = await axiosClient.postForm<UserModel>(LOGIN_URL, {
      csrfmiddlewaretoken: csrfmiddlewaretoken.value,
      username: username.value,
      password: password.value,
    });
    console.log(res.status, res.data);
    if (res.data.email !== undefined) {
      userModel.value = res.data as UserModel;
      store.$patch({ user: res.data });
      emit("logged_on", res.data);
    }
  } catch (ex) {
    console.log(ex);
  }
};

const logout = async () => {
  try {
    const res = await axiosClient.get(LOGOUT_URL);
    console.log(res.status, res.data);
  } catch (ex) {
    if (
      isAxiosError(ex) &&
      ex.response!.status > 400 &&
      ex.response!.status < 500
    ) {
      console.log("Logged out.");
      emit("logged_off");
      store.$patch({ user: null });
      userModel.value = undefined;
    } else {
      console.log(ex);
    }
  }
};
</script>

<template>
  <form class="d-flex" @submit.prevent="login" v-if="!userModel">
    <input class="form-control" v-model="username" placeholder="username" />
    <input
      class="form-control me-2"
      v-model="password"
      placeholder="password"
      type="password"
    />
    <input class="btn btn-primary" type="submit" value="log in" />
  </form>
  <form class="d-flex" @submit.prevent="logout" v-else>
    <span class="navbar-text me-2">{{ userModel.email }}</span>
    <input class="btn btn-secondary" type="submit" value="log out" />
  </form>
</template>
