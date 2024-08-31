<template>
    <div>
        <!-- <pre>{{ cart }}</pre> -->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="cart-data-card">
            <div class="card shopping-card mb-3">
                <h3 style="text-transform: uppercase;">{{ cart.selected_product &&
                    cart.selected_product.product_category
                    ? cart.selected_product.product_category.category_name : 'N/A' }} ({{ cart.qty }} items)</h3>
                <hr>
                <div class="cart-detail">
                    <div class="row">
                        <div id="cat_id_150" class="col-sm-12 col-xs-12 col-md-12 col-lg-4">
                            <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade controls>
                                <template
                                    v-if="cart.selected_product && cart.selected_product.product_category && cart.selected_product.product_category.images.length">
                                    <b-carousel-slide
                                        v-for="(img, img_ind) in cart.selected_product.product_category.images"
                                        :key="img_ind" :img-src="img.image_url"></b-carousel-slide>
                                </template>
                                <b-carousel-slide v-else
                                    img-src="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/603c3d31a0b5f9ad3e9c552f811b57a5.jpg"></b-carousel-slide>
                            </b-carousel>
                            <!-- <img
                                :src="cart.selected_product && cart.selected_product.product_category && cart.selected_product.product_category.images.length ?
                    cart.selected_product.product_category.images[0].image_url : 'https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/603c3d31a0b5f9ad3e9c552f811b57a5.jpg'"> -->
                        </div>
                        <div class="col-sm-12 col-xs-12 col-md-12 col-lg-8 mt-3">
                            <div class="justify-content-space">
                                <div class="">
                                    <h3>
                                        {{ cart.selected_product && cart.selected_product.product_category ?
                    cart.selected_product.product_category.category_name : 'N/A' }}
                                        ({{ cart.ord_type }})
                                    </h3>
                                </div>
                                <div class="my-cart-price">
                                    ₹{{ cart.total_amount }} <br> <del>₹{{
                    parseFloat(increasePercentage(cart.total_amount,
                        10)).toFixed(2) }}</del> <span class="off">(10%
                                        OFF)</span>
                                </div>
                            </div>
                            <p>
                                <span class="d-flex flex-column"
                                    v-if="cart.selected_product && cart.selected_product.design_images">
                                    <a v-if="cart.selected_product.design_images.content_file" target="_blank"
                                        :href="cart.selected_product.design_images.content_file">Content File</a>
                                    <span v-if="cart.selected_product.design_images.description">
                                        Description: {{ cart.selected_product.design_images.description }}
                                    </span>
                                    <a v-if="cart.selected_product.design_images.logo" target="_blank"
                                        :href="cart.selected_product.design_images.logo">Logo File</a>
                                    <a v-if="cart.selected_product.design_images.reference" target="_blank"
                                        :href="cart.selected_product.design_images.reference">Reference File</a>
                                    <span v-if="cart.selected_product.design_images.source_file != null">
                                        Source File: {{ cart.selected_product.design_images.source_file ? 'YES' : 'NO'
                                        }}
                                    </span>
                                </span>
                                <span class="d-flex flex-column"
                                    v-if="cart.uploaded_images && cart.uploaded_images.length">
                                    <a v-for="(image, image_index) in cart.uploaded_images" target="_blank"
                                        :href="image.image_url">File{{
                    image_index + 1 }}</a>
                                </span>
                                <span class="d-flex flex-column"
                                    v-if="cart.selected_product.product_options && cart.selected_product.product_options.length">
                                    <span class="d-flex"
                                        v-for="(option, opt_index) in cart.selected_product.product_options"
                                        :key="opt_index">{{ option.name }} : {{
                    cart.selected_product.product_option_values.find(e => e.opt_id ==
                        option.id).name }}</span>
                                </span>
                            </p>
                            <div class="product-count" v-if="cart.ord_type != 'DESIGN'">
                                <p v-if="quanityt_loader">Quantity: <b-spinner small></b-spinner></p>
                                <p v-if="!quanityt_loader">Quantity: <i @click.prevent="decreaseQuantity"
                                        class="fa fa-minus border text-danger border-danger rounded p-1 mx-2"
                                        aria-hidden="true"></i>{{ cart.qty
                                    }}<i @click.prevent="increaseQuantity"
                                        class="fa fa-plus border text-success border-success rounded p-1 mx-2"
                                        aria-hidden="true"></i></p>
                            </div>
                            <div class="justify-content-space">
                                <div class="delivery"
                                    :style="cart.selected_product.product_quantity_details && cart.selected_product.product_quantity_details.length ? 'display: hidden' : ''">
                                    <template
                                        v-if="cart.selected_product.product_quantity_details && cart.selected_product.product_quantity_details.length">
                                        <img class="mr-2" src="/images/icon/check.png">
                                        {{
                    new
                        Date(
                            getDeliveryDate(
                                Number(cart.selected_product.product_quantity_details.find(e =>
                                    e.quantity == cart.qty).expected_delivery_in_days))).toLocaleDateString('en-IN',
                                        {
                                            weekday: 'long', // 'long' for full name, 'short' for abbreviated
                                            month: 'long', // 'long' for full name, 'short' for abbreviated
                                            day: 'numeric', // Numeric day
                                            year: 'numeric' // Numeric year
                                        })
                                        }}
                                    </template>
                                </div>

                                <div class="action-btn">
                                    <button v-if="cart.ord_type.toUpperCase() == 'PRINT'"
                                        style="padding: 10px; cursor: pointer; background: transparent; border: none;"
                                        id="edit_cart_168"><img src="/images/icon/edit.png"></button>
                                    <button @click.prevent="$bvModal.show(`deleteCartModal${cart.id}`)"
                                        style="padding: 10px; cursor: pointer; background: transparent; border: none;"
                                        id="del_cart_168"><img src="/images/icon/trans.png"></button>
                                </div>
                                <b-modal size="md" :id="`deleteCartModal${cart.id}`" hide-header hide-footer>
                                    <div class="p-3 card">
                                        <h3 style="text-align: center; text-transform: uppercase;">Are you sure?</h3>
                                        <span style="text-align: center; text-transform: uppercase;">Delete <strong>{{ cart.selected_product && cart.selected_product.product_category ?
                    cart.selected_product.product_category.category_name : 'N/A' }}
                                        ({{ cart.ord_type }})</strong> from cart?</span>
                                        <div class="d-flex mt-3 justify-content-center" style="gap: 15px;">
                                            <span class="btn btn-outline-danger" @click.prevent="$bvModal.hide(`deleteCartModal${cart.id}`)"><i class="fa fa-times mr-2"></i>NO</span>
                                            <span class="btn btn-outline-success" @click.prevent="deleteFromCart"><i class="fa fa-check mr-2"></i> YES</span>
                                        </div>
                                    </div>
                                </b-modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            quanityt_loader: false
        }
    },
    computed: {
        ...mapGetters(['snp_id', 'user'])
    },
    props: ['cart'],
    methods: {
        async deleteFromCart(cart_id) {
            const resp = await this.$store.dispatch('deleteFromCart', this.cart.id)
            console.log(resp);
            if (resp.status == 'success') {
                this.$toast.success(resp.msg)
            } else {
                this.$toast.error(resp.msg)
            }
            this.$store.dispatch('fetchCart', { type: 'fetchCart', unuser: this.snp_id, uid: this.user.uid })
            this.$bvModal.hide(`deleteCartModal${this.cart.id}`)
        },
        calculatePriceForQuantityChange(quantity) {
            if (this.cart.ord_type == 'PRINT') {
                return Number(Number(quantity.price_per_piece) * Number(quantity.quantity))
            }
        },
        increasePercentage(value, percentage) {
            return value * (1 + percentage / 100)
        },
        getDeliveryDate(increase_days) {
            return new Date(new Date().setDate(new Date().getDate() + parseInt(increase_days)))
        },

        async decreaseQuantity() {
            this.quanityt_loader = true
            const cart_data = JSON.parse(JSON.stringify(this.cart))
            if (!cart_data.selected_product.product_quantity_details.find(e => Number(e.quantity) < Number(cart_data.qty))) {
                this.$toast.error('The minimum quantity is already selected.');
                this.quanityt_loader = false
                return;
            }
            const sorted_quantity = cart_data.selected_product.product_quantity_details.sort((a, b) => a.quantity - b.quantity);
            let decreasedQuantity = null
            for (let index = 0; index < sorted_quantity.length; index++) {
                if (sorted_quantity[index].quantity == this.cart.qty) {
                    decreasedQuantity = sorted_quantity[index - 1]
                }
            }
            const payload = {
                unuser: this.snp_id,
                type: 'updateCartData',
                cart_id: cart_data.id,
                quantity: decreasedQuantity.quantity,
                quantity_id: decreasedQuantity.id,
                price: Number(parseFloat(this.calculatePriceForQuantityChange(decreasedQuantity)).toFixed(2)),
                category: cart_data.selected_product.cat_id,
                sub_category: cart_data.selected_product.sub_cat_id,
                option: cart_data.selected_product.options,
                option_values: cart_data.selected_product.option_values,
            }
            const response = await this.$store.dispatch('updateCartData', payload)
            if (response.status == 'success') {
                this.$toast.success('Quantity decreased successfully.');
                await this.$store.dispatch('fetchCart', { unuser: this.snp_id });
            }
            this.quanityt_loader = false
        },
        async increaseQuantity() {
            this.quanityt_loader = true
            const cart_data = JSON.parse(JSON.stringify(this.cart))
            if (!cart_data.selected_product.product_quantity_details.find(e => Number(e.quantity) > Number(cart_data.qty))) {
                this.$toast.error('The maximum quantity is already selected.');
                this.quanityt_loader = false
                return;
            }
            const sorted_quantity = cart_data.selected_product.product_quantity_details.sort((a, b) => a.quantity - b.quantity);
            let increasedQuantity = null
            for (let index = 0; index < sorted_quantity.length; index++) {
                if (sorted_quantity[index].quantity == this.cart.qty) {
                    increasedQuantity = sorted_quantity[index + 1]
                }
            }
            const payload = {
                unuser: this.snp_id,
                type: 'updateCartData',
                cart_id: cart_data.id,
                quantity: increasedQuantity.quantity,
                quantity_id: increasedQuantity.id,
                price: Number(parseFloat(this.calculatePriceForQuantityChange(increasedQuantity)).toFixed(2)),
                category: cart_data.selected_product.cat_id,
                sub_category: cart_data.selected_product.sub_cat_id,
                option: cart_data.selected_product.options,
                option_values: cart_data.selected_product.option_values,
            }
            const response = await this.$store.dispatch('updateCartData', payload)
            if (response.status == 'success') {
                this.$toast.success('Quantity increased successfully.');
                await this.$store.dispatch('fetchCart', { unuser: this.snp_id });
            }
            this.quanityt_loader = false
        }
    }
}
</script>