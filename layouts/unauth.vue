<template>
    <Preloader v-if="loader" @loadingEnd="loadingEnd"/>
    <div v-else>
        <Navbar />
        <Nuxt />
        <Footer />
    </div>
</template>


<script>
import Preloader from '~/components/preloader.vue';
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['snp_id', 'preloaderOn', 'user'])
    },
    data() {
        return {
            loader: true
        }
    },
    components: {
        Preloader
    },
    async mounted() {
        if (!this.snp_id) {
            await this.$store.dispatch('fetchSnpID', { type: 'getId' });
        }
        await this.$store.dispatch('fetchCart', { unuser: this.snp_id, uid: this.user.uid });
    },
    methods: {
        loadingEnd() {
            this.loader = false
        }
    }
}
</script>
