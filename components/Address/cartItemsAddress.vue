<template>
    <div class="card theme-card">
        <div class="d-flex">
            <div class="img w-50">
                <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade controls>
                    <template v-if="cart.selected_product && cart.selected_product.product_category && cart.selected_product.product_category.images.length">
                        <b-carousel-slide
                            v-for="(img, img_ind) in cart.selected_product.product_category.images"
                            :key="img_ind" :img-src="img.image_url"></b-carousel-slide>
                    </template>
                    <b-carousel-slide v-else
                        img-src="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/603c3d31a0b5f9ad3e9c552f811b57a5.jpg"></b-carousel-slide>
                </b-carousel>
            </div>
            <div class="w-50 px-2 py-1">
                <h3 style="font-size: 16px;">{{ cart.selected_product && cart.selected_product.product_category ? cart.selected_product.product_category.category_name : 'N/A' }}</h3>
                <p style="font-size: 12px;"><strong>Quantity:</strong> {{ cart.qty }}</p>
                <p style="font-size: 12px;"><strong>Price:</strong> ₹{{ parseFloat(cart.amount).toFixed(2) }}</p>
                <!-- <pre>{{ cart }}</pre> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cart']
}
</script>