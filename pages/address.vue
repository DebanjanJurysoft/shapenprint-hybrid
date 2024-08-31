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
                    <div class="col-lg-10 d-none d-lg-block text-center">
                        <div class="checkout-header">
                            <span class="active">BAG</span>
                            <span class="active">-----------------------</span>
                            <span class="active">ADDRESS</span>
                            <span id="span" class="active">-----------------------</span>
                            <span id="payment_tag" class="active">PAYMENT</span>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-5 col-4">
                        <div class="secure">
                            <span><img src="images/icon/circle-icon.png">100% SECURE</span>
                        </div>
                    </div>
                    <div class="d-block d-lg-none col-sm-1 clear col-2">
                        <div class="responsive-menu-wrap floatright"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="address-area">
            <div class="container" style="max-width: 92%;">
                <div class="row">
                    <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <div class="row">
                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <h2 class="address-title">Select Delivery Address</h2>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <button class="btn btn-outline-secondary" style="cursor: pointer;"
                                    @click.prevent="openAddAddressForm">ADD NEW ADDRESS</button>
                            </div>
                        </div>
                        <b-modal size="lg" id="addNewAddressModal" hide-header hide-footer>
                            <div id="newAddress" style="overflow: auto;"
                                class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3">
                                <h3 id="addressFormHeader" style="text-align: center; text-transform: uppercase;">Add
                                    Address</h3>
                                <GoogleMap @setLatLng="setLatLng" />
                                <pre>{{ lat_lng }}</pre>
                                <div class="row mt-2">
                                    <div class="col-6">
                                        <input type="text" class="form-control" id="first_name" placeholder="First Name"
                                            required="">
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control" id="last_name" placeholder="Last Name"
                                            required="">
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <input type="text" class="form-control" id="phone" placeholder="Phone"
                                            required="">
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <input type="text" class="form-control" id="add1" placeholder="Address"
                                            required="">
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <input type="text" class="form-control" id="floor"
                                            placeholder="Floor No / Building No / Room No" required="">
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6">
                                        <input type="text" class="form-control" id="city" placeholder="City"
                                            required="">
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control" id="state" placeholder="State"
                                            required="">
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-6">
                                        <input type="text" class="form-control" id="zip" placeholder="ZIP" required="">
                                    </div>
                                    <div class="col-6">
                                        <input type="text" class="form-control" id="country" placeholder="Country"
                                            required="">
                                    </div>
                                </div>
                                <div class="row mt-3 align-items-center">
                                    <div class="col-6"
                                        style="display: flex; align-items: flex-start; justify-content: space-evenly; gap: 10px;">
                                        <input type="radio" id="home" name="address_type" value="Home">
                                        <label for="home">Home</label>
                                        <input type="radio" id="office" name="address_type" value="Office">
                                        <label for="office">Office</label>
                                        <input type="radio" id="other" name="address_type" value="Others">
                                        <label for="other">Others</label>
                                    </div>
                                    
                                    <div class="col-6" style="display: none;" id="other_address_type">
                                        <input type="text" class="form-control" id="address_type_name"
                                            placeholder="Address Type" required="">
                                    </div>
                                </div>
                                <div class="row mt-3 justify-content-center" style="gap: 10px;">
                                    <div>
                                        <span @click.prevent="closeAddressForm"
                                            class="btn btn-outline-danger">Close</span>
                                    </div>
                                    <div>
                                        <span onclick="saveAddress()" class="btn btn-outline-success">Save
                                            Address</span>
                                    </div>
                                </div>
                            </div>
                        </b-modal>
                        <div style="height: 450px !important; overflow-y: auto;" v-if="addresses.length">
                            <AddressCard v-for="(address, address_index) in addresses" :key="address_index"
                                :address="address" :selected_address="selected_address" />
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div class="card theme-card cart-price-detail mb-34">
                            <h3 class="" id="price_details_count">PRICE DETAILS (500 ITEMS)</h3>
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
                                <p>Delivery Charge:
                                    <span v-if="total_delivery_price_offer != total_delivery_price" class="text-blue">
                                        <del class=text-danger>₹{{ parseFloat(total_delivery_price).toFixed(2) }}</del>
                                        ₹{{ parseFloat(total_delivery_price_offer).toFixed(2) }}
                                    </span>
                                    <span v-else>₹{{ parseFloat(total_delivery_price_offer).toFixed(2) }}</span>
                                </p>

                                <!-- <p>Delivery Fee <span>₹99</span></p> -->

                            </div>
                            <hr>
                            <p class="total-price"> Total Amount <span id="total_payable">₹{{
        parseFloat(total_amount).toFixed(2) }}</span></p>
                            <button :disabled="notDeliverable" id="place_order_btn" @click.prevent="placeOrder"
                                class="btn theme-btn bold">{{ placeOrderButtonText }}</button>
                            <p v-if="notDeliverable" class="text-danger text-justify"
                                style="font-size: 12px; line-height: 13px; margin-top: 5px">Your location is not
                                deliverable.</p>
                            <div class="d-flex flex-column" v-if="open_payment_options">
                                <div class="card theme-card d-flex flex-row w-100 mt-3 align-items-center"
                                    style="gap: 10px; cursor: pointer;"
                                    v-for="(payment_option, payment_option_index) in payment_options"
                                    :key="payment_option_index" @click.prevent="selectPaymentOptions(payment_option)"
                                    :style="selected_payment_option && selected_payment_option.id == payment_option.id ? 'border: 2px solid #448BDB; box-shadow: #448BDB 0px 3px 9px;' : ''">
                                    <img :src="payment_option.image" width="50px" alt="">
                                    <span style="font-size: 20px; font-weight: 700; ">{{ payment_option.name }}</span>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="card theme-card coupon mb-4" id="payment_card" style="display: none;">
                        <h3>
                            Payment Types
                        </h3>
                        <div>
                            <div class="form-group" style="align-items: center; margin-bottom: 0px;">
                                <input type="radio" name="payment_type" value="cashOnDelivery" id="cashOnDelivery" class="" />
                                <label for="cashOnDelivery" style="text-transform: uppercase; margin-left: 10px;">CASH ON DELIVERY</label>
                            </div>
                            <div class="form-group" style="align-items: center; margin-bottom: 5px; margin-top: -5px;">
                                <input type="radio" name="payment_type" value="online" id="online" class="" />
                                <label for="online" style="text-transform: uppercase; margin-left: 10px;">PAY ONLINE</label>
                            </div>
                        </div> -->
                        <!-- <img src="assets/images/cart-banner/price.jpg" class="w-100" /> -->

                        <div class="card theme-card coupon">
                            <h3>
                                ITEMS
                            </h3>
                            <div class="d-flex flex-column"
                                :style="`gap: 5px; padding: 5px; height: ${cart_data.length == 1 ? 'max-content' : '300px'}; overflow-y: scroll;`">
                                <AddressCartItems v-for="(cart, cart_index) in cart_data" :key="cart_index"
                                    :cart="cart" />
                            </div>
                            <!-- <img src="assets/images/cart-banner/price.jpg" class="w-100" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loadRazorpayScript, removeRazorpayScript } from '@/utils/razorpay';
