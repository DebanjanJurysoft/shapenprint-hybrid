<template>
    <footer class="footer-area" style="background: linear-gradient(to right, #31abfb,#653ee8); margin-top: 100px !important">
        <div class="footer-top bg-1" style="background: linear-gradient(to right, #31abfb,#653ee8);">
            <div class="container"
                style="max-width: 95%; margin-top: -140px; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; padding: 22px; background: white;">
                <div class="row">
                    <div class="col-lg-4 col-sm-6 col-12">
                        <div class="footer-widget footer-logo">
                            <img src="/images/logo2.png" width="250" height="80" alt="">
                            <p>shapeNprint is the leading destination to get your graphic design in 5 hours & print at
                                your doorstep in 10 hours. </p>
                            <ul class="socil-icon d-flex">
                                <li><a target="_blank" href="https://www.instagram.com/shapenprint/"><img
                                            src="/images/socialicon/1.png"></a></li> <!-- IG -->
                                <li><a target="_blank" href="https://www.facebook.com/shapenprint"><img
                                            src="/images/socialicon/2.png"></a></li> <!-- FB -->
                                <li><a target="_blank"
                                        href="https://www.youtube.com/channel/UCMkr_l00AzZRIq5l6Ms0t4Q"><img
                                            src="/images/socialicon/3.png"></a></li> <!-- YT -->
                                <li><a target="_blank" href="https://twitter.com/shapeNprint"><img
                                            src="/images/socialicon/4.png"></a></li> <!-- TW -->
                                <li><a target="_blank" href="https://www.linkedin.com/company/shapenprint/"><img
                                            src="/images/socialicon/5.png"></a></li> <!-- LN -->
                                <li><a target="_blank" href="https://in.pinterest.com/shapenprint/"><img
                                            src="/images/socialicon/6.png"></a></li> <!-- PI -->
                            </ul>
                            <button v-if="!logged_in" type="button" class="brtn theme-btn" name="partner" id="loginbtn">Login /
                                Signup</button>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-12" id="product">
                        <div class="footer-widget footer-menu">
                            <h2>Products</h2>
                            <!-- <pre>{{ categories }}</pre> -->
                            <ul id="product_container_footer">
                                <li v-for="(cat, cat_index) in categories" :key="cat_index"><a :href="`/product/${cat.category_name}/${cat.id}`">{{cat.category_name}}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-12" id="helpful">
                        <div class="footer-widget footer-menu ">
                            <h2>Helpful Links</h2>
                            <ul>
                                <li><a href="#">Urgent Order
                                    </a></li>
                                <li><a target="_blank"
                                        href="https://docs.google.com/forms/d/1n1OMjvrccBuGv0uTUqbK-nRYZZ67rTovfn5VdmAUsbw/edit">Bulk
                                        Order</a></li>
                                <li><a target="_blank"
                                        href="https://docs.google.com/forms/d/1WeQk5SOetDzV6fZ6-vuBVIx8ERrPypZohw13f7RUXbU/edit">Searching
                                        for
                                        Something Else?</a></li>
                                <li><a href="/contact.php">Become a Partner</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-12">
                        <div class="footer-widget footer-menu">
                            <h2>Company</h2>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/how_we_work">How We Work</a></li>
                                <li><a href="about.php">About Us</a></li>
                                <li><a target="_blank" href="https://shapenprint.com/blogs/">Blog</a></li>
                                <li><a target="_blank"
                                        href="https://drive.google.com/file/d/1Yg90YSDP__-1DaKAl_nY8vNDJX71RLjA/view?pli=1">Portfolio</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-12">
                        <div class="footer-widget footer-menu">
                            <h2>Legal</h2>
                            <ul>
                                <li><a href="/terms_and_conditions">Terms of Service
                                    </a></li>
                                <li><a href="privacy_policy.php"> Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <!--<div class="col-lg-1 col-sm-6 col-12 text-center">-->
                    <!--    <div class="footer-widget footer-menu become-partner">-->
                    <!--        <h2></h2>-->
                    <!--        <ul>-->
                    <!--            <li><button type="button" class="brtn theme-btn" name="partner" id="partner">Become a Partner</button></li>-->
                    <!--        </ul>-->
                    <!--    </div>-->
                    <!--</div>-->
                </div>
                <div class="row" style="justify-content: space-between;">
                    <!--<div class="col-md-6 col-12">-->
                    <!--    <h2 class="footer-address">Registered Office Address: 1131/A, BTM 4th Stage, BDA Layout, Bengaluru, Karnataka - 560076-->
                    <!--    </h2>-->

                    <!--</div>-->
                    <div class="col-md-2 col-12">
                        <p><a class="help-link"
                                href="https://docs.google.com/forms/d/1dQb863cnGDg0coWWnKQwGqyzwZB9lzlW2XRuFPmZPAY/viewform?edit_requested=true"
                                target="_blank">Need help? </a><a href="/contact_us">Contact Us</a></p>
                        <!-- <a href="#" class="help-link">Need Help? Contact Us</a> -->
                    </div>
                    <div class="col-md-4 col-12">
                        <img src="/images/icon/payment.jpg" />
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="footer-buttom">-->
        <!--    <div class="container">-->
        <!--        <div class="row">-->
        <!--            <div class="col-md-8 col-12">-->
        <!--                <h2 class="footer-address">Registered Office Address: 1131/A, BTM 4th Stage, BDA Layout, Bengaluru, Karnataka - 560076-->
        <!--                </h2>-->
        <!--                <p><img src="images/icon/payment.jpg" /> </p>-->
        <!--            </div>-->
        <!--            <div class="col-md-4 col-12">-->
        <!--                <ul class="d-flex">-->
        <!--                    <li><a href="#" class="help-link">Need Help? Contact Us</a></li>-->
        <!--                </ul>-->
        <!--            </div>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--</div>-->
        <div class="footer-buttom">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <p class="copyright"> © {{ new Date().getFullYear() }} ShapeNPrint. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    async mounted() {
        await this.fetchFootercategories()
    },
    methods: {
        async fetchFootercategories() {
            await this.$store.dispatch('fetchFooterCategories', { type: 'fetchAllCategories' });
        }
    },
    computed: {
        ...mapGetters(['logged_in', 'user']),
        // Map the categories state from the Vuex store to a computed property
        categories() {
            return this.$store.getters['footerCategories'];
        }
    }
}
</script>