<template>
    <div v-if="loader" class="blog-area" id="fast_selling" style="background:#f2f2f2; padding:50px 0 50px !important;">
        <div class="container text-center p-5"
            style="background:white; border-radius:20px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 92%;">
            <BSpinner variant="primary" label="Spinning"/>
        </div>
    </div>
    <div v-else class="banner-area" style="background: #f2f2f2;">
        <div class="container" style="max-width: 95%;">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center">
                        <h2>Testimonial</h2>
                    </div>
                </div>
            </div>
            <div class="testimonial_image">
                <div class="row">
                    <div class="col-12">
                        <div style="padding: 10% 25%; text-align: center;">
                            <TestimonialSlider :items="testimonials" :slideInterval="4000" :visibleCards="1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TestimonialSlider from '@/components/Home/TestimonialSlider.vue';

export default {
    data() {
        return {
            loader: true
        }
    },
    name: "Testimonials",
    components: {
        TestimonialSlider
    },
    async mounted() {
        this.loader = true
        await this.fetchTestimonials();
        this.loader = false
    },
    methods: {
        async fetchTestimonials() {
            await this.$store.dispatch('fetchTestimonial', {
                type: 'getSiteContentTestimonial',
            });
        }
    },
    computed: {
        testimonials() {
            return this.$store.state.testimonials;
        }
    }
};
</script>

<style scoped>
/* Add any additional styling here if necessary */
</style>
