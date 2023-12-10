<script setup lang="ts">
import { isAxiosError } from "axios";
import { ref } from "vue"
import { UserModel } from "../types/UserModel";
import axiosClient from "../plugins/axiosClient"

const username = ref("")
const password = ref("")
const csrfmiddlewaretoken = ref("")
const email = ref("")

const LOGIN_URL = "/accounts/login/?next=/api/me"
const LOGOUT_URL = "/accounts/logout/?next=/api/me"

const refreshToken = async () => {
    const res = await axiosClient.get(LOGIN_URL)
    const doc = new DOMParser().parseFromString(res.data, "text/html")
    const input = doc.querySelector("input[name=csrfmiddlewaretoken]") as HTMLInputElement
    csrfmiddlewaretoken.value = input.value;
}

const login = async () => {
    try {
        await refreshToken()
        const res = await axiosClient.postForm<UserModel>(LOGIN_URL, {
            csrfmiddlewaretoken: csrfmiddlewaretoken.value,
            username: username.value,
            password: password.value
        })
        console.log(res.status, res.data)
        email.value = res.data.email
    } catch (ex) {
        console.log(ex)
    }
}

const logout = async () => {
    try {
        const res = await axiosClient.get(LOGOUT_URL)
        console.log(res.status, res.data)
    } catch (ex) {
        if (isAxiosError(ex) && ex.response?.status === 401) {
            console.log("Logged out.")
            email.value = ""
        }
        console.log(ex)
    }
}
</script>

<template>
    <form @submit.prevent="login" v-if="!email">
        <input v-model="username" placeholder="username">
        <input v-model="password" placeholder="password" type="password">
        <input type="submit" value="log in">
    </form>
    <form @submit.prevent="logout" v-else>
        <span>{{ email }}</span>
        <input type="submit" value="log out">
    </form>
</template>