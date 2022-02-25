<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-5/7 p-40 mb-32 bg-red-400 rounded-sm">
            <div>
                Entry Pelanggaran
            </div>
            <div>
                <label for="nama">Nama</label>
                <input type="text" v-model="nama" class="w-full" readonly>
            </div>
            <div>
                <label for="kelas">Kelas</label>
                <input type="text" v-model="kelas" class="w-full" readonly>
            </div>
            <div>
                <label for="jurusan">Jurusan</label>
                <input type="text" v-model="jurusan" class="w-full" readonly>
            </div>
            <div>
                <label for="tanggal">Tanggal</label>
                <div class="w-full space-x-2">
                    <select v-model="tgl" class="w-1/4">
                        <option :value="new Date().getDay()" selected>{{ new Date().getDate() }}</option>
                    </select>
                    <select v-model="tgl" class="w-1/4">
                        <option :value="new Date().getMonth()" selected>{{ new Date().getMonth() + 1 }}</option>
                    </select>
                    <select v-model="tgl" class="w-1/4">
                        <option :value="new Date().getFullYear()" selected>{{ new Date().getFullYear() }}</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="jurusan">Jenis Pelanggaran</label>
                <div v-for="data in allPelanggaran.data" :key="data._id">
                    <input type="checkbox" v-model="PelanggaranDipilih.data" :value="data._id" :id="data._id">
                    <label :for="data._id">{{ " " + data.pelanggaran }}</label>
                </div>
            </div>
            <button @click.prevent="addPelanggaran" class="btn border-0 mt-3 bg-teal-700 ring ring-teal-700 w-full rounded-sm">Simpan Data</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

    const nama = ref('');
    const kelas = ref('');
    const jurusan = ref('');
    const {userId} = defineProps(['userId']);
    const allPelanggaran = reactive({
        data: []
    })
    const PelanggaranDipilih = reactive({
        data: []
    })
    
    const getUserById = onMounted(async () => {
        try {
            const userById = await fetch(`http://localhost:8000/user/${userId}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
            }).then(e=>e.json()).then(e=>e);

            nama.value = userById.nama;
            kelas.value = userById.kelas;
            jurusan.value = userById.jurusan;
        } catch (err) {
            console.log(err);
        }
    })
    
    const getAllPelanggaran = onMounted(async () => {
        const result = await fetch("http://localhost:8000/pelanggaran", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
        }).then(e=>e.json()).then(e=>e);
        allPelanggaran.data.push(...result);
    })

    const addPelanggaran = async () => {
        try {
            const simpanData = await fetch(`http://localhost:8000/addPelanggaranSiswa/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    dataPelanggaran: PelanggaranDipilih.data
                })
            })
        } catch (err) {
            
        }
    }
</script>

<style>

</style>