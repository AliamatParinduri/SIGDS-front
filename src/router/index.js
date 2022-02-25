import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: '/',
                component: () => import('../views/landing.vue'),
                name: "landing"
            },
            {
                path: '/dashboard',
                component: () => import('../views/dashboard.vue'),
                name: "dashboard"
            },
            {
                path: '/tata_tertib',
                component: () => import('../views/tata_tertib.vue'),
                name: "tataTertib"
            },
            {
                path: '/pengurangan_point',
                component: () => import('../views/pengurangan_point.vue'),
                name: "penguranganPoint"
            },
            {
                path: '/data_pelanggaran',
                component: () => import('../views/data_pelanggaran.vue'),
                name: "dataPelanggaran"
            },
            {
                path: '/input_pelanggaran',
                component: () => import('../views/input_pelanggaran.vue'),
                name: "inputPelanggaran"
            },
            {
                path: '/data_siswa',
                component: () => import('../views/data_siswa.vue'),
                name: "dataSiswa"
            },
            {
                path: '/input_siswa',
                component: () => import('../views/input_siswa.vue'),
                name: "inputSiswa"
            },
            {
                path: '/entri_pelanggaran/:userId',
                component: () => import('../views/entri_pelanggaran.vue'),
                name: "entryPelanggaran",
                props: true
            },
            {
                path: '/detail_pelanggaran/:userId',
                component: () => import('../views/detail_pelanggaran.vue'),
                name: "detailPelanggaran",
                props: true
            },
        ]
    },
    {
        path: '/login',
        component: () => import('../views/login.vue'),
        name: "login"
    },
];

const router = new createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active'
})

export default router;