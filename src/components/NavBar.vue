<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{ name: 'home' }">
                <i class="bi bi-balloon-heart rounded-pill"></i> QuizGPT-Vue
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'home' }">
                            home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'guess' }">
                            guess
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'question' }">
                            question
                        </router-link>
                    </li>
                </ul>
                <login-form />
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue';
</script>