<template>
    <div class="flex justify-center items-center">
        <div class="py-8 px-10 w-10/12">
            <div class="bg-gradient-to-br from-blue-400 to-indigo-500 bg-clip-text inline text-6xl text-transparent font-semibold">
                Data Siswa
            </div>
            <div class="mt-12 p-2 space-y-4 text-sm bg-slate-200 rounded-md">
                <div>
                    <label for="nama">Nama</label>
                    <input type="text" v-model="nama" class="mt-2 w-full h-9 px-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0" placeholder="Masukan Nama siswa">
                </div>
                <div>
                    <label for="kelas">Kelas</label>
                    <select v-model="kelas" class="mt-2 w-full h-9 px-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0">
                        <option value="X">X</option>
                        <option value="XI">XI</option>
                        <option value="XII">XII</option>
                    </select>
                </div>
                <div>
                    <label for="jurusan">Jurusan</label>
                    <select v-model="jurusan" class="mt-2 w-full h-9 px-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0">
                        <option value="tkr">Teknik kendaraan ringan</option>
                        <option value="rpl">Rekayasa perangkat lunak</option>
                        <option value="anm">Animasi</option>
                        <option value="pgl">Pengelasan</option>
                    </select>
                </div>
                <div>
                    <label for="alamat">Alamat</label>
                    <textarea v-model="alamat" class="mt-2 w-full h-16 px-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0" placeholder="Masukan Nama siswa"></textarea>
                </div>
                <div>
                    <label for="nohp">No HP</label>
                    <input type="text" v-model="nohp" class="mt-2 w-full h-9 px-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-0" placeholder="Masukan Nama siswa">
                    <input type="hidden" v-model="userId" class="w-full">
                </div>
                <button @click.prevent="addorupdateuser" class="btn border-0 text bg-slate-900/90 h-9 focus:outline-none focus:ring-2 focus:ring-slate-700 hover:bg-slate-700 text-white w-full rounded-md">{{ type }} Data</button>
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
                            <th class="px-4 py-3">Jumlah Point Siswa</th>
                            <th class="px-4 py-3">Input Pelanggaran</th>
                            <th class="px-4 py-3">Detail Pelanggaran</th>
                            <th class="px-4 py-3">Action</th>
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
                                    <a href="#" @click.prevent="inputPelanggaran(data._id)" class="text-blue-500">Entri</a>
                                </th>
                                <th class="px-4 py-3 border text-md">
                                    <a href="#" @click.prevent="detailPelanggaran(data._id)" class="text-blue-500">Lihat</a>
                                </th>
                                <th class="px-4 py-3 border text-md">
                                    <a href="#" @click.prevent="editSiswa(data._id)" class="text-blue-500">Edit</a> | 
                                    <a href="#" @click.prevent="deleteSiswa(data._id)" class="text-blue-500">Hapus</a>
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
import { onMounted, reactive, ref } from "vue"
import router from "../router";
    const userId = ref('');
    const nama = ref('');
    const kelas = ref('');
    const jurusan = ref('');
    const alamat = ref('');
    const nohp = ref('');
    const totalPoint = ref('');
    const type = ref('Simpan');
    const allUser = reactive({
        data: []
    })

    // const check = () => {
    //     if (pelanggaran.value == "" && pointPelanggaran.value == "") {
    //         pelangganId.value = "";
    //         type.value = "Simpan";
    //     }
    // }

    const getAllSiswa = onMounted(async () => {
        const result = await fetch("http://localhost:8000/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
        }).then(e=>e.json()).then(e=>e);
        allUser.data.push(...result);
    })

    const addorupdateuser = async () => {
        const id = userId.value;
        const method = id !== '' ? "PUT" : "POST";
        const url = method == "POST" ? "http://localhost:8000/user" : `http://localhost:8000/user/${id}`;
        
        try {
            const result = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    nama: nama.value,
                    kelas: kelas.value,
                    jurusan: jurusan.value,
                    alamat: alamat.value,
                    nohp: nohp.value,
                })
            }).then(e=>e.json()).then(e=>e);
            nama.value = '',
            kelas.value = '',
            jurusan.value = '',
            alamat.value = '',
            nohp.value = '',
            allUser.data = []
            getAllSiswa();
        } catch (err) {
            console.log(err)
        }
    }

    const editSiswa = async id => {
        try {
            const userById = await fetch(`http://localhost:8000/user/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
            }).then(e=>e.json()).then(e=>e);

            userId.value = userById._id;
            nama.value = userById.nama;
            kelas.value = userById.kelas;
            jurusan.value = userById.jurusan;
            alamat.value = userById.alamat;
            nohp.value = userById.nohp;
            type.value = "Update";
        } catch (err) {
            console.log(err);
        }
    }
    
    const deleteSiswa = async id => {
        try {
            const userById = await fetch(`http://localhost:8000/user/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
            }).then(e=>e.json()).then(e=>e);

            allUser.data = []
            getAllSiswa();
        } catch (err) {
            console.log(err);
        }
    }

    const inputPelanggaran = e => {
        router.push({name: "entryPelanggaran", params: {userId: e}})
    }
    const detailPelanggaran = e => {
        console.log(e);
        router.push({name: "detailPelanggaran", params: {userId: e}})
    }
</script>

<style>

</style>