import AddressCard from '@/components/Address/addressCard.vue';
import AddressCartItems from '@/components/Address/cartItemsAddress.vue'
import {
    mapGetters
} from 'vuex'
import GoogleMap from '@/components/googleMap.vue'
export default {
    layout: 'unauth',
    components: {
        AddressCard,
        AddressCartItems,
        GoogleMap
    },
    data() {
        return {
            loader: true,
            total_mrp_amount: 0,
            total_amount: 0,
            total_count: 0,
            total_discount: 0,
            total_delivery_price: 0,
            total_delivery_price_offer: 0,
            open_payment_options: false,
            payment_options: [
                {
                    id: 1,
                    name: "Razorpay",
                    image: "/img/razorpay.jpeg"
                },
                // {
                //     id: 2,
                //     name: "Cash On Delivery",
                //     image: "/img/cod.jpg"
                // }
            ],
            lat_lng: null,
            notDeliverable: false,
            placeOrderButtonText: 'Proceed To Pay',
            selected_payment_option: null
        }
    },
    computed: {
        ...mapGetters([
            'cart_count',
            'cart_data',
            'logged_in',
            "coupons",
            'addresses',
            'selected_address',
            'snp_id',
            'user',
            'razorpay_options',
            'delivery_offer',
            'delivery_charge',
            'address_lat_lng',
            'order_id'
        ])
    },
    async mounted() {
        if (!this.logged_in) {
            this.$router.push('/login')
            return
        }
        this.loader = true
        await this.$store.dispatch('fetchCart', { unuser: this.snp_id, uid: this.user.uid })
        await this.$store.dispatch('fetchDeliveryOffer')
        await this.$store.dispatch('fetchAddresses', {
            type: 'getAllAddress',
            uid: this.user.uid
        })
        await this.$store.dispatch('fetchlatLongFromAddress', this.selected_address.add1)
        const resp = await this.$store.dispatch('fetchDeliveryCharges', {
            drop: {
                lat: this.address_lat_lng.lat,
                lng: this.address_lat_lng.lng
            }
        })
        if (!resp?.status) {
            this.notDeliverable = true
            this.$toast.error(resp?.message)
        }
        if (this.payment_options.length == 1) {
            this.selectPaymentOptions(this.payment_options[0])
        }
        this.notDeliverable = false
        this.calculatePrice()
        this.loader = false
    },
    watch: {
        cart_data() {
            this.calculatePrice()
        }
    },
    methods: {
        setLatLng(lat_lng) {
            this.lat_lng = lat_lng
        },
        selectPaymentOptions(payment_option) {
            this.selected_payment_option = payment_option
            this.placeOrderButtonText = `Proceed with ${payment_option.name}`
        },
        async placeOrder() {
            if (this.placeOrderButtonText == 'Proceed To Pay') {
                this.open_payment_options = true
                this.placeOrderButtonText = 'Select Payment Mode'
                return
            }
            if (this.placeOrderButtonText == 'Proceed with Razorpay') {
                await loadRazorpayScript()
                const rzp = new Razorpay({
                    ...this.razorpay_options,
                    amount: (Number(this.total_amount) * 100),
                    handler: async (response) => {
                        const payload = {
                            type: "order",
                            SNP_ID: this.snp_id,
                            uid: this.user.uid,
                            gid: 0,
                            address_id: this.selected_address.add_id,
                            total: this.total_amount,
                            billing_id: 'NONE',
                            trans_id: response.razorpay_payment_id,
                            payment_type: "online",
                            // coupon: localStorage.getItem('applied_coupon_code'),
                            shipping_amount: this.total_delivery_price_offer,
                            lat_lng: JSON.stringify({
                                lat: this.address_lat_lng.lat,
                                lng: this.address_lat_lng.lng
                            }),
                            shipping_order_type: 'standard',
                        }
                        const data = await this.$store.dispatch('placeOrder', payload)
                        if (data.status == 'success') {
                            this.$toast.success(data.message)
                            await this.$store.dispatch('sendUpdateSMS', {
                                type: 'send_update', 
                                phone_number: `91${this.selected_address.mobile_no}`,
                                order_id: `SNP-ORD-${this.order_id}`,
                                status: 'placed'
                            })
                            // await this.$store.dispatch('sendUpdateSMS', {
                            //     type: 'send_update', 
                            //     phone_number: `918095135601`,
                            //     order_id: `SNP-ORD-${this.order_id}`,
                            //     status: 'placed'
                            // })
                            await this.$store.dispatch('deleteCartData', this.cart_data)
                            await this.$store.dispatch('fetchCart', { unuser: this.snp_id, uid: this.user.uid })
                            this.$router.push('/checkout')
                            removeRazorpayScript();
                        } else {
                            this.$toast.error(data.message)
                        }
                    },
                    prefill: {
                        name: this.user.username,
                        email: this.user.email,
                        contact: this.user.phone,
                    },

                    onError: (error) => {
                        console.error("Payment failed", error);
                        removeRazorpayScript();
                        this.handlePaymentError(error);
                    },
                })
                rzp.open();
            }
        },
        calculatePrice() {
            this.total_delivery_price = 0
            this.total_delivery_price_offer = 0
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
            if (this.delivery_offer?.free_delivery && this.total_amount >= Number(this.delivery_offer?.min_amt_for_free)) {
                this.total_delivery_price_offer = 0
                this.total_delivery_price = Number(this.delivery_charge?.standard?.totalPrice)
            } else {
                this.total_delivery_price = Number(this.delivery_charge?.standard?.totalPrice)
                this.total_delivery_price_offer = Number(this.delivery_charge?.standard?.totalPrice)
                this.total_amount = Number(this.total_amount) + Number(this.total_delivery_price_offer)
            }
        },
        increasePercentage(value, percentage) {
            return value * (1 + percentage / 100)
        },
        openAddAddressForm() {
            this.$bvModal.show('addNewAddressModal')
        },
        closeAddressForm() {
            this.$bvModal.hide('addNewAddressModal')
        }
    },
}
</script>