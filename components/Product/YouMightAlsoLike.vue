<template>
    <div v-if="loader" class="blog-area" id="fast_selling" style="background:#f2f2f2; padding:50px 0 50px !important;">
        <div class="container text-center p-5"
            style="background:white; border-radius:20px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 92%;">
            <BSpinner variant="primary" label="Spinning"/>
        </div>
    </div>
    <div v-else class="blog-area" id="fast_selling" style="background:#f2f2f2; padding:50px 0 50px !important;">
        <div class="container"
            style="background:white; border-radius:20px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 92%;">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2 style="padding:35px; margin-bottom:0px !important;">You might also like</h2>
                    </div>
                </div>
            </div>
            <div class=" row">
                <div class="col-md-12" style="height: max-content !important;">
                    <YouMightAlsoLikeCarousel :items="categories" :slideInterval="4000" :visibleCards="3" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import YouMightAlsoLikeCarousel from '@/components/Product/YouMightAlsoLikeCarousel.vue';
import { BSpinner } from 'bootstrap-vue';

export default {
    components: {
        YouMightAlsoLikeCarousel
    },
    data() {
        return {
            loader: true,
            slide: 0,
            sliding: null
        }
    },
    props: ['cat_id'],
    name: "YouMightAlsoLike",
    async mounted() {
        this.loader = true
        await this.fetchYouMightAlsoLike()
        this.loader = false
    },
    methods: {
        increaseByPercentage(number, percentage) {
            return number + (number * (percentage / 100));
        },
        async fetchYouMightAlsoLike() {
            await this.$store.dispatch('fetchAllCategories', { type: 'fetchAllCategories' });
        },
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        }
    },
    computed: {
        categories() {
            return this.$store.state.categories.filter(e => e.id != this.cat_id)
        }
    }
}
</script>