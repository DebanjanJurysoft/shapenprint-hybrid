<template>
    <div class="checkout-area ptb-100 ">
        <div class="container">
            <div class="row ">
                <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 text-center">
                    <div class="account-form form-style checkout-card">
                       
                       	<h2>Order Confirmed</h2>
                        <img src="assets/images/icon/order.png" alt="" width="250"/>
                        <p>Hurray! Your  <strong id="order_no">SNP-ORD-{{ order_id }}</strong> is successfully placed. </p>
                       	
                        
                       <NuxtLink to="/orders">REDIRECTING TO ORDER IN {{ reloading_in }} SECONDS / CLICK TO GO NOW</NuxtLink>

                    </div>
                    <NuxtLink to="/" class="btn theme-btn">CONTINUE SHOPPING</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    layout: 'unauth',
    computed: {
        ...mapGetters([
            'order_id'
        ])
    },
    data() {
        return {
            reloading_in: 5,
            timer: null
        }
    },
    mounted() {
        this.reloading_in = 5
        this.timer = setInterval(() => {
            if (this.reloading_in == 0) {
                this.$router.push('/orders')
                clearInterval(this.timer)
                return
            }
            this.reloading_in = this.reloading_in - 1
        }, 1000);
    }
}
</script>