<template>
    <div v-if="loader" class="single-product-area" id="fast_selling"
      style="background:#f2f2f2; padding:50px 0 50px !important;">
      <div class="text-center p-5 container"
          style="max-width: 95%; margin-top: -155px !important; margin-bottom: 100px !important; background:white; border-radius:20px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 92%;">
        <BSpinner variant="primary" label="Spinning" />
      </div>
    </div>
    <div v-else class="product-area">
            <div class="container"
                style="max-width: 95%; margin-top: -155px !important; margin-bottom: 100px !important;">
                <div class="tab-content">
                    <div class="tab-pane active" id="all">
                        <ul class="row" id="category_container">
                            <NuxtLink :to="`/product/${cat.category_name}/${cat.id}`" style="cursor: pointer;" class="col-lg-4 col-sm-6 col-12" id="card_cat_${e.id}" v-for="(cat, cat_index) in categories" :key="cat_index">
                                <div class="product-wrap">
                                    <div class="product-img">
                                        <img style="height: 300px !important; object-fit: cover;" :src="cat.images.length > 0 ? cat.images[0].image_url : '/images/product/finalimage.png'" alt="">
                                    </div>
                                    <div class="product-content fix">
                                        <div class="row">
                                            <div class="col-6">
                                                <h3 style="cursor: pointer;"><a>{{cat.category_name}}</a></h3>
                                                <span class="pull-leftd-flex">
                                                    <span>{{ [
                                                        {
                                                            name: 'design',
                                                            text: 'Design'
                                                        }, {
                                                            name: 'print',
                                                            text: 'Print'
                                                        }, {
                                                            name: 'design_n_print',
                                                            text: 'Design & Print'
                                                        }, 
                                                    ].filter(e => cat[e.name]).map(e => e.text).join(' / ') }}</span>
                                                </span>
                                            </div>
                                            <div class="col-6 d-flex flex-column" style="text-align: end">
                                                <h3 style="cursor: pointer; color: #4f91de;">₹{{ 
                                                    parseFloat(Number(cat.price_data[0].price_per_piece) * Number(cat.price_data[0].quantity)).toFixed(2)
                                                }}</h3>
                                                <span><del style="color: #8e8e8e; font-size: 12px;">₹{{ 
                                                    parseFloat(increaseByPercentage(Number(Number(cat.price_data[0].price_per_piece) * Number(cat.price_data[0].quantity)), 10)).toFixed(2)
                                                }}</del><span style="color: #f79a69; font-size: 12px;">(10% Off)</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                            <!-- <li class="col-lg-4 col-sm-6 col-12"
                                <div class="product-wrap">
                                    <div class="product-img">
                                        <img src="/images/product/1.jpg" alt="">
                                    </div>
                                    <div class="product-content fix">
                                        <h3><a href="shop.html">{{cat.category_name}}</a></h3>
                                        <span class="pull-left d-flex">
                                            <span>{{ [
                                                {
                                                    name: 'design',
                                                    text: 'Design'
                                                }, {
                                                    name: 'print',
                                                    text: 'Print'
                                                }, {
                                                    name: 'design_n_print',
                                                    text: 'Design & Print'
                                                }, 
                                            ].filter(e => cat[e.name]).map(e => e.text).join(' / ') }}</span>
                                        </span>
                                        <ul class="pull-right product-price">
                                            ₹{{ 
                                                parseFloat(Number(cat.price_data[0].price_per_piece) * Number(cat.price_data[0].quantity)).toFixed(2)
                                            }}<del>₹{{ 
                                                increaseByPercentage(Number(Number(cat.price_data[0].price_per_piece) * Number(cat.price_data[0].quantity)), 10)
                                            }}</del> <span class="off">(10% OFF)</span>
                                        </ul>
                                    </div>
                                </div>
                            </li> -->
                            <li class="col-12 text-center">
                                <a class="btn theme-btn" href="javascript:void(0);">Searching for something else?</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: "HomeProductArea",
    data() {
        return {
            loader: true,
        }
    },
    async mounted() {
        this.loader = true
        await this.fetchCategories()
        this.loader = false
    },
    watch: {
        category_search_home() {
            console.log(this.category_search_home);
            this.fetchCategories(this.category_search_home)
        }
    },
    methods: {
        increaseByPercentage(number, percentage) {
            return number + (number * (percentage / 100));
        },
        async fetchCategories(cat_name = null) {
            await this.$store.dispatch('fetchAllCategories', { type: 'fetchAllCategories', cat_name });
        }
    },
    computed: {
        categories() {
            return this.$store.state.categories
        },
        category_search_home() {
            return this.$store.state.category_search_home
        }
    }
}
</script>