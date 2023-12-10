<script setup lang="ts">
import { ref } from "vue"
import axios from "../plugins/axios"

const username = ref("")
const password = ref("")
const csrfmiddlewaretoken = ref("")
const email = ref("")

const LOGIN_URL = "/accounts/login/?next=/api/me"
const LOGOUT_URL = "/accounts/logout/?next=/"

const token = async () => {
    const res = await axios.get(LOGIN_URL)
    const doc = new DOMParser().parseFromString(res.data, "text/html")
    const input = doc.querySelector("input[name=csrfmiddlewaretoken]") as HTMLInputElement
    csrfmiddlewaretoken.value = input.value;
}

// Django User
interface UserModel {
    date_joined: string,
    email: string,
    first_name: string,
    id: number,
    is_active: boolean,
    is_staff: boolean,
    is_superuser: boolean
    last_name: string,
    username: string,
}

const login = async () => {
    try {
        const res = await axios.postForm<UserModel>(LOGIN_URL, {
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
        const res = await axios.get(LOGOUT_URL)
        console.log(res.status, res.data)
        email.value = ""
    } catch (ex) {
        console.log(ex)
    }
}

token()
</script>

<template>
    <form @submit.prevent="login" v-if="!email">
        <input type="hidden" v-model="csrfmiddlewaretoken">
        <input v-model="username" placeholder="username">
        <input v-model="password" placeholder="password" type="password">
        <input type="submit" value="log in">
    </form>
    <form @submit.prevent="logout" v-else>
        <span>{{ email }}</span>
        <input type="submit" value="log out">
    </form>
</template>