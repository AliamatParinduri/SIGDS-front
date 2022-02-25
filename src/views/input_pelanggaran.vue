<template>
    <div class="flex justify-center items-center">
        <div class="py-8 px-10 w-10/12">
            <div class="text-gradient-br text-bludo">
                Data Pelanggaran
            </div>
            <div class="mt-12 p-4 space-y-4 text-sm bg-slate-200 rounded-md">
                <div>
                    <label for="pelanggaran">Jenis Pelanggaran</label>
                    <input @input="check" type="text" v-model="pelanggaran" class="mt-2 form-control" placeholder="Masukan Jenis Pelanggaran">
                </div>
                <div>
                    <label for="pointPelanggaran">Point Pelanggaran</label>
                    <input @input="check" type="text" v-model="pointPelanggaran" class="mt-2 form-control" placeholder="Masukan Point Pelanggaran">
                    <input type="hidden" v-model="pelangganId" class="w-full">
                </div>
            <button @click.prevent="addorupdatepelanggaran" class="btn btn-slate">{{ type }} Data</button>
            </div>
            <div class="w-full mt-12 overflow-hidden rounded-lg shadow-lg">
                <div class="w-full overflow-x-auto">
                    <table class="w-full">
                        <thead>
                        <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-400/80 uppercase border-b border-gray-600">
                            <th class="px-4 py-3">No</th>
                            <th class="px-4 py-3">Jenis Pelanggaran</th>
                            <th class="px-4 py-3">Point Pelanggaran</th>
                            <th class="px-4 py-3">Action</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white font-medium">
                            <tr :class="i%2==0 ? 'bg-white' : 'bg-gray-100'" v-for="(data, i) in allPelanggaran.data" :key="data._id">
                                <th class="px-4 py-3 border text-md">{{ (i + 1) }}</th>
                                <th class="px-4 py-3 border text-md">{{ data.pelanggaran }}</th>
                                <th class="px-4 py-3 border text-md">{{ data.pointPelanggaran }}</th>
                                <th class="px-4 py-3 border text-md">
                                    <a href="#" @click.prevent="editPelanggaran(data._id)" class="text-blue-500">Edit</a> | 
                                    <a href="#" @click.prevent="deletePelanggaran(data._id)" class="text-blue-500">Hapus</a>
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
    const pelangganId = ref('');
    const pelanggaran = ref('');
    const pointPelanggaran = ref('');
    const type = ref('Simpan');
    const allPelanggaran = reactive({
        data: []
    })

    const check = () => {
        if (pelanggaran.value == "" && pointPelanggaran.value == "") {
            pelangganId.value = "";
            type.value = "Simpan";
        }
    }

    const getAllPelanggaran = onMounted(async () => {
        const result = await fetch("http://localhost:8000/pelanggaran", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },
        }).then(e=>e.json()).then(e=>e);
        allPelanggaran.data.push(...result);
    })

    const addorupdatepelanggaran = async () => {
        const id = pelangganId.value;
        const method = id !== '' ? "PUT" : "POST";
        const url = method == "POST" ? "http://localhost:8000/pelanggaran" : `http://localhost:8000/pelanggaran/${id}`;
        
        try {
            const result = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    pelanggaran: pelanggaran.value,
                    pointPelanggaran: pointPelanggaran.value,
                })
            }).then(e=>e.json()).then(e=>e);
            pelanggaran.value = "";
            pointPelanggaran.value = "";
            allPelanggaran.data = []
            getAllPelanggaran();
        } catch (err) {
            console.log(err)
        }
    }

    const editPelanggaran = async id => {
        try {
            const pelanggaranById = await fetch(`http://localhost:8000/pelanggaran/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
            }).then(e=>e.json()).then(e=>e);

            pelangganId.value = pelanggaranById._id;
            pelanggaran.value = pelanggaranById.pelanggaran;
            pointPelanggaran.value = pelanggaranById.pointPelanggaran;
            type.value = "Update";
        } catch (err) {
            console.log(err);
        }
    }
    
    const deletePelanggaran = async id => {
        try {
            const pelanggaranById = await fetch(`http://localhost:8000/pelanggaran/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
            }).then(e=>e.json()).then(e=>e);

            allPelanggaran.data = [];
            getAllPelanggaran();
        } catch (err) {
            console.log(err);
        }
    }
</script>

<style>

</style>