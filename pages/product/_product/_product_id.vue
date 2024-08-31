<template>
    <div>
        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
            <div class="product-breadcumb-area breadcumb-wrap ">
                <ul>
                    <NuxtLink to="/">Home</NuxtLink>
                    <span>/</span>
                    <NuxtLink :to="`/product/${category_name}/${category_id}`">{{category_name.replaceAll('%20', ' ')}}</NuxtLink>
                </ul>
            </div>
        </div>
        <SingleProduct :category_id="category_id"/>
        <YouMightAlsoLike :cat_id="category_id"/>
    </div>
</template>


<script>
import YouMightAlsoLike from '@/components/Product/YouMightAlsoLike.vue';
import SingleProduct from '@/components/Product/SingleProduct.vue';

export default {
    components: {
        YouMightAlsoLike,
        SingleProduct
    },
    layout: 'unauth',
    name: 'ProductDetails',
    data() {
        const path = this.$route.path.split('/').filter(e => e != '')
        return {
            category_name: path[1],
            category_id: path[2]
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
            return this.$store.state.categories.filter(e => e.id != this.category_id)
        },
    }
}
</script>