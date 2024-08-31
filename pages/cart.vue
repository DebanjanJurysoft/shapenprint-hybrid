<template>
    <div v-if="loader" class="single-product-area" id="fast_selling"
        style="background:#f2f2f2; padding:50px 0 50px !important;">
        <div class="text-center p-5 container"
            style="background:white; border-radius:20px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 92%;">
            <BSpinner variant="primary" label="Spinning" />
        </div>
    </div>
    <div v-else>
        <div class="header-area" id="sticky-header">
            <div class="container">
                <div class="row align-items-center py-3">
                    <!-- <div class="col-lg-2 col-md-2   col-6">
                    <div class="logo">
                        <a href="index.php">
                            <img src="/images/logo.png" alt="">
                        </a>
                    </div>
                </div> -->
                    <div class="col-lg-10 d-none d-lg-block text-center">
                        <div class="checkout-header">
                            <span class="active">BAG</span>
                            ----------------------
                            <span>ADDRESS</span>
                            ----------------------
                            <span>PAYMENT</span>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-5 col-4">
                        <div class="secure">
                            <span><img src="/images/icon/circle-icon.png">100% SECURE</span>
                        </div>
                    </div>
                    <div class="d-block d-lg-none col-sm-1 clear col-2">
                        <div class="responsive-menu-wrap floatright"></div>
                    </div>
                </div>
            </div>
        </div>


        <div class="empty-cart-area" v-if="cart_count == 0">
            <div class="container">
                <div class="row ">
                    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 text-center">
                        <img src="/images/icon/cart-empty.png" alt="">
                        <h2>Hey, your cart is empty!</h2>
                        <p>Looks like you haven’t added anything <br> to your cart yet.</p>
                        <NuxtLink to="/" class="btn theme-btn w-50 align-items-center">SHOP NOW</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="cart-area mt-50">
            <div class="container" style="max-width: 95%;">
                <div class="row ">
                    <div class="col-xs-12 col-sm-12 col-lg-8 col-md-8">
                        <!-- banner-area start -->
                        <div class="banner-area" id="banner-area" v-if="!logged_in" style="display: block;">
                            <div class="container banner-wrap"
                                style="background: linear-gradient(180deg, #E0C3FC 0%, #8EC5FC 100%);border-radius: 20px; width: 100%">
                                <div class="row align-items-center">
                                    <div class="col-lg-8 col-sm-6">
                                        <h2 style="font-size: 22px;">Login to get upto Rs. 300 OFF on your first order.
                                        </h2>
                                        <br>
                                        <button onclick="login()" class="btn btn-default">Login <img
                                                src="/images/icon/right-arrow.png" width="25"
                                                class="arrow-img"></button>
                                    </div>
                                    <div class="col-lg-4 col-sm-6 text-center">
                                        <img src="/images/cart-banner/1.png" width="150">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- banner-area end -->
                        <div class="cart-area">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="section-title ">
                                            <h2 class="related-p-heading">My Cart</h2>
                                        </div>
                                    </div>
                                </div>

                                <SingleCart v-for="(cart, cart_index) in cart_data" :key="cart_index" class="row"
                                    :cart="cart" />
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex flex-row-reverse">
                                    <a href="/" class="btn theme-btn">Want to Add More Items</a>
                                </div>
                                <!-- <div class="row" >
                                </div> -->

                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-lg-4 col-md-4 sticky"
                        style="position: sticky; height: 100%; top: 100px; z-index:1;">
                        <div class="card theme-card cart-price-detail mb-34" style="z-index: -1 !important;">
                            <h3 class="" id="price_details_count">PRICE DETAILS ({{ total_count }} ITEMS)</h3>
                            <hr>
                            <div class="pricing">
                                <p>Total MRP <span id="total_mrp">₹{{ parseFloat(total_mrp_amount).toFixed(2) }}</span>
                                </p>

                                <p>Discount on MRP <span class="text-green" id="total_discount">-
                                        ₹{{ parseFloat(total_discount).toFixed(2) }}</span></p>

                                <p>Extra Discount <span class="text-purple" style="cursor: pointer;" id="extraDiscount"
                                    @click.prevent="openCoupon">Redeem</span></p>
                                <p id="extra_discount_text" style="display: none;">Discount Coupon <span
                                        class="text-purple" style="cursor: pointer;" id="extraDiscountCode"
                                        @click.prevent="openCoupon"></span></p>
                                <p id="extra_discount_note" style="font-size: 10px; display: none;" class="text-danger">
                                    Click on the coupon code to remove it</p>

                                <!-- <p>Delivery Fee <span>₹99</span></p> -->

                            </div>
                            <hr>
                            <p class="total-price"> Total Amount <span id="total_payable">₹{{
        parseFloat(total_amount).toFixed(2) }}</span></p>
                            <button @click.prevent="placeOrder" class="btn theme-btn bold">Place Order</button>

                            <br>
                            <h3>
                                COUPON
                            </h3>
                            <div class="justify-content-space">
                                <div class="coupon-tag">
                                    <img src="/images/icon/coupon.png" width="50">
                                    <span>Apply Coupon</span>
                                </div>
                                <a @click.prevent="openCoupon" class="btn coupon-btn">APPLY </a>

                                <b-modal id="coupon_popup" hide-header hide-footer scrollable no-close-on-backdrop>
                                    <template>
                                        <div class="d-flex flex-column">
                                            <div class="d-flex justify-content-between pt-3 px-3 border border-botton">
                                                <h3>APPLY COUPON</h3>
                                                <a class="close" style="cursor: pointer;" @click.prevent="$bvModal.hide('coupon_popup')">×</a>
                                            </div>
                                            <div class="coupon-input">
                                                <input type="text" placeholder="Enter coupon code/referral code"
                                                    class="form-control">
                                                <button>CHECK</button>
                                            </div>
                                            <div class="d-flex flex-column p-2" style="height: 250px !important; overflow-y: auto; ">
                                                <div class="offer-suggestion border" style="cursor: pointer;" v-for="(coupon, coupon_index) in coupons" :key="coupon_index">
                                                    <!-- <pre>{{ coupon }}</pre> -->
                                                    <input type="checkbox" @change="selectCoupon(coupon)">
                                                    <label>{{ coupon.coupon }}</label>
                                                    <p>
                                                        Save ₹{{coupon.max_discount}} <br>
                                                        {{coupon.discount_percentage}}% off upto ₹{{coupon.max_discount}} on minimum purchase of ₹{{coupon.minimum_price}}.<br>
                                                        Expires on: {{new Date(coupon.use_by_date).toLocaleDateString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' })}} | 11:59 P.M.
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="d-flex p-3" >
                                                <div class="w-50 d-flex flex-column">
                                                    <p>Maximum savings:</p>
                                                    <span><span>0</span></span>
                                                </div>
                                                <div class="w-50">
                                                    <span
                                                        class="btn theme-btn w-100">APPLY</span>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </b-modal>
                            </div>
                            <b-modal id="loginPopup" hide-header hide-footer scrollable no-close-on-backdrop>
                                <div class="p-2">
                                    <a class="close mr-2" style="cursor: pointer;"
                                        @click.prevent="$bvModal.hide('loginPopup')">×</a>
                                    <div class="content" style="height: 650px;">
                                        <div class="account-form form-style  login-card">
                                            <div class="banner-area">
                                                <div class="container banner-wrap" style="background: linear-gradient(180deg, #E0C3FC 0%, #8EC5FC 100%);
                                            border-radius: 20px;">
                                                    <div class="row align-items-center">
                                                        <div class="col-lg-8 col-sm-6">
                                                            <h3 class="login-banner-heading">Login to get upto Rs.
                                                                300
                                                                OFF
                                                                on your first
                                                                order.</h3>
                                                        </div>
                                                        <div class="col-lg-4 col-sm-6">
                                                            <img src="/images/cart-banner/1.png" width="100px">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src="/images/favicon.png" alt="" width="50">
                                            <h2>Welcome to shapeNprint</h2>
                                            <p>One stop, many solutions</p>
                                            <div class="login-area">
                                                <h3>Login or Signup</h3>
                                                <input type="text" id="username" v-model="username"
                                                    placeholder="Mobile Or Email">
                                                <div
                                                    style="display: flex; border: 1px solid #dedede; border-radius: 5px; align-items: center; margin-bottom: 20px;">
                                                    <input id="password" v-model="password" :type="show_password_type"
                                                        style="width: 90%; margin-bottom: 0px; border: none;"
                                                        placeholder="Password">
                                                    <i id="eye_button" @click.prevent="showPassword"
                                                        style="width: 10%; text-align: center; cursor: pointer;"
                                                        :class="`fa ${show_password_icon}`"></i>
                                                </div>
                                                <p>By continuing, I agree to the <a href="#" class="text-purple">Terms
                                                        of
                                                        Use</a> &amp; <a href="#" class="text-purple">Privacy
                                                        Policy</a>
                                                </p>
                                                <span class="btn theme-btn w-100 align-items-center"
                                                    @click.prevent="login">Continue</span>
                                                <div class="d-flex flex-row" style="gap: 10px">
                                                    <div class="text-left">
                                                        <a href="forgot.php" class="text-purple">Forgot
                                                            Password?</a>
                                                    </div>
                                                    <div class="text-right">
                                                        <a href="login.php?reg" class="text-blue">Sign Up</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div id="login_popup">
                                        <div class="popup col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                        </div>
                                    </div> -->
                                </div>
                            </b-modal>
                            <!-- <img src="/images/cart-banner/price.jpg" class="w-100" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SingleCart from '../components/Cart/SingleCart.vue';
export default {
    computed: {
        ...mapGetters(['cart_count', 'cart_data', 'logged_in', "coupons"])
    },
    layout: 'unauth',
    components: {
        SingleCart
    },
    data() {
        return {
            loader: false,
            total_mrp_amount: 0,
            total_amount: 0,
            total_count: 0,
            total_discount: 0,
            show_password_type: 'password',
            show_password_icon: "fa-eye-slash",
            username: null,
            password: null,
        }
    },
    mounted() {
        this.$store.dispatch('setPreloaderPercentage', 0)
        this.$store.dispatch('setPreloaderOn', true)
        this.loader = true
        this.calculatePrice()
        this.loader = false
    },
    watch: {
        cart_data() {
            this.calculatePrice()
        }
    },
    methods: {
        openCoupon() {
            this.$store.dispatch('fetchCoupons')
            this.$bvModal.show('coupon_popup')
        },
        calculatePrice() {
            this.total_mrp_amount = 0
            this.total_amount = 0
            this.total_count = 0
            this.total_discount = 0
            if (this.cart_data.length) {
                for (const cart of this.cart_data) {
                    this.total_amount = Number(Number(this.total_amount) + Number(cart.amount))
                    this.total_count = Number(Number(this.total_count) + Number(cart.qty))
                    const increasedAmount = this.increasePercentage(Number(cart.amount), 10)
                    this.total_mrp_amount = Number(Number(this.total_mrp_amount) + Number(increasedAmount))
                    this.total_discount = Number(Number(this.total_discount) + Number(Number(increasedAmount) - Number(cart.amount)))
                }
            }
        },
        increasePercentage(value, percentage) {
            return value * (1 + percentage / 100)
        },
        async placeOrder() {
            if (!this.logged_in) {
                // this.$router.push('/login')
                this.$bvModal.show('loginPopup')
            } else {
                this.$router.push('/address')
            }
        },
        showPassword() {
            if (this.show_password_type == 'password') {
                this.show_password_type = 'text'
                this.show_password_icon = "fa-eye"
            } else {
                this.show_password_type = 'password'
                this.show_password_icon = "fa-eye-slash"
            }
        },
        async login() {
            try {
                if (!this.username.trim() || !this.password.trim()) {
                    throw new Error('Username and password both are required.')
                }
                const payload = {
                    username: this.username,
                    password: this.password,
                    type: 'userlogin',
                }
                const response = await this.$store.dispatch('loginUser', payload)
                if (response.status == 'success') {
                    this.$toast.success(response.msg)
                    this.$bvModal.hide('loginPopup')
                }
            } catch (error) {
                console.log(error);
                this.$toast.error(error.message)
            }
        }
    }
}
</script>
