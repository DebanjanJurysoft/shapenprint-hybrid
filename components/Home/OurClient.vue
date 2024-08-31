<template>
    <div class="about-area" style="background: #f2f2f2;margin: 0px;padding-top: 30px;padding-bottom: 80px;">
        <div class="container"
            style="border-radius: 20px;background: white; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 95%;">
            <div class="row">
                <div class="col-12">
                    <div class="section-title text-center d-flex justify-content-center" style="margin-top: 30px">
                        <h2>Our Client - Our Pride</h2>
                    </div>
                </div>
            </div>
            <div class="container row" style="margin-left: 10px; margin-right: 10px; max-width: 95%;" id="our_clients">
                <div class="col-lg-2 col-md-6 col-6" v-for="(client, cl_ind) in clients" :key="cl_ind">
                    <div class="blog-wrap"
                        style="border-radius: 50%;height: 130px; width: 130px; border: 2px solid #8e8e8e;">
                        <img :src="client" alt="blog" style="height: 100%; padding: 18px">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OurClient",
    data() {
        return {
            clients: [
                'img/clients/1.jpg',
                'img/clients/2.jpg',
                'img/clients/3.jpg',
                'img/clients/4.jpg',
                'img/clients/5.jpg',
                'img/clients/6.jpg',
                'img/clients/7.jpg',
                'img/clients/8.jpg',
                'img/clients/9.jpg',
                'img/clients/10.jpg',
                'img/clients/11.jpg',
                'img/clients/12.jpg',
                'img/clients/13.jpg',
                'img/clients/14.jpg',
            ]
        }
    }
}
</script>