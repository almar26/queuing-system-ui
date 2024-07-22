<template>
    <v-app>
        <v-main class="bg-image">
            <Nuxt />
        </v-main>
    </v-app>
</template>
<script>
export default {
    middleware: ['auth', 'isAdmin'],
}
</script>
<style scoped>
.bg-image {
    /* background: linear-gradient(112.2deg, rgb(0, 204, 255) -1.1%, rgb(0, 221, 61) 100.7%); */
   background: linear-gradient(135deg, rgb(121, 241, 164) 10%, rgb(14, 92, 173) 100%);
/* background: radial-gradient(circle at -0.2% 48.9%, rgb(32, 233, 104) 0%, rgb(13, 167, 236) 99.8%); */
/* background: linear-gradient(to top, #0ba360 0%, #3cba92 100%); */
}
</style>