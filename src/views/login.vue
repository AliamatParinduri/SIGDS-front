<template>
    <div class="flex justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-sky-300 items-center min-h-screen">
        <div class="flex flex-col w-5/7 bg-blue-400/40 rounded-xl">
            <div class="flex flex-col justify-center items-center py-5">
                <img src="http://localhost:8000/src/public/images/logo_skanic.png" alt="Logo Skanic" class="w-20">
                <div class="font-bold text-xl text-white">Login Page</div>
            </div>
            <div class="p-10 space-y-3">
                <input type="text" v-model="username" class="form-control" placeholder="Username">
                <input type="password" v-model="password" class="form-control" placeholder="Password">
                <div class="flex justify-between">
                    <router-link :to="{name: 'landing'}" class="flex justify-center items-center btn btn-slate">Kembali</router-link>
                    <button @click.prevent="login" class="btn btn-slate">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';

    const username = ref('');
    const password = ref('');
    
    const login = async () => {
        try {
            const result = await fetch('http://127.0.0.1:8000/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                }),
            })
            .then(e=>e.json())
            .then(e=> e)
            
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.admin._id);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiredDate = new Date(
            new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiredDate', expiredDate.toISOString());
            
            router.push({name: 'dashboard'});
        } catch (err) {
            const error = new Error(err);
            error.statusCode = 422;
            throw error;
        }
    }
</script>

<style>
</style>