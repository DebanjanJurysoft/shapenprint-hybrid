<template>
    <div class="slider-area">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="slide-inner slide-inner1">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12 col-lg-12 col-md-12 text-center">
                                    <div class="slider-content">
                                        <h2 data-swiper-parallax="-500">India's Fastest Graphic Designing & Printing
                                        </h2>
                                        <p data-swiper-parallax="-400" class="white-color">shapeNprint is proud to
                                            have
                                            India’s largest Graphic Design and Printing Ecosystem, with never seen
                                            before features.
                                        </p>
                                        <div class="wrap">
                                            <div class="search">
                                                <input type="text" @input="debounceSearch"
                                                 class="searchTerm pl-3"
                                                 v-model="search"
                                                    placeholder="What are you looking for?">
                                                <button @click.prevent="debounceSearch"
                                                    class="searchButton align-items-center">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <p data-swiper-parallax="-400" class="white-color">Trending: Business Cards,
                                            Flyers, Logo, Label, Brochures, Letterhead, Fabric Banner, Documents
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeSearchArea",
    data() {
        return {
            search: null,
            timer: ''
        }
    },
    computed: {
        category_search_home() {
            return this.$store.state.category_search_home
        }
    },
    methods: {
        async debounceSearch() {
            clearTimeout(this.timer)
            this.timer = setTimeout(async () => {
                this.$store.dispatch('assignSearchText', this.search);
            }, 300);
        }
    }
}
</script>