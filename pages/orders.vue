<template>
    <div v-if="loader" class="single-product-area" id="fast_selling"
        style="background:#f2f2f2; padding:50px 0 50px !important;">
        <div class="text-center p-5 container"
            style="background:white; border-radius:20px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 92%;">
            <BSpinner variant="primary" label="Spinning" />
        </div>
    </div>
    <div v-else>
        <div class="container" style="max-width: 95%;">
            <div class="row mt-5">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <h2 class="order-list-title">Orders</h2>
                    <div id="order_card_container">
                        <div class="order-card" style="padding: 20px 20px;" v-for="(order, order_index) in orders">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" id="cat_id_52"
                                    style="width: 450px; max-width: 450px;">
                                    <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade controls>
                                        <template v-if="order.images.length">
                                            <b-carousel-slide v-for="(img, img_ind) in order.images" :key="img_ind"
                                                :img-src="img.image_url"></b-carousel-slide>
                                        </template>
                                        <b-carousel-slide v-else
                                            img-src="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/603c3d31a0b5f9ad3e9c552f811b57a5.jpg"></b-carousel-slide>
                                    </b-carousel>
                                </div>
                                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                    <div class="order-detail-area">
                                        <div class="justify-content-space" v-if="order && order.selected_product &&
        order.selected_product.product_category
        && order.selected_product.product_category.category_name">
                                            <NuxtLink
                                                :to="`/product/${order.selected_product.product_category.category_name}/${order.selected_product.product_category.id}`"
                                                style="font-size: 20px;">{{ order && order.selected_product &&
        order.selected_product.product_category
        && order.selected_product.product_category.category_name ?
        order.selected_product.product_category.category_name : 'N/A' }}
                                            </NuxtLink>
                                            <h5>SNP-ORD-{{ order.oid }}</h5>
                                        </div>
                                        <div class="d-flex flex-column"
                                            v-if="order && order.selected_product && order.selected_product.product_options && order.selected_product.product_options.length && order.selected_product && order.selected_product.product_option_values && order.selected_product.product_option_values.length">
                                            <p>Order Type: {{ order.order_type }}</p>
                                            <p v-for="(option, option_index) in order.selected_product.product_options"
                                                :key="option_index">
                                                {{ option.name }} : {{
        order.selected_product.product_option_values.find(e => e.opt_id ==
            option.id).name }}</p>
                                            <p>Payment Status: {{ order && order.order && order.order.trans_id ? 'PAID'
        : 'PENDING' }}</p>
                                        </div>
                                        <p v-if="order.order && order.order.odate && !isAfterFourPM(order.order.odate)"
                                            class="mt-1">Designer will be
                                            available for corrections from <strong>04:00
                                                P.M.</strong> to
                                            <strong>05:00 P.M. <strong :class="isDateNotPassed(formatDateWithDays(order.order.odate, 1)) ? 'text-success' : 'text-danger'">{{
        formatDateWithDays(order.order.odate, 0)
                                                    }}</strong></strong>
                                        </p>
                                        <p v-else class="mt-1">Designer will be available for corrections from
                                            <strong>04:00
                                                P.M.</strong> to
                                            <strong>05:00 P.M. <strong :class="isDateNotPassed(formatDateWithDays(order.order.odate, 1)) ? 'text-success' : 'text-danger'">{{
                                                    formatDateWithDays(order.order.odate, 1)
                                                    }}</strong></strong>
                                        </p>
                                        <div class="d-flex flex-column my-1"
                                            v-if="order && order.uploaded_images && order.uploaded_images.length">
                                            <a v-for="(image, image_ind) in order.uploaded_images" :key="image_ind"
                                                :href="image.image_url" target="_blank" >Uploaded Image {{
                                                image_ind + 1 }}</a>
                                        </div>
                                        <div class="justify-content-space align-center" style="margin-top: -10px;">
                                            <div class="order-date"><span style="margin-bottom: 0px;"> <img
                                                        src="/images/icon/check.png"> Design
                                                    delivery by
                                                    Wednesday, August 28, 2024</span>
                                                <span style="margin-bottom: 0px;"> <img src="/images/icon/check.png">
                                                    Once design is accepted by
                                                    you, Print delivery within Thursday, August 29, 2024</span>
                                            </div>
                                        </div>
                                        <div class="justify-content-space align-center" style="margin-top: -30px;">
                                            <div class="order-date">
                                                <span style="margin-bottom: 0px;">Order date: {{new Date(order.order.odate).toLocaleDateString()}}</span>
                                                <span style="margin-bottom: 0px;">Order time: {{new Date(order.order.odate).toLocaleTimeString()}}</span>

                                            </div>
                                        </div>
                                        <div class="col-12 google-meet-btn" style="margin-top: -10px;">
                                            <div class="row align-items-center">
                                                <a id="cancel_order_52" class="btn theme-btn">Need Help? Contact Us
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="order-card" style="padding: 20px 20px;">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" id="cat_id_59">
                                    <img src="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/80b79e555f94364fc19876eddc64be36.jpg"
                                        class="radius-10" alt="" width="450px">
                                </div>
                                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                    <div class="order-detail-area">
                                        <div class="justify-content-space">
                                            <h2 style="font-size: 20px;">Flyer</h2>
                                            <h5>SNP-0043</h5>
                                        </div>
                                        <p>Order Type: Print <br>SIZE: A5 <br>Paper Thickness: 130 GSM <br>Printed
                                            Sides: Single Side <br>Quantity: 500<br>Payment Status: Paid</p>
                                        <div class="justify-content-space align-center" style="margin-top: -10px;">
                                            <div class="order-date"><span style="margin-bottom: 0px;"> <img
                                                        src="/images/icon/check.png">Print delivery within
                                                    Saturday, August 31, 2024</span></div>
                                        </div>
                                        <div class="justify-content-space align-center" style="margin-top: -30px;">
                                            <div class="order-date">
                                                <span style="margin-bottom: 0px;">Order date: 28/08/2024</span>
                                                <span style="margin-bottom: 0px;">Order time: 11:59:23</span>

                                            </div>
                                        </div>
                                        <div class="col-12 google-meet-btn" style="margin-top: -10px;">
                                            <div class="row align-items-center">
                                                <a id="cancel_order_59" class="btn theme-btn">Need Help? Contact Us.
                                                </a>
                                                <div id="showNumber_59" class="mt-2 ml-5"
                                                    style="display: none; font-size: 20px"><a id="cancel_order_59"
                                                        class="btn theme-btn">
                                                    </a><a href="tel:+1234567890">To cancel order contact:
                                                        +1234567890</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-card" style="padding: 20px 20px;">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" id="cat_id_44">
                                    <img src="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/603c3d31a0b5f9ad3e9c552f811b57a5.jpg"
                                        class="radius-10" alt="" width="450px">
                                </div>
                                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                    <div class="order-detail-area">
                                        <div class="justify-content-space">
                                            <h2 style="font-size: 20px;">Business card</h2>
                                            <h5>SNP-0042</h5>
                                        </div>
                                        <p>Order Type: DesignNPrint <br>Content Description: asdfv <br>Content File: <a
                                                href="null" target="_blank">Content File</a> <br>Logo: <a href="null"
                                                target="_blank">Logo</a> <br>Reference: <a href="null"
                                                target="_blank">Reference</a> <br>Quantity: 1 <br>Payment Status: Paid
                                        </p>
                                        <p class="mt-1">Designer will be available for corrections from <strong>04:00
                                                P.M.</strong> to
                                            <strong>05:00 P.M. <strong class="text-success">Wednesday, August 28,
                                                    2024</strong></strong>
                                        </p>
                                        <div class="justify-content-space align-center" style="margin-top: -10px;">
                                            <div class="order-date"><span style="margin-bottom: 0px;"> <img
                                                        src="/images/icon/check.png"> Design delivery by
                                                    Wednesday, August 28, 2024</span>
                                                <span style="margin-bottom: 0px;"> <img
                                                        src="/images/icon/check.png"> Once design is accepted by
                                                    you, Print delivery within Thursday, August 29, 2024</span>
                                                <ul>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/983cfdd9908c40fb652242e89dab9666.png">Uploaded
                                                            Image 1</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/7382ac55c563de001f7a55fdddd3cc97.png">Uploaded
                                                            Image 2</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/c8882706ee40d3e3d242a5a9e888420c.png">Uploaded
                                                            Image 3</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/2b9a53d07f6cbc61620e0421f166f81f.png">Uploaded
                                                            Image 4</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/2efa490e3663d9264e05511d2db6f038.png">Uploaded
                                                            Image 5</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/125059c5f2d937a93d064ec8f795de74.png">Uploaded
                                                            Image 6</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/7df1c29ca38417e42697cd751ecf7dab.png">Uploaded
                                                            Image 7</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/dd5c4e279ea8c3c351d8f290252ccb4f.png">Uploaded
                                                            Image 8</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/cd58af97f0129955c59ac99330cb55f5.png">Uploaded
                                                            Image 9</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="justify-content-space align-center" style="margin-top: -30px;">
                                            <div class="order-date">
                                                <span style="margin-bottom: 0px;">Order date: 28/08/2024</span>
                                                <span style="margin-bottom: 0px;">Order time: 11:50:20</span>

                                            </div>
                                        </div>
                                        <div class="col-12 google-meet-btn" style="margin-top: -10px;">
                                            <div class="row align-items-center">
                                                <a id="cancel_order_44" class="btn theme-btn">Need Help? Contact Us.
                                                </a>
                                                <div id="showNumber_44" class="mt-2 ml-5"
                                                    style="display: none; font-size: 20px"><a id="cancel_order_44"
                                                        class="btn theme-btn">
                                                    </a><a href="tel:+1234567890">To cancel order contact:
                                                        +1234567890</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-card" style="padding: 20px 20px;">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" id="cat_id_51">
                                    <img src="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/80b79e555f94364fc19876eddc64be36.jpg"
                                        class="radius-10" alt="" width="450px">
                                </div>
                                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                    <div class="order-detail-area">
                                        <div class="justify-content-space">
                                            <h2 style="font-size: 20px;">Flyer</h2>
                                            <h5>SNP-0042</h5>
                                        </div>
                                        <p>Order Type: Print <br>SIZE: A5 <br>Paper Thickness: 130 GSM <br>Printed
                                            Sides: Single Side <br>Quantity: 500<br>Payment Status: Paid</p>
                                        <div class="justify-content-space align-center" style="margin-top: -10px;">
                                            <div class="order-date"><span style="margin-bottom: 0px;"> <img
                                                        src="/images/icon/check.png">Print delivery within
                                                    Saturday, August 31, 2024</span>
                                                <ul>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/983cfdd9908c40fb652242e89dab9666.png">Uploaded
                                                            Image 1</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/7382ac55c563de001f7a55fdddd3cc97.png">Uploaded
                                                            Image 2</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/c8882706ee40d3e3d242a5a9e888420c.png">Uploaded
                                                            Image 3</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/2b9a53d07f6cbc61620e0421f166f81f.png">Uploaded
                                                            Image 4</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/2efa490e3663d9264e05511d2db6f038.png">Uploaded
                                                            Image 5</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/125059c5f2d937a93d064ec8f795de74.png">Uploaded
                                                            Image 6</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/7df1c29ca38417e42697cd751ecf7dab.png">Uploaded
                                                            Image 7</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/dd5c4e279ea8c3c351d8f290252ccb4f.png">Uploaded
                                                            Image 8</a></li>
                                                    <li><a target="_blank"
                                                            href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/cd58af97f0129955c59ac99330cb55f5.png">Uploaded
                                                            Image 9</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="justify-content-space align-center" style="margin-top: -30px;">
                                            <div class="order-date">
                                                <span style="margin-bottom: 0px;">Order date: 28/08/2024</span>
                                                <span style="margin-bottom: 0px;">Order time: 11:50:20</span>

                                            </div>
                                        </div>
                                        <div class="col-12 google-meet-btn" style="margin-top: -10px;">
                                            <div class="row align-items-center">
                                                <a id="cancel_order_51" class="btn theme-btn">Need Help? Contact Us.
                                                </a>
                                                <div id="showNumber_51" class="mt-2 ml-5"
                                                    style="display: none; font-size: 20px"><a id="cancel_order_51"
                                                        class="btn theme-btn">
                                                    </a><a href="tel:+1234567890">To cancel order contact:
                                                        +1234567890</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-card" style="padding: 20px 20px;">
                            <div class="row">
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" id="cat_id_13">
                                    <img src="https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/0fa0dafab6dbcf7ce1a87c24dd9f5756.jpg"
                                        class="radius-10" alt="" width="450px">
                                </div>
                                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                    <div class="order-detail-area">
                                        <div class="justify-content-space">
                                            <h2 style="font-size: 20px;">Flyer</h2>
                                            <h5>SNP-0013</h5>
                                        </div>
                                        <p>Order Type: DESIGN <br>Content Description: Test <br>Content File: <a
                                                href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/design_files/bb4bf7ebfb38f15afe7a2f8fc4f47aa5.jpeg"
                                                target="_blank">Content File</a> <br>Logo: <a href="null"
                                                target="_blank">Logo</a> <br>Reference: <a
                                                href="https://jurysoftprojects.com/shapeNprint_api/api/uploads/design_files/99413c36aa94ce73cbf8bb7c82a4d1f3.jpg"
                                                target="_blank">Reference</a> <br>Quantity: 1 <br>Payment Status: Paid
                                        </p>
                                        <p class="mt-1">Designer will be available for corrections from <strong>04:00
                                                P.M.</strong> to
                                            <strong>05:00 P.M. <strong class="text-danger">Saturday, July 6,
                                                    2024</strong></strong>
                                        </p>
                                        <div class="justify-content-space align-center" style="margin-top: -10px;">
                                            <div class="order-date"><span style="margin-bottom: 0px;"> <img
                                                        src="/images/icon/check.png"> Design delivery by Saturday,
                                                    July 6, 2024</span></div>
                                        </div>
                                        <div class="justify-content-space align-center" style="margin-top: -30px;">
                                            <div class="order-date">
                                                <span style="margin-bottom: 0px;">Order date: 06/07/2024</span>
                                                <span style="margin-bottom: 0px;">Order time: 13:10:28</span>

                                            </div>
                                        </div>
                                        <div class="col-12 google-meet-btn" style="margin-top: -10px;">
                                            <div class="row align-items-center">
                                                <a id="cancel_order_13" class="btn theme-btn">Need Help? Contact Us.
                                                </a>
                                                <div id="showNumber_13" class="mt-2 ml-5"
                                                    style="display: none; font-size: 20px"><a id="cancel_order_13"
                                                        class="btn theme-btn">
                                                    </a><a href="tel:+1234567890">To cancel order contact:
                                                        +1234567890</a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    layout: 'unauth',
    computed: {
        ...mapGetters(['orders', 'user']),
    },
    data() {
        return {
            loader: true
        }
    },
    async mounted() {
        this.loader = true
        await this.$store.dispatch('fetchOrders', {
            type: 'fetchOrders',
            uid: this.user.uid
        })
        this.loader = false
    },
    methods: {
        isAfterFourPM(date) {
            // Get the hours from the date
            const hours = new Date(date).getHours();

            // Check if the hours are greater than or equal to 16 (4:00 PM)
            return hours >= 16;
        },
        formatDateWithDays(date, days) {
            const date_item = new Date(date)
            // Increase the date by the specified number of days
            date_item.setDate(date_item.getDate() + days);

            // Define options for formatting the date
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            // Format the date to the desired format
            return date_item.toLocaleDateString('en-US', options);
        },
        isDateNotPassed(date) {
            // Get the current date
            const today = new Date();

            // Set the time of the current date to midnight for accurate comparison
            today.setHours(0, 0, 0, 0);

            // Compare the given date with today's date
            return new Date(date) >= today;
        }

    }
}
</script>