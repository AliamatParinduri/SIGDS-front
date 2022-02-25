<template>
    <div class="w-full mt-12 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto">
            <table class="w-full">
                <thead>
                <tr class="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-400/80 uppercase border-b border-gray-600">
                    <th class="px-4 py-3">No</th>
                    <th class="px-4 py-3">Jenis Pelanggaran</th>
                    <th class="px-4 py-3">Point Pelanggaran</th>
                </tr>
                </thead>
                <tbody class="bg-white font-medium">
                    <tr :class="i%2==0 ? 'bg-white' : 'bg-gray-100'" v-for="(dt, i) in data" :key="dt._id">
                        <th class="px-4 py-3 border text-md">{{ (i + 1) }}</th>
                        <th class="px-4 py-3 border text-md">{{ dt.pelanggaran }}</th>
                        <th class="px-4 py-3 border text-md">{{ dt.pointPelanggaran }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
    defineProps(['data'])
</script>

<style>
</style>