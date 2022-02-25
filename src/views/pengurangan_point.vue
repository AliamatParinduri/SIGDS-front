<template>
    <div class="flex justify-center items-center">
        <div class="py-8 px-10 w-10/12">
            <div class="text-gradient-br text-bludo">
                Pengurangan Point
            </div>
            <TableComp :data="allPelanggaran.data" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";

import TableComp from "../components/Table.vue";

const allPelanggaran = reactive({
    data: []
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
</script>

<style>

</style>