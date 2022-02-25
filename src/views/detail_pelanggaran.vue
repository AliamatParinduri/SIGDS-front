<template>
    <div class="flex justify-center items-center min-h-screen">
        <div class="w-5/7 p-40 mb-32 bg-red-400 rounded-sm">
            <div>
                Detail Pelanggaran
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