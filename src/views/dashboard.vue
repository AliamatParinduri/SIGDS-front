<template>
    <div class="flex justify-center items-center">
        <div class="py-8 px-10 w-10/12">
            <div class="mt-12 p-2 space-y-4 text-sm bg-slate-50 rounded-md">
                <div class="uppercase text-center text-2xl font-semibold ">
                    Daftar Siswa yang baru saja Melanggar
                </div>
            </div>
            <div class="w-full mt-12 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-auto">
                    <table class="w-full">
                        <thead>
                        <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-400/80 uppercase border-b border-gray-600">
                            <th class="px-4 py-3">No</th>
                            <th class="px-4 py-3">Nama</th>
                            <th class="px-4 py-3">Kelas</th>
                            <th class="px-4 py-3">Jurusan</th>
                            <th class="px-4 py-3">Sisa Point</th>
                            <th class="px-4 py-3">Detail Pelanggaran</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white font-medium">
                            <tr :class="i%2==0 ? 'bg-white' : 'bg-gray-100'" v-for="(data, i) in allUser.data" :key="data._id">
                                <th class="px-4 py-3 border text-md">{{ (i + 1) }}</th>
                                <th class="px-4 py-3 border text-md">{{ data.nama }}</th>
                                <th class="px-4 py-3 border text-md">{{ data.kelas }}</th>
                                <th class="px-4 py-3 border text-md">{{ data.jurusan }}</th>
                                <th class="px-4 py-3 border text-md">{{ data.totalPoint }}</th>
                                <th class="px-4 py-3 border text-md">
                                    <a href="#" @click.prevent="detailPelanggaran(data._id)" class="text-blue-500">Lihat</a>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, reactive } from "vue";
import router from "../router";

    const allUser = reactive({
        data: []
    })

    const getAllSiswa = onMounted(async () => {
        const result = await fetch("http://localhost:8000/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
        }).then(e=>e.json()).then(e=>e);
        allUser.data.push(...result);
    })

    const detailPelanggaran = e => {
        router.push({name: 'detailPelanggaran', params: {userId: e}})
    }
</script>

<style>

</style>