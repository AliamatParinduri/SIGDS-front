<template>
    <div class="justify-between items-center py-2 px-5 flex bg-gradient-to-br from-blue-500 via-blue-600 to-sky-300">
        <div class="flex flex-col md:flex-row w-full justify-between items-center">
            
            <div class="flex flex-col md:flex-row w-1/4">
                <div class="flex"><img src="/src/assets/svg/menu.svg" alt="" srcset="" class="w-[27px] block md:hidden"></div>
                <div class="hidden md:flex w-full justify-between items-center">
                    <div class="flex items-center">
                        <img src="http://localhost:8000/src/public/images/logo_skanic.png" alt="Logo Skanic" class="w-12">
                        <div class="w-48 text-sm text-center font-bold">
                        Gerakan Disiplin Sekolah SMKN 1 Ciomas
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hidden md:flex flex-col md:flex-row w-full justify-end">
                <div class="flex flex-col md:flex-row py-2 md:py-0">
                    <router-link :to="{name: token ? 'dashboard' : 'landing'}" class="px-0 md:px-4 py-1.5 md:py-0 text-sm font-semibold hover:font-black hover:text-white hover:rounded-sm active:border-0 active:border-transparent">Beranda</router-link>
                    <router-link :to="{name: 'tataTertib'}" class="px-0 md:px-4 py-1.5 md:py-0 text-sm font-semibold hover:font-black hover:text-white hover:rounded-sm active:border-0 active:border-transparent">Tata Tertib</router-link>
                    
                    <router-link v-if="token" :to="{name: 'dataPelanggaran'}" class="px-0 md:px-4 py-1.5 md:py-0 text-sm font-semibold hover:font-black hover:text-white hover:rounded-sm active:border-0 active:border-transparent">Data Pelanggaran</router-link>
                    <router-link v-if="token" :to="{name: 'dataSiswa'}" class="px-0 md:px-4 py-1.5 md:py-0 text-sm font-semibold hover:font-black hover:text-white hover:rounded-sm active:border-0 active:border-transparent">Data Siswa</router-link>
                    <a href="#" v-if="token" @click="logout" class="px-0 md:px-4 py-1.5 md:py-0 text-sm font-semibold hover:font-black hover:text-white hover:rounded-sm active:border-0 active:border-transparent">Logout</a>
                    
                    <router-link v-if="!token" :to="{name: 'penguranganPoint'}" class="px-0 md:px-4 py-1.5 md:py-0 text-sm font-semibold hover:font-black hover:text-white hover:rounded-sm active:border-0 active:border-transparent">Pengurangan Point</router-link>
                    <router-link v-if="!token" :to="{name: 'login'}" class="px-0 md:px-4 py-1.5 md:py-0 text-sm font-semibold hover:font-black hover:text-white hover:rounded-sm active:border-0 active:border-transparent">Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "../../router";

    let token = localStorage.getItem('token');
    
    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('expiredDate');
        token = localStorage.getItem('token');
        router.push({name: 'login'});
    }
</script>

<style>

</style>